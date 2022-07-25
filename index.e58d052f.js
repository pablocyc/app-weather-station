const h=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}};h();class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`

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
    `}connectedCallback(){this.render(),this.init(),this.toggleTheme.addEventListener("click",()=>{this.toggleIcon.src.includes("icon-sun.svg")?this.setLightMode():this.setDarkMode()}),this.isDarkMode?this.setDarkMode():this.setLightMode()}init(){this.toggleTheme=this.shadowRoot.querySelector(".btn-theme"),this.toggleIcon=this.shadowRoot.querySelector(".icon-theme"),this.isDarkMode=window.matchMedia("(prefers-color-scheme: dark)").matches}setLightMode(){this.toggleIcon.src="icons/icon-moon.svg",document.body.classList.remove("dark");const e=getComputedStyle(document.body);this.setEvent(e)}setDarkMode(){this.toggleIcon.src="icons/icon-sun.svg",document.body.classList.add("dark");const e=getComputedStyle(document.body);this.setEvent(e)}setEvent(e){const s=new CustomEvent("color",{detail:{textColor:e.getPropertyValue("--text-color")},bubbles:!0,composed:!0});this.dispatchEvent(s)}render(){this.shadowRoot.innerHTML=`
    <style>${n.styles}</style>
    <div class="container">
      <div class="btn-theme">
        <img src="icons/icon-sun.svg" alt="icon moon" class="icon-theme">
      </div>
    </div>`}}customElements.define("icon-theme",n);class c extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.sensor=this.getAttribute("title")||"sensor",this.icon=this.getAttribute("icon"),this.unit=this.getAttribute("unit"),this.render()}toPascalCase(e){return e.split(" ").map(s=>s.charAt(0).toUpperCase()+s.slice(1)).join("")}render(){this.shadowRoot.innerHTML=`
    <style>${c.styles}</style>
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
          <h2 class="value">25.4<span>${this.unit}</span></h2>
          <div class="vs-value">
            <img src="icons/arrow-up.svg" alt="arrow-up">
            <p class="percent">20%</p>
            <p class="vs">vs last hour</p>
          </div>
        </div>
        <img src="icons/icon-graph.svg" alt="icon-graph">
      </main>
    </div>`}}customElements.define("card-sensor",c);class a extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
      :host {
        
      }

      .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
      }

      .sensors-input {
        margin-right: 0.8rem;
        margin-bottom: 1rem;
        border: 1.5px solid var(--primary-color);
        border-radius: 0.5rem;
        color: #0009;
        background-color: #F9F5FF;
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
    `}handleEvent(e){e.type==="change"&&this.dispatchEvent(new CustomEvent("checkbox",{detail:{id:e.path[0].id,checked:e.path[0].checked,unit:this.getAttribute(e.path[0].id)},bubbles:!0,composed:!0}))}connectedCallback(){this.sensors=this.getAttributeNames(),this.render(),this.init()}init(){this.inputs=this.shadowRoot.querySelectorAll("input"),this.inputs.forEach(e=>e.addEventListener("change",this))}genCheckbox(e){return e.map(s=>` <div class="sensors-input"><input type="checkbox" id="${s}" name="${s}"> <label for="${s}">${s}</label></div> `).join("")}render(){this.shadowRoot.innerHTML=`
    <style>${a.styles}</style>
    <div class="container">
      ${this.genCheckbox(this.sensors)}
    </div>`}}customElements.define("sensors-checkbox",a);document.createElement("card-sensor");const d=document.querySelector(".main");document.addEventListener("checkbox",l=>{const{id:e,checked:s,unit:i}=l.detail;if(s){const t=document.createElement("card-sensor");t.setAttribute("title",e),t.setAttribute("icon",`icons/icon-${e}.svg`),t.setAttribute("unit",i),d.appendChild(t)}else{const t=document.querySelector(`card-sensor[title="${e}"]`);d.removeChild(t)}});
