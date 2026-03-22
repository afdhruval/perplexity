import { generateMessage, generateChattitle } from "../services/ai.service.js";
import chatModel from "../model/chat.model.js";
import messageModel from "../model/message.model.js"

export async function sendMessage(req, res) {

    const { message, chat: chatId } = req.body


    let title = null, chat = null

    if (!chatId) {
        const title = await generateChattitle(message)
        chat = await chatModel.create({
            user: req.user.id,
            title
        })
    }

    const humanMessage = await messageModel.create({
        chat: chatId || chat._id,
        content: message,
        role: "user"
    })

    const messagess = await messageModel.find({ chat: chatId })

    const result = await generateMessage(messagess)

    const messages = await messageModel.create({
        chat: chatId || chat._id,
        content: result,
        role: "ai"
    })

    console.log(messagess);


    res.status(201).json({
        aiMessagee: result,
        title,
        chat,
        messages
    })

}


export async function getChats(req, res) {

    const user = req.user

    const chat = await chatModel.find({ user: user.id })

    res.status(200).json({
        message: "chatts recieved successfully",
        chat
    })

}

export async function getMessages(req, res) {

    const { chatId } = req.params

    const chat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id
    })

    if (!chat) {
        return res.status(404).json({
            message: "chat not found"
        })
    }

    const messages = await messageModel.find({
        chat: chatId
    })

    res.status(200).json({
        message: "message retrived successfully",
        messages
    })
}

export async function deleteChat(req, res) {

    const { chatId } = req.params

    const chat = await chatModel.findOneAndDelete({
        _id: chatId,
        user: req.user.id
    })

    await messageModel.deleteMany({
        chat: chatId
    })

    if (!chat) {
        return res.status(404).json({
            message: "chat not found"
        })
    }

    res.status(200).json({
        message: "chat deleted successfully"
    })

}


