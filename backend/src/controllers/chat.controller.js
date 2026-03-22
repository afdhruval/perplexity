import { generateMessage } from "../services/ai.service.js";

export async function sendMessage(req, res) {

    const { message } = req.body

    const result = await generateMessage(message)    

    res.json({
        messagee : result
    })

}