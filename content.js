const consoleStyles = {
  loading: "color: #FF9800; font-weight: bold; font-size: 14px;",
  spotify: "color: #1DB954; font-weight: bold; font-size: 14px;",
  attack: "color: #FF4136; font-weight: bold; font-size: 14px;",
  groupTitle: "color: #00BFFF; font-weight: bold; font-size: 16px;",
  url: "color: #4CAF50; font-weight: bold;",
  method: "color: #E91E63; font-weight: bold;",
  body: "color: #FFA500; font-weight: bold;",
  description: "color: #40E0D0; font-style: italic; font-weight: bold;",
  customLog: "color: #FF1493; font-weight: bold; font-style: italic;"
};

/**
 * 감지된 네트워크 요청을 처리하고 콘솔에 로그를 출력
 * 
 * @param {Object} request - 처리할 요청 객체
 * @param {Object} request.patternInfo - 요청과 일치하는 패턴 정보
 * @param {string} request.patternInfo.type - 요청 유형 (예: 'loading', 'spotify', 'attack')
 * @param {string} request.patternInfo.description - 요청에 대한 설명
 * @param {string} request.url - 요청 URL
 * @param {string} request.method - HTTP 메소드 (GET, POST 등)
 * @param {Object} request.requestBody - 요청 본문 (있는 경우)
 * 
 * @returns {void}
 */
function handleRequest(request) {
  const { patternInfo } = request;
  console.group(`%c${patternInfo.type.toUpperCase()} Request Detected`, consoleStyles.groupTitle);
  console.log('%cURL:', consoleStyles.url, request.url);
  console.log('%cMethod:', consoleStyles.method, request.method);
  console.log('%cRequest Body:', consoleStyles.body, request.requestBody);
  console.log('%cDescription:', consoleStyles.description, patternInfo.description);
  
  // 타입에 따라 추가로 처리할 함수
  switch (patternInfo.type) {
    case 'loading':
      console.log('%cCustom Log:', consoleStyles.customLog, 'Discord is finishing up loading.');
      break;
    case 'spotify':
      console.log('%cCustom Log:', consoleStyles.customLog, 'Spotify integration detected.');
      break;
    case 'attack':
      console.log('%cCustom Log:', consoleStyles.customLog, 'Attack action detected.');
      break;
    default:
      console.log('%cCustom Log:', consoleStyles.customLog, 'Unrecognized request type.');
    }
  
  console.groupEnd();
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  handleRequest(request);
});