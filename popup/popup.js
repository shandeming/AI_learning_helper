document.addEventListener('DOMContentLoaded', function() {
    const wordInputs = document.getElementById('wordInputs');
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
});
