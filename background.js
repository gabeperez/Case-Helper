// Create context menu items
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "toLowercase",
    title: "Convert to lowercase",
    contexts: ["selection"]
  });
  chrome.contextMenus.create({
    id: "toUppercase",
    title: "Convert to UPPERCASE",
    contexts: ["selection"]
  });
});

function sendConvertMessage(tab, action) {
  chrome.tabs.sendMessage(tab.id, {action: action}, (response) => {
    if (chrome.runtime.lastError || (response && response.success === false)) {
      console.warn('Case Helper: Message failed, attempting to inject content script.', chrome.runtime.lastError, response);
      // Try to inject the content script and resend the message
      if (chrome.scripting) {
        chrome.scripting.executeScript({
          target: {tabId: tab.id},
          files: ['content.js']
        }, () => {
          if (chrome.runtime.lastError) {
            console.error('Case Helper: Failed to inject content script', chrome.runtime.lastError);
          } else {
            chrome.tabs.sendMessage(tab.id, {action: action}, (response2) => {
              if (chrome.runtime.lastError || (response2 && response2.success === false)) {
                console.error('Case Helper: Message failed after reinjection', chrome.runtime.lastError, response2);
              }
            });
          }
        });
      } else {
        console.error('Case Helper: chrome.scripting API not available.');
      }
    }
  });
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "toLowercase") {
    sendConvertMessage(tab, "toLowerCase");
  } else if (info.menuItemId === "toUppercase") {
    sendConvertMessage(tab, "toUpperCase");
  }
});

// Add this section to handle keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if (tabs[0]) {
      if (command === "to-lowercase") {
        sendConvertMessage(tabs[0], "toLowerCase");
      } else if (command === "to-uppercase") {
        sendConvertMessage(tabs[0], "toUpperCase");
      }
    }
  });
});
