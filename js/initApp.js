import * as SceneLoader from "./SceneLoader.js";
import * as CarSelection from "./CarSelection.js";
import * as RimSelection from "./RimSelection.js";
import * as CarPaint from "./CarPaint.js";
import * as LightsViewOption from "./LightsViewOption.js";
import * as RotationViewOption from "./RotationViewOption.js";
import * as DoorOpeningOption from "./DoorOpeningOption.js";
import * as SharePrompt from "./SharePrompt.js";
import * as TimeoutOverlay from "./TimeoutOverlay.js";

// Expose UI components to global scope so their exports can handle UI events
// from our HTML
Object.assign(window, {
  UI: {
    CarSelection,
    RimSelection,
    CarPaint,
    LightsViewOption,
    RotationViewOption,
    DoorOpeningOption,
    TimeoutOverlay,
  },
});

async function initApp() {
  // Render all of our UI components in their initial states
  for (const uiComponent of [
    SceneLoader,
    CarSelection,
    RimSelection,
    CarPaint,
    LightsViewOption,
    RotationViewOption,
    DoorOpeningOption,
    SharePrompt,
    TimeoutOverlay,
  ]) {
    uiComponent.initUI();
  }

  // In order for us to load the current state information in the UI, we first
  // need to connect to 3dverse.
  await SceneLoader.setupLivelinkConnection();

  // Now we run after-connection setup for our UI components that need it
  for (const uiComponent of [
    CarSelection,
    RimSelection,
    CarPaint,
    LightsViewOption,
    RotationViewOption,
    DoorOpeningOption,
    TimeoutOverlay,
  ]) {
    uiComponent.setup();
  }
}

initApp();
