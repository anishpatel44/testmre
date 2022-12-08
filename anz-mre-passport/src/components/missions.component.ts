import {
    Actor,
    User,
    ColliderType,
    Guid,
    ButtonBehavior,
    log,
} from "@microsoft/mixed-reality-extension-sdk";
import AnimationComponent from "./animation.component";
import GeometryMaterial from "../classes/assets/geometric";
import UiComponent from "./ui.component";
import App from "../app"

export default class MissionsComponent {
    private geometry: GeometryMaterial;
    private ui: UiComponent;
    public userWakaLight = new Map<Guid, Actor>();
    public userKiwiLight = new Map<Guid, Actor>();
    public notification = new Map<Guid, Actor>();
    public animations: AnimationComponent;
    public showPassportButton: Actor = null;
    public showMissionsButton: Actor = null;
    private hasUserBadge: boolean = false;
    public stampCounter = new Map<Guid, number>();

    constructor(private app: App) {
        this.geometry = new GeometryMaterial();
        this.createInteractions();
        this.ui = new UiComponent(app.context, app.assets);
        this.animations = new AnimationComponent(app.context, app.assets);
    }

    public createInteractions() {
        this.createWaka();
        this.createKiwi();
    }

    public createWaka() {
        const waka = Actor.CreateFromLibrary(this.app.context, {
            resourceId: `artifact:2117211256187257571`,
            actor: {
                name: "waka",
                transform: {
                    local: {
                        position: this.geometry.setWakaPosition(),
                        scale: this.geometry.setWakaScale(),
                        rotation: this.geometry.setWakaRotation(0)
                    },
                },
                collider: {
                    enabled: true,
                    geometry: {
                        shape: ColliderType.Box,
                    },
                }
            }
        });

        const wakaBehavior = waka.setBehavior(ButtonBehavior);
        wakaBehavior.onHover('enter', (user) => {
            this.userWakaLight.get(user.id).light.enabled = true;
        });

        wakaBehavior.onHover('exit', (user) => {
            this.userWakaLight.get(user.id).light.enabled = false;
        });

        wakaBehavior.onClick((user) => {
            this.animations.createWakaAnimation(waka);
            this.createAccomplishedMissionBehavior(user, 1, 'waka');
        })
    }

    public createMissionsUtils(user: User, notification: Actor) {
        this.notification.set(user.id, notification);
        this.createGlowLights(user);
        this.createRoomsCollider(user);
    }

    public createGlowLights(user: User) {
        const userWakaLight = this.ui.createGlowLight(user, 'waka');
        this.userWakaLight.set(user.id, userWakaLight);

        const userKiwiLight = this.ui.createGlowLight(user, 'kiwi');
        this.userKiwiLight.set(user.id, userKiwiLight);
    }

    public createRoomsCollider(user: User) {
        const triggerVolume: Actor[] = []
        const room = ['multi-purpose room', 'hidden lounge', 'helpdesk area']
        const idx = [2, 5, 3];
        const stampName = ['multi', 'hidden', 'helpdesk']
        for (let i = 0; i <= 2; i++) {
            triggerVolume[i] = this.ui.createCollider(user, i);
            triggerVolume[i].collider.onCollision('collision-enter', event => {
                if (event.otherActor.attachment) {
                    const userActor = this.app.context.user(event.otherActor.attachment.userId);
                    log.info("app", `${userActor.name} entered the ${room[i]}.`);
                    this.createAccomplishedMissionBehavior(userActor, idx[i], stampName[i]);
                }
            })
        }
    }

    public createKiwi() {
        const kiwi = Actor.CreateFromLibrary(this.app.context, {
            resourceId: `artifact:2127364915340509330`,
            actor: {
                name: "kiwi",
                transform: {
                    local: {
                        position: this.geometry.setKiwiPosition(),
                        scale: this.geometry.setKiwiScale(),
                        rotation: this.geometry.setKiwiRotation(0)
                    },
                },
                collider: {
                    enabled: true,
                    geometry: {
                        shape: ColliderType.Box,
                    },
                }
            }
        });

        const kiwiBehavior = kiwi.setBehavior(ButtonBehavior);
        kiwiBehavior.onHover('enter', (user) => {
            this.userKiwiLight.get(user.id).light.enabled = true;
        });

        kiwiBehavior.onHover('exit', (user) => {
            this.userKiwiLight.get(user.id).light.enabled = false;
        });

        kiwiBehavior.onClick((user) => {
            this.animations.createKiwiAnimation(kiwi);
            this.createAccomplishedMissionBehavior(user, 4, 'kiwi');
        });
    }

    public createAccomplishedMissionBehavior(user: User, idx: number, stampName: string) {
        const deviceModel: string[] = user.properties['device-model'].toLowerCase().split(' ');
        const keywords: string[] = ['oculus', 'quest', 'virtual', 'vr', 'headset'];
        const isHeadset: boolean = keywords.some(k => deviceModel.includes(k));
        const userStamps = this.app.userStamps.get(user.id);
        let stampCounter = this.stampCounter.get(user.id);
        if (stampCounter < 6) {
            if (!userStamps[idx]) {
                userStamps[idx] = stampName;

                this.animations.showNotification(this.notification.get(user.id), stampName, isHeadset);
                this.app.kiosk.destroyDisplay(user);
                if (this.app.kiosk.isPassportDisplayed.get(user.id)) {
                    this.app.kiosk.createPassport(user, userStamps);
                }
                if (this.app.kiosk.isMissionDisplayed.get(user.id)) {
                    this.app.kiosk.createMissionList(user, userStamps);
                }

                this.app.userStamps.set(user.id, userStamps);
                stampCounter++
                this.stampCounter.set(user.id, stampCounter);
            }
            if (stampCounter === 6 && !this.hasUserBadge) {
                setTimeout(() => {
                    this.hasUserBadge = true;
                    this.ui.createUserBadge(user, 'passport');
                    this.animations.showNotification(this.notification.get(user.id), 'completed', isHeadset);
                }, 5500)
            }
        }

    }
}