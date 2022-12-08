import {
  Vector3,
  Vector3Like,
  Quaternion,
  DegreesToRadians
} from "@microsoft/mixed-reality-extension-sdk";

export default class GeometryMaterial {
  public setTrackerDimension(): Partial<Vector3Like> {
    return { x: 0.40, y: 0.60, z: 0.28 };
  }

  public setWelcomeStampButtonPosition(): Partial<Vector3Like> {
    return { x: 4.00, y: 0.08, z: -12.50 };
  }

  public setNotificationDimension(isHeadset: boolean): Vector3 {
    if (isHeadset) {
      return new Vector3(0.63, 0.19, 0.00);
    } else {
      return new Vector3(0.0315, 0.0095, 0.00);
    }
  }

  public setNotificationPosition(isHeadset: boolean): Vector3 {
    if (isHeadset) {
      return new Vector3(0.40, 0.20, 2.30);
    } else {
      return new Vector3(-0.018, 0.030, 0.06);
    }
  }

  public setCompletedNotificationScale(isHeadset: boolean): Vector3 {
    if (isHeadset) {
      return new Vector3(1.26, 3.27, 0.00);
    } else {
      return new Vector3(1.05, 2.725, 0.00);
    }
  }

  public setNormalScale(): Vector3 {
    return new Vector3(1.00, 1.00, 0.00);
  }

  public setCompletedNotificationPosition(isHeadset: boolean): Vector3 {
    if (isHeadset) {
      return new Vector3(0.00, 0.00, 0.1);
    } else {
      return new Vector3(-0.018, 0.023, 0.06);
    }
  }

  public setShowButtonDimension(): Partial<Vector3Like> {
    return { x: 0.25, y: 0.10, z: 0.00 };
  }

  public setKioskDisplayPosition(idx: number): Partial<Vector3Like> {
    switch (idx) {
      case 0: return { x: -14.006, y: 1.75, z: -8.29 };
      case 1: return { x: 14.006, y: 1.75, z: -8.29 };
      case 2: return { x: 12.24, y: 1.75, z: -29.41 };
      case 3: return { x: -12.12, y: 1.75, z: -29.41 };
      case 4: return { x: 16.67, y: 1.75, z: -60.99 };
      case 5: return { x: -12.12, y: 1.75, z: -60.21 };
    }
  }

  public setKioskDisplayRotation(idx: number): Partial<Vector3Like> {
    switch (idx) {
      case 0: return Quaternion.FromEulerAngles(-17 * DegreesToRadians, 0, 0,);
      case 1: return Quaternion.FromEulerAngles(-17 * DegreesToRadians, 0, 0,);
      case 2: return Quaternion.FromEulerAngles(-17 * DegreesToRadians, -90 * DegreesToRadians, 0,);
      case 3: return Quaternion.FromEulerAngles(-17 * DegreesToRadians, 90 * DegreesToRadians, 0,);
      case 4: return Quaternion.FromEulerAngles(-17 * DegreesToRadians, -90 * DegreesToRadians, 0,);
      case 5: return Quaternion.FromEulerAngles(-17 * DegreesToRadians, 90 * DegreesToRadians, 0,);
    }
  }

  public setShowMissionPosition(): Partial<Vector3Like> {
    return { x: -0.15, y: 0.00, z: 0.00 };
  }

  public setShowPassportPosition(): Partial<Vector3Like> {
    return { x: 0.15, y: 0.00, z: 0.00 };
  }

  public setMainDisplayPosition(): Partial<Vector3Like> {
    return { x: 0.00, y: 0.31, z: 0.005 };
  }

  public setPrimitiveLayerPosition(): Partial<Vector3Like> {
    return { x: 0.00, y: 0.00, z: 0.0001 };
  }

  public setPassportDimension(): Partial<Vector3Like> {
    return { x: 0.56, y: 0.47, z: 0.00 };
  }

  public setStampDimension(): Partial<Vector3Like> {
    return { x: 0.12, y: 0.12, z: 0.00 };
  }

  public setStampPosition(idx: number): Partial<Vector3Like> {
    switch (idx) {
      case 0: return { x: 0.078, y: 0.05, z: 0.0001 }; //ANZ
      case 1: return { x: -0.095, y: -0.02, z: 0.0001 }; //NZN
      case 2: return { x: 0.16, y: -0.08, z: 0.0001 }; //CHC
      case 3: return { x: -0.18, y: 0.065, z: 0.0001 }; //WLG
      case 4: return { x: 0.17, y: 0.085, z: 0.0001 }; //AKL
      case 5: return { x: -0.18, y: -0.11, z: 0.0001 }; //VNZ
    }

  }

  public setMissionListDimension(): Partial<Vector3Like> {
    return { x: 0.56, y: 0.47, z: 0.00 };
  }

  public setStrikethroughDimension(): Partial<Vector3Like> {
    return { x: 0.49, y: 0.004, z: 0.00 };
  }

  public setStrikethroughPosition(idx: number): Partial<Vector3Like> {
    switch (idx) {
      case 0: return { x: 0.00, y: 0.073, z: 0.00 };
      case 1: return { x: 0.00, y: 0.02, z: 0.00 };
      case 2: return { x: 0.00, y: -0.03, z: 0.00 };
      case 3: return { x: 0.00, y: -0.08, z: 0.00 };
      case 4: return { x: 0.00, y: -0.135, z: 0.00 };
      case 5: return { x: 0.00, y: -0.188, z: 0.00 };
    }
  }

  public setWakaPosition(): Partial<Vector3Like> {
    return { x: 0, y: 2.56, z: -38.10 };
  }

  public setWakaScale(): Partial<Vector3Like> {
    return { x: 0.40, y: 0.40, z: 0.40 };
  }

  public setWakaRotation(idx: number): Vector3Like {
    switch (idx) {
      case 0: return Quaternion.FromEulerAngles(-10 * DegreesToRadians, 95 * DegreesToRadians, 30 * DegreesToRadians);
      case 1: return Quaternion.FromEulerAngles(-10 * DegreesToRadians, 235 * DegreesToRadians, 30 * DegreesToRadians);
      case 2: return Quaternion.FromEulerAngles(-10 * DegreesToRadians, 295 * DegreesToRadians, 30 * DegreesToRadians);
      case 3: return Quaternion.FromEulerAngles(-10 * DegreesToRadians, 325 * DegreesToRadians, 30 * DegreesToRadians);
      case 4: return Quaternion.FromEulerAngles(-10 * DegreesToRadians, 95 * DegreesToRadians, 30 * DegreesToRadians);
    }
  }

  public setKioskGlowPosition(idx: number): Partial<Vector3Like> {
    switch (idx) {
      case 0: return { x: -14.006, y: 2.36, z: -7.60 };
      case 1: return { x: 14.006, y: 2.36, z: -7.60 };
      case 2: return { x: 11.55, y: 2.36, z: -29.41 };
      case 3: return { x: -11.43, y: 2.36, z: -29.41 };
      case 4: return { x: 15.98, y: 2.36, z: -60.99 };
      case 5: return { x: -11.43, y: 2.36, z: -60.21 }
    }
  }

  public setWakaGlowPosition(): Partial<Vector3Like> {
    return { x: 0.00, y: 2.16, z: -37.7 };
  }

  public setKiwiGlowPosition(): Partial<Vector3Like> {
    return { x: 17.30, y: 1.68, z: -69.50 };
  }

  public setColliderPosition(idx: number): Partial<Vector3Like> {
    switch (idx) {
      case 0: return { x: 14.87, y: 1.16, z: -19.80 };
      case 1: return { x: -12.69, y: 1.16, z: -75.80 };
      case 2: return { x: 14.38, y: 1.43, z: -68.50 };
    }
  }

  public setColliderDimension(idx: number): Partial<Vector3Like> {
    switch (idx) {
      case 0: return { x: 0.30, y: 1.5, z: 4.12 };
      case 1: return { x: 0.30, y: 1.5, z: 2.30 };
      case 2: return { x: 5.60, y: 1.5, z: 8.50 };
    }
  }

  public setKiwiPosition(): Partial<Vector3Like> {
    return { x: 17.12, y: 1.43, z: -69.50 };
  }

  public setKiwiScale(): Partial<Vector3Like> {
    return { x: 0.50, y: 0.50, z: 0.50 };
  }

  public setKiwiRotation(idx: number): Vector3Like {
    switch (idx) {
      case 0: return Quaternion.FromEulerAngles(0, -30 * DegreesToRadians, 0);
      case 1: return Quaternion.FromEulerAngles(0, -120 * DegreesToRadians, 0);
      case 2: return Quaternion.FromEulerAngles(0, -210 * DegreesToRadians, 0);
      case 3: return Quaternion.FromEulerAngles(0, -300 * DegreesToRadians, 0);
      case 4: return Quaternion.FromEulerAngles(0, -30 * DegreesToRadians, 0);
    }
  }

  public setBadgePosition(idx: number): Partial<Vector3Like> {
    switch (idx) {
      case 0: return { x: 0.12, y: -0.02, z: 0.15 };
      case 1: return { x: 0.12, y: -0.12, z: 0.15 };
    }
  }

  public setBadgeDimension(): Partial<Vector3Like> {
    return { x: 0.09, y: 0.09, z: 0.00 };
  }
}