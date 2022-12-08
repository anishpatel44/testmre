import { AssetContainer, Context, User, log, Guid, Actor, ButtonBehavior } from "@microsoft/mixed-reality-extension-sdk";
import KioskComponent from "./components/kiosk.component";
import UiComponent from "./components/ui.component";
import MissionsComponent from "./components/missions.component";
import AnimationComponent from "./components/animation.component";

export default class VirtualPassportMre {
  public assets: AssetContainer;
  public kiosk: KioskComponent;
  public missions: MissionsComponent;
  public ui: UiComponent;
  private animations: AnimationComponent;
  public userKioskLight = new Map<Guid, Actor>();
  public isDisplay = new Map<Guid, boolean>();
  public missionListIsDisplay = new Map<Guid, boolean>();
  public userStamps = new Map<Guid, string[]>();
  public notification = new Map<Guid, Actor>();
  public allUserStamps: Actor[] = [];

  public constructor(public context: Context, public baseUrl: string) {
    this.assets = new AssetContainer(context);
    this.kiosk = new KioskComponent(this.context, this.assets);
    this.missions = new MissionsComponent(this);
    this.ui = new UiComponent(this.context, this.assets);
    this.animations = new AnimationComponent(this.context, this.assets);
    this.context.onStarted(() => this.started());
    this.context.onUserJoined((user) => this.userJoined(user));
  }

  private started() {
    log.info("app", "Starting up");
    for (let idx = 0; idx < 6; idx++) {
      this.kiosk.createKioskDisplay(idx);
    }
    this.missions.createWaka();
  }

  private async userJoined(user: User) {
    log.info("app", `user-joined: ${user.name}, ${user.id}`);

    //check the device used by the user
    //this will identify the positioning of the notifications
    const deviceModel: string[] = user.properties['device-model'].toLowerCase().split(' ');
    const keywords: string[] = ['oculus', 'quest', 'virtual', 'vr', 'headset'];
    const isHeadset: boolean = keywords.some(k => deviceModel.includes(k));

    //pre-load the notifications, stamps, and stamp counter
    this.notification.set(user.id, this.ui.createNotification(user, isHeadset));
    this.allUserStamps.push(this.notification.get(user.id));
    this.missions.stampCounter.set(user.id, 0);

    //create tracker
    //tracker will be the trigger for the collision on colliders for each rooms
    this.ui.createTracker(user);

    let userStamps: string[] = [];
    if (this.userStamps.get(user.id)) {
      userStamps = this.userStamps.get(user.id);
    }
    this.userStamps.set(user.id, userStamps);
    if (user.properties['altspacevr-roles']) {
      const welcomeStampButton = this.ui.createWelcomeStampButton(user);
      welcomeStampButton.setBehavior(ButtonBehavior).onClick(() => {
        user.prompt("Do you want to proceed on giving the welcome stamp?").then((res) => {
          if (res.submitted) {
            this.missions.createAccomplishedMissionBehavior(user, 0, 'welcome');
          }
        });
      });
    }
    this.kiosk.createKioskUtils(user, this.userStamps.get(user.id));
    this.missions.createMissionsUtils(user, this.notification.get(user.id));
  }
}
