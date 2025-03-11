const axios = require("axios");

const fetchRandomQuote = async () => {
  try {
    const response = await axios.get("https://zenquotes.io/api/random");
    const quoteData = response.data[0]; 

    return {
      text: quoteData.q, 
      author: quoteData.a, 
    };
  } catch (error) {
    console.error("Error fetching quote:", error.message);
    throw new Error("Failed to fetch quote.");
  }
};

module.exports = { fetchRandomQuote };