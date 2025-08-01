const express= require('express')
const cors = require('cors');
const app=express();
const bookModel = require('./model/book');



app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/",async (req,res)=>{
   const books= await bookModel.find();
   res.json(books);
   console.log(books.image);
})
app.post("/create",async (req,res)=>{
   let {bookname,price,author, category, image}=req.body;
   const book = await bookModel.create({
      bookname,
      price,
      author,
      category,
      image
   });
   console.log("New Book Added:", book);
   res.send({ success: true, book });
});
app.delete(`/delete/:id`, async (req,res)=>{
   await bookModel.findByIdAndDelete(req.params.id);
     res.send('Book deleted successfully');
})
app.listen(3000,()=> console.log("Listning"));