export const ClusterTextFunc = (item) => {
  const { status, category, highlight, course } = item;
  let iconUrl = 'Car'

  if (category === "Bus") {
    if (status === "online")
      iconUrl = "Busonline"
    else if (status === "idle")
      iconUrl = "Busidle"
    else if (status === "stopped")
      iconUrl = "Busstopped"
    else if (status === "other")
      iconUrl = "Busother"
    else if (status === "offline")
      iconUrl = "Busoffline"
    else if (status === "moving" || status === "towing")
      iconUrl = "Busmoving"
    else
      iconUrl = "Bus"
  } else if (category === "Truck") {
    if (status === "online")
      iconUrl = "Truckonline"
    else if (status === "idle")
      iconUrl = "Truckidle"
    else if (status === "stopped")
      iconUrl = "Truckstopped"
    else if (status === "other")
      iconUrl = "Truckother"
    else if (status === "offline")
      iconUrl = "Truckoffline"
    else if (status === "moving" || status === "towing")
      iconUrl = "Truckmoving"
    else
      iconUrl = "Truck"
  } else if (category === "Bike") {
    if (status === "online")
      iconUrl = "Bikeonline"
    else if (status === "idle")
      iconUrl = "Bikeidle"
    else if (status === "stopped")
      iconUrl = "Bikestopped"
    else if (status === "other")
      iconUrl = "Bikeother"
    else if (status === "offline")
      iconUrl = "Bikeoffline"
    else if (status === "moving" || status === "towing")
      iconUrl = "Bikemoving"
    else
      iconUrl = "Bike"
  } else if (category === "Pickups") {
    if (status === "online")
      iconUrl = "Pickupsonline"
    else if (status === "idle")
      iconUrl = "Pickupsidle"
    else if (status === "stopped")
      iconUrl = "Pickupsstopped"
    else if (status === "other")
      iconUrl = "Pickupsother"
    else if (status === "offline")
      iconUrl = "Pickupsoffline"
    else if (status === "moving" || status === "towing")
      iconUrl = "Pickupsmoving"
    else
      iconUrl = "Pickups"
  } else if (category === "Car") {
    if (status === "online")
      iconUrl = "Caronline"
    else if (status === "idle")
      iconUrl = "Caridle"
    else if (status === "stopped")
      iconUrl = "Carstopped"
    else if (status === "other")
      iconUrl = "Carother"
    else if (status === "offline")
      iconUrl = "Caroffline"
    else if (status === "moving" || status === "towing")
      iconUrl = "Carmoving"
    else
      iconUrl = "Car"
  } else if (category === "Taxi") {
    if (status === "online")
      iconUrl = "Taxionline"
    else if (status === "idle")
      iconUrl = "Taxionline"
    else if (status === "stopped")
      iconUrl = "Taxiidle"
    else if (status === "other")
      iconUrl = "Taxistopped"
    else if (status === "offline")
      iconUrl = "Taxiother"
    else if (status === "moving" || status === "towing")
      iconUrl = "Taxioffline"
    else
      iconUrl = "Taximoving"
  } else {
    if (status === "online")
      iconUrl = "GRTruckicon"
    else if (status === "idle")
      iconUrl = "OTruckicon"
    else if (status === "stopped")
      iconUrl = "RTruckicon"
    else if (status === "other")
      iconUrl = "BTruckicon"
    else if (status === "offline")
      iconUrl = "GTruckicon"
    else if (status === "moving" || status === "towing")
      iconUrl = "GRTruckicon"
    else
      iconUrl = "GTruckicon"
  }

  return iconUrl
}