// This script will handle the history page logic。
document.addEventListener("DOMContentLoaded", function () {
  const historyList = document.getElementById("historyList");
  const clearBtn = document.getElementById("clearHistoryBtn");

  // Load marked.js to render markdown
  const script = document.createElement("script");
  script.src = "../vendor/marked.min.js";
  script.onload = loadHistory;
  document.head.appendChild(script);

  function loadHistory() {
    chrome.storage.local.get({ history: [] }, (result) => {
      const history = result.history;
      if (history.length === 0) {
        historyList.innerHTML = "<p>no history</p>";
        return;
      }
      historyList.innerHTML = "";
      history.forEach((item) => {
        const entry = document.createElement("div");
        entry.className = "history-entry";
        const words = item.words ? item.words.join(", ") : "";
        entry.innerHTML = `
          <div><strong>单词:</strong> ${words}</div>
          <div><strong>结果:</strong></div>
          <div class="history-result">${window.marked.parse(item.result)}</div>
          <button data-id="${item.id}" class="deleteBtn">删除</button>
          <hr>
        `;
        historyList.appendChild(entry);
      });

      // 绑定每个删除按钮事件
      document.querySelectorAll(".deleteBtn").forEach((btn) => {
        btn.onclick = function () {
          const id = Number(this.getAttribute("data-id"));
          chrome.storage.local.get({ history: [] }, (result) => {
            const newHistory = result.history.filter((item) => item.id !== id);
            chrome.storage.local.set({ history: newHistory }, loadHistory);
          });
        };
      });
    });
  }

  // 清空全部历史（带二次确认）
  let confirmClear = false;
  clearBtn.addEventListener("click", function () {
    if (!confirmClear) {
      clearBtn.textContent = "clear history?";
      confirmClear = true;
      setTimeout(() => {
        clearBtn.textContent = "Clear History";
        confirmClear = false;
      }, 2000);
      return;
    }
    chrome.storage.local.set({ history: [] }, () => {
      historyList.innerHTML = "<p>no history</p>";
      clearBtn.textContent = "Clear History";
      confirmClear = false;
    });
  });
});
