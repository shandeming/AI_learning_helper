document.getElementById("saveBtn").onclick = function () {
  const key = document.getElementById("apiKey").value;
  const model = document.getElementById("modelSelect").value;
  chrome.storage.local.set({ ApiKey: key, modelName: model }, () => {
    document.getElementById("status").textContent =
      "API Key and Model saved successfully!";
    setTimeout(() => {
      document.getElementById("status").textContent = "";
    }, 1500);
  });
};

// 页面加载时回显
chrome.storage.local.get("ApiKey", (data) => {
  if (data.ApiKey) {
    document.getElementById("apiKey").value = data.ApiKey;
  }
  if (data.modelName) {
    document.getElementById("modelSelect").value = data.modelName;
  }
});
