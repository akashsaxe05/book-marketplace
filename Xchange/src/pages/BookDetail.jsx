import { Link, useParams } from 'react-router-dom';

function BookDetail({ book }) {
  const params = useParams();
  if (!book) {
    return (
      <div className="pt-28 px-5 bg-slate-50 min-h-screen">
        <div className="max-w-3xl mx-auto rounded-[2rem] bg-white p-10 shadow-xl">
          <h2 className="text-3xl font-bold text-slate-900">Book details</h2>
          <p className="mt-4 text-slate-600">
            Details for book ID <strong>{params.id}</strong>
            
          </p>
          <Link to="/" className="mt-8 inline-block text-emerald-600 hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const bookId = book._id || book.id;

  return (
    <div className="pt-28 px-5 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto rounded-[2rem] bg-white p-8 shadow-xl">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-slate-100">
            <img src={book.image} alt={book.bookname} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">{book.bookname}</h1>
              <p className="mt-3 text-lg text-slate-600">{book.author}</p>
              <p className="mt-4 text-slate-500">Category: {book.category}</p>
            </div>
            <div className="mt-8 rounded-3xl bg-emerald-50 p-6 text-slate-900">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Price</p>
              <p className="mt-2 text-3xl font-semibold">{book.price} pts</p>
              <Link to="/" className="mt-6 inline-block text-emerald-600 hover:underline">
                Back to all books
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;

