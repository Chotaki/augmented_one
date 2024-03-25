import { config } from "./config.js";
import { subscribeToEntityChanges } from "./utils-3dverse.js";

let selectedRimIndex = 0;

export function getselectedRimIndex() {
  return selectedRimIndex;
}

const template = Handlebars.compile(
  /** @type {HTMLElement} */ (document.getElementById("rim-heading-template"))
    .innerHTML
);

function render() {
  const selectedRim = config.rims[selectedRimIndex];
  /** @type {HTMLElement} */ (
    document.getElementById("rim-heading")
  ).innerHTML = template({
    name_rims: selectedRim.name,
    description_rims: selectedRim.description,
    price_rims: selectedRim.price,
  });
}

export function initUI() {
  render();
}
/** @type {EntityTemplate} */
const entityTemplate = new SDK3DVerse.EntityTemplate();


/** @type {Entity} */
let rimEntity;

export async function setup() {
  entityTemplate.attachComponent("scene_ref", {'value' : config.rims.findIndex({ sceneUUID })});
  rimEntity = instantiateEntity(entityTemplate);
  [rimEntity] = await SDK3DVerse.engineAPI.findEntitiesByEUID(
    config.rimSceneRefName
  );
  if (selectedRimIndex !== undefined){
    console.log("selectedRimIndex is somehow undefined...")
  }
  subscribeToEntityChanges(rimEntity, () => {
    selectedRimIndex = config.rims.findIndex(({ sceneUUID }) => {
      return rimEntity.getComponent("scene_ref").value === sceneUUID;
    });
    render();
  });
}

export function nextRim() {
  console.log(selectedRimIndex);
  selectedRimIndex = (selectedRimIndex + 1) % config.rims.length;
  render();

  const selectedRim = config.rims[selectedRimIndex];
  rimEntity.setComponent("scene_ref", { value: selectedRim.sceneUUID });
  SDK3DVerse.engineAPI.commitChanges();
}
