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

function convertText(tab, action) {
  chrome.tabs.sendMessage(tab.id, {action: action});
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "toLowercase") {
    convertText(tab, "toLowerCase");
  } else if (info.menuItemId === "toUppercase") {
    convertText(tab, "toUpperCase");
  }
});

// Add this section to handle keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if (tabs[0]) {
      if (command === "to-lowercase") {
        convertText(tabs[0], "toLowerCase");
      } else if (command === "to-uppercase") {
        convertText(tabs[0], "toUpperCase");
      }
    }
  });
});
