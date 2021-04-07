const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter-button');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Get new quote
function newQuote() {
    showLoadingSpinner();
    const index = Math.floor(Math.random() * apiQuotes.length);     // Random index
    const quote = apiQuotes[index];

    // Check for null author
    if (quote.author) {
        authorText.textContent = quote.author;
    } else {
        authorText.textContent = 'Unknown';
    }

    // Add different styling for long quotes
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = quote.text;
    hideLoadingSpinner();
}

// Fetch quotes from API
async function getQuotesFromAPI() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        console.log('Error occurred while fetching quotes', error);
    }
}

// Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);

// On Load
getQuotesFromAPI();