import React from 'react';
import { Text } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const TrackListSatus = ({ status }) => {
  let statusOnline = <MaterialIcons name='radio-button-checked' size={16} color={'#63CE78'} style={{ marginLeft: 10 }} />;
  let statusIdle = <MaterialIcons name='radio-button-checked' size={16} color={'#FA9826'} style={{ marginLeft: 10 }} />;
  let statusStopped = <MaterialIcons name='radio-button-checked' size={16} color={'#F25555'} style={{ marginLeft: 10 }} />;
  let statusOther = <MaterialIcons name='radio-button-checked' size={16} color={'#4646F2'} style={{ marginLeft: 10 }} />;
  let statusOffline = <MaterialIcons name='radio-button-checked' size={16} color={'#EFD54B'} style={{ marginLeft: 10 }} />;
  let statusMoving = <MaterialIcons name='radio-button-checked' size={16} color={'#63CE78'} style={{ marginLeft: 10 }} />;
  let statusTowing = <MaterialIcons name='radio-button-checked' size={16} color={'#63CE78'} style={{ marginLeft: 10 }} />;

  let iconUrl = statusOnline

  if (status === "online")
    iconUrl = statusOnline
  else if (status === "idle")
    iconUrl = statusIdle
  else if (status === "stopped")
    iconUrl = statusStopped
  else if (status === "other")
    iconUrl = statusOther
  else if (status === "offline")
    iconUrl = statusOffline
  else if (status === "inactive")
    iconUrl = statusOffline
  else if (status === "moving")
    iconUrl = statusMoving
  else if (status === "towing")
    iconUrl = statusTowing
  else
    iconUrl = statusOnline

  return iconUrl
}

export const TrackListSatusText = ({ status }) => {
  let statusOnline = <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#63CE78' }}>{status}</Text> // '#63CE78';
  let statusTowing = <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#63CE78' }}>{status}</Text> // '#63CE78';
  let statusMoving = <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#63CE78' }}>{status}</Text> // '#63CE78';
  let statusIdle = <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#FA9826' }}>{status}</Text> // '#FA9826';
  let statusOffline = <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#EFD54B' }}>{status}</Text> // '#67748E';
  let statusStopped = <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#F25555' }}>{status}</Text> // '#F25555';
  let statusOther = <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#4646F2' }}>{status}</Text> // '#EFD54B';

  let iconUrl = statusOnline
  if (status === "online")
    iconUrl = statusOnline
  else if (status === "idle")
    iconUrl = statusIdle
  else if (status === "stopped")
    iconUrl = statusStopped
  else if (status === "other")
    iconUrl = statusOther
  else if (status === "offline")
    iconUrl = statusOffline
  else if (status === "inactive")
    iconUrl = statusOffline
  else if (status === "moving")
    iconUrl = statusMoving
  else if (status === "towing")
    iconUrl = statusTowing
  else
    iconUrl = statusOnline

  return iconUrl
}