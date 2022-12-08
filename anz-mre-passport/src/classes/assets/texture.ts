import {
  AlphaMode,
  AssetContainer,
  Color3,
  Context,
  Material,
} from "@microsoft/mixed-reality-extension-sdk";
import { TextureUrl } from "../../constants/texture";

export default class TextureMaterial {
  private assets: AssetContainer;
  public showMission: Material;
  public showPassport: Material;
  public missionList: Material;
  public passport: Material;
  public close: Material;
  public closeLayer: Material;
  public notifications: Material[];
  public stamp: Material[] = [];
  public stampLayer: Material[] = [];
  public strikethrough: Material;
  public strikethroughLayer: Material;
  public badge: Material[] = [];

  public constructor(context: Context) {
    this.assets = new AssetContainer(context);

    const showMissionTexture = this.assets.createTexture("button", {
      uri: TextureUrl.showMission,
    });

    this.showMission = this.assets.createMaterial("button-material", {
      mainTextureId: showMissionTexture.id,
      alphaMode: AlphaMode.Blend,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: showMissionTexture.id
    });

    const showPassportTexture = this.assets.createTexture("button", {
      uri: TextureUrl.showPassport,
    });

    this.showPassport = this.assets.createMaterial("button-material", {
      mainTextureId: showPassportTexture.id,
      alphaMode: AlphaMode.Blend,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: showPassportTexture.id
    });


    const missionListTexture = this.assets.createTexture("display", {
      uri: TextureUrl.missionList,
    });

    this.missionList = this.assets.createMaterial("display-material", {
      mainTextureId: missionListTexture.id,
      alphaMode: AlphaMode.Blend,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: missionListTexture.id
    });

    const passportTexture = this.assets.createTexture("display", {
      uri: TextureUrl.passport,
    });

    this.passport = this.assets.createMaterial("display-material", {
      mainTextureId: passportTexture.id,
      alphaMode: AlphaMode.Blend,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: passportTexture.id
    });

    const closeTexture = this.assets.createTexture("button", {
      uri: TextureUrl.close,
    });

    this.close = this.assets.createMaterial("button-material", {
      mainTextureId: closeTexture.id,
      alphaMode: AlphaMode.Blend,
      alphaCutoff: 0.1,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: closeTexture.id
    });

    this.closeLayer = this.assets.createMaterial("button-material", {
      mainTextureId: closeTexture.id,
      alphaMode: AlphaMode.Mask,
      alphaCutoff: 0.5,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: closeTexture.id
    });

    const welcomeNotifTexture = this.assets.createTexture("utils", {
      uri: TextureUrl.welcomeNotif,
    });

    const welcomeNotif = this.assets.createMaterial("utils-material", {
      mainTextureId: welcomeNotifTexture.id,
      alphaMode: AlphaMode.Blend,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: welcomeNotifTexture.id
    });

    const wakaNotifTexture = this.assets.createTexture("utils", {
      uri: TextureUrl.wakaNotif,
    });

    const wakaNotif = this.assets.createMaterial("utils-material", {
      mainTextureId: wakaNotifTexture.id,
      alphaMode: AlphaMode.Blend,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: wakaNotifTexture.id
    });

    const multiNotifTexture = this.assets.createTexture("utils", {
      uri: TextureUrl.multiNotif,
    });

    const multiNotif = this.assets.createMaterial("utils-material", {
      mainTextureId: multiNotifTexture.id,
      alphaMode: AlphaMode.Blend,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: multiNotifTexture.id
    });

    const helpdeskNotifTexture = this.assets.createTexture("utils", {
      uri: TextureUrl.helpdeskNotif,
    });

    const helpdeskNotif = this.assets.createMaterial("utils-material", {
      mainTextureId: helpdeskNotifTexture.id,
      alphaMode: AlphaMode.Blend,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: helpdeskNotifTexture.id
    });

    const kiwiNotifTexture = this.assets.createTexture("utils", {
      uri: TextureUrl.kiwiNotif,
    });

    const kiwiNotif = this.assets.createMaterial("utils-material", {
      mainTextureId: kiwiNotifTexture.id,
      alphaMode: AlphaMode.Blend,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: kiwiNotifTexture.id
    });

    const hiddenNotifTexture = this.assets.createTexture("utils", {
      uri: TextureUrl.hiddenNotif,
    });

    const hiddenNotif = this.assets.createMaterial("utils-material", {
      mainTextureId: hiddenNotifTexture.id,
      alphaMode: AlphaMode.Blend,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: hiddenNotifTexture.id
    });

    const completedNotifTexture = this.assets.createTexture("utils", {
      uri: TextureUrl.completedNotif,
    });

    const completedNotif = this.assets.createMaterial("utils-material", {
      mainTextureId: completedNotifTexture.id,
      alphaMode: AlphaMode.Blend,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: completedNotifTexture.id
    });

    this.notifications = [welcomeNotif, wakaNotif, multiNotif, helpdeskNotif, kiwiNotif, hiddenNotif, completedNotif]

    const welcomeStampTexture = this.assets.createTexture("stamp", {
      uri: TextureUrl.welcomeStamp,
    });

    const welcomeStamp = this.assets.createMaterial("stamp-material", {
      mainTextureId: welcomeStampTexture.id,
      alphaMode: AlphaMode.Blend,
      alphaCutoff: 0.1,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: welcomeStampTexture.id
    });

    const wakaStampTexture = this.assets.createTexture("stamp", {
      uri: TextureUrl.wakaStamp,
    });

    const wakaStamp = this.assets.createMaterial("stamp-material", {
      mainTextureId: wakaStampTexture.id,
      alphaMode: AlphaMode.Blend,
      alphaCutoff: 0.1,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: wakaStampTexture.id
    });

    const multiStampTexture = this.assets.createTexture("stamp", {
      uri: TextureUrl.multiStamp,
    });

    const multiStamp = this.assets.createMaterial("stamp-material", {
      mainTextureId: multiStampTexture.id,
      alphaMode: AlphaMode.Blend,
      alphaCutoff: 0.1,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: multiStampTexture.id
    });

    const helpdeskStampTexture = this.assets.createTexture("stamp", {
      uri: TextureUrl.helpdeskStamp,
    });

    const helpdeskStamp = this.assets.createMaterial("stamp-material", {
      mainTextureId: helpdeskStampTexture.id,
      alphaMode: AlphaMode.Blend,
      alphaCutoff: 0.1,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: helpdeskStampTexture.id
    });

    const kiwiStampTexture = this.assets.createTexture("stamp", {
      uri: TextureUrl.kiwiStamp,
    });

    const kiwiStamp = this.assets.createMaterial("stamp-material", {
      mainTextureId: kiwiStampTexture.id,
      alphaMode: AlphaMode.Blend,
      alphaCutoff: 0.1,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: kiwiStampTexture.id
    });

    const hiddenStampTexture = this.assets.createTexture("stamp", {
      uri: TextureUrl.hiddenStamp,
    });

    const hiddenStamp = this.assets.createMaterial("stamp-material", {
      mainTextureId: hiddenStampTexture.id,
      alphaMode: AlphaMode.Blend,
      alphaCutoff: 0.1,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: hiddenStampTexture.id
    });
    this.stamp = [welcomeStamp, wakaStamp, multiStamp, helpdeskStamp, kiwiStamp, hiddenStamp]

    const welcomeStampLayer = this.assets.createMaterial("stamp-material", {
      mainTextureId: welcomeStampTexture.id,
      alphaMode: AlphaMode.Mask,
      alphaCutoff: 0.5,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: welcomeStampTexture.id
    });

    const wakaStampLayer = this.assets.createMaterial("stamp-material", {
      mainTextureId: wakaStampTexture.id,
      alphaMode: AlphaMode.Mask,
      alphaCutoff: 0.5,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: wakaStampTexture.id
    });

    const multiStampLayer = this.assets.createMaterial("stamp-material", {
      mainTextureId: multiStampTexture.id,
      alphaMode: AlphaMode.Mask,
      alphaCutoff: 0.5,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: multiStampTexture.id
    });

    const helpdeskStampLayer = this.assets.createMaterial("stamp-material", {
      mainTextureId: helpdeskStampTexture.id,
      alphaMode: AlphaMode.Mask,
      alphaCutoff: 0.5,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: helpdeskStampTexture.id
    });

    const kiwiStampLayer = this.assets.createMaterial("stamp-material", {
      mainTextureId: kiwiStampTexture.id,
      alphaMode: AlphaMode.Mask,
      alphaCutoff: 0.5,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: kiwiStampTexture.id
    });

    const hiddenStampLayer = this.assets.createMaterial("stamp-material", {
      mainTextureId: hiddenStampTexture.id,
      alphaMode: AlphaMode.Mask,
      alphaCutoff: 0.5,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: hiddenStampTexture.id
    });

    this.stampLayer = [welcomeStampLayer, wakaStampLayer, multiStampLayer, helpdeskStampLayer, kiwiStampLayer, hiddenStampLayer]


    const strikethroughTexture = this.assets.createTexture("indicator", {
      uri: TextureUrl.strikethrough,
    });

    this.strikethrough = this.assets.createMaterial("utils-material", {
      mainTextureId: strikethroughTexture.id,
      alphaMode: AlphaMode.Blend,
      alphaCutoff: 0.1,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: strikethroughTexture.id
    });

    this.strikethroughLayer = this.assets.createMaterial("utils-material", {
      mainTextureId: strikethroughTexture.id,
      alphaMode: AlphaMode.Mask,
      alphaCutoff: 0.5,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: strikethroughTexture.id
    });

    const welcomeBadgeTexture = this.assets.createTexture("badge", {
      uri: TextureUrl.welcomeBadge,
    });

    const welcomeBadge = this.assets.createMaterial("badge-material", {
      mainTextureId: welcomeBadgeTexture.id,
      alphaMode: AlphaMode.Blend,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: welcomeBadgeTexture.id
    });

    const passportBadgeTexture = this.assets.createTexture("badge", {
      uri: TextureUrl.passportBadge,
    });

    const passportBadge = this.assets.createMaterial("badge-material", {
      mainTextureId: passportBadgeTexture.id,
      alphaMode: AlphaMode.Blend,
      color: Color3.White(),
      emissiveColor: Color3.White(),
      emissiveTextureId: passportBadgeTexture.id
    });

    this.badge = [welcomeBadge, passportBadge];
  }
}
