function convertCase(action) {
  const selection = window.getSelection();
  if (selection.toString()) {
    const convertedText = action === "toLowerCase" 
      ? selection.toString().toLowerCase() 
      : selection.toString().toUpperCase();
    document.execCommand("insertText", false, convertedText);
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toLowerCase" || request.action === "toUpperCase") {
    convertCase(request.action);
  }
});
