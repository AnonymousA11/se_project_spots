export function setBtnText(btn, isLoading, loadingText, defaultText) {


  if (isLoading) {
    btn.textContent = loadingText;
    console.log("setting text to loading text");
  } else {
    btn.textContent = defaultText;
  }
}
