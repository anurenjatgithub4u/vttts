import React from 'react';
import { Images } from 'mappls-map-react-native';

export const ClusterIconFunc = (item) => {
  const { status, category, highlight, course } = item;
  let IconElement = <Images images={{ iconRotate: 200, Busonline: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${OTruckicon}` }} />

  let BTruckicon = 'BTruck.png';
  let GTruckicon = 'GTruck.png';
  let GRTruckicon = 'GRTruck.png';
  let OTruckicon = 'OTruck.png';
  let RTruckicon = 'RTruck.png';
  let BBikeicon = 'BBike.png';
  let GBikeicon = 'GBike.png';
  let GRBikeicon = 'GRBike.png';
  let OBikeicon = 'OBike.png';
  let RBikeicon = 'RBike.png';
  let BBusicon = 'BBus.png';
  let GBusicon = 'GBus.png';
  let GRBusicon = 'GRBus.png';
  let OBusicon = 'OBus.png';
  let RBusicon = 'RBus.png';
  let BCaricon = 'BCar.png';
  let GCaricon = 'GCar.png';
  let GRCaricon = 'GRCar.png';
  let OCaricon = 'OCar.png';
  let RCaricon = 'RCar.png';
  let BPickupsicon = 'BPickups.png';
  let GPickupsicon = 'GPickups.png';
  let GRPickupsicon = 'GRPickups.png';
  let OPickupsicon = 'OPickups.png';
  let RPickupsicon = 'RPickups.png';
  let BTaxiicon = 'bc.png';
  let GTaxiicon = 'grc.png';
  let GRTaxiicon = 'gc.png';
  let OTaxiicon = 'oc.png';
  let RTaxiicon = 'rc.png';

  if (category === "Bus") {
    if (status === "online")
      IconElement = <Images images={{ /* iconRotate: 200, */ Busonline: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRBusicon}` }} />
    else if (status === "idle")
      IconElement = <Images images={{ /* iconRotate: 200, */ Busidle: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${OBusicon}` }} />
    else if (status === "stopped")
      IconElement = <Images images={{ /* iconRotate: 200, */ Busstopped: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${RBusicon}` }} />
    else if (status === "other")
      IconElement = <Images images={{ /* iconRotate: 200, */ Busother: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${BBusicon}` }} />
    else if (status === "offline")
      IconElement = <Images images={{ /* iconRotate: 200, */ Busoffline: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GBusicon}` }} />
    else if (status === "moving" || status === "towing")
      IconElement = <Images images={{ /* iconRotate: 200, */ Busmoving: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRBusicon}` }} />
    else
      IconElement = <Images images={{ /* iconRotate: 200, */ Bus: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GBusicon}` }} />
  } else if (category === "Truck") {
    if (status === "online")
      IconElement = <Images images={{ /* iconRotate: 200, */ Truckonline: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRTruckicon}` }} />
    else if (status === "idle")
      IconElement = <Images images={{ /* iconRotate: 200, */ Truckidle: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${OTruckicon}` }} />
    else if (status === "stopped")
      IconElement = <Images images={{ /* iconRotate: 200, */ Truckstopped: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${RTruckicon}` }} />
    else if (status === "other")
      IconElement = <Images images={{ /* iconRotate: 200, */ Truckother: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${BTruckicon}` }} />
    else if (status === "offline")
      IconElement = <Images images={{ /* iconRotate: 200, */ Truckoffline: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GTruckicon}` }} />
    else if (status === "moving" || status === "towing")
      IconElement = <Images images={{ /* iconRotate: 200, */ Truckmoving: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRTruckicon}` }} />
    else
      IconElement = <Images images={{ /* iconRotate: 200, */ Truck: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GTruckicon}` }} />
  } else if (category === "Bike") {
    if (status === "online")
      IconElement = <Images images={{ /* iconRotate: 200, */ Bikeonline: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRBikeicon}` }} />
    else if (status === "idle")
      IconElement = <Images images={{ /* iconRotate: 200, */ Bikeidle: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${OBikeicon}` }} />
    else if (status === "stopped")
      IconElement = <Images images={{ /* iconRotate: 200, */ Bikestopped: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${RBikeicon}` }} />
    else if (status === "other")
      IconElement = <Images images={{ /* iconRotate: 200, */ Bikeother: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${BBikeicon}` }} />
    else if (status === "offline")
      IconElement = <Images images={{ /* iconRotate: 200, */ Bikeoffline: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GBikeicon}` }} />
    else if (status === "moving" || status === "towing")
      IconElement = <Images images={{ /* iconRotate: 200, */ Bikemoving: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRBikeicon}` }} />
    else
      IconElement = <Images images={{ /* iconRotate: 200, */ Bike: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GBikeicon}` }} />
  } else if (category === "Pickups") {
    if (status === "online")
      IconElement = <Images images={{ /* iconRotate: 200, */ Pickupsonline: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRPickupsicon}` }} />
    else if (status === "idle")
      IconElement = <Images images={{ /* iconRotate: 200, */ Pickupsidle: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${OPickupsicon}` }} />
    else if (status === "stopped")
      IconElement = <Images images={{ /* iconRotate: 200, */ Pickupsstopped: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${RPickupsicon}` }} />
    else if (status === "other")
      IconElement = <Images images={{ /* iconRotate: 200, */ Pickupsother: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${BPickupsicon}` }} />
    else if (status === "offline")
      IconElement = <Images images={{ /* iconRotate: 200, */ Pickupsoffline: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GPickupsicon}` }} />
    else if (status === "moving" || status === "towing")
      IconElement = <Images images={{ /* iconRotate: 200, */ Pickupsmoving: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRPickupsicon}` }} />
    else
      IconElement = <Images images={{ /* iconRotate: 200, */ Pickups: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GPickupsicon}` }} />
  } else if (category === "Car") {
    if (status === "online")
      IconElement = <Images images={{ /* iconRotate: 200, */ Caronline: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRCaricon}` }} />
    else if (status === "idle")
      IconElement = <Images images={{ /* iconRotate: 200, */ Caridle: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${OCaricon}` }} />
    else if (status === "stopped")
      IconElement = <Images images={{ /* iconRotate: 200, */ Carstopped: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${RCaricon}` }} />
    else if (status === "other")
      IconElement = <Images images={{ /* iconRotate: 200, */ Carother: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${BCaricon}` }} />
    else if (status === "offline")
      IconElement = <Images images={{ /* iconRotate: 200, */ Caroffline: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GCaricon}` }} />
    else if (status === "moving" || status === "towing")
      IconElement = <Images images={{ /* iconRotate: 200, */ Carmoving: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRCaricon}` }} />
    else
      IconElement = <Images images={{ /* iconRotate: 200, */ Car: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GCaricon}` }} />
  } else if (category === "Taxi") {
    if (status === "online")
      IconElement = <Images images={{ /* iconRotate: 200, */ Taxionline: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRTaxiicon}` }} />
    else if (status === "idle")
      IconElement = <Images images={{ /* iconRotate: 200, */ Taxiidle: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${OTaxiicon}` }} />
    else if (status === "stopped")
      IconElement = <Images images={{ /* iconRotate: 200, */ Taxistopped: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${RTaxiicon}` }} />
    else if (status === "other")
      IconElement = <Images images={{ /* iconRotate: 200, */ Taxiother: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${BTaxiicon}` }} />
    else if (status === "offline")
      IconElement = <Images images={{ /* iconRotate: 200, */ Taxioffline: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GTaxiicon}` }} />
    else if (status === "moving" || status === "towing")
      IconElement = <Images images={{ /* iconRotate: 200, */ Taximoving: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRTaxiicon}` }} />
    else
      IconElement = <Images images={{ /* iconRotate: 200, */ Taxi: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GTaxiicon}` }} />
  } else {
    if (status === "online")
      IconElement = <Images images={{ /* iconRotate: 200, */ GRTruckicon: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRTruckicon}` }} />
    else if (status === "idle")
      IconElement = <Images images={{ /* iconRotate: 200, */ OTruckicon: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${OTruckicon}` }} />
    else if (status === "stopped")
      IconElement = <Images images={{ /* iconRotate: 200, */ RTruckicon: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${RTruckicon}` }} />
    else if (status === "other")
      IconElement = <Images images={{ /* iconRotate: 200, */ BTruckicon: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${BTruckicon}` }} />
    else if (status === "offline")
      IconElement = <Images images={{ /* iconRotate: 200, */ GTruckicon: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GTruckicon}` }} />
    else if (status === "moving" || status === "towing")
      IconElement = <Images images={{ /* iconRotate: 200, */ GRTruckicon: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRTruckicon}` }} />
    else
      IconElement = <Images images={{ /* iconRotate: 200, */ GTruckicon: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GTruckicon}` }} />
  }
  return IconElement;
}