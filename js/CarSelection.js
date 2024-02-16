import { config } from "./config.js";
import { subscribeToEntityChanges } from "./utils-3dverse.js";

let selectedCarIndex = 0;

export function getSelectedCarIndex() {
  return selectedCarIndex;
}

const template = Handlebars.compile(
  /** @type {HTMLElement} */ (document.getElementById("car-heading-template"))
    .innerHTML,
);

function render() {
  const selectedCar = config.cars[selectedCarIndex];
  var [firstWord, ...otherWords] = selectedCar.name.split(" ");
  /** @type {HTMLElement} */ (
    document.getElementById("car-heading")
  ).innerHTML = template({
    name_car: selectedCar.name,
    year_car: selectedCar.year,
    zeroToHundred_car: selectedCar.zeroToHundred,
    co2_car: selectedCar.co2,
    liters_car: selectedCar.liters,
    price_car: selectedCar.price,
  });
}

export function initUI() {
  render();
}

/** @type {Entity} */
let carEntity;

/** @type {Entity} */
let modEntity;

export async function setup() {
  // hide scene ref cache container
  const [carModifications] = await SDK3DVerse.engineAPI.findEntitiesByEUID(
  "e816012c-ee7f-4f5c-8a69-69a72c1df36a",
  );
  SDK3DVerse.engineAPI.setEntityVisibility(carModifications, false);

  [carEntity] = await SDK3DVerse.engineAPI.findEntitiesByNames(
    config.carSceneRefName
  );

  subscribeToEntityChanges(carEntity, () => {
    selectedCarIndex = config.cars.findIndex(({ sceneUUID }) => {
      return carEntity.getComponent("scene_ref").value === sceneUUID;
    });
    render();
  });
}

export function nextCar() {
  selectedCarIndex = (selectedCarIndex + 1) % config.cars.length;
  render();

  const selectedCar = config.cars[selectedCarIndex];
  carEntity.setComponent("scene_ref", { value: selectedCar.sceneUUID });
  SDK3DVerse.engineAPI.commitChanges();
}

export async function toggleModEntityVis(index) {
  [modEntity] = await SDK3DVerse.engineAPI.findEntitiesByEUID(
    config.mods[index].sceneUUID
  );
  
  if(modEntity.isVisible()) {
    SDK3DVerse.engineAPI.setEntityVisibility(modEntity, false);
  } else {
    SDK3DVerse.engineAPI.setEntityVisibility(modEntity, true);
  }
}
