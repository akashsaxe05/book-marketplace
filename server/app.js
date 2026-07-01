const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();
const bookModel = require('./model/book');
const userModel = require('./model/user');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  const books = await bookModel.find().populate('seller', 'name email points');
  res.json(books);
});

app.get('/book/:id', async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id)
      .populate('seller', 'name email points')
      .populate('buyer', 'name email');
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch book' });
  }
});

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }

    const existingUser = await userModel.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      points: 50
    });

    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, points: user.points }
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await userModel.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({ user: { id: user._id, name: user.name, email: user.email, points: user.points } });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/create', async (req, res) => {
  try {
    const { bookname, price, author, category, image, description, sellerId } = req.body;
    if (!bookname || !price || !author || !category || !image) {
      return res.status(400).json({ error: 'All book fields are required' });
    }

    const book = await bookModel.create({
      bookname,
      price,
      author,
      category,
      image,
      description: description || '',
      seller: sellerId,
      sold: false,
      available: true,
      purchaseInfo: { paymentMethod: 'none', usedPoints: false }
    });

    res.status(201).json({ success: true, book });
  } catch (error) {
    res.status(500).json({ error: 'Book creation failed' });
  }
});

app.post('/purchase/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    const { buyerId, paymentMethod } = req.body;
    if (!buyerId || !paymentMethod) {
      return res.status(400).json({ error: 'Buyer and payment method are required' });
    }

    const book = await bookModel.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    if (book.sold || !book.available) {
      return res.status(400).json({ error: 'Book is already sold' });
    }

    const buyer = await userModel.findById(buyerId);
    if (!buyer) {
      return res.status(404).json({ error: 'Buyer not found' });
    }

    const seller = book.seller ? await userModel.findById(book.seller) : null;
    if (!seller) {
      return res.status(400).json({ error: 'Seller information is missing' });
    }

    if (paymentMethod === 'points') {
      if (buyer.points < book.price) {
        return res.status(400).json({ error: 'Insufficient points to buy this book' });
      }
      buyer.points -= book.price;
      seller.points += Math.ceil(book.price * 0.1);
      await buyer.save();
      await seller.save();

      book.sold = true;
      book.available = false;
      book.buyer = buyer._id;
      book.purchaseInfo = { paymentMethod: 'points', usedPoints: true, purchasedAt: new Date() };
      await book.save();

      return res.json({
        success: true,
        book,
        buyer: { id: buyer._id, points: buyer.points },
        seller: { id: seller._id, points: seller.points }
      });
    }

    if (paymentMethod === 'online' || paymentMethod === 'other') {
      book.sold = true;
      book.available = false;
      book.buyer = buyer._id;
      book.purchaseInfo = { paymentMethod, usedPoints: false, purchasedAt: new Date() };
      seller.points += Math.ceil(book.price * 0.05);
      await seller.save();
      await book.save();

      return res.json({ success: true, book, seller: { id: seller._id, points: seller.points } });
    }

    return res.status(400).json({ error: 'Unsupported payment method' });
  } catch (error) {
    res.status(500).json({ error: 'Purchase failed' });
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    await bookModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

app.listen(3001, () => {
  console.log('listening on port 3001');
});
