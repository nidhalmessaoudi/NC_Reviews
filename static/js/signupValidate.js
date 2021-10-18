function createError(msg) {
  const errorLabel = document.createElement("p");
  errorLabel.classList.add("form-label__danger");
  errorLabel.textContent = msg;
  return errorLabel;
}

export default function signupSubmitHandler(e) {
  const form = e.target;

  Array.from(form.getElementsByTagName("p")).forEach((el) => {
    form.removeChild(el);
  });

  const formEls = {
    usernameEl: form.querySelector("input[name='username']"),
    emailEl: form.querySelector("input[name='email']"),
    pwdEl: form.querySelector("input[name='password']"),
    pwdConfirmEl: form.querySelector("input[name='passwordConfirm']"),
  };

  let errorFound = false;

  for (const formEl in formEls) {
    const element = formEls[formEl];

    if (element.classList.contains("form-control__danger")) {
      element.classList.remove("form-control__danger");
    }

    if (validator.isEmpty(element.value)) {
      element.classList.add("form-control__danger");
      if (!errorFound) {
        errorFound = true;
        form.insertAdjacentElement(
          "afterbegin",
          createError("Missing required fields!")
        );
      }
    }
  }

  if (!validator.isAlphanumeric(formEls.usernameEl.value) && !errorFound) {
    form.insertAdjacentElement(
      "afterbegin",
      createError("The username must only contains letters and numbers!")
    );

    formEls.usernameEl.classList.add("form-control__danger");
    errorFound = true;
  }

  if (!validator.isEmail(formEls.emailEl.value) && !errorFound) {
    form.insertAdjacentElement("afterbegin", createError("Invalid email!"));

    formEls.emailEl.classList.add("form-control__danger");
    errorFound = true;
  }

  if (formEls.pwdEl.value !== formEls.pwdConfirmEl.value && !errorFound) {
    form.insertAdjacentElement(
      "afterbegin",
      createError("The password and its confirm are not the same!")
    );

    formEls.pwdEl.classList.add("form-control__danger");
    formEls.pwdConfirmEl.classList.add("form-control__danger");
    errorFound = true;
  }

  if (errorFound) {
    e.preventDefault();
  }
}
