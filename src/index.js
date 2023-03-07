import { onGetSensors } from "./firebase.js"
import "./components/IconTheme.js";
import "./components/CardSensor.js";
import "./components/SensorsCheckbox.js";

// navigator.serviceWorker.register("./weather-sw.js");

const container = document.querySelector(".container-cards");

document.addEventListener("checkbox", e => {
  const { id, checked, unit } = e.detail;
  if (checked) {
    const sensor = document.createElement("card-sensor");
    sensor.setAttribute("title", id);
    sensor.setAttribute("icon", `icons/icon-${id}.svg`);
    sensor.setAttribute("unit", unit);
    container.appendChild(sensor);
    sensor.onData(onGetSensors);
  } else {
    const sensor = document.querySelector(`card-sensor[title="${id}"]`);
    container.removeChild(sensor);
  }
});
