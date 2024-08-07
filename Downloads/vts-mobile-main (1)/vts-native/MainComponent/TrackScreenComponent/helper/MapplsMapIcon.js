import imagePath from '../../../constants/imagePath';

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

export const MapplsMapIcon = (item) => {
  const { status, category, highlight, course } = item;
  let iconUrl = OTruckicon

  if (category === "Bus") {
    if (status === "online")
      iconUrl = GRBusicon
    else if (status === "idle")
      iconUrl = OBusicon
    else if (status === "stopped")
      iconUrl = RBusicon
    else if (status === "other")
      iconUrl = BBusicon
    else if (status === "offline")
      iconUrl = GBusicon
    else if (status === "moving" || status === "towing")
      iconUrl = GRBusicon
    else
      iconUrl = GBusicon
  } else if (category === "Truck") {
    if (status === "online")
      iconUrl = GRTruckicon
    else if (status === "idle")
      iconUrl = OTruckicon
    else if (status === "stopped")
      iconUrl = RTruckicon
    else if (status === "other")
      iconUrl = BTruckicon
    else if (status === "offline")
      iconUrl = GTruckicon
    else if (status === "moving" || status === "towing")
      iconUrl = GRTruckicon
    else
      iconUrl = GTruckicon
  } else if (category === "Bike") {
    if (status === "online")
      iconUrl = GRBikeicon
    else if (status === "idle")
      iconUrl = OBikeicon
    else if (status === "stopped")
      iconUrl = RBikeicon
    else if (status === "other")
      iconUrl = BBikeicon
    else if (status === "offline")
      iconUrl = GBikeicon
    else if (status === "moving" || status === "towing")
      iconUrl = GRBikeicon
    else
      iconUrl = GBikeicon
  } else if (category === "Pickups") {
    if (status === "online")
      iconUrl = GRPickupsicon
    else if (status === "idle")
      iconUrl = OPickupsicon
    else if (status === "stopped")
      iconUrl = RPickupsicon
    else if (status === "other")
      iconUrl = BPickupsicon
    else if (status === "offline")
      iconUrl = GPickupsicon
    else if (status === "moving" || status === "towing")
      iconUrl = GRPickupsicon
    else
      iconUrl = GPickupsicon
  } else if (category === "Car") {
    if (status === "online")
      iconUrl = GRCaricon
    else if (status === "idle")
      iconUrl = OCaricon
    else if (status === "stopped")
      iconUrl = RCaricon
    else if (status === "other")
      iconUrl = BCaricon
    else if (status === "offline")
      iconUrl = GCaricon
    else if (status === "moving" || status === "towing")
      iconUrl = GRCaricon
    else
      iconUrl = GCaricon
  } else if (category === "Taxi") {
    if (status === "online")
      iconUrl = GRTaxiicon
    else if (status === "idle")
      iconUrl = OTaxiicon
    else if (status === "stopped")
      iconUrl = RTaxiicon
    else if (status === "other")
      iconUrl = BTaxiicon
    else if (status === "offline")
      iconUrl = GTaxiicon
    else if (status === "moving" || status === "towing")
      iconUrl = GRTaxiicon
    else
      iconUrl = GTaxiicon
  } else {
    if (status === "online")
      iconUrl = GRTruckicon
    else if (status === "idle")
      iconUrl = OTruckicon
    else if (status === "stopped")
      iconUrl = RTruckicon
    else if (status === "other")
      iconUrl = BTruckicon
    else if (status === "offline")
      iconUrl = GTruckicon
    else if (status === "moving" || status === "towing")
      iconUrl = GRTruckicon
    else
      iconUrl = GTruckicon
  }
  iconUrl = "https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/" + iconUrl
  return iconUrl
}

export const MapplsMapLocalIcon = (item) => {
  const { status, category, highlight, course } = item;
  let iconUrl = imagePath.GRBus

  if (category === "Bus") {
    if (status === "online")
      iconUrl = imagePath.GRBus
    else if (status === "idle")
      iconUrl = imagePath.OBus
    else if (status === "stopped")
      iconUrl = imagePath?.RBus
    else if (status === "other")
      iconUrl = imagePath?.BBus
    else if (status === "offline")
      iconUrl = imagePath.GBus
    else if (status === "moving" || status === "towing")
      iconUrl = imagePath.GRBus
    else
      iconUrl = GBus
  } else if (category === "Truck") {
    if (status === "online")
      iconUrl = imagePath.GRTruck
    else if (status === "idle")
      iconUrl = imagePath.OTruck
    else if (status === "stopped")
      iconUrl = imagePath?.RTruck
    else if (status === "other")
      iconUrl = imagePath?.BTruck
    else if (status === "offline")
      iconUrl = imagePath.GTruck
    else if (status === "moving" || status === "towing")
      iconUrl = imagePath.GRTruck
    else
      iconUrl = GTruck
  } else if (category === "Bike") {
    if (status === "online")
      iconUrl = imagePath.GRBike
    else if (status === "idle")
      iconUrl = imagePath.OBike
    else if (status === "stopped")
      iconUrl = imagePath?.RBike
    else if (status === "other")
      iconUrl = imagePath?.BBike
    else if (status === "offline")
      iconUrl = imagePath.GBike
    else if (status === "moving" || status === "towing")
      iconUrl = imagePath.GRBike
    else
      iconUrl = GBike
  } else if (category === "Pickups") {
    if (status === "online")
      iconUrl = imagePath.GRPickups
    else if (status === "idle")
      iconUrl = imagePath.OPickups
    else if (status === "stopped")
      iconUrl = imagePath?.RPickups
    else if (status === "other")
      iconUrl = imagePath?.BPickups
    else if (status === "offline")
      iconUrl = imagePath.GPickups
    else if (status === "moving" || status === "towing")
      iconUrl = imagePath.GRPickups
    else
      iconUrl = GPickups
  } else if (category === "Car") {
    if (status === "online")
      iconUrl = imagePath.GRCar
    else if (status === "idle")
      iconUrl = imagePath.OCar
    else if (status === "stopped")
      iconUrl = imagePath?.RCar
    else if (status === "other")
      iconUrl = imagePath?.BCar
    else if (status === "offline")
      iconUrl = imagePath.GCar
    else if (status === "moving" || status === "towing")
      iconUrl = imagePath.GRCar
    else
      iconUrl = GCar
  } else if (category === "Taxi") {
    if (status === "online")
      iconUrl = imagePath.GRCar
    else if (status === "idle")
      iconUrl = imagePath.OCar
    else if (status === "stopped")
      iconUrl = imagePath?.RCar
    else if (status === "other")
      iconUrl = imagePath?.BCar
    else if (status === "offline")
      iconUrl = imagePath.GCar
    else if (status === "moving" || status === "towing")
      iconUrl = imagePath.GRCar
    else
      iconUrl = GCar
  } else {
    if (status === "online")
      iconUrl = imagePath.GRBus
    else if (status === "idle")
      iconUrl = imagePath.OBus
    else if (status === "stopped")
      iconUrl = imagePath?.RBus
    else if (status === "other")
      iconUrl = imagePath?.BBus
    else if (status === "offline")
      iconUrl = imagePath.GBus
    else if (status === "moving" || status === "towing")
      iconUrl = imagePath.GRBus
    else
      iconUrl = GBusicon
  }
  // iconUrl = "https://jmcweblink.blob.core.windows.net/jmcfilelink/images/vts/" + iconUrl
  return iconUrl
}
