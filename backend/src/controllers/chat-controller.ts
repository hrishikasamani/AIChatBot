import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";

export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {message} = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user)
            return res.status(401).json({message: "User not registered OR Token malfunction"});
    
        //Grab user's chats
        const chats = (user.chats || []).map(({role, content}) => ({role, content})) as ChatCompletionRequestMessage[];
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
    
        //Send all previous chats with a new one to OpenAI API
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
    
        //Get latest response
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo", 
            messages: chats
        });
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({chats: user.chats});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong!" });
    }

};

export const sendChatsToUser = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    try{
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        console.log(user._id.toString(), res.locals.jwtData.id);
        if(user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({ message: "OK", chats: user.chats });

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"ERROR", cause: error.message})
    }
}  