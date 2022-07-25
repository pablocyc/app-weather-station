import "./components/IconTheme.js";
import "./components/CardSensor.js";
import "./components/SensorsCheckbox.js";

const sensorComponent = document.createElement("card-sensor");
const main = document.querySelector(".main");
document.addEventListener("checkbox", e => {
  const { id, checked } = e.detail;
  if (checked) {
    const sensor = document.createElement("card-sensor");
    sensor.setAttribute("title", id);
    sensor.setAttribute("icon", `icons/icon-${id}.svg`);
    main.appendChild(sensor);
  } else {
    const sensor = document.querySelector(`card-sensor[title="${id}"]`);
    main.removeChild(sensor);
  }
});

