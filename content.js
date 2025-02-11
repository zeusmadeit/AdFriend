// Execute as early as possible to catch script insertions
const adDomains = [
  'earbossysavvy.com',
  'google-analytics.com',
  'doubleclick.net',
  'google-analytics.com',
  'googleadservices.com',
  'googlesyndication.com',
  // Add more ad domains as needed
];

const adScriptPatterns = [
  'invoke.js',
  'ads',
  'analytics',
  'sponsor',
  'track'
];

// Create a style element to hide ad containers immediately
const hideAdsStyle = document.createElement('style');
hideAdsStyle.textContent = `
  [class*="ad"],
  [class*="Ad"],
  [class*="AD"],
  [id*="ad"],
  [id*="Ad"],
  [id*="AD"],
  [class*="sponsor"],
  [class*="Sponsor"],
  [id*="sponsor"],
  [id*="Sponsor"],
  .prop_native1,
  [id*="container-"] { 
    display: none !important; 
  }
`;
document.documentElement.appendChild(hideAdsStyle);

// Prevent ad scripts from loading
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.addedNodes.length) {
      mutation.addedNodes.forEach((node) => {
        if (node.tagName === 'SCRIPT') {
          const src = node.src.toLowerCase();
          if (adDomains.some(domain => src.includes(domain)) ||
              adScriptPatterns.some(pattern => src.includes(pattern))) {
            node.remove();
          }
        }
        
        // Handle inline script elements with ad-related content
        if (node.tagName === 'DIV' && 
            (node.className?.includes('ad') || 
             node.id?.includes('ad') ||
             node.className?.includes('prop_native') ||
             node.id?.includes('container-'))
        ) {
          replaceWithMotivationalContent(node);
        }
      });
    }
  }
});

// Start observing before DOM is fully loaded
observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});

function replaceWithMotivationalContent(adNode) {
  const widget = createMotivationalWidget();
  if (adNode.parentNode) {
    adNode.parentNode.replaceChild(widget, adNode);
  }
}

const motivationalQuotes = [
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { quote: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
  { quote: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
  { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
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

// Clean up any ads that might have slipped through
document.addEventListener('DOMContentLoaded', () => {
  const adElements = document.querySelectorAll('[class*="ad"], [id*="ad"], [class*="sponsor"], [id*="sponsor"], .prop_native1, [id*="container-"]');
  adElements.forEach(element => {
    replaceWithMotivationalContent(element);
  });
});
