import React from 'react';
import { View, LogBox, Text } from 'react-native';
import { MeterToKm, msToTime, addLeadingZeros } from '../../../constants/UnitConvert';

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();

const TrailsListHeader = ({ routeGraph, itemObject }) => {

  if (!routeGraph) {
    return (
      <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginTop: 10 }}>
        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
          <Text h6 style={{ color: '#554F60', fontSize: 10, fontFamily: 'OpenSans-Regular' }}>Speed</Text>
          <View>
            <Text h6 style={{ marginLeft: 6, fontFamily: 'OpenSans-Bold', fontSize: 10, color: '#252F40' }}>0.00</Text>
            <Text h6 style={{ fontFamily: 'OpenSans-Regular', fontSize: 10, color: '#252F40' }}>Km/h</Text>
          </View>
        </View>
        <View style={{ flexGrow: 1 }} />
        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
          <Text h6 style={{ color: '#554F60', fontSize: 10, fontFamily: 'OpenSans-Regular' }}>Distance</Text>
          <View>
            <Text h6 style={{ marginLeft: 6, fontFamily: 'OpenSans-Bold', fontSize: 10, color: '#252F40' }}>{MeterToKm(0)}</Text>
            <Text h6 style={{ fontFamily: 'OpenSans-Regular', fontSize: 10, color: '#252F40' }}>Kms</Text>
          </View>
        </View>
        <View style={{ flexGrow: 1 }} />
        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
          <Text h6 style={{ color: '#554F60', fontSize: 10, fontFamily: 'OpenSans-Regular' }}>Time</Text>
          <View>
            <Text h6 style={{ marginLeft: 6, fontFamily: 'OpenSans-Bold', fontSize: 10, color: '#252F40' }}>{msToTime(0)}</Text>
            <Text h6 style={{ fontFamily: 'OpenSans-Regular', fontSize: 10, color: '#252F40' }}>Hr/Mins</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginTop: 10 }}>
      <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
        <Text h6 style={{ color: '#554F60', fontSize: 10, fontFamily: 'OpenSans-Regular' }}>Speed</Text>
        <View>
          <Text h6 style={{ marginLeft: 6, fontFamily: 'OpenSans-Bold', fontSize: 10, color: '#252F40' }}>{routeGraph[0]?.speed === null || undefined ? '0.00' : routeGraph[0]?.speed?.toFixed(2)}</Text>
          <Text h6 style={{ fontFamily: 'OpenSans-Regular', fontSize: 10, color: '#252F40' }}>Km/h</Text>
        </View>
      </View>
      <View style={{ flexGrow: 1 }} />
      <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
        <Text h6 style={{ color: '#554F60', fontSize: 10, fontFamily: 'OpenSans-Regular' }}>Distance</Text>
        <View>
          <Text h6 style={{ marginLeft: 6, fontFamily: 'OpenSans-Bold', fontSize: 10, color: '#252F40' }}>{routeGraph[0]?.attributes?.totalDistance === null || undefined ? MeterToKm(0) : MeterToKm(routeGraph[0]?.attributes?.totalDistance)}</Text>
          <Text h6 style={{ fontFamily: 'OpenSans-Regular', fontSize: 10, color: '#252F40' }}>Kms</Text>
        </View>
      </View>
      <View style={{ flexGrow: 1 }} />
      <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
        <Text h6 style={{ color: '#554F60', fontSize: 10, fontFamily: 'OpenSans-Regular' }}>Time</Text>
        <View>
          <Text h6 style={{ marginLeft: 6, fontFamily: 'OpenSans-Bold', fontSize: 10, color: '#252F40' }}>{msToTime(0)}</Text>
          <Text h6 style={{ fontFamily: 'OpenSans-Regular', fontSize: 10, color: '#252F40' }}>Hr/Mins</Text>
        </View>
      </View>
    </View>
  )
}

export default TrailsListHeader