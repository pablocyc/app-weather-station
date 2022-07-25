class CardSensor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        border-left: 4px outset var(--border-color);
        border-bottom: 4px outset var(--border-color);
        margin-top: 1rem;
      }

      .container {
        border: 1.5px solid var(--text-color);
        border-radius: 0 1rem 0 0;
        padding: 1rem;
        background-color: var(--gray-color);
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .title {
        display: flex;
        align-items: center;
      }

      .title-sensor {
        font-size: 1.3rem;
        font-weight: 500;
        margin-right: 1rem;
        opacity: 0.8;
      }

      .title img {
        width: 32px;
        height: 32px;
      }

      .btn-chart img {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        box-shadow: var(--shadow-elevation-low);
      }

      .btn-chart {
        background: none;
        border: none;
      }

      .main {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        font-family: Inter, sans-serif;
        margin-top: 1rem;
      }

      .current-value {
        display: flex;
        flex-direction: column;
      }

      .value {
        font-size: 2.2rem;
        font-weight: 500;
        margin: 0;
      }

      .vs-value {
        display: flex;
        flex-direction: row;
        margin-top: 1rem;
      }

      p {
        margin: 0;
      }

      .percent {
        color: var(--up-color);
        padding-left: 0.2rem;
        padding-right: 0.7rem;
      }

      .vs {
        opacity: 0.5;
      }
    `;
  }

  connectedCallback() {
    this.sensor = this.getAttribute("title") || "sensor";
    this.icon = this.getAttribute("icon");
    this.render();
  }

  toPascalCase(str) {
    return str
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${CardSensor.styles}</style>
    <div class="container">
      <header class="header">
        <div class="title">
          <h1 class="title-sensor">${this.toPascalCase(this.sensor)}</h1>
          <img src=${this.icon} alt=${this.icon}>
        </div>
        <button class="btn-chart">
          <img src="icons/icon-chart.svg" alt="icon-chart">
        </button>
      </header>
      <main class="main">
        <div class="current-value">
          <h2 class="value">25.4°</h2>
          <div class="vs-value">
            <img src="icons/arrow-up.svg" alt="arrow-up">
            <p class="percent">20%</p>
            <p class="vs">vs last hour</p>
          </div>
        </div>
        <img src="icons/icon-graph.svg" alt="icon-graph">
      </main>
    </div>`;
  }
}

customElements.define("card-sensor", CardSensor);
