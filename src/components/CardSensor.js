class CardSensor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.value = 0;
  }

  static get styles() {
    return /* css */`
      :host {
        width: 100%;
      }

      .container {
        border: 1.5px solid var(--text-color);
        border-radius: 0 1rem 0 0;
        padding: 1rem;
        background-color: var(--gray-color);
        box-shadow: -4px 4px var(--border-color);
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

      .btn-chart {
        width: 28px;
        height: 28px;
        background: #f9f5ff;
        border: none;
        cursor: pointer;
        border: 1px solid #000;
        border-radius: 0 6px 0 0;
        box-shadow: -2px 2px var(--border-color);
        padding: 0;
        margin-right: 1px;
      }

      .btn-chart img {
        width: 18px;
        height: 18px;
        padding-top: 3px;
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

      .value span {
        font-size: 1.6rem;
        padding-left: 0.5rem;
        color: var(--primary-color);
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
    this.unit = this.getAttribute("unit");
    this.render();
  }

  toPascalCase(str) {
    return str
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  }

  onData(onGetSensors) {
    onGetSensors(snapshot => {
      snapshot.forEach(doc => {
        if (doc.id === this.sensor) {
          this.value = doc.data()[Object.keys(doc.data()).pop()];
          this.render();
        }
      });
    });
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
          <h2 class="value">${this.value}<span>${this.unit}</span></h2>
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
