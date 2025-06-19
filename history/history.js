// This script will handle the history page logic。
document.addEventListener('DOMContentLoaded', function() {
    const historyList = document.getElementById('historyList');
    const clearBtn = document.getElementById('clearHistoryBtn');

    // Load marked.js to render markdown
    const script = document.createElement('script');
    script.src = '../vendor/marked.min.js';
    script.onload = loadHistory;
    document.head.appendChild(script);

    function loadHistory() {
        chrome.storage.local.get({ history: [] }, (result) => {
            const history = result.history;
            if (history.length === 0) {
                historyList.innerHTML = '<p>没有找到历史记录。</p>';
                return;
            }
            historyList.innerHTML = '';
            history.forEach((item, idx) => {
                const entry = document.createElement('div');
                entry.className = 'history-entry';
                const words = item.words ? item.words.join(', ') : '';
                entry.innerHTML = `
                    <div><strong>Words:</strong> ${words}</div>
                    <div><strong>Result:</strong></div>
                    <div class="history-result">${window.marked.parse(item.result)}</div>
                    <hr>
                `;
                historyList.appendChild(entry);
            });
        });
    }

    clearBtn.addEventListener('click', function() {
        chrome.storage.local.set({ history: [] }, () => {
            historyList.innerHTML = '<p>没有找到历史记录。</p>';
        });
    });
});
