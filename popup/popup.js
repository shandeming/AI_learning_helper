document.addEventListener('DOMContentLoaded', function() {
    const wordInputs = document.getElementById('wordInputs');
    const form = document.getElementById('wordForm');
    const resultDiv = document.getElementById('result');
    const historyBtn = document.getElementById('historyBtn');
    const inputs = [];

    // Function to save words to storage
    function saveWords() {
        const words = inputs.map(input => input.value);
        chrome.storage.local.set({ 'savedWords': words });
    }

    // Load saved words from storage
    chrome.storage.local.get('savedWords', function(data) {
        const savedWords = data.savedWords || [];
        for (let i = 0; i < 10; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = `Word ${i + 1}`;
            input.id = `word${i}`;
            input.value = savedWords[i] || '';
            input.addEventListener('input', saveWords); // Save on input
            wordInputs.appendChild(input);
            inputs.push(input);
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from actually submitting
        const words = inputs.map(input => input.value);
        resultDiv.innerHTML = 'Loading...';

        chrome.runtime.sendMessage({ action: "getDefinition", words: words }, (response) => {
            if (response && response.success) {
                resultDiv.innerHTML = marked.parse(response.data);
            } else {
                resultDiv.textContent = 'Error: ' + (response ? response.error : 'No response from background script.');
            }
        });
    });

    historyBtn.addEventListener('click', function() {
        chrome.tabs.create({ url: 'history/history.html' });
    });
});
