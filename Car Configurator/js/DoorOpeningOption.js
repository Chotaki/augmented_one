import { config } from "./config.js";
import { subscribeToEntityChanges } from "./utils-3dverse.js";

let doorOpened = false;

function render() {
  /** @type {HTMLElement} */ (
    document.getElementById("door-toggle")
  ).classList.toggle("Open", doorOpened);
}

export function initUI() {
  render();
}

/** @type {Entity} */
let carEntity;

/** @type {Entity} */
let isDoorOpenedTokenEntity;

export async function setup() {
  [carEntity] = await SDK3DVerse.engineAPI.findEntitiesByNames(
    config.carSceneRefName
  );
  // It's possible to subscribe to changes in animation state, but not yet
  // possible to ask if an animation is already taking place when joining a
  // session.
  //
  // In order to keep the UI in sync for all clients, the easiest
  // workaround is to keep an extra blank entity with a toggled 'tags'
  // component. Tags can be used to store custom data that isn't necessarily
  // able to be queried from 3dverse otherwise.
  [isDoorOpenedTokenEntity] =
    await SDK3DVerse.engineAPI.findEntitiesByEUID(
      config.isDoorOpenedTokenUUID,
    );
  subscribeToEntityChanges(isDoorOpenedTokenEntity, () => {
    doorOpened = isDoorOpenedTokenEntity
      .getComponent("tags")
      .value.includes("doorIsOpen");
    render();
  });
}

export function toggleDoor() {
  doorOpened = !doorOpened;
  render();

  if (doorOpened) {
    SDK3DVerse.engineAPI.playAnimationSequence(
      config.AnimationSequenceDoorOpeningUUID, {playbackSpeed : 1}, carEntity
    );
  } else {
    SDK3DVerse.engineAPI.playAnimationSequence(
        config.AnimationSequenceDoorOpeningUUID, {playbackSpeed : -1}, carEntity
    );
  }

  // We are going to use a blank entity in the scene to track the
  // rotation state until we have a way to query animation state
  isDoorOpenedTokenEntity.setComponent("tags", {
    value: doorOpened ? ["doorIsOpen"] : [],    
  });
  SDK3DVerse.engineAPI.commitChanges();
}
