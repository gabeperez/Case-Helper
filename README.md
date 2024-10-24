# Case Helper

## Description
This Chrome extension allows users to easily convert selected text to lowercase or uppercase using context menu options or keyboard shortcuts.

## Features
- **Text Case Conversion:** 
  - Convert selected text to lowercase
  - Convert selected text to uppercase
  - Accessible via context menu (right-click) or keyboard shortcuts

## Installation
To install Text Case Converter, follow these steps:

1. **Download the Extension:**
   - Clone this repository or download all the provided files (manifest.json, background.js, icon48.png, icon128.png).

2. **Install the Extension:**
   - Go to `chrome://extensions/` in your Chrome browser.
   - Enable "Developer mode" by toggling the switch in the top right corner.
   - Click on "Load unpacked" and select the directory containing the extension files.

## Usage
1. Text Case Converter:
   - Select any text on a webpage
   - Right-click to open the context menu
   - Navigate to "Convert Text Case" and choose either "To Lowercase" or "To Uppercase"
   - The selected text will be instantly converted to the chosen case
   - Alternatively, use the keyboard shortcuts:
     - Cmd+Option+L (Mac) or Ctrl+Alt+L (Windows/Linux) to convert to lowercase
     - Cmd+Option+; (Mac) or Ctrl+Alt+; (Windows/Linux) to convert to uppercase

## Permissions
The extension requires the following permissions:
- `activeTab`: To access the content of the current tab for text conversion
- `contextMenus`: To create and manage the text case conversion context menu items

## Development
The main component of the extension is:
- `background.js`: Implements the text case conversion functionality and handles context menu and keyboard shortcut events.

Key functions include:
- Context menu creation and click handling for text case conversion
- Keyboard shortcut handling for text case conversion

## Customization
To customize the extension:
- Modify the context menu items in `background.js` to add more conversion options.
- Adjust the keyboard shortcuts in `manifest.json` to your preference.

## Troubleshooting
- If the context menu items don't appear, try reloading the extension or restarting your browser.
- If the keyboard shortcuts don't work, check for conflicts with other extensions or system-wide shortcuts.

## License
This project is licensed under the MIT License.
