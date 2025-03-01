const express = require('express');
const mongoose = require('mongoose');
const yahooFinance = require('yahoo-finance2').default;
const Transaction = require('./models/Transaction');
require('dotenv').config();

const app = express();

app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB Atlas connection error:', err));

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Finance Tracker API Backend');
});

// Yahoo Finance: Default market data
app.get('/api/market-data', async (req, res) => {
    try {
        const symbols = ['BTC-USD', 'ETH-USD'];
        const data = await Promise.all(symbols.map(async (symbol) => {
            const quote = await yahooFinance.quoteSummary(symbol);
            return {
                name: quote.price.longName || symbol.split('-')[0],
                symbol: quote.price.symbol,
                price: quote.price.regularMarketPrice,
                change: quote.price.regularMarketChangePercent * 100,
                marketCap: quote.summaryDetail.marketCap
                    ? formatMarketCap(quote.summaryDetail.marketCap)
                    : 'N/A'
            };
        }));
        res.json(data);
    } catch (error) {
        console.error('Error fetching default data:', error);
        res.status(500).json({ error: 'Failed to fetch market data' });
    }
});

// Yahoo Finance: Search endpoint
app.get('/api/search', async (req, res) => {
    const { symbol } = req.query;
    if (!symbol || typeof symbol !== 'string') {
        return res.status(400).json({ error: 'Symbol query parameter is required' });
    }
    try {
        const quote = await yahooFinance.quoteSummary(symbol.toUpperCase());
        const data = {
            name: quote.price.longName || symbol.split('-')[0],
            symbol: quote.price.symbol,
            price: quote.price.regularMarketPrice,
            change: quote.price.regularMarketChangePercent * 100,
            marketCap: quote.summaryDetail.marketCap
                ? formatMarketCap(quote.summaryDetail.marketCap)
                : 'N/A'
        };
        res.json(data);
    } catch (error) {
        console.error(`Error fetching ${symbol}:`, error);
        res.status(404).json({ error: `Failed to fetch data for ${symbol}` });
    }
});

// Mock categorization function
const categorizeTransaction = (description) => {
    if (description.toLowerCase().includes('coffee')) return 'Food';
    if (description.toLowerCase().includes('rent')) return 'Housing';
    if (description.toLowerCase().includes('salary')) return 'Income';
    return 'Miscellaneous';
};

// POST /transactions
app.post('/transactions', async (req, res) => {
    try {
        console.log('Received POST request:', req.body);
        const { amount, date, description } = req.body;
        if (!amount || !description) {
            console.log('Missing required fields');
            return res.status(400).send({ error: 'Amount and description are required' });
        }
        const category = categorizeTransaction(description);
        console.log('Generated category:', category);
        const transaction = new Transaction({ amount, date, description, category });
        console.log('Transaction to save:', transaction);
        const savedTransaction = await transaction.save();
        console.log('Saved transaction:', savedTransaction);
        res.status(201).send(savedTransaction);
    } catch (error) {
        console.error('Error saving transaction:', error.message, error.stack);
        res.status(500).send({ error: 'Failed to save transaction', details: error.message });
    }
});

// GET /transactions
app.get('/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        console.log('Fetched transactions:', transactions);
        res.send(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).send({ error: 'Failed to fetch transactions' });
    }
});

function formatMarketCap(cap) {
    if (cap >= 1e12) return `$${(cap / 1e12).toFixed(2)}T`;
    if (cap >= 1e9) return `$${(cap / 1e9).toFixed(1)}B`;
    return `$${cap.toLocaleString()}`;
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));