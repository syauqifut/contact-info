require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('redis');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Redis client
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
  await redisClient.connect();
})();

// save endpoint
app.post('/post', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const id = Date.now().toString();
    const contactData = {
      name,
      email,
      message,
      createdAt: new Date().toISOString()
    };

    await redisClient.hSet(`id:${id}`, contactData);
    res.status(201).json({ id: id, ...contactData });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// get all endpoint
app.get('/get', async (req, res) => {
  try {
    const keys = await redisClient.keys('id:*');
    const contacts = [];

    for (const key of keys) {
      const contact = await redisClient.hGetAll(key);
      contacts.push({
        id: key.split(':')[1],
        ...contact
      });
    }

    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 