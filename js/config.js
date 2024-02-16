import templateJson from "../template.3dverse.js";

/** @typedef {keyof (typeof templateJson.assets)} AssetKey */

const assetIds = Object.entries(templateJson.assets).reduce(
  (assetIds, [name, { asset_id }]) => {
    assetIds[/** @type {AssetKey} */ (name)] = asset_id;
    return assetIds;
  },
  /** @type {Record<AssetKey, string>} */ ({}),
);

export const config = {
  // This public user token gives any app user read-only access to the scene.
  // Read-only access still permits temporary changes to the scene graph,
  // within the context of a session, and these changes will be synced with
  // other users connected to the same session. However the changes will not
  // be persisted.
  publicUserToken: templateJson.publicToken,
  sceneUUID: assetIds.SceneCarConfigurator,

  isAnimationActiveTokenEntityNameUUID: "b53c25bf-2031-4f75-aa7d-46919f9255bd",
  isDoorOpenedTokenUUID: "45abc18a-278f-4bfe-b906-f5ea76cfc589",

  carSceneRefName: "Car",
  rimSceneRefName: "fd5c8a38-f986-443f-b2f5-b0cecc22b060",
 
  colorChoices: /** @type {[number, number, number][]} */ ([
    [0, 0, 0],
    [1, 1, 1],
    [0.142, 0.142, 0.142],
    [0.243, 0.231, 0.203],
  ]),
  materials: [
    {
      name: "Metallic",
      matUUID: assetIds.MaterialMetallic,
    },
    {
      name: "Solid",
      matUUID: assetIds.MaterialSolid,
    },
    {
      name: "Matte",
      matUUID: assetIds.MaterialMatte,
    },
  ],
  rims: [
    {
      name: "Mansory FD.15 (21')",
      description: "Fully forged rims",
      price: "5,500",
      sceneUUID: assetIds.SceneMansoryRims,
    },
    {
      name: "Brabus Monoblock Z forged wheels",
      description: "Black and Red carbon rims",
      price: "4,760",
      sceneUUID: assetIds.SceneRocketRims,
    },
    {
      name: "OEM Factory Mercedes",
      description: "Original Mercedes manufactured rims",
      price: "2,370",
      sceneUUID: assetIds.SceneMercedesRims,
    },
  ],
  cars: [
    {
      name: "Brabus Rocket G900",
      price: "550,000",
      year: "2023",
      zeroToHundred: "2.8s",
      co2: "334-355",
      liters: "14.7-15.6",
      sceneUUID: assetIds.SceneMercedesGclass,
      paintMaterialUUID: assetIds.MaterialGclassPaint,
      headLightsMatUUID: assetIds.MaterialGclassHeadLights,
      rearLightsMatUUID: assetIds.MaterialGclassRearLights,
    },
  ],
  mods: [
    {
      sceneUUID: assetIds.MeshHood,
    },
    {
      sceneUUID: assetIds.MeshFrontProtection,
    },
    {
      sceneUUID: assetIds.MeshFrontBumper,
    },
    {
      sceneUUID: assetIds.MeshLips,
    },
    {
      sceneUUID: assetIds.MeshMudProtection,
    },
    {
      sceneUUID: assetIds.MeshBackBumper,
    },
    {
      sceneUUID: assetIds.MeshTrunk,
    },
  ],

  rotationAnimationSequenceUUID:
    templateJson.assets.AnimationSequenceRotation.asset_id,

  AnimationSequenceDoorOpeningUUID:
    templateJson.assets.AnimationSequenceDoorOpening.asset_id,
};
