const SLICES_NAMES = [
  4,
  3,
  5,
  8,
  10
]

class SensorsCheckbox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        
      }

      .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
      }

      .sensors-input {
        margin-right: 1rem;
        margin-bottom: 1rem;
        border: 1.5px solid var(--primary-color);
        border-radius: 0.5rem;
        color: #0009;
        background-color: #f9f5ff;
      }

      input[type="checkbox"] {
        cursor: pointer;
        margin: 0.5rem;
        accent-color: var(--primary-color);
        background-color: red;
      }

      label {
        cursor: pointer;
        font-weight: 500;
        font-size: 1.2rem;
        margin-right: 0.5rem;
        opacity: 0.8;
      }
    `;
  }

  handleEvent(e) {
    if (e.type === "change") {
      this.dispatchEvent(new CustomEvent("checkbox", {
        detail: {
          id: e.path[0].id,
          checked: e.path[0].checked,
          unit: this.getAttribute(e.path[0].id)
        },
        bubbles: true,
        composed: true
      }));
    }
  }

  connectedCallback() {
    this.sensors = this.getAttributeNames();
    this.render();
    this.init();
  }

  init() {
    this.inputs = this.shadowRoot.querySelectorAll("input");
    this.inputs.forEach( input => input.addEventListener("change", this));
  }

  genCheckbox(checks) {
    return checks.map( (check, index) => /* html */` <div class="sensors-input"><input type="checkbox" id="${check}" name="${check}"> <label for="${check}">${check.slice(0, SLICES_NAMES[index])}</label></div> `).join("");
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${SensorsCheckbox.styles}</style>
    <div class="container">
      ${this.genCheckbox(this.sensors)}
    </div>`;
  }
}

customElements.define("sensors-checkbox", SensorsCheckbox);
