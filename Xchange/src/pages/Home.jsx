import { useState, useEffect } from 'react';
import { Link, useLocation} from 'react-router-dom';


function Home() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search") || '';
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch('http://localhost:3000/')
    .then((res)=>res.json())
    .then((data)=>setBooks(data))
    .catch((err)=>console.error(err));
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  const handleDelete= async(id)=>{
    const res = await fetch(`http://localhost:3000/delete/${id}`,{
      method : 'DELETE'
    });
    setBooks(books.filter(book => book._id !== id));

  }

  return (
    <div>
      {/* Navigation */}
      <nav className="mt-10 py-2 flex flex-wrap gap-4 justify-between px-5 font-bold shadow-2xl">
        <select
          className="border border-black px-2 py-1"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="All">All Categories</option>
          <option value="Autobiography">Autobiography</option>
          <option value="Course">Course</option>
          <option value="Noble">Noble</option>
          <option value="Story">Story</option>
          <option value="Fiction">Fiction</option>
          <option value="Programming">Programming</option>
          <option value="Self-help">Self-help</option>
        </select>

        {/* These could scroll to specific sections if you add corresponding ids */}
        <a href="#fiction" className="text-blue-600 hover:underline">Fiction</a>
        <a href="#autobiography" className="text-blue-600 hover:underline">Autobiography</a>
        <a href="#course" className="text-blue-600 hover:underline">Course</a>
        <a href="#noble" className="text-blue-600 hover:underline">Noble</a>
        <a href="#story" className="text-blue-600 hover:underline">Story</a>
      </nav>

      {/* Book Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 px-5">
        {books
          .filter((book) =>
{            const matchesCategory= selectedCategory === "All" ? true : book.category === selectedCategory
             const matchesSearch=book.bookname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
}          )
          .map((book) => (
            <Link to={`/book/${book.id}`} key={book.id}>
              <div className="border bg-white rounded-xl p-4 shadow hover:shadow-lg transition">
                <h3 className="text-lg font-bold">{book.bookname}</h3>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-sm mt-1">Category: {book.category}</p>
                <p className="text-blue-600 mt-2 font-semibold">{book.price} pts</p>
                 <div class="w-50 h-50 bg-red-500 rounded-2xl">
                  <img src={book.image} alt="image" class="h-full w-full "/>
                </div>
                
              <Link to='/'> <button
               onClick={()=>handleDelete(book._id)} 
               className="text-red-700 hover:underline mt-2">Delete</button></Link>
              </div>
            </Link>
          ))}
      </div>

      {/* Example section to scroll to with anchor link */}
      <div id="fiction" className="mt-15 p-4  bg-green-100">
        <h2 className="text-2xl font-bold py-4">Fiction Section</h2>
        <div className="flex flex-row gap-4">
          {books
            .filter((book) =>book.category==="Fiction"
          ).map((book)=>(
             <Link to={`/book/${book.id}`} key={book.id}>
              <div className="border bg-white rounded-xl p-4 shadow hover:shadow-lg transition">
                <h3 className="text-lg font-bold">{book.bookname}</h3>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-sm mt-1">Category: {book.category}</p>
                <p className="text-blue-600 mt-2 font-semibold">{book.price} pts</p>
                <div class="w-50 h-50 bg-red-500 rounded-2xl">
                  <img src={book.image} alt="image" class="h-full w-full "/>
                </div>
               
              </div>
            </Link>
          ))

        }
        </div>
      </div> 
      <div id="story" className="mt-15 p-4  bg-green-100">
        <h2 className="text-2xl font-bold py-4">Story Section</h2>
        <div className="flex flex-row gap-4">
          {books
            .filter((book) =>book.category==="Story"
          ).map((book)=>(
             <Link to={`/book/${book.id}`} key={book.id}>
              <div className="border  bg-white rounded-xl p-4 shadow hover:shadow-lg transition">
                <h3 className="text-lg font-bold">{book.bookname}</h3>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-sm mt-1">Category: {book.category}</p>
                <p className="text-blue-600 mt-2 font-semibold">{book.price} pts</p>
                 <div class="w-50 h-50 bg-red-500 rounded-2xl">
                  <img src={book.image} alt="image" class="h-full w-full "/>
                </div>
              </div>
            </Link>
          ))

          }
        </div>
      </div>
      <div id="autobiography" className="mt-15 p-4  bg-green-100">
        <h2 className="text-2xl font-bold py-4">Autobiography Section</h2>
        <div className="flex flex-row gap-4">
          {books
            .filter((book) =>book.category==="Autobiography"
          ).map((book)=>(
             <Link to={`/book/${book.id}`} key={book.id}>
              <div className="border  bg-white rounded-xl p-4 shadow hover:shadow-lg transition">
                <h3 className="text-lg font-bold">{book.bookname}</h3>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-sm mt-1">Category: {book.category}</p>
                <p className="text-blue-600 mt-2 font-semibold">{book.price} pts</p>
                <div class="w-50 h-50 bg-red-500 rounded-2xl">
                  <img src={book.image} alt="image" class="h-full w-full "/>
                </div>
              </div>
            </Link>
          ))

          }
        </div>
      </div>
      <div id="noble" className="mt-15 p-4  bg-green-100">
        <h2 className="text-2xl font-bold py-4">Noble Section</h2>
        <div className="flex flex-row gap-4">
          {books
            .filter((book) =>book.category==="Noble"
          ).map((book)=>(
             <Link to={`/book/${book.id}`} key={book.id}>
              <div className="border  bg-white rounded-xl p-4 shadow hover:shadow-lg transition">
                <h3 className="text-lg font-bold">{book.bookname}</h3>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-sm mt-1">Category: {book.category}</p>
                <p className="text-blue-600 mt-2 font-semibold">{book.price} pts</p>
                 <div class="w-50 h-50 bg-red-500 rounded-2xl">
                  <img src={book.image} alt="image" class="h-full w-full "/>
                </div>
              </div>
            </Link>
          ))

          }
        </div>
      </div> 
       <div id="cource" className="mt-15 p-4  bg-green-100">
        <h2 className="text-2xl font-bold py-4">Cource Section</h2>
        <div className="flex flex-row gap-4">
          {books
            .filter((book) =>book.category==="Cource"
          ).map((book)=>(
             <Link to={`/book/${book.id}`} key={book.id}>
              <div className="border  bg-white rounded-xl p-4 shadow hover:shadow-lg transition">
                <h3 className="text-lg font-bold">{book.bookname}</h3>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-sm mt-1">Category: {book.category}</p>
                <p className="text-blue-600 mt-2 font-semibold">{book.price} pts</p>
               <div class="w-50 h-50 bg-red-500 rounded-2xl">
                  <img src={book.image} alt="image" class="h-full w-full "/>
                </div>
              </div>
            </Link>
          ))

          }
        </div>
      </div> 
    </div>
  );
}

export default Home;
