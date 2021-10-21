export function createError(msg) {
  const errorLabel = document.createElement("p");
  errorLabel.classList.add("form-label__danger");
  errorLabel.textContent = msg;
  return errorLabel;
}
