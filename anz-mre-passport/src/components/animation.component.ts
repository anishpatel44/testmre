import {
    Actor,
    AssetContainer,
    ActorPath,
    Context
} from "@microsoft/mixed-reality-extension-sdk";
import GeometryMaterial from "../classes/assets/geometric";
import TextureMaterial from "../classes/assets/texture";

export default class AnimationComponent {
    private geometry: GeometryMaterial;
    private textures: TextureMaterial;

    constructor(private context: Context, private assets: AssetContainer) {
        this.geometry = new GeometryMaterial();
        this.textures = new TextureMaterial(context);
    }

    public async createWakaAnimation(waka: Actor) {
        const duration = 3;
        const wakaAnimData = this.assets.createAnimationData("waka-movement", {
            tracks: [{
                target: ActorPath("target").transform.local.rotation,
                keyframes: [{
                    time: 0 * duration,
                    value: this.geometry.setWakaRotation(0)
                }, {
                    time: 0.25 * duration,
                    value: this.geometry.setWakaRotation(1)
                }, {
                    time: 0.5 * duration,
                    value: this.geometry.setWakaRotation(2)
                }, {
                    time: 0.75 * duration,
                    value: this.geometry.setWakaRotation(3)
                }, {
                    time: 1 * duration,
                    value: this.geometry.setWakaRotation(4)
                }]
            }]
        });

        const wakaAnim = await wakaAnimData.bind({ target: waka });
        wakaAnim.play();
    }

    public async createKiwiAnimation(kiwi: Actor) {
        kiwi.transform.local.position.z = -69.35;
        const duration = 1.5;
        const kiwiAnimData = this.assets.createAnimationData("kiwi-movement", {
            tracks: [{
                target: ActorPath("target").transform.local.rotation,
                keyframes: [{
                    time: 0 * duration,
                    value: this.geometry.setKiwiRotation(0)
                }, {
                    time: 0.25 * duration,
                    value: this.geometry.setKiwiRotation(1)
                }, {
                    time: 0.5 * duration,
                    value: this.geometry.setKiwiRotation(2)
                }, {
                    time: 0.75 * duration,
                    value: this.geometry.setKiwiRotation(3)
                }, {
                    time: 1 * duration,
                    value: this.geometry.setKiwiRotation(4)
                }]
            }]
        });

        const kiwiAnim = await kiwiAnimData.bind({ target: kiwi });
        kiwiAnim.play();
    }

    public showNotification(actor: Actor, name: string, isHeadset: boolean) {
        switch (name) {
            case 'waka': actor.appearance.materialId = this.textures.notifications[1].id;
                actor.transform.local.position = this.geometry.setNotificationPosition(isHeadset);
                actor.transform.local.scale = this.geometry.setNormalScale();
                break;
            case 'multi': actor.appearance.materialId = this.textures.notifications[2].id;
                actor.transform.local.position = this.geometry.setNotificationPosition(isHeadset);
                actor.transform.local.scale = this.geometry.setNormalScale();
                break;
            case 'helpdesk': actor.appearance.materialId = this.textures.notifications[3].id;
                actor.transform.local.position = this.geometry.setNotificationPosition(isHeadset);
                actor.transform.local.scale = this.geometry.setNormalScale();
                break;
            case 'kiwi': actor.appearance.materialId = this.textures.notifications[4].id;
                actor.transform.local.position = this.geometry.setNotificationPosition(isHeadset);
                actor.transform.local.scale = this.geometry.setNormalScale();
                break;
            case 'hidden': actor.appearance.materialId = this.textures.notifications[5].id;
                actor.transform.local.position = this.geometry.setNotificationPosition(isHeadset);
                actor.transform.local.scale = this.geometry.setNormalScale();
                break;
            case 'completed': actor.appearance.materialId = this.textures.notifications[6].id;
                actor.transform.local.position = this.geometry.setCompletedNotificationPosition(isHeadset);
                actor.transform.local.scale = this.geometry.setCompletedNotificationScale(isHeadset);
                break;
        }
        actor.appearance.enabled = true;
        setTimeout(() => {
            actor.appearance.enabled = false;
        }, 5000)
    }
}