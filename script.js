// Initialize Speech Recognition
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';

const output = document.getElementById('output');
const talkBtn = document.getElementById('talk');

// Voice command keywords mapping to actions
const commands = {
    weather: ["weather", "what's the weather", "temperature"],
    news: ["news", "latest headlines"],
    time: ["time", "what time is it"],
    date: ["date", "what's today's date"],
    convertCurrency: ["convert", "currency"],
    math: ["calculate", "math"],
    joke: ["joke", "make me laugh"],
    quote: ["quote", "inspire me"],
    movie: ["movie", "recommend a movie"],
    music: ["play music", "play song"]
};

// Start speech recognition when button is clicked
talkBtn.addEventListener('click', () => {
    recognition.start();
});

// When a voice command is recognized
recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript.toLowerCase();
    output.textContent = `You said: ${transcript}`;
    processCommand(transcript);
};

// Process the recognized voice command
function processCommand(command) {
    if (matchCommand(command, commands.weather)) {
        getWeather();
    } else if (matchCommand(command, commands.news)) {
        getNews();
    } else if (matchCommand(command, commands.time)) {
        getCurrentTime();
    } else if (matchCommand(command, commands.date)) {
        getCurrentDate();
    } else if (matchCommand(command, commands.convertCurrency)) {
        convertCurrency("USD", "INR", 100);  // Example conversion
    } else if (matchCommand(command, commands.math)) {
        solveMath("2+2");
    } else if (matchCommand(command, commands.joke)) {
        getJoke();
    } else if (matchCommand(command, commands.quote)) {
        getQuote();
    } else if (matchCommand(command, commands.movie)) {
        getMovieRecommendation();
    } else if (matchCommand(command, commands.music)) {
        playMusic();
    } else {
        output.textContent = 'Sorry, I did not understand that command.';
    }
}

// Helper function to match a command with keywords
function matchCommand(command, keywords) {
    return keywords.some(keyword => command.includes(keyword));
}

// Fetch Weather Info
function getWeather() {
    const apiKey = '6e51dd903f87d7001b779908c1a97f94';  // Replace with OpenWeatherMap API Key
    const city = 'New York';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            output.textContent = `The weather in ${city} is ${data.weather[0].description}, with a temperature of ${data.main.temp}°C.`;
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

// Fetch Latest News
function getNews() {
    const apiKey = '913e0ce5a15042a09aa3e53aad0e155d';  // Replace with News API Key
    fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            output.textContent = `Latest news: ${data.articles[0].title}`;
        })
        .catch(error => console.error('Error fetching news:', error));
}

// Get Current Time
function getCurrentTime() {
    const now = new Date();
    output.textContent = `The current time is ${now.getHours()}:${now.getMinutes()}`;
}

// Get Current Date
function getCurrentDate() {
    const now = new Date();
    output.textContent = `Today's date is ${now.toDateString()}`;
}

// Convert Currency using ExchangeRate-API
function convertCurrency(from, to, amount) {
    fetch(`https://v6.exchangerate-api.com/v6/57c98734ab849074e34ba014/latest/${from}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[to];
            const convertedAmount = (amount * rate).toFixed(2);
            output.textContent = `${amount} ${from} is equal to ${convertedAmount} ${to}`;
        })
        .catch(error => console.error('Error fetching currency conversion:', error));
}

// Solve Math using MathJS API
function solveMath(expression) {
    fetch(`https://api.mathjs.org/v4/?expr=${encodeURIComponent(expression)}`)
        .then(response => response.text())
        .then(data => {
            output.textContent = `The result of ${expression} is ${data}`;
        })
        .catch(error => console.error('Error solving math:', error));
}

// Get a Joke using JokeAPI
function getJoke() {
    fetch('https://official-joke-api.appspot.com/random_joke')
        .then(response => response.json())
        .then(data => {
            output.textContent = `${data.setup} - ${data.punchline}`;
        })
        .catch(error => console.error('Error fetching joke:', error));
}

// Get Motivational Quote using ZenQuotes API
function getQuote() {
    fetch('https://zenquotes.io/api/random')
        .then(response => response.json())
        .then(data => {
            output.textContent = `"${data[0].q}" - ${data[0].a}`;
        })
        .catch(error => console.error('Error fetching quote:', error));
}

// Get Movie Recommendation from The Movie Database (TMDb) API
function getMovieRecommendation() {
    const apiKey = 'YOUR_TMDB_API_KEY';  // Replace with TMDb API Key
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
        .then(response => response.json())
        .then(data => {
            output.textContent = `Movie recommendation: ${data.results[0].title}`;
        })
        .catch(error => console.error('Error fetching movie recommendation:', error));
}

// Play Music using YouTube
function playMusic() {
    output.textContent = 'Playing music...';
    // Add logic to play a specific song from YouTube using their API or embed
}

// Error handling for speech recognition
recognition.onerror = function(event) {
    output.textContent = 'Sorry, there was an error recognizing your speech.';
};
