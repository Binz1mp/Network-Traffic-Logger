const URL_PATTERNS = {
  science: {
    url: '/api/v9/science',
    type: 'loading',
    description: 'This will be shown if all Discord loading is done.'
  },
  spotify: {
    url: '/api/v9/content-inventory/users/@me/spotify',
    type: 'spotify',
    description: 'This will be shown if you are using Spotify now.'
  },
  attack: {
    url: '/api/v9/content-inventory/users/@me/attack',
    type: 'attack',
    description: 'This will be shown if you attack.'
  }
};

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.type === 'xmlhttprequest') {
      for (const [key, pattern] of Object.entries(URL_PATTERNS)) {
        if (details.url.includes(pattern.url)) {
          chrome.tabs.sendMessage(details.tabId, {
            type: `${key}_request`,
            url: details.url,
            method: details.method,
            requestBody: details.requestBody,
            patternInfo: pattern
          }, function(response) {
            if (chrome.runtime.lastError) {
              console.log('Error sending message:', chrome.runtime.lastError.message);
            }
          });
          break;  // Stop after finding the first match
        }
      }
    }
  },
  { urls: ["https://discord.com/api/v9/*"] },
  ["requestBody"]
);