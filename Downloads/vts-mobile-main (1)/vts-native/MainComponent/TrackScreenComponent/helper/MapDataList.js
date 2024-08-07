import React, { Fragment, useState } from 'react';
import { Box, Divider, } from 'native-base';
import { View, Pressable, LayoutAnimation, UIManager, Platform, Text, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Col, Row } from "react-native-responsive-grid-system";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Center, } from 'native-base';
import { useHeader } from '../../../ApiHeader';
import { MeterToKm, setOdometer, addLeadingZeros, setDateFunction } from '../../../constants/UnitConvert';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const MapDataList = ({ nullMapListFilter, setMapIdVehicle, ScrollRef, setSelectedData }) => {
  const { ApiRequestAuthorizationHook } = useHeader();
  const [showAddress, setShowAddress] = useState(false);
  const [expanded, setExpanded] = React.useState(true);
  const [dataSet, setDataSet] = useState('');

  const handlePress = async (event) => {
    setShowAddress(false)
    LayoutAnimation.easeInEaseOut();
    setExpanded(event?.id)
    await ApiRequestAuthorizationHook.get(`/server/geocode?latitude=${event?.lat}&longitude=${event?.long}`)
      .then(function (response) {
        if (response?.status === 200) {
          setDataSet(response?.data)
        }
      })
      .catch(function (error) {
        console.log(error);
        setDataSet('Address not found')
      });
  };

  function uniqByKeepLast(data, key) {
    return [...new Map(data?.map(x => [key(x), x]))?.values()]
  }
  
  return (
    <Fragment>
      <View style={{ paddingBottom: 300 }}>
        {uniqByKeepLast(nullMapListFilter, it => it?.device?.id)?.map((item, index) => (
          <View key={index} style={{ backgroundColor: '#ffffff', marginTop: 5, borderRadius: 5, padding: 10, }}>
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => { setMapIdVehicle(item); ScrollRef?.current?.scrollTo({ y: 0, animated: true }); setSelectedData([item]) }} style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ebebfd', borderRadius: 5 }}>
                <FontAwesome5 name='map-marked-alt' size={20} color={'blue'} />
              </TouchableOpacity>
              <Text numberOfLines={1} style={{ paddingLeft: 10, fontSize: 14, fontFamily: 'OpenSans-Bold', color: '#252F40', width: 220 }}>{item?.device.name}</Text>
              <Box style={{ flexGrow: 1 }} />
              <View style={{ backgroundColor: TrackListSatus(item?.device), paddingLeft: 13, paddingRight: 13, paddingTop: 5, paddingBottom: 5, borderRadius: 50, }}>
                <Text style={{ textAlign: 'center', fontFamily: 'OpenSans-Semibold', fontSize: 12, color: TrackListSatusText(item?.device) }}>
                  {item?.device.status}
                </Text>
              </View>
            </View>
            <Divider style={{ marginTop: 15, marginBottom: 15 }} thickness="1" orientation='horizontal' />
            <Row>
              <Col xs={4} sm={4} md={4} lg={4}>
                <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                  <Center style={{ borderWidth: 1, borderColor: '#67748E', width: 30, height: 30, borderRadius: 50 }}>
                    <MaterialIcons name='gps-not-fixed' size={18} color={item?.device?.status === 'idle' && 'moving' && 'towing' && 'online' ? '#63CE78' : '#67748E'} />
                  </Center>
                  <Box style={{ paddingLeft: 5 }}>
                    <Text style={{ fontSize: 10, color: '#252F40', fontFamily: 'OpenSans-Regular' }}>Gprs</Text>
                    <Text style={{ fontSize: 10, color: '#252F40', fontFamily: 'OpenSans-SemiBold' }}>{item?.device?.status === 'idle' && 'moving' && 'towing' && 'online' ? 'ON' : 'OFF'}</Text>
                  </Box>
                </View>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4}>
                <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                  <Center style={{ borderWidth: 1, borderColor: '#67748E', width: 30, height: 30, borderRadius: 50 }}>
                    {item?.position === null ?
                      <MaterialCommunityIcons name='crosshairs-gps' size={18} color={'#67748E'} /> :
                      item?.position.attributes.sat === undefined ?
                        <MaterialCommunityIcons name='crosshairs-gps' size={18} color={'#67748E'} /> :
                        <MaterialCommunityIcons name='crosshairs-gps' size={18} color={item?.position?.attributes?.sat < 11 ? '#67748E' : '#63CE78'} />
                    }
                  </Center>
                  <Box style={{ paddingLeft: 5 }}>
                    <Text style={{ fontSize: 10, color: '#252F40', fontFamily: 'OpenSans-Regular' }}>GPS</Text>
                    {item?.position === null ?
                      <Text style={{ fontSize: 10, color: '#252F40', fontFamily: 'OpenSans-SemiBold' }}>OFF</Text> :
                      item?.position.attributes.sat === undefined ?
                        <Text style={{ fontSize: 10, color: '#252F40', fontFamily: 'OpenSans-SemiBold' }}>OFF</Text> :
                        <Text style={{ fontSize: 10, color: '#252F40', fontFamily: 'OpenSans-SemiBold' }}>{item?.position.attributes.sat < 11 ? "OFF" : "ON"}</Text>
                    }
                  </Box>
                </View>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4}>
                <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                  <Center style={{ borderWidth: 1, borderColor: '#67748E', width: 30, height: 30, borderRadius: 50 }}>
                    {item?.position === null ?
                      null :
                      <MaterialCommunityIcons name='engine' size={18} color={item?.position.attributes.ignition === true ? '#63CE78' : '#69768F'} />
                    }
                  </Center>
                  <Box style={{ paddingLeft: 5 }}>
                    <Text style={{ fontSize: 10, color: '#252F40', fontFamily: 'OpenSans-Regular' }}>Engine</Text>
                    <Text style={{ fontSize: 10, color: '#252F40', fontFamily: 'OpenSans-SemiBold' }}>{item?.position === null ? '-' : item?.position.attributes.ignition === true ? 'ON' : 'OFF'}</Text>
                  </Box>
                </View>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4}>
                <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', paddingTop: 20 }}>
                  <Center style={{ borderWidth: 1, borderColor: '#67748E', width: 30, height: 30, borderRadius: 50 }}>
                    <FontAwesome5 name='route' size={18} color={'#63CE78'} />
                  </Center>
                  <Box style={{ paddingLeft: 5 }}>
                    <Text style={{ fontSize: 10, color: '#252F40', fontFamily: 'OpenSans-Regular' }}>Route</Text>
                    <Text style={{ fontSize: 10, color: '#252F40', fontFamily: 'OpenSans-SemiBold' }}>ON</Text>
                  </Box>
                </View>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4}>
                <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', paddingTop: 20 }}>
                  <Center style={{ borderWidth: 1, borderColor: '#67748E', width: 30, height: 30, borderRadius: 50 }}>
                    <MaterialCommunityIcons name='car-battery' size={18} color={'#63CE78'} />
                  </Center>
                  <Box style={{ paddingLeft: 5 }}>
                    <Text style={{ fontSize: 10, color: '#252F40', fontFamily: 'OpenSans-Regular' }}>External Battery</Text>
                    {item?.position === null ?
                      <Text style={{ fontSize: 10, color: '#252F40', fontFamily: 'OpenSans-SemiBold' }}>-</Text>
                      :
                      <Text style={{ fontSize: 10, color: '#252F40', fontFamily: 'OpenSans-SemiBold' }}>{item?.position?.attributes?.battery === undefined ? '0' : item?.position?.attributes?.battery === null ? 0 : (item?.position?.attributes?.battery)?.toFixed(2)} V</Text>
                    }
                  </Box>
                </View>
              </Col>
            </Row>
            <Divider style={{ marginTop: 15, marginBottom: 15 }} thickness="1" orientation='horizontal' />

            {expanded === item?.device.id ?
              <>
                <View>
                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Address</Text>
                  {showAddress ?
                    <Pressable onPress={() => setShowAddress(false)} style={{ flexDirection: 'row' }}>
                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{dataSet}</Text>
                    </Pressable>
                    :
                    <Pressable onPress={() => setShowAddress(true)} style={{ flexDirection: 'row' }}>
                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#7474F5' }}>Show address</Text>
                    </Pressable>
                  }
                </View>

                <View style={{ backgroundColor: '#f5f6fa', borderRadius: 5, marginTop: 10, paddingBottom: 20 }}>
                  <View style={{ marginHorizontal: 10 }}>
                    <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', paddingTop: 10, fontSize: 12 }}>Information</Text>
                    <Row>
                      <Col xs={6} sm={6} md={6} lg={6}>
                        <View style={{ marginTop: 20 }}>
                          <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>Latitude</Text>
                          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 11, color: '#252F40' }}>{item?.position === null ? '-' : item?.position?.latitude === null ? '-' : item?.position?.latitude}</Text>
                        </View>
                      </Col>
                      <Col xs={6} sm={6} md={6} lg={6}>
                        <View style={{ marginTop: 20 }}>
                          <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>Engine</Text>
                          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 11, color: '#252F40' }}>{item?.position === null ? '-' : item?.position?.attributes?.ignition === null ? '-' : item?.position?.attributes?.ignition === true ? 'ON' : 'OFF'}</Text>
                        </View>
                      </Col>
                      <Col xs={6} sm={6} md={6} lg={6}>
                        <View style={{ marginTop: 20 }}>
                          <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>Longitude</Text>
                          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 11, color: '#252F40' }}>{item?.position === null ? '-' : item?.position?.longitude === null ? '-' : item?.position?.longitude}</Text>
                        </View>
                      </Col>

                      <Col xs={6} sm={6} md={6} lg={6}>
                        <View style={{ marginTop: 20 }}>
                          <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>Speed</Text>
                          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 11, color: '#252F40' }}>{item?.position === null ? '-' : item?.position?.speed === null ? '-' : item?.position?.speed.toFixed(2)} Km/hr</Text>{/* addLeadingZeros(item?.position?.speed) */}
                        </View>
                      </Col>
                      <Col xs={6} sm={6} md={6} lg={6}>
                        <View style={{ marginTop: 20 }}>
                          <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>GPRS</Text>
                          {item?.device?.lastUpdate === null ?
                            <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 11, color: '#252F40' }}>-</Text>
                            :
                            <View>
                              <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 11, color: '#252F40' }}>{setDateFunction(item?.device?.lastUpdate)?.DateFormate},</Text>
                              <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 11, color: '#252F40' }}>{setDateFunction(item?.device?.lastUpdate)?.TimeFormate}</Text>
                            </View>
                          }
                        </View>
                      </Col>
                      <Col xs={6} sm={6} md={6} lg={6}>
                        <View style={{ marginTop: 20 }}>
                          <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>Altitude</Text>
                          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 11, color: '#252F40' }}>{item?.position === null ? '-' : item?.position?.altitude === null ? '-' : item?.position?.altitude}</Text>
                        </View>
                      </Col>
                      <Col xs={6} sm={6} md={6} lg={6}>
                        <View style={{ marginTop: 20 }}>
                          <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>Odometer (Km)</Text>
                          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 11, color: '#252F40' }}>{item?.position === null ? '-' : item?.position?.attributes?.totalDistance === null ? '-' : setOdometer(item?.position?.attributes?.totalDistance)}</Text>
                        </View>
                      </Col>
                      <Col xs={6} sm={6} md={6} lg={6}>
                        <View style={{ marginTop: 20 }}>
                          <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>Distance</Text>
                          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 11, color: '#252F40' }}>{item?.position === null ? '-' : item?.position.attributes.distance === null ? '-' : MeterToKm(item?.position.attributes.distance)}</Text>
                        </View>
                      </Col>
                    </Row>
                  </View>
                </View>

                <View style={{ paddingTop: 10 }}>
                  <Row>
                    <Col xs={5} sm={5} md={5} lg={5}>
                      <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                        <Center style={{ borderWidth: 1, borderColor: '#67748E', width: 30, height: 30, borderRadius: 50 }}>
                          <MaterialCommunityIcons name='car-battery' size={18} color={'#67748E'} />
                        </Center>
                        <Box style={{ paddingLeft: 5 }}>
                          <Text style={{ fontSize: 10, color: '#252F40', fontFamily: 'OpenSans-Regular' }}>External Battery</Text>
                          {item?.position === null ?
                            <Text style={{ fontSize: 10, color: '#252F40', fontFamily: 'OpenSans-SemiBold' }}>-</Text>
                            :
                            <Text style={{ fontSize: 10, color: '#252F40', fontFamily: 'OpenSans-SemiBold' }}>{item?.position?.attributes?.power === undefined ? '0' : item?.position?.attributes?.power === null ? 0 : (item?.position?.attributes?.power)?.toFixed(2)} V</Text>
                          }
                        </Box>
                      </View>
                    </Col>
                    <Col xs={5} sm={5} md={5} lg={5}>
                      <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                        <Center style={{ borderWidth: 1, borderColor: '#67748E', width: 30, height: 30, borderRadius: 50 }}>
                          <MaterialCommunityIcons name='car-battery' size={18} color={'#67748E'} />
                        </Center>
                        <Box style={{ paddingLeft: 5 }}>
                          <Text style={{ fontSize: 10, color: '#252F40', fontFamily: 'OpenSans-Regular' }}>Internal Battery</Text>
                          {item?.position === null ?
                            <Text style={{ fontSize: 10, color: '#252F40', fontFamily: 'OpenSans-SemiBold' }}>-</Text>
                            :
                            <Text style={{ fontSize: 10, color: '#252F40', fontFamily: 'OpenSans-SemiBold' }}>{item?.position?.attributes?.battery === undefined ? '0' : item?.position?.attributes?.battery === null ? 0 : (item?.position?.attributes?.battery)?.toFixed(2)} V</Text>
                          }
                        </Box>
                      </View>
                    </Col>
                    <Col xs={5} sm={5} md={5} lg={5}>
                      <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', paddingTop: 20 }}>
                        <Center style={{ borderWidth: 1, borderColor: '#67748E', width: 30, height: 30, borderRadius: 50 }}>
                          {item?.position === null ?
                            null :
                            <MaterialCommunityIcons name='engine' size={18} color={item?.position.attributes.ignition === true ? '#63CE78' : '#69768F'} />
                          }
                        </Center>
                        <Box style={{ paddingLeft: 5 }}>
                          <Text style={{ fontSize: 10, color: '#252F40', fontFamily: 'OpenSans-Regular' }}>Engine</Text>
                          <Text style={{ fontSize: 10, color: '#252F40', fontFamily: 'OpenSans-SemiBold' }}>{item?.position === null ? '-' : item?.position.attributes.ignition === true ? 'ON' : 'OFF'}</Text>
                        </Box>
                      </View>
                    </Col>
                  </Row>
                </View>

                <Divider style={{ marginTop: 15, marginBottom: 15 }} thickness="1" orientation='horizontal' />
              </>
              : null}

            <Pressable onPress={() => expanded === item?.device.id ? handlePress({ id: 0, lat: item?.position === null ? '-' : item?.position.latitude, long: item?.position === null ? '-' : item?.position.longitude }) : handlePress({ id: item?.device.id, lat: item?.position === null ? '-' : item?.position.latitude, long: item?.position === null ? '-' : item?.position.longitude })} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
              {expanded === item?.device.id ?
                <AntDesign onPress={() => handlePress({ id: 0, lat: item?.position === null ? '-' : item?.position.latitude, long: item?.position === null ? '-' : item?.position.longitude })} name={"minuscircleo"} size={18} color={'blue'} />
                :
                <AntDesign onPress={() => handlePress({ id: item?.device.id, lat: item?.position === null ? '-' : item?.position.latitude, long: item?.position === null ? '-' : item?.position.longitude })} name={"pluscircleo"} size={18} color={'blue'} />
              }
              {expanded === item?.device.id ?
                <Text style={{ fontSize: 10, fontFamily: 'OpenSans-Italic', color: 'blue', paddingLeft: 10 }}>Show less</Text>
                :
                <Text style={{ fontSize: 10, fontFamily: 'OpenSans-Italic', color: 'blue', paddingLeft: 10 }}>Show more</Text>
              }
            </Pressable>
          </View>
        ))}
        {nullMapListFilter?.length === 0 ?
          <View style={{ height: 60, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>NO RECORDS</Text>
          </View>
          :
          null
        }
      </View>
    </Fragment>
  )
}

export default MapDataList;




const TrackListSatus = ({ status }) => {
  let statusOnline = '#63CE78';
  let statusIdle = '#FA9826';
  let statusStopped = '#F25555';
  let statusOther = '#4646F2';
  let statusOffline = '#EFD54B';
  let statusMoving = '#63CE78';
  let statusTowing = '#63CE78';
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
const TrackListSatusText = ({ status }) => {
  let statusOnline = '#FFFFFF';
  let statusIdle = '#FFFFFF';
  let statusStopped = '#FFFFFF';
  let statusOther = '#FFFFFF';
  let statusOffline = '#FFFFFF';
  let statusMoving = '#FFFFFF';
  let statusTowing = '#FFFFFF';
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