import {response} from './grokModel.js'
const ChatBotHandler=async(req,res)=>{
       try{
        const {prompt} = req.body;
        // RAG implementation
        const result = await response(`${prompt}`).then((result)=>(result.output_text));
        return res.json({
          result
        })
        
        
       }
       catch(error){
         console.log("error at backend");
       }
}

export  {ChatBotHandler};