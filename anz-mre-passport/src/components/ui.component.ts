import {
    Actor,
    Context,
    AssetContainer,
    Color3,
    User,
    PrimitiveShape,
    RigidBodyConstraints,
    ColliderType
} from "@microsoft/mixed-reality-extension-sdk";
import GeometryMaterial from "../classes/assets/geometric";
import Textures from "../classes/assets/texture"

export default class UiComponent {
    private geometry: GeometryMaterial;
    private textures: Textures;

    constructor(private context: Context, private assets: AssetContainer) {
        this.geometry = new GeometryMaterial();
        this.textures = new Textures(context);
    }

    public createNotification(user: User, isHeadset: boolean): Actor {
        return Actor.CreatePrimitive(this.assets, {
            definition: {
                shape: PrimitiveShape.Box,
                dimensions: this.geometry.setNotificationDimension(isHeadset),
            },
            addCollider: true,
            actor: {
                exclusiveToUser: user.id,
                transform: {
                    local: {
                        position: this.geometry.setNotificationPosition(isHeadset),
                    },
                },
                appearance: {
                    materialId: this.textures.notifications[0].id,
                    enabled: false
                },
                attachment: {
                    attachPoint: "left-eye",
                    userId: user.id,
                },
            },
        });
    }

    public createWelcomeStampButton(user: User): Actor {
        return Actor.CreateFromLibrary(this.context, {
            resourceId: `artifact:2127364915340509330`,
            actor: {
                name: "waka",
                exclusiveToUser: user.id,
                transform: {
                    local: {
                        position: this.geometry.setWelcomeStampButtonPosition(),
                        scale: this.geometry.setKiwiScale(),
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
    }

    public createMultipleGlowLight(user: User, parentActor: string, count: number): Actor[] {
        const lights: Actor[] = [];

        for (let idx = 0; idx < count; idx++) {
            lights[idx] = Actor.Create(this.context, {
                actor: {
                    exclusiveToUser: user.id,
                    transform: {
                        local: {
                            position: this.geometry.setKioskGlowPosition(idx)
                        }
                    },
                    light: {
                        enabled: false,
                        color: Color3.FromHexString('#D16BFF'),
                        range: 6,
                        type: 'point',
                        intensity: 0.7
                    },
                    appearance: {
                        enabled: false
                    }
                }
            });
        }

        return lights;
    }

    public createGlowLight(user: User, parentActor: string): Actor {
        let position = null, range = null, intensity = null;
        switch (parentActor) {
            case 'waka': {
                position = this.geometry.setWakaGlowPosition();
                range = 5;
                intensity = 5.00;
                break;
            }
            case 'kiwi': {
                position = this.geometry.setKiwiGlowPosition();
                range = 0.50;
                intensity = 0.10;
                break;
            }
        }

        return Actor.Create(this.context, {
            actor: {
                exclusiveToUser: user.id,
                transform: {
                    local: {
                        position
                    }
                },
                light: {
                    enabled: false,
                    color: Color3.FromHexString('#D16BFF'),
                    range,
                    type: 'point',
                    intensity
                },
                appearance: {
                    enabled: false
                }
            }
        });
    }

    public createTracker(user: User): Actor {
        return Actor.CreatePrimitive(this.assets,
            {
                definition: {
                    shape: PrimitiveShape.Box,
                    dimensions: this.geometry.setTrackerDimension()
                },
                actor: {
                    attachment: {
                        attachPoint: 'spine-top',
                        userId: user.id
                    },
                    appearance: { enabled: false },
                    subscriptions: ['transform'],
                },
                addCollider: true
            }
        );
    }

    public createCollider(user: User, idx: number): Actor {
        return Actor.CreatePrimitive(this.assets,
            {
                definition: { shape: PrimitiveShape.Box },
                actor: {
                    exclusiveToUser: user.id,
                    rigidBody: { enabled: true, useGravity: false, constraints: [RigidBodyConstraints.FreezeAll] },
                    transform: {
                        local: {
                            scale: this.geometry.setColliderDimension(idx),
                            position: this.geometry.setColliderPosition(idx)
                        }
                    },
                    appearance: { enabled: false }
                },
                addCollider: true
            }
        );
    }

    public createUserBadge(user: User, type: string): Actor {
        return Actor.CreatePrimitive(this.assets, {
            definition: {
                shape: PrimitiveShape.Box,
                dimensions: this.geometry.setBadgeDimension(),
            },
            addCollider: true,
            actor: {
                transform: {
                    local: {
                        position: type === 'welcome' ? this.geometry.setBadgePosition(0) : this.geometry.setBadgePosition(1),
                    },
                },
                appearance: {
                    materialId: type === 'welcome' ? this.textures.badge[0].id : this.textures.badge[1].id,
                    enabled: true
                },
                attachment: {
                    attachPoint: "spine-top",
                    userId: user.id,
                },
            },
        });
    }
}