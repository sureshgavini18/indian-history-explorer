/**
 * INDIAN HISTORY EXPLORER - MAIN JAVASCRIPT
 * Interactive features for educational website
 */

// ============================================
// GLOBAL VARIABLES AND INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavbar();
  initHeroSlider();
  initScrollAnimations();
  initSearch();
  initRandomFacts();
  initQuiz();
  initChatbot();
  initMap();
  initMobileMenu();
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ============================================
// MOBILE MENU
// ============================================

function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuBtn.innerHTML = '☰';
    });
  });
}

// ============================================
// HERO SLIDER
// ============================================

function initHeroSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.querySelector('.slider-arrow.prev');
  const nextBtn = document.querySelector('.slider-arrow.next');
  
  if (slides.length === 0) return;

  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(slideInterval);
  }

  // Event listeners
  if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoSlide(); prevSlide(); startAutoSlide(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoSlide(); nextSlide(); startAutoSlide(); });
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => { stopAutoSlide(); showSlide(index); startAutoSlide(); });
  });

  // Start auto-slide
  startAutoSlide();
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  if (animatedElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => observer.observe(el));
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

function initSearch() {
  const searchBox = document.querySelector('.search-box');
  const searchBtn = document.querySelector('.search-btn');
  
  if (!searchBox) return;

  const historicalData = {
    'mahatma gandhi': 'fighters.html#gandhi',
    'gandhi': 'fighters.html#gandhi',
    'bhagat singh': 'fighters.html#bhagat',
    'subhas chandra bose': 'fighters.html#bose',
    'netaji': 'fighters.html#bose',
    'rani lakshmi bai': 'fighters.html#rani',
    'jhansi': 'fighters.html#rani',
    'shivaji': 'kings.html#shivaji',
    'shivaji maharaj': 'kings.html#shivaji',
    'ashoka': 'kings.html#ashoka',
    'krishnadevaraya': 'kings.html#krishna',
    'raja raja chola': 'kings.html#chola',
    'timeline': 'timeline.html',
    'dynasties': 'dynasties.html',
    'maurya': 'dynasties.html#maurya',
    'gupta': 'dynasties.html#gupta',
    'mughal': 'dynasties.html#mughal',
    'maratha': 'dynasties.html#maratha',
    'monuments': 'monuments.html',
    'taj mahal': 'monuments.html#taj',
    'red fort': 'monuments.html#redfort',
    'qutub minar': 'monuments.html#qutub',
    'quiz': 'quiz.html',
    'chatbot': 'chatbot.html',
    'map': 'map.html'
  };

  function performSearch() {
    const query = searchBox.value.toLowerCase().trim();
    if (!query) return;

    for (const [key, url] of Object.entries(historicalData)) {
      if (query.includes(key)) {
        window.location.href = url;
        return;
      }
    }

    alert('No results found. Try searching for: Gandhi, Shivaji, Taj Mahal, Timeline, etc.');
  }

  if (searchBtn) searchBtn.addEventListener('click', performSearch);
  searchBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
  });
}

// ============================================
// RANDOM FACTS
// ============================================

const historyFacts = [
  "The Indus Valley Civilization (3300–1300 BCE) was one of the world's oldest urban civilizations.",
  "The number zero (0) was invented in India by mathematician Aryabhata.",
  "Chess originated in India during the Gupta Empire, originally called 'Chaturanga'.",
  "The world's first university, Takshashila, was established in India around 700 BCE.",
  "India has never invaded any country in her last 100,000 years of history.",
  "The value of pi (π) was first calculated by Indian mathematician Baudhayana.",
  "Ayurveda, the earliest school of medicine known to humans, originated in India.",
  "The art of navigation was born in the river Sindh 6,000 years ago.",
  "The Brihadeeswara Temple in Tamil Nadu has a vimana that never casts a shadow at noon.",
  "The world's largest democracy, India has over 1.4 billion people.",
  "Sanskrit is considered the mother of all European languages.",
  "The Iron Pillar of Delhi has stood for over 1,600 years without rusting.",
  "India was the richest country on earth until the 17th century.",
  "The game of snakes and ladders originated in India as 'Moksha Patamu'.",
  "The world's largest postal network, India has over 150,000 post offices."
];

function initRandomFacts() {
  const factText = document.querySelector('.fact-text');
  const factBtn = document.querySelector('.fact-btn');
  
  if (!factText) return;

  function showRandomFact() {
    const randomIndex = Math.floor(Math.random() * historyFacts.length);
    factText.style.opacity = '0';
    setTimeout(() => {
      factText.textContent = historyFacts[randomIndex];
      factText.style.opacity = '1';
    }, 300);
  }

  // Show initial fact
  showRandomFact();

  if (factBtn) {
    factBtn.addEventListener('click', showRandomFact);
  }
}

// ============================================
// QUIZ FUNCTIONALITY
// ============================================

const quizQuestions = [
  {
    question: "Who is known as the 'Father of the Nation' in India?",
    options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Subhas Chandra Bose", "Sardar Patel"],
    correct: 1
  },
  {
    question: "In which year did India gain independence from British rule?",
    options: ["1945", "1946", "1947", "1948"],
    correct: 2
  },
  {
    question: "Who was the first Emperor of the Maurya Dynasty?",
    options: ["Ashoka", "Chandragupta Maurya", "Bindusara", "Brihadratha"],
    correct: 1
  },
  {
    question: "Which monument was built by Shah Jahan in memory of his wife?",
    options: ["Red Fort", "Qutub Minar", "Taj Mahal", "Fatehpur Sikri"],
    correct: 2
  },
  {
    question: "Who was the founder of the Maratha Empire?",
    options: ["Shivaji Maharaj", "Baji Rao I", "Balaji Vishwanath", "Sambhaji"],
    correct: 0
  },
  {
    question: "The Battle of Plassey was fought in which year?",
    options: ["1755", "1756", "1757", "1758"],
    correct: 2
  },
  {
    question: "Who was known as the 'Napoleon of India'?",
    options: ["Samudragupta", "Chandragupta II", "Kumaragupta", "Skandagupta"],
    correct: 0
  },
  {
    question: "Which dynasty built the Brihadeeswara Temple?",
    options: ["Pallava", "Chola", "Pandya", "Chera"],
    correct: 1
  },
  {
    question: "Who wrote the Arthashastra?",
    options: ["Panini", "Kautilya (Chanakya)", "Kalidasa", "Vishnu Sharma"],
    correct: 1
  },
  {
    question: "The First War of Indian Independence is also known as?",
    options: ["Revolt of 1857", "Sepoy Mutiny", "Both A and B", "None of these"],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;
let quizAnswered = false;

function initQuiz() {
  const quizContainer = document.querySelector('.quiz-container');
  if (!quizContainer) return;

  loadQuestion();
}

function loadQuestion() {
  const questionBox = document.querySelector('.question-box');
  const optionsGrid = document.querySelector('.options-grid');
  const progressFill = document.querySelector('.progress-fill');
  const scoreDisplay = document.querySelector('.score-display');

  if (!questionBox) return;

  quizAnswered = false;

  // Update progress
  if (progressFill) {
    progressFill.style.width = `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;
  }

  if (scoreDisplay) {
    scoreDisplay.textContent = `Score: ${score}/${quizQuestions.length}`;
  }

  // Load question
  const q = quizQuestions[currentQuestion];
  questionBox.innerHTML = `
    <div class="question-number">Question ${currentQuestion + 1} of ${quizQuestions.length}</div>
    <div class="question-text">${q.question}</div>
  `;

  // Load options
  if (optionsGrid) {
    optionsGrid.innerHTML = q.options.map((opt, i) => `
      <button class="option-btn" onclick="selectOption(${i})">${opt}</button>
    `).join('');
  }
}

function selectOption(index) {
  if (quizAnswered) return;
  quizAnswered = true;

  const options = document.querySelectorAll('.option-btn');
  const q = quizQuestions[currentQuestion];

  options.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) {
      btn.classList.add('correct');
    } else if (i === index && i !== q.correct) {
      btn.classList.add('wrong');
    }
  });

  if (index === q.correct) {
    score++;
  }

  // Next question delay
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
      loadQuestion();
    } else {
      showQuizResult();
    }
  }, 1500);
}

function showQuizResult() {
  const quizContainer = document.querySelector('.quiz-container');
  if (!quizContainer) return;

  let message = '';
  let icon = '';

  if (score >= 8) {
    message = 'Excellent! You are a true history scholar! 🇮🇳';
    icon = '🏆';
  } else if (score >= 5) {
    message = 'Good job! You know your Indian history well! 👏';
    icon = '🌟';
  } else {
    message = 'Keep learning! Indian history has so much to offer! 📚';
    icon = '💪';
  }

  quizContainer.innerHTML = `
    <div class="quiz-result">
      <div class="result-icon">${icon}</div>
      <div class="result-score">${score}/${quizQuestions.length}</div>
      <div class="result-message">${message}</div>
      <button class="btn btn-primary" onclick="restartQuiz()">Try Again</button>
    </div>
  `;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  window.location.reload();
}

// ============================================
// CHATBOT FUNCTIONALITY
// ============================================

const chatbotResponses = {
  'shivaji': 'Shivaji Maharaj (1630–1680) was the founder of the Maratha Empire. He was crowned Chhatrapati in 1674 at Raigad Fort. Known for his guerrilla warfare tactics and strong navy, he established a competent and progressive civil rule.',
  'shivaji maharaj': 'Shivaji Maharaj (1630–1680) was the founder of the Maratha Empire. He was crowned Chhatrapati in 1674 at Raigad Fort. Known for his guerrilla warfare tactics and strong navy, he established a competent and progressive civil rule.',
  'gandhi': 'Mahatma Gandhi (1869–1948) was the leader of India\'s non-violent independence movement against British rule. Known for his philosophy of Satyagraha (truth and non-violence), he led major campaigns like the Salt March and Quit India Movement.',
  'mahatma gandhi': 'Mahatma Gandhi (1869–1948) was the leader of India\'s non-violent independence movement against British rule. Known for his philosophy of Satyagraha (truth and non-violence), he led major campaigns like the Salt March and Quit India Movement.',
  'independence': 'India gained independence from British rule on August 15, 1947. The independence movement was led by various freedom fighters including Mahatma Gandhi, Jawaharlal Nehru, Sardar Patel, and many others.',
  '1947': 'India gained independence from British rule on August 15, 1947. The independence movement was led by various freedom fighters including Mahatma Gandhi, Jawaharlal Nehru, Sardar Patel, and many others.',
  'bhagat singh': 'Bhagat Singh (1907–1931) was a revolutionary freedom fighter who fought against British colonial rule. He was executed at the age of 23 for his involvement in the Lahore Conspiracy Case. He remains a symbol of courage and patriotism.',
  'bose': 'Subhas Chandra Bose (1897–1945), also known as Netaji, was a prominent freedom fighter who formed the Azad Hind Fauj (Indian National Army) to fight British rule. His famous slogan was "Give me blood, and I shall give you freedom!"',
  'subhas chandra bose': 'Subhas Chandra Bose (1897–1945), also known as Netaji, was a prominent freedom fighter who formed the Azad Hind Fauj (Indian National Army) to fight British rule. His famous slogan was "Give me blood, and I shall give you freedom!"',
  'rani lakshmi bai': 'Rani Lakshmi Bai (1828–1858) was the queen of Jhansi and a leading figure in the Revolt of 1857. She fought bravely against British forces and became a symbol of resistance and courage.',
  'jhansi': 'Rani Lakshmi Bai (1828–1858) was the queen of Jhansi and a leading figure in the Revolt of 1857. She fought bravely against British forces and became a symbol of resistance and courage.',
  'ashoka': 'Ashoka the Great (304–232 BCE) was the third Mauryan Emperor. After the brutal Kalinga War, he converted to Buddhism and dedicated his life to spreading peace and dharma. His edicts are found across the Indian subcontinent.',
  'taj mahal': 'The Taj Mahal is an ivory-white marble mausoleum in Agra, built by Mughal Emperor Shah Jahan in memory of his wife Mumtaz Mahal. Completed in 1653, it is considered one of the Seven Wonders of the World.',
  'maurya': 'The Maurya Empire (322–185 BCE) was the first pan-Indian empire, founded by Chandragupta Maurya. It reached its peak under Ashoka the Great, covering most of the Indian subcontinent.',
  'mughal': 'The Mughal Empire (1526–1857) was founded by Babur. It reached its zenith under Akbar the Great. The empire is known for its architectural marvels like the Taj Mahal and Red Fort.',
  'gupta': 'The Gupta Empire (320–550 CE) is often called India\'s Golden Age. It saw remarkable achievements in arts, science, literature, and mathematics under rulers like Chandragupta I and Samudragupta.',
  'chola': 'The Chola Dynasty was one of the longest-ruling dynasties in South India. Under Raja Raja Chola I and Rajendra Chola I, the empire became a major naval and economic power.',
  'hello': 'Namaste! 🙏 Welcome to Indian History Explorer. I can answer questions about Indian history, freedom fighters, kings, dynasties, and monuments. What would you like to know?',
  'hi': 'Namaste! 🙏 Welcome to Indian History Explorer. I can answer questions about Indian history, freedom fighters, kings, dynasties, and monuments. What would you like to know?',
  'help': 'I can help you with information about: Freedom Fighters (Gandhi, Bhagat Singh, Bose, Rani Lakshmi Bai), Kings (Shivaji, Ashoka, Krishnadevaraya), Dynasties (Maurya, Gupta, Mughal, Chola), Monuments (Taj Mahal, Red Fort), and more!'
};

function initChatbot() {
  const chatInput = document.querySelector('.chat-input');
  const sendBtn = document.querySelector('.chat-send-btn');
  const chatMessages = document.querySelector('.chat-messages');
  const quickQuestions = document.querySelectorAll('.quick-question');

  if (!chatInput || !chatMessages) return;

  // Add welcome message
  addBotMessage('Namaste! 🙏 Welcome to Indian History Explorer. I can answer questions about Indian history, freedom fighters, kings, dynasties, and monuments. What would you like to know?');

  function addUserMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'message user';
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function addBotMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'message bot';
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function getBotResponse(input) {
    const lowerInput = input.toLowerCase();
    
    for (const [key, response] of Object.entries(chatbotResponses)) {
      if (lowerInput.includes(key)) {
        return response;
      }
    }

    return "I'm sorry, I don't have information about that yet. Try asking about: Shivaji Maharaj, Mahatma Gandhi, Taj Mahal, Indian independence, or type 'help' for more options.";
  }

  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    addUserMessage(text);
    chatInput.value = '';

    // Simulate typing delay
    setTimeout(() => {
      const response = getBotResponse(text);
      addBotMessage(response);
    }, 500);
  }

  if (sendBtn) sendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  // Quick questions
  quickQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      chatInput.value = btn.textContent;
      sendMessage();
    });
  });
}

// ============================================
// INTERACTIVE MAP
// ============================================

const stateInfo = {
  'maharashtra': {
    name: 'Maharashtra',
    history: 'Home to the Maratha Empire founded by Shivaji Maharaj. Mumbai, the financial capital, was formed by merging seven islands. The state has ancient caves like Ajanta and Ellora.',
    capital: 'Mumbai'
  },
  'rajasthan': {
    name: 'Rajasthan',
    history: 'Land of Rajputs known for their valor. Home to magnificent forts and palaces. The region saw many battles against Mughal invaders.',
    capital: 'Jaipur'
  },
  'uttar pradesh': {
    name: 'Uttar Pradesh',
    history: 'Heart of ancient India with cities like Varanasi (world\'s oldest living city) and Ayodhya. The Mughal capital was Agra, home to the Taj Mahal.',
    capital: 'Lucknow'
  },
  'tamil nadu': {
    name: 'Tamil Nadu',
    history: 'Home to ancient Dravidian culture and powerful dynasties like Chola, Pandya, and Pallava. Known for magnificent temples like Brihadeeswara.',
    capital: 'Chennai'
  },
  'karnataka': {
    name: 'Karnataka',
    history: 'Home to the Vijayanagara Empire (Hampi) and Mysore Kingdom. Known for its rich heritage in art, architecture, and literature.',
    capital: 'Bengaluru'
  },
  'gujarat': {
    name: 'Gujarat',
    history: 'Birthplace of Mahatma Gandhi. Ancient trade center with the Indus Valley site of Lothal. Home to the Somnath Temple.',
    capital: 'Gandhinagar'
  },
  'west bengal': {
    name: 'West Bengal',
    history: 'Former capital of British India (Calcutta). Center of Bengal Renaissance and Indian independence movement.',
    capital: 'Kolkata'
  },
  'punjab': {
    name: 'Punjab',
    history: 'Land of five rivers. Center of Sikhism with the Golden Temple. Site of Jallianwala Bagh massacre.',
    capital: 'Chandigarh'
  },
  'kerala': {
    name: 'Kerala',
    history: 'Spice trade center that attracted traders from Rome, Arabia, and China. Home to ancient port Muziris.',
    capital: 'Thiruvananthapuram'
  },
  'bihar': {
    name: 'Bihar',
    history: 'Ancient Magadha empire. Birthplace of Buddhism (Bodh Gaya) and Jainism. Nalanda was the world\'s first residential university.',
    capital: 'Patna'
  },
  'delhi': {
    name: 'Delhi',
    history: 'Capital of multiple empires and modern India. Home to Red Fort, Qutub Minar, and India Gate.',
    capital: 'New Delhi'
  },
  'madhya pradesh': {
    name: 'Madhya Pradesh',
    history: 'Heart of India with ancient sites like Khajuraho and Sanchi Stupa. Home to diverse dynasties.',
    capital: 'Bhopal'
  }
};

function initMap() {
  const mapRegions = document.querySelectorAll('.map-region');
  const mapInfoTitle = document.querySelector('.map-info-title');
  const mapInfoContent = document.querySelector('.map-info-content');

  if (mapRegions.length === 0) return;

  mapRegions.forEach(region => {
    region.addEventListener('click', () => {
      const stateKey = region.getAttribute('data-state');
      const info = stateInfo[stateKey];

      if (info && mapInfoTitle && mapInfoContent) {
        mapInfoTitle.textContent = info.name;
        mapInfoContent.innerHTML = `
          <p><strong>Capital:</strong> ${info.capital}</p>
          <p>${info.history}</p>
        `;
      }

      // Highlight selected region
      mapRegions.forEach(r => r.style.fill = '');
      region.style.fill = '#FF9933';
    });
  });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Card click handler for detail pages
function openDetailPage(type, id) {
  // Store the selected item in sessionStorage
  sessionStorage.setItem('selectedItem', JSON.stringify({ type, id }));
  window.location.href = `${type}.html#${id}`;
}

// Preloader (if exists)
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    preloader.classList.add('hidden');
  }
});
