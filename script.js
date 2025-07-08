document.addEventListener("DOMContentLoaded", function() {
  // === Handle "Get Started" Button Animation & Navigation ===
  const getStartedBtn = document.querySelector('.cta-button');
  const heroSection = document.querySelector('.hero');
  const mainContent = document.querySelector('.main-content');
  
  getStartedBtn.addEventListener("click", function(e) {
    e.preventDefault();
    // Disable scrolling during the hero exit animation
    document.body.classList.add("no-scroll");
    // Trigger exit animation on hero section
    heroSection.classList.add("hero-exit");
    // When animation ends, hide the hero and display main content,
    // then re-enable scrolling so that the page items are accessible.
    heroSection.addEventListener("animationend", function handleAnimation() {
      heroSection.style.display = "none";
      mainContent.classList.remove("hidden");
      document.body.classList.remove("no-scroll");
      heroSection.removeEventListener("animationend", handleAnimation);
    });
  });

  // === Navbar Smooth Scroll (for in-page navigation) ===
  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetID = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetID);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // === Chatbot (Selection-based) ===
  const chatHeader = document.querySelector(".chat-header");
  const chatBody = document.querySelector(".chat-body");
  const chatResponse = document.getElementById("chat-response");
  const chatOptionsContainer = document.getElementById("chat-options");

  // Toggle the chatbot on header click or pressing Enter
  chatHeader.addEventListener("click", toggleChat);
  chatHeader.addEventListener("keypress", (e) => {
    if (e.key === "Enter") toggleChat();
  });
  function toggleChat() {
    chatBody.classList.toggle("hidden");
    // When opening, populate preset options if not already added
    if (!chatBody.classList.contains("hidden") && chatOptionsContainer.children.length === 0) {
      populateChatOptions();
    }
  }

  // Pre-defined chat options array
  const chatOptions = [
    { query: "access", text: "How do I access LinkedIn Learning?" },
    { query: "free", text: "Is it free for students?" },
    { query: "email", text: "How do I sign in with my university email?" },
    { query: "certificate", text: "Do I get a certificate upon completion?" },
    { query: "support", text: "Need help or support?" }
  ];

  // Function to determine bot reply
  function getBotReply(query) {
    let reply = "Sorry, I didn’t understand that.";
    if (query.includes("access")) reply = "To access LinkedIn Learning, go to your university portal.";
    else if (query.includes("free")) reply = "Yes! It's free for enrolled students.";
    else if (query.includes("email")) reply = "Use your university email to sign in.";
    else if (query.includes("certificate")) reply = "Yes! You get certificates upon completion.";
    else if (query.includes("support")) reply = "Try contacting support via the contact form below.";
    return reply;
  }

  // Append new message to the chat conversation
  function appendMessage(sender, message) {
    const p = document.createElement("p");
    p.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatResponse.appendChild(p);
    chatResponse.scrollTop = chatResponse.scrollHeight;
  }

  // Populate chatbot with preset buttons
  function populateChatOptions() {
    chatOptions.forEach(option => {
      const button = document.createElement("button");
      button.className = "chat-option-btn";
      button.innerText = option.text;
      button.addEventListener("click", () => {
        // Append user's selection
        appendMessage("You", option.text);
        // Clear options to avoid duplicate responses
        chatOptionsContainer.innerHTML = "";
        // Delay bot reply for realism
        setTimeout(() => {
          const botReply = getBotReply(option.query);
          appendMessage("Bot", botReply);
        }, 500);
      });
      chatOptionsContainer.appendChild(button);
    });
  }

  // === Multi-language Support ===
  const translations = {
    en: {
      welcome: "Welcome to LinkedIn Learning 🎓",
      subtext: "Your ultimate guide to accessing LinkedIn Learning with your university portal. Unlock the power of upskilling today!",
      getStarted: "Get Started",
      howToAccess: "How to Access LinkedIn Learning",
      startGuide: "Start Guide",
      step1: "Step 1", step1Text: "Login to your university portal.",
      step2: "Step 2", step2Text: "Find LinkedIn Learning under resources.",
      step3: "Step 3", step3Text: "Authenticate with your university email.",
      step4: "Step 4", step4Text: "Start learning and upskill today!",
      tools: "Tools You Can Learn",
      contactBtn: "📬 Contact Me",
      feedbackBtn: "📝 Feedback",
      faq1q: "💼 Do I need a LinkedIn account?",
      faq1a: "Yes, linked to your university email.",
      faq2q: "🎓 Is it free?",
      faq2a: "Yes, access is free while you're a student.",
      contact: "Contact Me",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send",
      formNote: "✅ We’ll get back to you soon!",
      feedback: "Feedback",
      feedbackLabel: "Your Feedback",
      submit: "Submit",
      thanks: "🙏 Thanks for your feedback!"
    },
    hi: {
      welcome: "LinkedIn Learning में आपका स्वागत है 🎓",
      subtext: "अपने विश्वविद्यालय पोर्टल के माध्यम से LinkedIn Learning तक पहुंच का आपका अंतिम गाइड। आज ही अपस्किलिंग का लाभ उठाएं!",
      getStarted: "शुरू करें",
      howToAccess: "LinkedIn Learning कैसे एक्सेस करें",
      startGuide: "गाइड शुरू करें",
      step1: "चरण 1", step1Text: "अपने विश्वविद्यालय पोर्टल में लॉगिन करें।",
      step2: "चरण 2", step2Text: "स्टूडेंट रिसोर्सेस में LinkedIn Learning खोजें।",
      step3: "चरण 3", step3Text: "अपने विश्वविद्यालय ईमेल से लॉगिन करें।",
      step4: "चरण 4", step4Text: "सीखना शुरू करें!",
      tools: "आप क्या सीख सकते हैं",
      contactBtn: "📬 संपर्क करें",
      feedbackBtn: "📝 प्रतिक्रिया",
      faq1q: "💼 क्या LinkedIn अकाउंट ज़रूरी है?",
      faq1a: "हाँ, आपके यूनिवर्सिटी ईमेल से लिंक होना चाहिए।",
      faq2q: "🎓 क्या यह फ्री है?",
      faq2a: "हाँ, जब तक आप छात्र हैं, यह फ्री है।",
      contact: "संपर्क करें",
      name: "नाम",
      email: "ईमेल",
      message: "संदेश",
      send: "भेजें",
      formNote: "✅ हम जल्द ही आपसे संपर्क करेंगे!",
      feedback: "प्रतिक्रिया",
      feedbackLabel: "अपनी प्रतिक्रिया दें",
      submit: "सबमिट करें",
      thanks: "🙏 आपकी प्रतिक्रिया के लिए धन्यवाद!"
    }
  };

  function setLanguage(lang) {
    document.querySelectorAll("[data-key]").forEach(el => {
      const key = el.getAttribute("data-key");
      if (translations[lang] && translations[lang][key]) {
        el.innerText = translations[lang][key];
      }
    });
  }

  document.getElementById("btn-en").addEventListener("click", () => setLanguage("en"));
  document.getElementById("btn-hi").addEventListener("click", () => setLanguage("hi"));

  // === Step Guide Toggle ===
  let guideOpen = false;
  const guideToggleBtn = document.getElementById("guide-toggle-btn");
  guideToggleBtn.addEventListener("click", function() {
    const steps = document.querySelectorAll(".step-card");
    if (!guideOpen) {
      guideOpen = true;
      guideToggleBtn.innerText = "Close Guide";
      steps.forEach(card => card.classList.add("hidden"));
      document.getElementById("step1").classList.remove("hidden");
    } else {
      steps.forEach(card => card.classList.add("hidden"));
      guideToggleBtn.innerText = "Start Guide";
      guideOpen = false;
    }
  });

  document.querySelectorAll(".step-next").forEach(button => {
    button.addEventListener("click", function() {
      const nextStep = this.getAttribute("data-next-step");
      document.querySelectorAll(".step-card").forEach(card => card.classList.add("hidden"));
      const nextCard = document.getElementById("step" + nextStep);
      if (nextCard) {
        nextCard.classList.remove("hidden");
      }
    });
  });

  // === Tool Cards Popup ===
  const toolIcons = {
    "Excel": "https://img.icons8.com/color/240/microsoft-excel-2019.png",
    "Advanced Excel": "https://img.icons8.com/fluency/240/spreadsheet.png",
    "Power BI": "https://img.icons8.com/color/240/power-bi.png",
    "Stata": "https://upload.wikimedia.org/wikipedia/commons/2/2a/Stata_logo.svg"
  };

  const toolLinks = {
    "Excel": [
      ["Essential Training", "https://www.linkedin.com/learning/excel-essential-training-microsoft-365-2022"],
      ["Formulas & Tips", "https://www.linkedin.com/learning/excel-formulas-and-functions-quick-tips-22664242"],
      ["Formatting Intro", "https://www.linkedin.com/learning/excel-introduction-to-formatting-22826330"],
      ["Productivity Tips", "https://www.linkedin.com/learning/excel-productivity-tips"],
      ["Advanced Formulas", "https://www.linkedin.com/learning/excel-advanced-formulas-and-functions-22037565"],
      ["Excel for Projects", "https://www.linkedin.com/learning/excel-for-project-management"]
    ],
    "Advanced Excel": [
      ["Advanced Formulas", "https://www.linkedin.com/learning/excel-advanced-formulas-and-functions-22037565"],
      ["Analytics Skills", "https://www.linkedin.com/learning/paths/master-advanced-excel-data-analytics-skills"],
      ["Excel for Engineers", "https://www.linkedin.com/learning/excel-for-engineering-professionals"],
      ["Macros & VBA", "https://www.linkedin.com/learning/excel-introduction-to-macros-and-vba"],
      ["Power Query", "https://www.linkedin.com/learning/excel-power-query-for-beginners-25101020"],
      ["VBA Beginners", "https://www.linkedin.com/learning/excel-macros-and-vba-for-beginners-24503401"]
    ],
    "Power BI": [
      ["Essential Training", "https://www.linkedin.com/learning/power-bi-essential-training-17362720"],
      ["Getting Started", "https://www.linkedin.com/learning/getting-started-with-power-bi-24648076"],
      ["Dashboards", "https://www.linkedin.com/learning/power-bi-dashboards-for-beginners-24050067"],
      ["With ChatGPT", "https://www.linkedin.com/learning/power-bi-working-together-with-chatgpt"],
      ["Data Methods", "https://www.linkedin.com/learning/power-bi-data-methods"],
      ["Dataflows", "https://www.linkedin.com/learning/power-bi-dataflows-essential-training"]
    ],
    "Stata": [
      ["Stats with Stata", "https://www.linkedin.com/learning/advanced-and-specialized-statistics-with-stata"],
      ["Economic Modeling", "https://www.linkedin.com/learning/data-economic-modeling-and-forecasting-with-stata"],
      ["Trading Models", "https://www.linkedin.com/learning/algorithmic-trading-and-finance-models-with-python-r-and-stata-essential-training-24504280"],
      ["Data Management", "https://www.linkedin.com/learning/advanced-and-specialized-statistics-with-stata/challenge-more-on-data-management"],
      ["Regression Models", "https://www.linkedin.com/learning/data-economic-modeling-and-forecasting-with-stata/univariate-and-multivariate-linear-regression-models"],
      ["Econometrics", "https://www.linkedin.com/learning/data-economic-modeling-and-forecasting-with-stata/statistics-and-econometrics"]
    ]
  };

  function openPopup(tool) {
    document.getElementById("popup-title").innerText = tool;
    const container = document.getElementById("popup-links");
    container.innerHTML = "";
    if (toolLinks[tool]) {
      toolLinks[tool].forEach(pair => {
        const [title, link] = pair;
        const div = document.createElement("div");
        div.className = "video-thumb";
        div.innerHTML = `
          <a href="${link}" target="_blank">
            <img src="${toolIcons[tool]}" alt="${tool} icon"/>
            <span>${title}</span>
          </a>
        `;
        container.appendChild(div);
      });
    }
    document.getElementById("popup-overlay").classList.remove("hidden");
  }

  document.querySelectorAll(".tool-card").forEach(card => {
    card.addEventListener("click", function() {
      const tool = this.getAttribute("data-tool");
      openPopup(tool);
    });
    card.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        const tool = this.getAttribute("data-tool");
        openPopup(tool);
      }
    });
  });

  document.getElementById("popup-close-btn").addEventListener("click", closePopup);
  function closePopup() {
    document.getElementById("popup-overlay").classList.add("hidden");
    document.getElementById("popup-links").innerHTML = "";
  }

  // === FAQ Toggle ===
  document.querySelectorAll(".faq-btn").forEach(button => {
    button.addEventListener("click", function() {
      const faqNum = this.getAttribute("data-faq");
      const el = document.getElementById("faq" + faqNum);
      el.style.display = el.style.display === "block" ? "none" : "block";
    });
  });

  document.getElementById("explore-link-btn").addEventListener("click", function() {
    window.open("https://www.linkedin.com/learning/how-to-use-linkedin-learning/browse-recommended-content-14574593?u=67552986", "_blank");
  });

  // === Contact Modal ===
  const contactOverlay = document.getElementById("contact-overlay");
  document.getElementById("contact-launch-btn").addEventListener("click", () => contactOverlay.classList.remove("hidden"));
  document.getElementById("contact-close-btn").addEventListener("click", () => contactOverlay.classList.add("hidden"));

  document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const form = this;
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(res => {
      if (res.ok) {
        alert("✅ Your message has been sent!");
        form.reset();
        contactOverlay.classList.add("hidden");
      } else {
        alert("❌ Error sending message.");
      }
    });
  });

  // === Feedback Modal ===
  const feedbackOverlay = document.getElementById("feedback-overlay");
  document.getElementById("feedback-launch-btn").addEventListener("click", () => feedbackOverlay.classList.remove("hidden"));
  document.getElementById("feedback-close-btn").addEventListener("click", () => feedbackOverlay.classList.add("hidden"));
  document.getElementById("feedback-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const text = document.getElementById("feedback-text").value;
    if (text.trim()) {
      alert("✅ Feedback received: " + text);
      document.getElementById("feedback-text").value = "";
      feedbackOverlay.classList.add("hidden");
    }
  });

  // === Scroll Animation for Fade-up Elements ===
  const fadeElements = document.querySelectorAll('.fade-up');
  const appearOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
      }
    });
  }, { threshold: 0.1 });
  fadeElements.forEach(el => appearOnScroll.observe(el));

  // === Close Modals on Escape Key ===
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      if (!document.getElementById("popup-overlay").classList.contains("hidden")) {
        closePopup();
      }
      if (!contactOverlay.classList.contains("hidden")) {
        contactOverlay.classList.add("hidden");
      }
      if (!feedbackOverlay.classList.contains("hidden")) {
        feedbackOverlay.classList.add("hidden");
      }
    }
  });
});
//this is a changes
