const motivationalQuotes = [
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { quote: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
  { quote: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
  { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
];

const adSelectors = [
  'div[id*="google_ads"]',
  'ins.adsbygoogle',
  'div[id*="ad-"]',
  'div[class*="ad-"]',
  'div[id*="banner"]',
  'div[class*="banner"]',
  '.advertisement',
  '[class*="sponsored"]',
  '[id*="sponsored"]'
];

function createMotivationalWidget() {
  const widget = document.createElement('div');
  widget.className = 'adfriend-widget';
  
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  
  widget.innerHTML = `
    <div class="quote-content">
      <p class="quote-text">"${randomQuote.quote}"</p>
      <p class="quote-author">- ${randomQuote.author}</p>
    </div>
    <button class="refresh-quote">New Quote</button>
  `;
  
  widget.querySelector('.refresh-quote').addEventListener('click', () => {
    const newQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    widget.querySelector('.quote-text').textContent = `"${newQuote.quote}"`;
    widget.querySelector('.quote-author').textContent = `- ${newQuote.author}`;
  });
  
  return widget;
}

function replaceAds() {
  const adElements = document.querySelectorAll(adSelectors.join(','));
  
  adElements.forEach(adElement => {
    if (!adElement.classList.contains('adfriend-processed')) {
      const widget = createMotivationalWidget();
      adElement.style.display = 'none';
      adElement.parentNode.insertBefore(widget, adElement);
      adElement.classList.add('adfriend-processed');
    }
  });
}

// Initial replacement
replaceAds();

// Watch for dynamic content changes
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      replaceAds();
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
