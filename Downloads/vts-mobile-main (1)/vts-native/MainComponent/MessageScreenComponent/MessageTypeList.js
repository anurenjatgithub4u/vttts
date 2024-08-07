import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';//warning-outline
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';//my-location/alt-route

export const MessageTypeList = (item, onSelectedId) => {
  const { alerttype, id } = item;
  const deviceUnknown = <MaterialCommunityIcons name={onSelectedId === id ? 'check' : 'car-info'} color={'#ffffff'} size={21} />;
  const newGeofence = <Ionicons name={onSelectedId === id ? 'checkmark' : 'locate-outline'} color={'#FA9826'} size={21} />;
  const geofenceExit = <Ionicons name={onSelectedId === id ? 'checkmark' : 'locate-outline'} color={'#FA9826'} size={21} />;
  const deviceOffline = <MaterialCommunityIcons name={onSelectedId === id ? 'check' : 'car-off'} color={'#ffffff'} size={21} />;
  const geofenceEnter = <Ionicons name={onSelectedId === id ? 'checkmark' : 'locate-outline'} color={'#FA9826'} size={21} />;
  const routeDeviation = <MaterialIcons name={onSelectedId === id ? 'check' : 'alt-route'} color={'#7DCB81'} size={21} />;
  const deviceOnline = <MaterialCommunityIcons name={onSelectedId === id ? 'check' : 'car-connected'} color={'#ffffff'} size={21} />;
  const ignitionOff = <AntDesign name={onSelectedId === id ? 'check' : 'warning'} color={'#F25555'} size={21} />;
  const deviceMoving = <Feather name={onSelectedId === id ? 'check' : 'truck'} color={'#ffffff'} size={21} />;
  const deviceOverspeed = <Feather name={onSelectedId === id ? 'check' : 'truck'} color={'#ffffff'} size={21} />;
  const ignitionOn = <Feather name={onSelectedId === id ? 'check' : 'truck'} color={'#F25555'} size={21} />;
  const driverChanged = <Feather name={onSelectedId === id ? 'check' : 'truck'} color={'#ffffff'} size={21} />;
  const deviceStopped = <Feather name={onSelectedId === id ? 'check' : 'truck'} color={'#ffffff'} size={21} />;
  const alarm = <Feather name={onSelectedId === id ? 'check' : 'truck'} color={'#ffffff'} size={21} />;
  const deviceFuelDrop = <MaterialIcons name={onSelectedId === id ? 'check' : 'local-car-wash'} color={'#ffffff'} size={21} />;
  const maintenance = <Feather name={onSelectedId === id ? 'check' : 'truck'} color={'#ffffff'} size={21} />;
  const routeDelay = <MaterialIcons name={onSelectedId === id ? 'check' : 'alt-route'} color={'#7DCB81'} size={21} />;
  const deviceInactive = <MaterialCommunityIcons name={onSelectedId === id ? 'check' : 'car-info'} color={'#ffffff'} size={21} />;
  const textMessage = <Feather name={onSelectedId === id ? 'check' : 'truck'} color={'#ffffff'} size={21} />;
  const commandResult = <Feather name={onSelectedId === id ? 'check' : 'truck'} color={'#ffffff'} size={21} />;

  let iconUrl = deviceUnknown;

  if (alerttype === "deviceUnknown") {
    iconUrl = deviceUnknown
  } else if (alerttype === "newGeofence") {
    iconUrl = newGeofence
  } else if (alerttype === "geofenceExit") {
    iconUrl = geofenceExit
  } else if (alerttype === "deviceOffline") {
    iconUrl = deviceOffline
  } else if (alerttype === "geofenceEnter") {
    iconUrl = geofenceEnter
  } else if (alerttype === "routeDeviation") {
    iconUrl = routeDeviation
  } else if (alerttype === "deviceOnline") {
    iconUrl = deviceOnline
  } else if (alerttype === "ignitionOff") {
    iconUrl = ignitionOff
  } else if (alerttype === "deviceMoving") {
    iconUrl = deviceMoving
  } else if (alerttype === "deviceOverspeed") {
    iconUrl = deviceOverspeed
  } else if (alerttype === "ignitionOn") {
    iconUrl = ignitionOn
  } else if (alerttype === "driverChanged") {
    iconUrl = driverChanged
  } else if (alerttype === "deviceStopped") {
    iconUrl = deviceStopped
  } else if (alerttype === "alarm") {
    iconUrl = alarm
  } else if (alerttype === "deviceFuelDrop") {
    iconUrl = deviceFuelDrop
  } else if (alerttype === "maintenance") {
    iconUrl = maintenance
  } else if (alerttype === "routeDelay") {
    iconUrl = routeDelay
  } else if (alerttype === "deviceInactive") {
    iconUrl = deviceInactive
  } else if (alerttype === "textMessage") {
    iconUrl = textMessage
  } else if (alerttype === "commandResult") {
    iconUrl = commandResult
  } else {
    iconUrl = deviceUnknown
  }

  return iconUrl
}


export const MessageTypeBackground = (item) => {
  const { alerttype } = item;
  const deviceUnknown = '#7474F5';
  const newGeofence = '#FFEFDD';
  const geofenceExit = '#FFEFDD';
  const deviceOffline = '#7474F5';
  const geofenceEnter = '#FFEFDD';
  const routeDeviation = '#C9F5D2';
  const deviceOnline = '#7474F5';
  const ignitionOff = '#FFDBDB';
  const deviceMoving = '#7474F5';
  const deviceOverspeed = '#7474F5';
  const ignitionOn = '#FFDBDB';
  const driverChanged = '#7474F5';
  const deviceStopped = '#7474F5';
  const alarm = '#7474F5';
  const deviceFuelDrop = '#7474F5';
  const maintenance = '#7474F5';
  const routeDelay = '#C9F5D2';
  const deviceInactive = '#7474F5';
  const textMessage = '#7474F5';
  const commandResult = '#7474F5';

  let iconUrl = deviceUnknown;

  if (alerttype === "deviceUnknown") {
    iconUrl = deviceUnknown
  } else if (alerttype === "newGeofence") {
    iconUrl = newGeofence
  } else if (alerttype === "geofenceExit") {
    iconUrl = geofenceExit
  } else if (alerttype === "deviceOffline") {
    iconUrl = deviceOffline
  } else if (alerttype === "geofenceEnter") {
    iconUrl = geofenceEnter
  } else if (alerttype === "routeDeviation") {
    iconUrl = routeDeviation
  } else if (alerttype === "deviceOnline") {
    iconUrl = deviceOnline
  } else if (alerttype === "ignitionOff") {
    iconUrl = ignitionOff
  } else if (alerttype === "deviceMoving") {
    iconUrl = deviceMoving
  } else if (alerttype === "deviceOverspeed") {
    iconUrl = deviceOverspeed
  } else if (alerttype === "ignitionOn") {
    iconUrl = ignitionOn
  } else if (alerttype === "driverChanged") {
    iconUrl = driverChanged
  } else if (alerttype === "deviceStopped") {
    iconUrl = deviceStopped
  } else if (alerttype === "alarm") {
    iconUrl = alarm
  } else if (alerttype === "deviceFuelDrop") {
    iconUrl = deviceFuelDrop
  } else if (alerttype === "maintenance") {
    iconUrl = maintenance
  } else if (alerttype === "routeDelay") {
    iconUrl = routeDelay
  } else if (alerttype === "deviceInactive") {
    iconUrl = deviceInactive
  } else if (alerttype === "textMessage") {
    iconUrl = textMessage
  } else if (alerttype === "commandResult") {
    iconUrl = commandResult
  } else {
    iconUrl = deviceUnknown
  }

  return iconUrl
}