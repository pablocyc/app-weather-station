class IconTheme extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`

      img {
        width: 29px;
        height: 29px;
      }

      .btn-theme {
        width: 44px;
        height: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `;
  }

  connectedCallback() {
    this.render();
    this.init();
    this.toggleTheme.addEventListener("click", () => {
      if (this.toggleIcon.src.includes("icon-sun.svg")) {
        this.setLightMode();
      } else {
        this.setDarkMode();
      }
    });

    if (this.isDarkMode) this.setDarkMode();
    else this.setLightMode();
  }

  init () {
    this.toggleTheme = this.shadowRoot.querySelector(".btn-theme");
    this.toggleIcon = this.shadowRoot.querySelector(".icon-theme");
    this.isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  setLightMode () {
    this.toggleIcon.src = "icons/icon-moon.svg"
    document.body.classList.remove("dark");
    const style = getComputedStyle(document.body);
    this.setEvent(style);
  }

  setDarkMode () {
    this.toggleIcon.src = "icons/icon-sun.svg"
    document.body.classList.add("dark");
    const style = getComputedStyle(document.body);
    this.setEvent(style);
  }

  setEvent (style) {
    const ColorEvent = new CustomEvent("color", {
      detail: {
        textColor: style.getPropertyValue("--text-color"),
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(ColorEvent);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${IconTheme.styles}</style>
    <div class="container">
      <div class="btn-theme">
        <img src="icons/icon-sun.svg" alt="icon moon" class="icon-theme">
      </div>
    </div>`;
  }
}

customElements.define("icon-theme", IconTheme);
