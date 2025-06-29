// This script will handle communication with the Gemini API.

const PROMPT_TEMPLATE = `1.运用我给你的单词，写一篇200字的英语文章，标注新词，英文文中不要出现翻译，单独在下面给出全文中文翻译，供我学习英语阅读。

2.高频重复新词：同一单词可以出现多次，尽量用不同的中文含义，以便记住单词的多种翻译。

3.简单句型为主：用短句、初学单词和常见语法（如一般现在时），降低阅读难度。

4.单词表的编号前加~号是已熟知单词，可以适当减少或不加入文章。

5.我会另说今天学习第几天的单词，如果合适可以适当出现这天之前的旧单词。

6.除了新单词，其他单词尽量用1到3年级学生能看懂的单词，减少陌生单词出现。

7.如果我说继续，则重复生成上一条请求，并尽量减少重复性。`;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getDefinition") {
    handleGetDefinition(request, sendResponse);
    return true;
  }
});

// 监听快捷键命令
chrome.commands.onCommand.addListener((command) => {
  if (command === "add_selected_word") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "addSelectedWord" });
    });
  }
});

// 主调度函数
function handleGetDefinition(request, sendResponse) {
  const words = getWordsString(request.words);
  if (!words) {
    sendResponse({ success: false, error: "No words provided." });
    return;
  }
  getModelConfig((config) => {
    if (!config.apiKey) {
      sendResponse({
        success: false,
        error: "please enter API Key in extension options",
      });
      return;
    }
    getModelHandler(config.model)(words, config, (result) => {
      if (result.success) {
        saveToHistory({ words: request.words, result: result.data });
      }
      sendResponse(result);
    });
  });
}

// 获取模型和API Key
function getModelConfig(callback) {
  chrome.storage.local.get(["modelName", "ApiKey"], (data) => {
    callback({
      model: data.modelName || "gemini-2.0-flash",
      apiKey: data.ApiKey || "",
    });
  });
}

// 选择模型处理函数
function getModelHandler(model) {
  if (model.startsWith("gemini")) return requestGemini;
  if (model.startsWith("qwen")) return requestQwen;
  if (model.startsWith("zhipu")) return requestZhipu;
  return (words, config, cb) =>
    cb({ success: false, error: "Unsupported model." });
}

// Gemini请求
function requestGemini(words, config, callback) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${config.apiKey}`;
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: PROMPT_TEMPLATE }] },
      contents: [{ parts: [{ text: "\nword list：" + words }] }],
      generation_config: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) callback({ success: true, data: text });
      else
        callback({
          success: false,
          error: data.error?.message || "Invalid response from API.",
        });
    })
    .catch((err) => callback({ success: false, error: err.message }));
}

// Qwen请求
function requestQwen(words, config, callback) {
  fetch(
    "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        input: { prompt: PROMPT_TEMPLATE + "\nword list：" + words },
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      const text = data?.output?.text;
      if (text) callback({ success: true, data: text });
      else
        callback({
          success: false,
          error: data.error?.message || "Invalid response from API.",
        });
    })
    .catch((err) => callback({ success: false, error: err.message }));
}
// 智谱请求
function requestZhipu(words, config, callback) {
  fetch("https://open.bigmodel.cn/api/paas/v4/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: "GLM-4-Flash",
      messages: [
        { role: "system", content: PROMPT_TEMPLATE },
        { role: "user", content: "\nword list：" + words },
      ],
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const text = data?.choices?.[0]?.message?.content;
      if (text) callback({ success: true, data: text });
      else
        callback({
          success: false,
          error: data.error?.message || "Invalid response from API.",
        });
    })
    .catch((err) => callback({ success: false, error: err.message }));
}

// 工具函数
function getWordsString(wordsArr) {
  return Array.isArray(wordsArr)
    ? wordsArr.filter((w) => w.trim()).join(", ")
    : "";
}

function saveToHistory(item) {
  chrome.storage.local.get({ history: [] }, (result) => {
    const history = result.history;
    item.id = Date.now(); // 唯一 id
    history.unshift(item);
    chrome.storage.local.set({ history });
  });
}
