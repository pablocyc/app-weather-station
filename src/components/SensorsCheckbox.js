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
        margin: 0.5rem;
        border: 1px solid var(--primary-color);
        border-radius: 0.5rem;
        color: #0009;
        background-color: #F9F5FF;
      }

      input[type="checkbox"] {
        margin: 0.5rem;
        accent-color: var(--primary-color);
        background-color: red;
      }

      label {
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
          checked: e.path[0].checked
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
    return checks.map( check => /* html */` <div class="sensors-input"><input type="checkbox" id="${check}" name="${check}"> <label for="${check}">${check.slice(0, this.getValueName(check))}</label></div> `).join("");
  }

  getValueName (name) {
    return this.getAttribute(name) || name;
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
