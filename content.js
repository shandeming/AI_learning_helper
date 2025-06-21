console.log("content.js injected!");
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "addSelectedWord") {
    const selection = window.getSelection().toString().trim();
    if (selection) {
      chrome.storage.local.get("savedWords", (data) => {
        let words = Array.isArray(data.savedWords) ? data.savedWords : [];
        //遍历数组，如果是空的就填入
        const newWords = selection;
        for (let i = 0; i < 10; i++) {
          if (!words[i] || words[i] === "") {
            words[i] = newWords;
            break;
          }
        }
        chrome.storage.local.set({ savedWords: words });
      });
    }
  }
});
