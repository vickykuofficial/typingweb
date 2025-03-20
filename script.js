// DOM Elements
const textDisplay = document.getElementById('text-display');
const typingInput = document.getElementById('typing-input');
const timeElement = document.getElementById('time');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const resultScreen = document.getElementById('result-screen');
const resultWpm = document.getElementById('result-wpm');
const resultAccuracy = document.getElementById('result-accuracy');
const resultCharacters = document.getElementById('result-characters');
const tryAgainBtn = document.getElementById('try-again-btn');
const restartBtn = document.getElementById('restart-btn');
const themeToggle = document.getElementById('theme-toggle');
const timeButtons = document.querySelectorAll('.time-btn');

// Variables
let timer;
let timeLeft = 15;
let isTyping = false;
let words = [];
let wordIndex = 0;
let charIndex = 0;
let mistakes = 0;
let correctChars = 0;
let startTime;
let currentMode = 'paragraph'; // 'paragraph', 'quote', 'code'
let typingHistory = [];
let personalBest = localStorage.getItem('personalBest') ? JSON.parse(localStorage.getItem('personalBest')) : { wpm: 0, accuracy: 0 };

// Sample text paragraphs
const textSamples = [
    // General paragraphs
    "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump! Bright vixens jump; dozy fowl quack. Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz.",
    "Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using a variety of computer programming languages, such as JavaScript, Python, and C++.",
    "The Internet is a global network of billions of computers and other electronic devices. With the Internet, it's possible to access almost any information, communicate with anyone else in the world, and do much more.",
    "Artificial intelligence is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning, reasoning, and self-correction.",
    "Typing speed is typically measured in words per minute, which is often abbreviated as WPM. The average typing speed is around 40 WPM, while professional typists work at speeds of 65 to 75 WPM.",
    
    // Technology paragraphs
    "Cloud computing is the delivery of computing services over the internet. These services include servers, storage, databases, networking, software, analytics, and intelligence. Cloud computing offers faster innovation, flexible resources, and economies of scale.",
    "Blockchain is a system of recording information in a way that makes it difficult or impossible to change, hack, or cheat the system. A blockchain is essentially a digital ledger of transactions that is duplicated and distributed across the entire network of computer systems.",
    "Machine learning is an application of artificial intelligence that provides systems the ability to automatically learn and improve from experience without being explicitly programmed. Machine learning focuses on the development of computer programs that can access data and use it to learn for themselves.",
    "Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information; extorting money from users; or interrupting normal business processes.",
    "Virtual reality is a simulated experience that can be similar to or completely different from the real world. Applications of virtual reality can include entertainment and educational purposes. Other distinct types of VR-style technology include augmented reality and mixed reality.",
    
    // Science paragraphs
    "Quantum computing is a type of computation that harnesses the collective properties of quantum states, such as superposition, interference, and entanglement, to perform calculations. The devices that perform quantum computations are known as quantum computers.",
    "Genetic engineering is the process of using recombinant DNA technology to alter the genetic makeup of an organism. Traditionally, humans have manipulated genomes indirectly by controlling breeding and selecting offspring with desired traits.",
    "Nanotechnology is the manipulation of matter on an atomic, molecular, and supramolecular scale. The earliest, widespread description of nanotechnology referred to the particular technological goal of precisely manipulating atoms and molecules for fabrication of macroscale products.",
    "Renewable energy is energy that is collected from renewable resources, which are naturally replenished on a human timescale, such as sunlight, wind, rain, tides, waves, and geothermal heat. Renewable energy often provides energy in four important areas: electricity generation, air and water heating/cooling, transportation, and rural energy services.",
    "Space exploration is the use of astronomy and space technology to explore outer space. While the exploration of space is carried out mainly by astronomers with telescopes, its physical exploration is conducted both by unmanned robotic space probes and human spaceflight.",
    
    // Programming paragraphs
    "JavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript specification. It has dynamic typing, prototype-based object-orientation, and first-class functions. It is multi-paradigm, supporting event-driven, functional, and imperative programming styles.",
    "Python is an interpreted, high-level, general-purpose programming language. Its design philosophy emphasizes code readability with its use of significant whitespace. Its language constructs and object-oriented approach aim to help programmers write clear, logical code for small and large-scale projects.",
    "React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications.",
    "Git is a distributed version-control system for tracking changes in source code during software development. It is designed for coordinating work among programmers, but it can be used to track changes in any set of files.",
    "Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers. Containers are isolated from one another and bundle their own software, libraries and configuration files; they can communicate with each other through well-defined channels."
];

// Programming quotes
const quotesSamples = [
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler",
    "First, solve the problem. Then, write the code. - John Johnson",
    "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
    "Programming isn't about what you know; it's about what you can figure out. - Chris Pine",
    "The only way to learn a new programming language is by writing programs in it. - Dennis Ritchie",
    "The best error message is the one that never shows up. - Thomas Fuchs",
    "Don't worry if it doesn't work right. If everything did, you'd be out of a job. - Mosher's Law of Software Engineering",
    "The most disastrous thing that you can ever learn is your first programming language. - Alan Kay",
    "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code. - Dan Salomon",
    "Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away. - Antoine de Saint-Exupery"
];

// Code snippets
const codeSamples = [
    `function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`,
    `const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}`,
    `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  add(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }
}`,
    `const memoize = (fn) => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
};`,
    `import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`
];

// Initialize
function init() {
    // Set default time
    setTime(15);
    
    // Load random text
    loadNewText();
    
    // Focus on input
    typingInput.focus();
    
    // Event listeners
    typingInput.addEventListener('input', handleTyping);
    tryAgainBtn.addEventListener('click', resetTest);
    restartBtn.addEventListener('click', resetTest);
    themeToggle.addEventListener('click', toggleTheme);
    
    // Time button listeners
    timeButtons.forEach(button => {
        button.addEventListener('click', () => {
            timeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            setTime(parseInt(button.dataset.time));
            resetTest();
        });
    });
    
    // Focus input when clicking on text display
    textDisplay.addEventListener('click', () => typingInput.focus());
    
    // Keep focus on input
    document.addEventListener('click', () => {
        if (!resultScreen.style.display || resultScreen.style.display === 'none') {
            typingInput.focus();
        }
    });
    
    // Add mode switcher buttons if they exist
    const modeButtons = document.querySelectorAll('.mode-btn');
    if (modeButtons.length > 0) {
        modeButtons.forEach(button => {
            button.addEventListener('click', () => {
                modeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                currentMode = button.dataset.mode;
                resetTest();
            });
        });
    }
    
    // Load personal best from localStorage
    updatePersonalBest();
    
    // Add keyboard event listener for shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(e) {
    // Tab + Enter to restart test
    if (e.key === 'Tab' && e.altKey) {
        e.preventDefault();
        resetTest();
    }
    
    // Escape to cancel current test
    if (e.key === 'Escape') {
        resetTest();
    }
}

// Load new random text based on current mode
function loadNewText() {
    let text;
    
    switch(currentMode) {
        case 'quote':
            text = quotesSamples[Math.floor(Math.random() * quotesSamples.length)];
            break;
        case 'code':
            text = codeSamples[Math.floor(Math.random() * codeSamples.length)];
            break;
        case 'paragraph':
        default:
            text = textSamples[Math.floor(Math.random() * textSamples.length)];
    }
    
    words = text.split(' ');
    
    // Clear display
    textDisplay.innerHTML = '';
    
    // Create word spans
    words.forEach((word, index) => {
        const wordSpan = document.createElement('span');
        wordSpan.classList.add('word');
        
        // Create character spans
        [...word].forEach((char, idx) => {
            const charSpan = document.createElement('span');
            charSpan.textContent = char;
            charSpan.classList.add('char');
            wordSpan.appendChild(charSpan);
        });
        
        // Add space after word except for last word
        if (index < words.length - 1) {
            const spaceSpan = document.createElement('span');
            spaceSpan.textContent = ' ';
            spaceSpan.classList.add('char');
            wordSpan.appendChild(spaceSpan);
        }
        
        textDisplay.appendChild(wordSpan);
    });
    
    // Highlight first word
    textDisplay.firstChild.classList.add('current');
}

// Handle typing input
function handleTyping() {
    const inputValue = typingInput.value;
    const currentWord = words[wordIndex];
    const typedChar = inputValue.charAt(inputValue.length - 1);
    
    // Start timer on first character typed
    if (!isTyping && inputValue.length > 0) {
        isTyping = true;
        startTimer();
    }
    
    // Check if space was typed (word completed)
    if (typedChar === ' ' || inputValue.endsWith(' ')) {
        // Check word correctness
        const wordToCheck = inputValue.trim();
        const currentWordElement = textDisplay.children[wordIndex];
        
        if (wordToCheck === currentWord) {
            currentWordElement.classList.add('correct');
            correctChars += currentWord.length + 1; // +1 for space
        } else {
            currentWordElement.classList.add('incorrect');
            // Count mistakes in the word
            const minLength = Math.min(wordToCheck.length, currentWord.length);
            for (let i = 0; i < minLength; i++) {
                if (wordToCheck[i] !== currentWord[i]) {
                    mistakes++;
                }
            }
            // Count extra or missing characters as mistakes
            mistakes += Math.abs(wordToCheck.length - currentWord.length);
            
            correctChars += minLength - mistakes + 1; // +1 for space
        }
        
        // Record typing history for this word
        typingHistory.push({
            word: currentWord,
            typed: wordToCheck,
            correct: wordToCheck === currentWord,
            time: new Date() - startTime
        });
        
        // Move to next word
        wordIndex++;
        charIndex = 0;
        typingInput.value = '';
        
        // Highlight next word if available
        if (wordIndex < words.length) {
            currentWordElement.classList.remove('current');
            textDisplay.children[wordIndex].classList.add('current');
            
            // Scroll text display if needed
            const nextWordTop = textDisplay.children[wordIndex].offsetTop;
            const textDisplayHeight = textDisplay.offsetHeight;
            if (nextWordTop > textDisplayHeight / 2) {
                textDisplay.scrollTop = nextWordTop - textDisplayHeight / 3;
            }
        } else {
            // End test if all words completed
            endTest();
        }
    } else {
        // Character typing (not space)
        const currentWordElement = textDisplay.children[wordIndex];
        const chars = currentWordElement.querySelectorAll('.char');
        
        // Reset all character styling
        chars.forEach((char, idx) => {
            if (idx < inputValue.length) {
                const typedChar = inputValue[idx];
                const correctChar = char.textContent;
                
                if (typedChar === correctChar) {
                    char.classList.add('correct');
                    char.classList.remove('incorrect');
                } else {
                    char.classList.add('incorrect');
                    char.classList.remove('correct');
                }
            } else {
                char.classList.remove('correct', 'incorrect');
            }
        });
    }
    
    // Update stats
    updateStats();
}

// Start timer
function startTimer() {
    startTime = new Date();
    timer = setInterval(() => {
        const elapsedTime = Math.floor((new Date() - startTime) / 1000);
        const remainingTime = timeLeft - elapsedTime;
        
        if (remainingTime <= 0) {
            endTest();
        } else {
            timeElement.textContent = `${remainingTime}s`;
            
            // Update progress bar if it exists
            const progressBar = document.getElementById('progress-bar');
            if (progressBar) {
                const percentage = (elapsedTime / timeLeft) * 100;
                progressBar.style.width = `${percentage}%`;
            }
        }
    }, 1000);
}

// Set time
function setTime(seconds) {
    timeLeft = seconds;
    timeElement.textContent = `${seconds}s`;
}

// Update statistics
function updateStats() {
    if (!isTyping) return;
    
    const elapsedTime = (new Date() - startTime) / 1000 / 60; // in minutes
    const totalChars = correctChars;
    const wpm = Math.round((totalChars / 5) / elapsedTime) || 0; // 5 chars = 1 word
    
    const totalTyped = correctChars + mistakes;
    const accuracy = totalTyped > 0 ? Math.floor((correctChars / totalTyped) * 100) : 100;
    
    wpmElement.textContent = wpm;
    accuracyElement.textContent = `${accuracy}%`;
    
    // Update raw WPM if element exists
    const rawWpmElement = document.getElementById('raw-wpm');
    if (rawWpmElement) {
        const rawWpm = Math.round((totalTyped / 5) / elapsedTime) || 0;
        rawWpmElement.textContent = rawWpm;
    }
}

// End test
function endTest() {
    clearInterval(timer);
    isTyping = false;
    typingInput.blur();
    
    // Calculate final stats
    const elapsedTime = ((new Date() - startTime) / 1000 / 60) || 0.001; // in minutes
    const wpm = Math.round((correctChars / 5) / elapsedTime) || 0;
    
    const totalTyped = correctChars + mistakes;
    const accuracy = totalTyped > 0 ? Math.floor((correctChars / totalTyped) * 100) : 100;
    
    // Update result screen
    resultWpm.textContent = wpm;
    resultAccuracy.textContent = `${accuracy}%`;
    resultCharacters.textContent = `${correctChars}/${totalTyped}`;
    
    // Show result screen
    textDisplay.style.display = 'none';
    resultScreen.style.display = 'block';
    
    // Check if this is a new personal best
    if (wpm > personalBest.wpm || (wpm === personalBest.wpm && accuracy > personalBest.accuracy)) {
        personalBest = { wpm, accuracy };
        localStorage.setItem('personalBest', JSON.stringify(personalBest));
        
        // Show personal best notification if element exists
        const personalBestNotification = document.getElementById('personal-best-notification');
        if (personalBestNotification) {
            personalBestNotification.style.display = 'block';
            setTimeout(() => {
                personalBestNotification.style.display = 'none';
            }, 3000);
        }
        
        updatePersonalBest();
    }
    
    // Generate and display typing heatmap if element exists
    const heatmapElement = document.getElementById('typing-heatmap');
    if (heatmapElement) {
        generateHeatmap(heatmapElement);
    }
}

// Generate typing heatmap
function generateHeatmap(element) {
    element.innerHTML = '';
    
    // Create a simple visualization of typing performance
    typingHistory.forEach(entry => {
        const wordElement = document.createElement('div');
        wordElement.classList.add('heatmap-word');
        wordElement.classList.add(entry.correct ? 'correct' : 'incorrect');
        
        // Calculate speed for this word (characters per second)
        const speed = (entry.word.length / (entry.time / 1000)).toFixed(1);
        
        wordElement.setAttribute('data-word', entry.word);
        wordElement.setAttribute('data-typed', entry.typed);
        wordElement.setAttribute('data-speed', `${speed} c/s`);
        
        element.appendChild(wordElement);
    });
}

// Update personal best display
function updatePersonalBest() {
    const personalBestElement = document.getElementById('personal-best');
    if (personalBestElement) {
        personalBestElement.textContent = `${personalBest.wpm} WPM / ${personalBest.accuracy}%`;
    }
}

// Reset test
function resetTest() {
    // Reset variables
    clearInterval(timer);
    isTyping = false;
    wordIndex = 0;
    charIndex = 0;
    mistakes = 0;
    correctChars = 0;
    typingInput.value = '';
    typingHistory = [];
    
    // Reset UI
    timeElement.textContent = `${timeLeft}s`;
    wpmElement.textContent = '0';
    accuracyElement.textContent = '0%';
    resultScreen.style.display = 'none';
    textDisplay.style.display = 'block';
    textDisplay.scrollTop = 0;
    
    // Reset progress bar if it exists
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = '0%';
    }
    
    // Load new text
    loadNewText();
    
    // Focus input
    typingInput.focus();
}

// Toggle theme
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    
    // Update icon
    if (document.body.classList.contains('light-theme')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Save theme preference
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    init();
}); 