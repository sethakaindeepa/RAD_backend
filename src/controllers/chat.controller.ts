
import { Request, Response } from "express";
import { sendMessageToAI } from "../services/chat.service";

export const chatWithAI = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid message.",
      });
    }

    
    const reply = await sendMessageToAI(message.trim());

    return res.status(200).json({
      success: true,
      message: "AI response generated successfully.",
      data: {
        reply,
      },
    });
  } catch (error) {
    console.error("========== AI CHAT ERROR ==========");
    console.error(error);
    console.error("===================================");

    return res.status(500).json({
      success: false,
      message: "Something went wrong while processing your message.",
    });
  }
};
