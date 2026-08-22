import { OpenAI } from "openai/client.js";

const client = new OpenAI(
    {
        apiKey: process.env.GROK_API,
        baseURL: "https://api.groq.com/openai/v1"
    }
)
const response = async(inputstr)=>{
    return await client.responses.create({
    model: "openai/gpt-oss-20b",
    input:inputstr,
})
}
// console.log(response.output_text);

export {response};