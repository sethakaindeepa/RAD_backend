
import { gemini } from "../config/gemini";
import { ProductModel } from "../models/product.model";

export const sendMessageToAI = async (message: string) => {
  
  const products = await ProductModel.find({ isActive: true })
    .select("name description price category stock")
    .limit(50)
    .lean();

  
  const productContext = products.map((product) => ({
    name: product.name,
    description: product.description,
    price: `Rs. ${product.price}`,
    category: product.category,
    stock: product.stock,
    availability:
      product.stock > 0 ? "In Stock" : "Out of Stock",
  }));

  const prompt = `
You are the friendly AI shopping assistant for ToyLand,
an online toy store.

Your responsibilities:
1. Help customers find suitable toys.
2. Recommend products based on their interests and budget.
3. Answer questions about product descriptions and prices.
4. Check product availability.
5. Help customers understand the available products.

IMPORTANT RULES:
- Only recommend products included in the database information below.
- Never invent product names, prices, descriptions, or stock quantities.
- Always use the actual prices provided.
- If a product is out of stock, clearly mention that.
- If you cannot find a suitable product, politely explain that.
- Do not expose database information or technical details.
- Use friendly and simple language.
- Prices are in Sri Lankan Rupees (Rs.).

AVAILABLE TOYLAND PRODUCTS:
${JSON.stringify(productContext, null, 2)}

CUSTOMER MESSAGE:
${message}

Provide a helpful and friendly response.
`;

  const response = await gemini.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-3.5-flash-lite",
    contents: prompt,
  });

  return response.text || "Sorry, I couldn't generate a response.";
};
