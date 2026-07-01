import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Categorybar from '../components/Categorybar';

function Home() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search') || '';
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const port = import.meta.env.VITE_API_URL || '3000';

  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await axios.get(`${port}/`);
        setBooks(res.data || []);
      } catch (error) {
        console.error('Failed to load books:', error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetching();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredBooks = books.filter((book) => {
    const matchesCategory = selectedCategory === 'All' ? true : book.category === selectedCategory;
    const matchesSearch =
      book.bookname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 px-5 pb-10 bg-slate-50 min-h-screen">
      <Categorybar handleCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />

      <div className="max-w-7xl mx-auto mt-8">
        <div className="rounded-[2rem] bg-gradient-to-r from-emerald-200 via-sky-100 to-indigo-100 p-8 shadow-lg">
          <h1 className="text-4xl font-bold text-slate-900">Welcome to Xchange</h1>
          <p className="mt-3 max-w-2xl text-slate-700">
            Browse books by category, sign up first, then log in to access the full marketplace experience.
          </p>
        </div>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">All books</h2>
          {loading ? (
            <div className="rounded-3xl bg-white p-12 text-center text-slate-600 shadow-sm">Loading books...</div>
          ) : filteredBooks.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center text-slate-600 shadow-sm">No books match your search or category selection.</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {filteredBooks.map((book) => (
                <Link key={book._id || book.id} to={`/book/${book._id || book.id}`}>
                  <div className="book-card overflow-hidden bg-white p-5 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
                    <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-slate-100">
                      <img src={book.image} alt={book.bookname} className="h-full w-full object-cover" />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold text-slate-900">{book.bookname}</h3>
                      <p className="mt-2 text-slate-600">{book.author}</p>
                      <div className="mt-3 flex items-center justify-between gap-3 text-sm text-slate-500">
                        <span>{book.category}</span>
                        <span className="font-semibold text-emerald-600">{book.price} pts</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section id="fiction" className="mt-12">
          <h2 className="section-title">Fiction Section</h2>
          <div className="section-panel grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {books
              .filter((book) => book.category === 'Fiction')
              .map((book) => (
                <Link key={book._id || book.id} to={`/book/${book._id || book.id}`}>
                  <div className="book-card overflow-hidden bg-white p-5 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
                    <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-slate-100">
                      <img src={book.image} alt={book.bookname} className="h-full w-full object-cover" />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold text-slate-900">{book.bookname}</h3>
                      <p className="mt-2 text-slate-600">{book.author}</p>
                      <div className="mt-3 flex items-center justify-between gap-3 text-sm text-slate-500">
                        <span>{book.category}</span>
                        <span className="font-semibold text-emerald-600">{book.price} pts</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>

        <section id="story" className="mt-12">
          <h2 className="section-title">Story Section</h2>
          <div className="section-panel grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {books
              .filter((book) => book.category === 'Story')
              .map((book) => (
                <Link key={book._id || book.id} to={`/book/${book._id || book.id}`}>
                  <div className="book-card overflow-hidden bg-white p-5 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
                    <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-slate-100">
                      <img src={book.image} alt={book.bookname} className="h-full w-full object-cover" />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold text-slate-900">{book.bookname}</h3>
                      <p className="mt-2 text-slate-600">{book.author}</p>
                      <div className="mt-3 flex items-center justify-between gap-3 text-sm text-slate-500">
                        <span>{book.category}</span>
                        <span className="font-semibold text-emerald-600">{book.price} pts</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>

        <section id="autobiography" className="mt-12">
          <h2 className="section-title">Autobiography Section</h2>
          <div className="section-panel grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {books
              .filter((book) => book.category === 'Autobiography')
              .map((book) => (
                <Link key={book._id || book.id} to={`/book/${book._id || book.id}`}>
                  <div className="book-card overflow-hidden bg-white p-5 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
                    <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-slate-100">
                      <img src={book.image} alt={book.bookname} className="h-full w-full object-cover" />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold text-slate-900">{book.bookname}</h3>
                      <p className="mt-2 text-slate-600">{book.author}</p>
                      <div className="mt-3 flex items-center justify-between gap-3 text-sm text-slate-500">
                        <span>{book.category}</span>
                        <span className="font-semibold text-emerald-600">{book.price} pts</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>

        <section id="noble" className="mt-12">
          <h2 className="section-title">Noble Section</h2>
          <div className="section-panel grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {books
              .filter((book) => book.category === 'Noble')
              .map((book) => (
                <Link key={book._id || book.id} to={`/book/${book._id || book.id}`}>
                  <div className="book-card overflow-hidden bg-white p-5 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
                    <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-slate-100">
                      <img src={book.image} alt={book.bookname} className="h-full w-full object-cover" />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold text-slate-900">{book.bookname}</h3>
                      <p className="mt-2 text-slate-600">{book.author}</p>
                      <div className="mt-3 flex items-center justify-between gap-3 text-sm text-slate-500">
                        <span>{book.category}</span>
                        <span className="font-semibold text-emerald-600">{book.price} pts</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>

        <section id="course" className="mt-12">
          <h2 className="section-title">Course Section</h2>
          <div className="section-panel grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {books
              .filter((book) => book.category === 'Course')
              .map((book) => (
                <Link key={book._id || book.id} to={`/book/${book._id || book.id}`}>
                  <div className="book-card overflow-hidden bg-white p-5 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
                    <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-slate-100">
                      <img src={book.image} alt={book.bookname} className="h-full w-full object-cover" />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold text-slate-900">{book.bookname}</h3>
                      <p className="mt-2 text-slate-600">{book.author}</p>
                      <div className="mt-3 flex items-center justify-between gap-3 text-sm text-slate-500">
                        <span>{book.category}</span>
                        <span className="font-semibold text-emerald-600">{book.price} pts</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
