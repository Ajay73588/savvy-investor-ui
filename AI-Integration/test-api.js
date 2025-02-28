// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const axios = require('axios');
const OpenAI = require('openai');

// Retrieve API keys from environment variables
const alphaVantageKey = process.env.ALPHA_VANTAGE_API_KEY;
const probitApiUrl = 'https://api.probit.com/api/exchange/v1/ticker?market_ids=BTC-USDT';
const openaiApiKey = process.env.OPENAI_API_KEY;

// Test Alpha Vantage API: Fetch daily stock data for IBM
async function testAlphaVantage() {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${alphaVantageKey}`
    );
    console.log('Alpha Vantage Response:', response.data);
  } catch (error) {
    console.error('Error fetching Alpha Vantage data:', error.message);
  }
}

// Test ProBit Global API: Fetch ticker data for BTC-USDT
async function testProbitGlobal() {
  try {
    const response = await axios.get(probitApiUrl);
    console.log('ProBit Global Response:', response.data);
  } catch (error) {
    console.error('Error fetching ProBit Global data:', error.message);
  }
}

// Test OpenAI API: Generate a simple text completion
async function testOpenAI() {
    const openai = new OpenAI({ apiKey: openaiApiKey });
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Say "Hello, World!"' }],
        max_tokens: 5,
      });
      console.log('OpenAI Response:', response.choices[0].message.content.trim());
    } catch (error) {
      console.error('Error fetching OpenAI data:', error.message);
    }
  }

// Run all tests sequentially
async function runTests() {
  await testAlphaVantage();
  await testProbitGlobal();
  await testOpenAI();
}

// Execute the tests
runTests();