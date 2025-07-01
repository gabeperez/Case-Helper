function replaceSelectedText(replacement) {
  const selection = window.getSelection();
  if (!selection.rangeCount) return false;
  const range = selection.getRangeAt(0);
  range.deleteContents();
  range.insertNode(document.createTextNode(replacement));
  // Move cursor to the end of the inserted text
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
  return true;
}

function replaceSelectedTextInputOrTextarea(element, action) {
  const start = element.selectionStart;
  const end = element.selectionEnd;
  if (start === end) return false;
  const original = element.value.substring(start, end);
  const converted = action === "toLowerCase" ? original.toLowerCase() : original.toUpperCase();
  element.setRangeText(converted, start, end, 'end');
  // Optionally, trigger input event for frameworks
  element.dispatchEvent(new Event('input', { bubbles: true }));
  return true;
}

function convertCase(action) {
  try {
    const active = document.activeElement;
    if (active && (active.tagName === 'TEXTAREA' || (active.tagName === 'INPUT' && active.type === 'text'))) {
      const replaced = replaceSelectedTextInputOrTextarea(active, action);
      if (!replaced) {
        console.warn("Case Helper: No text selected in input/textarea.");
      }
      return;
    }
    // Fallback to content-editable or normal selection
    const selection = window.getSelection();
    if (selection.toString()) {
      const convertedText = action === "toLowerCase"
        ? selection.toString().toLowerCase()
        : selection.toString().toUpperCase();
      const replaced = replaceSelectedText(convertedText);
      if (!replaced) {
        console.warn("Case Helper: Could not replace selected text.");
      }
    }
  } catch (e) {
    console.error("Case Helper: Error converting case", e);
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    if (request.action === "toLowerCase" || request.action === "toUpperCase") {
      convertCase(request.action);
      sendResponse({success: true});
    }
  } catch (e) {
    console.error("Case Helper: Error in message listener", e);
    sendResponse({success: false, error: e.toString()});
  }
  // Indicate async response if needed
  return true;
});
