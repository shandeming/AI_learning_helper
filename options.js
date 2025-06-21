const DEFAULT_API_KEY =
  "2faf7d6ef3094979ba06dbb41ee103eb.ZKYD5a5vtUnW5gEc2faf7d6ef3094979ba06dbb41ee103eb.ZKYD5a5vtUnW5gEc";
const DEFAULT_MODEL = "zhipu";

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
  } else {
    document.getElementById("apiKey").value = DEFAULT_API_KEY;
  }
});

chrome.storage.local.get("modelName", (data) => {
  if (data.modelName) {
    document.getElementById("modelSelect").value = data.modelName;
  } else {
    document.getElementById("modelSelect").value = DEFAULT_MODEL;
  }
});
