// This script will handle communication with the Gemini API.

// The fixed prompt part
const PROMPT_TEMPLATE = `1.运用我给你的单词，写一篇200字的英语文章，标注新词，英文文中不要出现翻译，单独在下面给出全文中文翻译，供我学习英语阅读。

2.高频重复新词：同一单词可以出现多次，尽量用不同的中文含义，以便记住单词的多种翻译。

3.简单句型为主：用短句、初学单词和常见语法（如一般现在时），降低阅读难度。

4.单词表的编号前加~号是已熟知单词，可以适当减少或不加入文章。

5.我会另说今天学习第几天的单词，如果合适可以适当出现这天之前的旧单词。

6.除了新单词，其他单词尽量用1到3年级学生能看懂的单词，减少陌生单词出现。

7.如果我说继续，则重复生成上一条请求，并尽量减少重复性。`;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getDefinition") {
        const words = request.words.filter(word => word.trim() !== '').join(', ');
        if (!words) {
            sendResponse({ success: false, error: "No words provided." });
            return true;
        }

        // 动态获取 API Key
        chrome.storage.local.get('geminiApiKey', (data) => {
            const GEMINI_API_KEY = data.geminiApiKey || '';
            if (!GEMINI_API_KEY) {
                sendResponse({ success: false, error: "please enter Gemini API Key in extension options" });
                return;
            }
            const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
            const fullPrompt = PROMPT_TEMPLATE + words;

            fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "contents": [{
                        "parts": [{
                            "text": fullPrompt
                        }]
                    }]
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.candidates && data.candidates.length > 0 && data.candidates[0].content.parts[0].text) {
                    const resultText = data.candidates[0].content.parts[0].text;
                    // Save to history
                    saveToHistory({ words: request.words, result: resultText });
                    sendResponse({ success: true, data: resultText });
                } else {
                    console.error("API Error Response:", data);
                    sendResponse({ success: false, error: data.error ? data.error.message : "Invalid response from API." });
                }
            })
            .catch(error => {
                console.error("Fetch Error:", error);
                sendResponse({ success: false, error: error.message });
            });
        });
        return true; // Indicates that the response is sent asynchronously
    }
});

function saveToHistory(item) {
    chrome.storage.local.get({ history: [] }, (result) => {
        const history = result.history;
        history.unshift(item); // Add to the beginning
        // Optional: Limit history size
        if (history.length > 50) {
            history.pop();
        }
        chrome.storage.local.set({ history: history });
    });
}
