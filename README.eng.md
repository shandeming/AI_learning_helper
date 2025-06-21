# AI English Learning Helper

A browser extension designed to help English learners efficiently memorize and practice new vocabulary using AI.

## Features
- **Quick Input:** Enter 10 English words on any webpage via a floating button
- **AI-Powered Content:** Instantly generate an English article (with marked new words) and a full Chinese translation using AI API.
- **Vocabulary Repetition:** New words are repeated in various contexts to reinforce memory.
- **Simple Sentences:** Content is generated with simple grammar and vocabulary, suitable for elementary learners.
- **History:** All queries and results are saved locally. View and clear your history at any time.
- **No Login Required:** All data is stored locally for privacy and convenience.
- **Markdown Support:** Results are displayed in beautiful Markdown format.
- **Custom API Key:** Securely set your own AI API. key in the extension options.

## Installation
1. Download or clone this repository.
2. Open your browser's extensions page (e.g., `chrome://extensions` or `edge://extensions`).
3. Enable Developer Mode.
4. Click "Load unpacked" and select the project folder.
5. Set your API key in the extension's options page.

## Usage
- Click the floating button to open the input window.
- Enter up to 10 English words and submit.
- View the generated article and translation.
- Check your query history or clear it as needed.

## Project Structure
- `manifest.json` — Extension configuration
- `background.js` — Handles API requests and history
- `content.js` — Injects the floating button
- `popup/` — Main UI for word input and results
- `history/` — History viewing and management
- `icons/` — Extension icons
- `vendor/` — Third-party libraries (e.g., marked.js)
- `options.html` & `options.js` — API key management

## Keywords
English learning, vocabulary, AI writing, Gemini, English reading, browser extension, English assistant, Markdown, Edge extension, Chrome extension

## License
MIT
