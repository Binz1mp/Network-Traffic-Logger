// Define console styles with more vivid colors
const consoleStyles = {
  loading: "color: #FF9800; font-weight: bold; font-size: 14px;",
  spotify: "color: #1DB954; font-weight: bold; font-size: 14px;",
  attack: "color: #FF4136; font-weight: bold; font-size: 14px;",
  groupTitle: "color: #00BFFF; font-weight: bold; font-size: 16px;",
  url: "color: #4CAF50; font-weight: bold;",
  method: "color: #E91E63; font-weight: bold;",
  body: "color: #FFA500; font-weight: bold;",
  description: "color: #40E0D0; font-style: italic; font-weight: bold;"
};

function handleRequest(request) {
  const { patternInfo } = request;
  console.group(`%c${patternInfo.type.toUpperCase()} Request Detected`, consoleStyles.groupTitle);
  console.log('%cURL:', consoleStyles.url, request.url);
  console.log('%cMethod:', consoleStyles.method, request.method);
  console.log('%cRequest Body:', consoleStyles.body, request.requestBody);
  console.log('%cDescription:', consoleStyles.description, patternInfo.description);
  console.groupEnd();
  // Add any specific handling for different request types here
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  handleRequest(request);
});