import React from 'react';
import { Images } from 'mappls-map-react-native';

export const ClusterIconFunc = (item) => {
  const { status, category } = item;
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
      IconElement = <Images images={{ Busonline: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRBusicon}` }} />
    else if (status === "idle")
      IconElement = <Images images={{ Busidle: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${OBusicon}` }} />
    else if (status === "stopped")
      IconElement = <Images images={{ Busstopped: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${RBusicon}` }} />
    else if (status === "other")
      IconElement = <Images images={{ Busother: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${BBusicon}` }} />
    else if (status === "offline")
      IconElement = <Images images={{ Busoffline: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GBusicon}` }} />
    else if (status === "moving" || status === "towing")
      IconElement = <Images images={{ Busmoving: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRBusicon}` }} />
    else
      IconElement = <Images images={{ Bus: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GBusicon}` }} />
  } else if (category === "Truck") {
    if (status === "online")
      IconElement = <Images images={{ Truckonline: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRTruckicon}` }} />
    else if (status === "idle")
      IconElement = <Images images={{ Truckidle: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${OTruckicon}` }} />
    else if (status === "stopped")
      IconElement = <Images images={{ Truckstopped: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${RTruckicon}` }} />
    else if (status === "other")
      IconElement = <Images images={{ Truckother: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${BTruckicon}` }} />
    else if (status === "offline")
      IconElement = <Images images={{ Truckoffline: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GTruckicon}` }} />
    else if (status === "moving" || status === "towing")
      IconElement = <Images images={{ Truckmoving: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRTruckicon}` }} />
    else
      IconElement = <Images images={{ Truck: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GTruckicon}` }} />
  } else if (category === "Bike") {
    if (status === "online")
      IconElement = <Images images={{ Bikeonline: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRBikeicon}` }} />
    else if (status === "idle")
      IconElement = <Images images={{ Bikeidle: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${OBikeicon}` }} />
    else if (status === "stopped")
      IconElement = <Images images={{ Bikestopped: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${RBikeicon}` }} />
    else if (status === "other")
      IconElement = <Images images={{ Bikeother: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${BBikeicon}` }} />
    else if (status === "offline")
      IconElement = <Images images={{ Bikeoffline: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GBikeicon}` }} />
    else if (status === "moving" || status === "towing")
      IconElement = <Images images={{ Bikemoving: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRBikeicon}` }} />
    else
      IconElement = <Images images={{ Bike: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GBikeicon}` }} />
  } else if (category === "Pickups") {
    if (status === "online")
      IconElement = <Images images={{ Pickupsonline: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRPickupsicon}` }} />
    else if (status === "idle")
      IconElement = <Images images={{ Pickupsidle: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${OPickupsicon}` }} />
    else if (status === "stopped")
      IconElement = <Images images={{ Pickupsstopped: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${RPickupsicon}` }} />
    else if (status === "other")
      IconElement = <Images images={{ Pickupsother: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${BPickupsicon}` }} />
    else if (status === "offline")
      IconElement = <Images images={{ Pickupsoffline: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GPickupsicon}` }} />
    else if (status === "moving" || status === "towing")
      IconElement = <Images images={{ Pickupsmoving: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRPickupsicon}` }} />
    else
      IconElement = <Images images={{ Pickups: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GPickupsicon}` }} />
  } else if (category === "Car") {
    if (status === "online")
      IconElement = <Images images={{ Caronline: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRCaricon}` }} />
    else if (status === "idle")
      IconElement = <Images images={{ Caridle: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${OCaricon}` }} />
    else if (status === "stopped")
      IconElement = <Images images={{ Carstopped: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${RCaricon}` }} />
    else if (status === "other")
      IconElement = <Images images={{ Carother: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${BCaricon}` }} />
    else if (status === "offline")
      IconElement = <Images images={{ Caroffline: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GCaricon}` }} />
    else if (status === "moving" || status === "towing")
      IconElement = <Images images={{ Carmoving: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRCaricon}` }} />
    else
      IconElement = <Images images={{ Car: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GCaricon}` }} />
  } else if (category === "Taxi") {
    if (status === "online")
      IconElement = <Images images={{ Taxionline: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRTaxiicon}` }} />
    else if (status === "idle")
      IconElement = <Images images={{ Taxiidle: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${OTaxiicon}` }} />
    else if (status === "stopped")
      IconElement = <Images images={{ Taxistopped: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${RTaxiicon}` }} />
    else if (status === "other")
      IconElement = <Images images={{ Taxiother: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${BTaxiicon}` }} />
    else if (status === "offline")
      IconElement = <Images images={{ Taxioffline: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GTaxiicon}` }} />
    else if (status === "moving" || status === "towing")
      IconElement = <Images images={{ Taximoving: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRTaxiicon}` }} />
    else
      IconElement = <Images images={{ Taxi: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GTaxiicon}` }} />
  } else {
    if (status === "online")
      IconElement = <Images images={{ GRTruckicon: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRTruckicon}` }} />
    else if (status === "idle")
      IconElement = <Images images={{ OTruckicon: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${OTruckicon}` }} />
    else if (status === "stopped")
      IconElement = <Images images={{ RTruckicon: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${RTruckicon}` }} />
    else if (status === "other")
      IconElement = <Images images={{ BTruckicon: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${BTruckicon}` }} />
    else if (status === "offline")
      IconElement = <Images images={{ GTruckicon: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GTruckicon}` }} />
    else if (status === "moving" || status === "towing")
      IconElement = <Images images={{ GRTruckicon: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GRTruckicon}` }} />
    else
      IconElement = <Images images={{ GTruckicon: `https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/${GTruckicon}` }} />
  }
  return IconElement;
}