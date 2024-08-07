import React from 'react'
import { View, Text, LogBox, TouchableOpacity } from 'react-native'
import MapplsGL from 'mappls-map-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { setMapSDKKey, setRestAPIKey, setAtlasClientId, setAtlasClientSecret } from '../../../constants/MapMyInidaKeys';

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();

// MapplsGL.setMapSDKKey(setMapSDKKey);
// MapplsGL.setRestAPIKey(setRestAPIKey);
// MapplsGL.setAtlasClientId(setAtlasClientId);
// MapplsGL.setAtlasClientSecret(setAtlasClientSecret);


const MapplsInfoWindo = ({ valueInfo }) => {
  return (
    <MapplsGL.Callout>
      <View style={{ flexDirection: 'column', borderRadius: 6, width: 280, backgroundColor: '#7474F5' }}>
        <View style={{ position: 'absolute', right: 5, top: 5 }}>
          <TouchableOpacity style={{ width: 25, height: 25, backgroundColor: 'transparent', borderRadius: 3, justifyContent: 'center', alignItems: 'center' }}>
            <AntDesign name={'close'} color={'#FFFFFF'} size={20} />
          </TouchableOpacity>
        </View>
        <View style={{ width: 200, paddingHorizontal: 15, paddingTop: 15, paddingBottom: 15 }}>
          <View style={{}}>
            <View style={{ flexDirection: 'row', paddingTop: 3 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 10, fontFamily: 'OpenSans-Regular' }}>Vehicle Number: </Text>
              <Text style={{ color: '#FFFFFF', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>{valueInfo?.device?.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 3 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 10, fontFamily: 'OpenSans-Regular' }}>Permit Holder Name: </Text>
              <Text style={{ color: '#FFFFFF', fontSize: 10, fontFamily: 'OpenSans-SemiBold' }}>{valueInfo?.device?.permit_holder}</Text>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 3 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 10, fontFamily: 'OpenSans-Regular' }}>Contact Number: </Text>
              <Text style={{ color: '#FFFFFF', fontSize: 10, fontFamily: 'OpenSans-SemiBold' }}>{valueInfo?.device?.contact}</Text>
            </View>
          </View>

          <View style={{ paddingTop: 10, }}>
            <View style={{ flexDirection: 'row', paddingTop: 3 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 10, fontFamily: 'OpenSans-Regular' }}>Chassis Number: </Text>
              <View style={{}}>
                <Text style={{ color: '#FFFFFF', fontSize: 10, fontFamily: 'OpenSans-SemiBold' }}>{valueInfo?.device?.chasisno}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 3 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 10, fontFamily: 'OpenSans-Regular' }}>IMEI Number: </Text>
              <Text style={{ color: '#FFFFFF', fontSize: 10, fontFamily: 'OpenSans-SemiBold' }}>{valueInfo?.device?.uniqueId}</Text>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 3 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 10, fontFamily: 'OpenSans-Regular' }}>RTO Code: </Text>
              <Text style={{ color: '#FFFFFF', fontSize: 10, fontFamily: 'OpenSans-SemiBold' }}>{valueInfo?.device?.rto_code}</Text>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 3 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 10, fontFamily: 'OpenSans-Regular' }}>Company Name: </Text>
              <Text style={{ color: '#FFFFFF', fontSize: 10, fontFamily: 'OpenSans-SemiBold' }}>{valueInfo?.device?.vltd_make}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[{ backgroundColor: 'transparent', borderColor: 'transparent', borderTopColor: '#7474F5', borderWidth: 16, alignSelf: 'center', zIndex: 999, marginTop: -0.5, marginBottom: -16 }]} />
    </MapplsGL.Callout>
  )
}

export default MapplsInfoWindo