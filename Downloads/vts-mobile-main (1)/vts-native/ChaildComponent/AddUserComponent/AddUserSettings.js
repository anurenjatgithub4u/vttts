import React, { Fragment, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Select, CheckIcon, Input, } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { Checkbox } from 'react-native-paper';

const AddUserSettings = ({ setAddUserPersonalInfoView, setAddUserSettingsView, navigation, setAddUserPersonalInfoActive, setAddUserSettingsActive, setAddUserPermissionView, setAddUserPermissionActive }) => {
  const [mapLayer, setMapLayer] = useState(false);
  const [latitude, setLatitude] = useState(false);
  const [longitude, setLongitude] = useState(false);
  const [latitudeIsValid, setLatitudeIsValid] = useState(null)
  const [longitudeIsValid, setLongitudeIsValid] = useState(null)
  const [zoom, setZoom] = useState(false);
  const [coordinateFormate, setCoordinateFormate] = useState(false);
  const [layer, setLayer] = useState(false);
  const [value, setValue] = useState({
    MapLayer: '',
    Latitude: '',
    Longitude: '',
    Zoom: '',
    CoordinateFormate: '',
    Layer: '',
    Hour_24_format: false
  });

  const onChangeMapLayer = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, MapLayer: Text });
      setMapLayer(false);
    } else {
      setValue({ ...value, MapLayer: Text });
      setMapLayer(false)
    };
  };
  const onChangeLatitude = (Text) => {
    validLatitude(Text)
    if (Text.trim().length >= 0) {
      setValue({ ...value, Latitude: Text });
      setLatitude(false);
    } else {
      setValue({ ...value, Latitude: Text });
      setLatitude(false)
    };
  };
  const validLatitude = (Text) => {
    var regexLat = new RegExp('^(\\+|-)?(?:90(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,6})?))$');
    if (regexLat?.test(Text) === false) {
      setLatitudeIsValid(false)
      // console.log("Latitude is Not Correct");
      return false;
    } else {
      setLatitudeIsValid(true)
      // console.log("Latitude is Correct");
    }
  }

  const onChangeLongitude = (Text) => {
    validLongitude(Text)
    if (Text.trim().length >= 0) {
      setValue({ ...value, Longitude: Text });
      setLongitude(false);
    } else {
      setValue({ ...value, Longitude: Text });
      setLongitude(false)
    };
  };
  const validLongitude = (Text) => {
    var regexLong = new RegExp('^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))$');
    if (regexLong?.test(Text) === false) {
      setLongitudeIsValid(false)
      // console.log("Longitude is Not Correct");
      return false;
    } else {
      setLongitudeIsValid(true)
      // console.log("Longitude is Correct");
    }
  }

  const onChangeZoom = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, Zoom: Text });
      setZoom(false);
    } else {
      setValue({ ...value, Zoom: Text });
      setZoom(false)
    };
  };
  const onChangeCoordinateFormate = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, CoordinateFormate: Text });
      setCoordinateFormate(false);
    } else {
      setValue({ ...value, CoordinateFormate: Text });
      setCoordinateFormate(false)
    };
  };
  const onChangeLayer = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, Layer: Text });
      setLayer(false);
    } else {
      setValue({ ...value, Layer: Text });
      setLayer(false)
    };
  };

  const checkStringNullEmpty = (str) => {
    if (str != null && str !== '') {
      return false;
    } else {
      return true;
    };
  };
  var validation = '';
  const validate = () => {
    if (checkStringNullEmpty(value.MapLayer)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setMapLayer(true)
    }
    if (checkStringNullEmpty(value.Latitude)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setLatitude(true)
    }
    if (checkStringNullEmpty(value.Longitude)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setLongitude(true)
    }
    if (checkStringNullEmpty(value.Zoom)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setZoom(true)
    }
    if (checkStringNullEmpty(value.CoordinateFormate)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setCoordinateFormate(true)
    }
    if (checkStringNullEmpty(value.Layer)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setLayer(true)
    }
  };

  const onNexnt = async () => {
    validate();
    if (validation === '') {
      if (latitudeIsValid === true && longitudeIsValid === true) {
        setAddUserPersonalInfoView(false);
        setAddUserSettingsView(false);
        setAddUserPermissionView(true)
        setAddUserPersonalInfoActive(true);
        setAddUserSettingsActive(true);
        setAddUserPermissionActive(true)
        await AsyncStorage.setItem('UserSetting', JSON.stringify(value))
        // navigation.navigate('UserRoleScreen')
      }
    }
  }

  // console.log(value)
  return (
    <Fragment>
      <View style={{ backgroundColor: '#ffffff', marginHorizontal: 15, marginTop: 20, borderRadius: 5, padding: 10 }}>
        <View>
          <Text style={{ color: '#000000', fontSize: 14, fontFamily: 'OpenSans-Bold' }} >Preference</Text>

          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 5 }} >Map Layer</Text>
            <Select placeholderTextColor={'#7D8EAB'} style={{ color: '#252F40', height: 40, backgroundColor: '#f4f4fd', fontFamily: 'OpenSans-Regular', fontSize: 14, }} borderWidth={0} selectedValue={value?.MapLayer} minWidth="200" accessibilityLabel="Select" placeholder="Custom" _selectedItem={{
              bg: "#f4f4fd",
              endIcon: <CheckIcon size="5" />
            }} _light={{
              bg: "#f4f4fd"
            }} _dark={{
              bg: "coolGray.800"
            }} onValueChange={itemValue => onChangeMapLayer(itemValue)}>
              <Select.Item shadow={2} label="custom" value="custom" />
              <Select.Item shadow={2} label="osm" value="osm" />
            </Select>
            {mapLayer ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Map Layer is required</Text>
              </View>
              : null
            }
          </View>

          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>Latitude</Text>
            <Input placeholderTextColor={'#7D8EAB'} value={value?.Latitude} keyboardType='numeric' onChangeText={(Text) => onChangeLatitude(Text)} variant={'unstyled'} w={'100%'} placeholder='Custom' style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', marginTop: 5, backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, }} />
            {latitude ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Latitude is required</Text>
              </View>
              : null
            }
            {latitudeIsValid === false ?
              <View>
                <Text style={{ color: 'red', fontSize: 10, fontFamily: 'OpenSans-Regular' }}>Invalid Latitude</Text>
              </View>
              : null
            }
          </View>
          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Longitude</Text>
            <Input placeholderTextColor={'#7D8EAB'} value={value?.Longitude} keyboardType='numeric' onChangeText={(Text) => onChangeLongitude(Text)} variant={'unstyled'} w={'100%'} placeholder='Custom' style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', marginTop: 5, backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, }} />
            {longitude ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Longitude is required</Text>
              </View>
              : null
            }
            {longitudeIsValid === false ?
              <View>
                <Text style={{ color: 'red', fontSize: 10, fontFamily: 'OpenSans-Regular' }}>Invalid Longitude</Text>
              </View>
              : null
            }
          </View>
          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Zoom</Text>
            <Input placeholderTextColor={'#7D8EAB'} keyboardType={'number-pad'} value={value?.Zoom} onChangeText={(Text) => onChangeZoom(Text)} variant={'unstyled'} w={'100%'} placeholder='Enter' style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', marginTop: 5, backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, }} />
            {zoom ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Zoom  is required</Text>
              </View>
              : null
            }
          </View>
          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Coordinate Format</Text>
            <Input placeholderTextColor={'#7D8EAB'} value={value?.CoordinateFormate} onChangeText={(Text) => onChangeCoordinateFormate(Text)} variant={'unstyled'} w={'100%'} placeholder='Enter' style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', marginTop: 5, backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, }} />
            {coordinateFormate ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Coordinate Format is required</Text>
              </View>
              : null
            }
          </View>
          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >POI Layer</Text>
            <Input placeholderTextColor={'#7D8EAB'} value={value.Layer} onChangeText={(Text) => onChangeLayer(Text)} variant={'unstyled'} w={'100%'} placeholder='Enter' style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', marginTop: 5, backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, }} />
            {layer ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>POI Layer is required</Text>
              </View>
              : null
            }
          </View>
          <View style={{ paddingTop: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Checkbox
                uncheckedColor={'gray'}
                color={'blue'}
                status={value?.Hour_24_format ? 'checked' : 'unchecked'}
                onPress={() => {
                  setValue({ ...value, Hour_24_format: !value.Hour_24_format });
                }}
              />
              <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold', }} >24 Hour format</Text>
            </View>
            {/* {layer ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Name  is required</Text>
              </View>
              : null
            } */}
          </View>
        </View>
      </View>
      <Pressable onPress={() => onNexnt()} style={{ backgroundColor: '#4646f2', paddingTop: 10, paddingBottom: 10, borderRadius: 5, marginTop: 15, marginHorizontal: 15, marginBottom: 20 }}>
        <Text style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Next</Text>
      </Pressable>
    </Fragment>
  )
}

export default AddUserSettings