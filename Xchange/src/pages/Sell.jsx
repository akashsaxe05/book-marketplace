import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
function Sell() {
  
  const [formdata,setForm] =useState({
    bookname:'',
    price:'',
    author:'',
    category:'',
    image: ''
    
    
  });
  const navigate = useNavigate();
  const handleChanges=(e)=>{
    setForm({
      ...formdata,
      [e.target.name]:e.target.value
    });
  };
  const handleSubmit =async (e)=>{
    e.preventDefault();
    const res=await fetch('http://localhost:3000/create',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(formdata)
    });
    const result= await res.text();
    alert('Book submitted successfully!'); 
  }

  return (
    <div class="w-full min-h-screen bg-zinc-900 text-white ">
       
         <form onSubmit={handleSubmit} method="post" class="p-10">
         <h1 class="text-4xl flex justify-center font-bold mb-10">SELL YOUR BOOOK</h1>
         <div class="text-white pd-5 bg-zinc-800 flex flex-col justify-center items-center gap-4 py-3 rounded">
          <input type="text"
          onChange={handleChanges}
           placeholder='Enter Book Name'
           class="border border-white rounded px-2"
           name="bookname"/>
          <input type="number" 
          onChange={handleChanges}
          placeholder='Enter price'
           class="border border-white rounded px-2"
           name="price"/>
            <input type="text"
            onChange={handleChanges}
           placeholder='Enter Author Name'
           name="author"
           class="border border-white rounded px-2"/>
          <input type="text" 
          onChange={handleChanges}
          placeholder='Category'
           class="border border-white rounded px-2"
           name="category"/>
           <input type="text"
           onChange={handleChanges}
          placeholder='Paste Url'
           class="border border-white rounded px-2"
           name="image" />
          <button  class="bg-blue-600 rounded px-2 hover:bg-blue-300">Proceed</button>  
           </div>  
          </form>    

        
    </div>
  )
}

export default Sell;
