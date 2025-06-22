chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "addSelectedWord") {
    const selection = window.getSelection().toString().trim();
    if (selection) {
      chrome.storage.local.get("savedWords", (data) => {
        let words = Array.isArray(data.savedWords) ? data.savedWords : [];
        //遍历数组，如果是空的就填入
        const newWords = selection;
        let added = false;
        for (let i = 0; i < 10; i++) {
          if (!words[i] || words[i] === "") {
            words[i] = newWords;
            added = true;
            break;
          }
        }
        chrome.storage.local.set({ savedWords: words }, () => {
          if (added) {
            showCheckMark();
          }
        });
      });
    }
  }
});

function showCheckMark() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  const mark = document.createElement("div");
  mark.textContent = "✔️";
  mark.style.position = "fixed";
  mark.style.zIndex = 99999;
  mark.style.fontSize = "2rem";
  mark.style.pointerEvents = "none";
  mark.style.transition = "opacity 0.3s";
  mark.style.opacity = "1";
  // 定位到选中文本右上角
  mark.style.left = rect.right + 4 + "px";
  mark.style.top = rect.top - 8 + "px";

  document.body.appendChild(mark);

  setTimeout(() => {
    mark.style.opacity = "0";
    setTimeout(() => {
      mark.remove();
    }, 300);
  }, 800);
}
