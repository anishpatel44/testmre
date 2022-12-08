import {
  Actor,
  Context,
  AssetContainer,
  User,
  PrimitiveShape,
  ColliderType,
  Guid,
  ButtonBehavior
} from "@microsoft/mixed-reality-extension-sdk";
import TextureMaterial from "../classes/assets/texture";
import GeometryMaterial from "../classes/assets/geometric";
import UiComponent from "./ui.component";

export default class KioskComponent {
  private geometry: GeometryMaterial;
  private textures: TextureMaterial;
  private ui: UiComponent;
  public userKioskLight = new Map<Guid, Actor[]>();
  private parentActor: Actor[] = [];
  public showPassportButton: Actor[] = [];
  public showMissionsButton: Actor[] = [];
  public missionList = new Map<Guid, Actor[]>();
  public strikethrough = new Map<Guid, Actor[][]>();
  public passport = new Map<Guid, Actor[]>();
  public stamps = new Map<Guid, Actor[][]>();
  public userStamps = new Map<Guid, string[]>();
  public isPassportDisplayed = new Map<Guid, boolean>();
  public isMissionDisplayed = new Map<Guid, boolean>();

  constructor(private context: Context, private assets: AssetContainer) {
    this.geometry = new GeometryMaterial();
    this.textures = new TextureMaterial(this.context);
    this.ui = new UiComponent(this.context, this.assets);
  }

  public createKioskDisplay(idx: number) {
    this.parentActor[idx] = Actor.Create(this.context, {
      actor: {
        transform: {
          local: {
            position: this.geometry.setKioskDisplayPosition(idx),
            rotation: this.geometry.setKioskDisplayRotation(idx)
          },
        }
      }
    });

    this.showMissionsButton[idx] = Actor.CreatePrimitive(this.assets, {
      definition: {
        shape: PrimitiveShape.Box,
        dimensions: this.geometry.setShowButtonDimension(),
      },
      actor: {
        parentId: this.parentActor[idx].id,
        transform: {
          local: {
            position: this.geometry.setShowMissionPosition()
          },
        },
        appearance: {
          materialId: this.textures.showMission.id
        },
        collider: {
          geometry: { shape: ColliderType.Box },
        },
      },
    });

    this.showPassportButton[idx] = Actor.CreatePrimitive(this.assets, {
      definition: {
        shape: PrimitiveShape.Box,
        dimensions: this.geometry.setShowButtonDimension(),
      },
      actor: {
        parentId: this.parentActor[idx].id,
        transform: {
          local: {
            position: this.geometry.setShowPassportPosition()
          },
        },
        appearance: {
          materialId: this.textures.showPassport.id
        },
        collider: {
          geometry: { shape: ColliderType.Box },
        },
      },
    });

    const showPassportBehavior = this.showPassportButton[idx].setBehavior(ButtonBehavior);
    const showMissionsBehavior = this.showMissionsButton[idx].setBehavior(ButtonBehavior);

    showPassportBehavior.onHover('enter', (user) => {
      this.userKioskLight.get(user.id).forEach((actor) => {
        actor.light.enabled = true;
      })
    });

    showMissionsBehavior.onHover('enter', (user) => {
      this.userKioskLight.get(user.id).forEach((actor) => {
        actor.light.enabled = true;
      })
    });

    showPassportBehavior.onHover('exit', (user) => {
      this.userKioskLight.get(user.id).forEach((actor) => {
        actor.light.enabled = false;
      })
    });

    showMissionsBehavior.onHover('exit', (user) => {
      this.userKioskLight.get(user.id).forEach((actor) => {
        actor.light.enabled = false;
      })
    });

    showPassportBehavior.onClick((user) => {
      this.createPassport(user, this.userStamps.get(user.id));
      this.isMissionDisplayed.set(user.id, false);
    });

    showMissionsBehavior.onClick((user) => {
      this.createMissionList(user, this.userStamps.get(user.id));
      this.isPassportDisplayed.set(user.id, false);
    });
  }

  public createKioskUtils(user: User, userStamps: string[]) {
    this.createKioskGlowLight(user);
    this.userStamps.set(user.id, userStamps);
    this.isPassportDisplayed.set(user.id, false);
    this.isMissionDisplayed.set(user.id, false);
  }
  public createKioskGlowLight(user: User) {
    const userKioskLight = this.ui.createMultipleGlowLight(user, 'kiosk', 6);
    this.userKioskLight.set(user.id, userKioskLight);
  }

  public createPassport(user: User, userStamps: string[]) {
    const passport: Actor[] = [];
    const stamps: Actor[][] = [[], [], [], [], [], []];
    const stampsLayer: Actor[][] = [[], [], [], [], [], []];
    this.destroyDisplay(user);

    this.parentActor.forEach((el, idx) => {
      passport[idx] = Actor.CreatePrimitive(this.assets, {
        definition: {
          shape: PrimitiveShape.Box,
          dimensions: this.geometry.setPassportDimension(),
        },
        actor: {
          exclusiveToUser: user.id,
          parentId: this.parentActor[idx].id,
          transform: {
            local: {
              position: this.geometry.setMainDisplayPosition()
            },
          },
          appearance: {
            materialId: this.textures.passport.id,
            enabled: true
          },
          collider: {
            geometry: { shape: ColliderType.Box },
          },
        },
      });

      for (let i = 0; i <= 5; i++) {
        stamps[idx][i] = Actor.CreatePrimitive(this.assets, {
          definition: {
            shape: PrimitiveShape.Box,
            dimensions: this.geometry.setStampDimension(),
          },
          addCollider: true,
          actor: {
            exclusiveToUser: user.id,
            parentId: passport[idx].id,
            transform: {
              local: {
                position: this.geometry.setStampPosition(i)
              },
            },
            appearance: {
              materialId: this.textures.stamp[i].id,
              enabled: userStamps[i] ? true : false
            },
          },
        });

        stampsLayer[idx][i] = Actor.CreatePrimitive(this.assets, {
          definition: {
            shape: PrimitiveShape.Box,
            dimensions: this.geometry.setStampDimension(),
          },
          addCollider: true,
          actor: {
            exclusiveToUser: user.id,
            parentId: stamps[idx][i].id,
            transform: {
              local: {
                position: this.geometry.setPrimitiveLayerPosition()
              },
            },
            appearance: {
              materialId: this.textures.stampLayer[i].id,
            },
          },
        });
      }
    })

    this.passport.set(user.id, passport)
    this.stamps.set(user.id, stamps)
    this.isPassportDisplayed.set(user.id, true);
  }

  public createMissionList(user: User, userStamps: string[]) {
    const missionList: Actor[] = [];
    const strikethrough: Actor[][] = [[], [], [], [], [], []];
    const strikethroughLayer: Actor[][] = [[], [], [], [], [], []];
    this.destroyDisplay(user);

    this.parentActor.forEach((el, idx) => {
      missionList[idx] = Actor.CreatePrimitive(this.assets, {
        definition: {
          shape: PrimitiveShape.Box,
          dimensions: this.geometry.setMissionListDimension(),
        },
        actor: {
          exclusiveToUser: user.id,
          parentId: this.parentActor[idx].id,
          transform: {
            local: {
              position: this.geometry.setMainDisplayPosition()
            },
          },
          appearance: {
            materialId: this.textures.missionList.id,
            enabled: true
          },
          collider: {
            geometry: { shape: ColliderType.Box },
          },
        },
      });

      for (let i = 0; i <= 5; i++) {
        strikethrough[idx][i] = Actor.CreatePrimitive(this.assets, {
          definition: {
            shape: PrimitiveShape.Box,
            dimensions: this.geometry.setStrikethroughDimension(),
          },
          addCollider: true,
          actor: {
            exclusiveToUser: user.id,
            parentId: missionList[idx].id,
            transform: {
              local: {
                position: this.geometry.setStrikethroughPosition(i),
              },
            },
            appearance: {
              materialId: this.textures.strikethrough.id,
              enabled: userStamps[i] ? true : false
            },
          },
        });

        strikethroughLayer[idx][i] = Actor.CreatePrimitive(this.assets, {
          definition: {
            shape: PrimitiveShape.Box,
            dimensions: this.geometry.setStrikethroughDimension(),
          },
          addCollider: true,
          actor: {
            exclusiveToUser: user.id,
            parentId: strikethrough[idx][i].id,
            transform: {
              local: {
                position: this.geometry.setPrimitiveLayerPosition(),
              },
            },
            appearance: {
              materialId: this.textures.strikethroughLayer.id,
            },
          },
        });
      }
    });

    this.missionList.set(user.id, missionList);
    this.strikethrough.set(user.id, strikethrough);
    this.isMissionDisplayed.set(user.id, true);
  }

  public destroyPassport(user: User) {
    if (this.passport.get(user.id)) {
      this.isPassportDisplayed.set(user.id, false);
      this.passport.get(user.id).forEach((passport) => {
        passport.destroy();
      });
      this.passport.delete(user.id);
      this.stamps.get(user.id).forEach((stampArray) => {
        stampArray.forEach((stamp) => {
          stamp.destroy();
        });
      });
      this.stamps.delete(user.id);
    }
  }

  public destroyMissions(user: User) {
    if (this.missionList.get(user.id)) {
      this.isMissionDisplayed.set(user.id, false);
      this.missionList.get(user.id).forEach((mission) => {
        mission.destroy();
      });
      this.missionList.delete(user.id);
      this.strikethrough.get(user.id).forEach((strikeArray) => {
        strikeArray.forEach((strike) => {
          strike.destroy();
        })
      });
      this.strikethrough.delete(user.id);
    }
  }

  public destroyDisplay(user: User) {
    if (this.passport.has(user.id)) {
      this.passport.get(user.id).forEach((passport) => {
        passport.destroy();
      });
      this.passport.delete(user.id);
      this.stamps.get(user.id).forEach((stampArray) => {
        stampArray.forEach((stamp) => {
          stamp.destroy();
        });
      });
      this.stamps.delete(user.id);
    }
    if (this.missionList.has(user.id)) {
      this.missionList.get(user.id).forEach((mission) => {
        mission.destroy();
      });
      this.missionList.delete(user.id);
      this.strikethrough.get(user.id).forEach((strikeArray) => {
        strikeArray.forEach((strike) => {
          strike.destroy();
        })
      });
      this.strikethrough.delete(user.id);
    }
  }
}
