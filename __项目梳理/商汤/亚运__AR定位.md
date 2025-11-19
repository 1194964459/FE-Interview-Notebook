# GPS、蓝牙、IMU数据
 AR 核心技术（ios收集的ARKit，谷歌安卓手机的ARCore）

安卓：senseSlam，用到的IMU数据：
    设备方向
    陀螺仪
    加速度计

蓝牙：
```js
OnBeaconUpdate(){
    // 清除10s 前的过期数据

    // uuid：ibeacon设备的「分组标识」，用于区分 不同的应用/场景/厂商。如：某商场的所有 iBeacon 设备可以共用一个 uuid
    // major（主标识符）：
        // 假设某商场的 uuid 是固定的，那么：
        // 1 楼所有 iBeacon 的 major = 1
        // 2 楼所有 iBeacon 的 major = 2
    // minor：
        // 商场 1 楼（major = 1）内：
        // 1 楼门口的 iBeacon minor = 101
        // 1 楼服装区的 iBeacon minor = 102
    beacons.forEach((ibeacon) => {
      const beaconInfo = {} as BeaconInfo;
      beaconInfo.uuid = ibeacon.uuid;
      beaconInfo.major = ibeacon.major;
      beaconInfo.minor = ibeacon.minor;
      beaconInfo.rssi = ibeacon.rssi == 0 ? -97 : ibeacon.rssi;
      beaconInfo.timestamp = timestamp;

        let key = Number(beaconInfo.major) + Number(beaconInfo.minor);

        this.m_DataMap.set(key, beacons);
    })
}
```

## 云端定位算法 
![云端定位算法](./icon/云端定位算法.png)