export default class Modal {
  overlay = `<div class="overlay"></div>`;

  signupInputs = `
        <input class="form-control" type="text" name="username" placeholder="Username">
        <input class="form-control" type="text" name="email" placeholder="Email">
        <input class="form-control" type="password" name="password" placeholder="Password">
        <input class="form-control" type="password" name="passwordConfirm" placeholder="Confirm password">
    `;

  signinInputs = `
        <input class="form-control" type="text" name="email" placeholder="Email">
        <input class="form-control" type="password" name="password" placeholder="Password">
    `;

  constructor(type, withOverlay = true) {
    let modalTitle;
    let modalLinkto;
    let modalAction;
    let inputs;

    if (type === "signup") {
      this.switchValue = "signin";
      modalTitle = "Sign up";
      modalLinkto =
        'Already have an account? <span class="anchor" id="type-switch">Sign in</span>';
      modalAction = "signup.php";
      inputs = this.signupInputs;
    } else {
      this.switchValue = "signup";
      modalTitle = "Sign in";
      modalLinkto = `Don't have an account? <span class="anchor" id="type-switch">Sign up</span>`;
      modalAction = "signin.php";
      inputs = this.signinInputs;
    }

    this.markup = `
            <div class="modal">
            <div class="modal-top">
                <h2 class="modal-brand">${modalTitle}</h2>
                <span class="modal-close">&times;</span>
            </div>
            <div class="modal-content">
                <div class="modal-linkto">
                    <p>${modalLinkto}</p>
                </div>
                <form class="join-form" id="${type}-form" method="POST" action="/NCReviews/${modalAction}">
                    ${inputs}
                    <button type="submit" class="btn join-btn">${modalTitle}</button>
                </form>
            </div>
            </div>
        `;

    if (withOverlay) {
      document.body.insertAdjacentHTML("afterbegin", this.overlay);
    }

    document
      .querySelector(".modal-container")
      .insertAdjacentHTML("afterbegin", this.markup);

    this.overlayEl = document.querySelector(".overlay");
    this.modal = document.querySelector(".modal");
    this.switchType = document.getElementById("type-switch");

    this.modal.style.animation = "modalAppear 300ms";

    let switchClicked = false;
    this.switchType.addEventListener("click", () => {
      if (switchClicked) return;
      this.switchHandler();
      switchClicked = true;
    });

    document
      .querySelector(".modal-close")
      .addEventListener("click", this.closeHandler.bind(this));
    this.overlayEl.addEventListener("click", this.closeHandler.bind(this));
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") {
        return;
      }
      e.preventDefault();
      this.closeHandler();
    });
  }

  closeHandler(withOverlay = true) {
    if (!this.modal) {
      return;
    }

    this.modal.style.animation = "modalDisappear 300ms";
    if (withOverlay) {
      this.overlayEl.style.animation = "overlayDisappear 300ms";
    }
    setTimeout(() => {
      this.modal.parentElement.removeChild(this.modal);
      if (withOverlay) this.overlayEl.parentElement.removeChild(this.overlayEl);
    }, 300);
  }

  switchHandler() {
    this.closeHandler(false);
    setTimeout(() => {
      new Modal(this.switchValue, false);
    }, 300);
  }
}
