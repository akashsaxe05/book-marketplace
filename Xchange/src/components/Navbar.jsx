import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
function Navbar() {
        const [searchInput, setSearchInput] = useState('');
        const navigate = useNavigate();
        const handleSearch=(e)=>{
          if(e.key==="Enter"){
      navigate(`/?search=${encodeURIComponent(searchInput)}`);
          }
        }
  return (
    <nav className="fixed top-0 z-10 w-full shadow-md flex gap-20 items-center px-3 bg-white">
        <Link to="/" className="font-bold text-4xl text-green-600 hover:text-green-900"> Xchange</Link>
        <div>
            <input type="text"
            placeholder='Search books..'
            className="w-full px-3 rounded border border-black" 
            value={searchInput}
            onChange={(e)=> setSearchInput(e.target.value)}
            onKeyDown={handleSearch}
            name="search"/>
        </div>
        <div className="flex gap-6 items-center">
            <select className="">
                <option value="">ENGLISH</option>
                <option value="">Hindi</option>
            </select>
            <Link to="/login" className="text-gray-700 hover:underline">Login</Link>
            <Link to="/sell" className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-md h-7 flex items-center">Sell</Link>
        
      </div>            
      
        
        
    </nav>
  )
}

export default Navbar
