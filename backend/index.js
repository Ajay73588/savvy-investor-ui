const express = require('express');
const yahooFinance = require('yahoo-finance2').default;
const app = express();

app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Root route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the Yahoo Finance API Backend');
});

// Market data endpoint (default BTC-USD, ETH-USD)
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

// Search endpoint for individual symbol
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

function formatMarketCap(cap) {
    if (cap >= 1e12) return `$${(cap / 1e12).toFixed(2)}T`;
    if (cap >= 1e9) return `$${(cap / 1e9).toFixed(1)}B`;
    return `$${cap.toLocaleString()}`;
}

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});