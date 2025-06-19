document.getElementById('saveBtn').onclick = function() {
  const key = document.getElementById('apiKey').value;
  chrome.storage.local.set({ geminiApiKey: key }, () => {
    document.getElementById('status').textContent = 'API Key saved successfully!';
    setTimeout(() => { document.getElementById('status').textContent = ''; }, 1500);
  });
};

// 页面加载时回显
chrome.storage.local.get('geminiApiKey', (data) => {
  if (data.geminiApiKey) {
    document.getElementById('apiKey').value = data.geminiApiKey;
  }
});
