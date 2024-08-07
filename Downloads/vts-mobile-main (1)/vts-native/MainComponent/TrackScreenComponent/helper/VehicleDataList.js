import React, { Fragment, useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { Pressable, } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Col, Row } from "react-native-responsive-grid-system";
import { useNavigation, useRoute } from '@react-navigation/native';
import { TrackListVehicle } from '../../../constants/TrackListVehicle';
import { TrackListSatus, TrackListSatusText } from '../../../constants/TrackListSatus';
import { setDateFunction } from '../../../constants/UnitConvert';
import { useState } from 'react';

const VehicleDataList = ({ setExpanded, expanded, showAddress, setShowAddress, dataSet, handlePress, item, setMapIdVehicle, setListComView, setSelectedData }) => {
  let Navigation = useNavigation();
  let Location = useRoute();
  const [isDriver, setIsDriver] = useState(false)
  const [isDriverEdit, setIsDriverEdit] = useState(false)

  useEffect(() => {
    const unsubscribe = Navigation.addListener('focus', () => {
      setShowAddress(false)
      setExpanded()
    });
    return unsubscribe;
  }, [Navigation]);

  useEffect(() => {
    if (Location?.params?.userRole?.permission?.driver === 12) { // create
      setIsDriver(false)
      setIsDriverEdit(false)
    } else if (Location?.params?.userRole?.permission?.driver === 6) { // edit 
      setIsDriver(true)
      setIsDriverEdit(true)
    } else if (Location?.params?.userRole?.permission?.driver === 5) { // delete 
      setIsDriver(false)
      setIsDriverEdit(false)
    } else if (Location?.params?.userRole?.permission?.driver === 4) { // read
      setIsDriver(true)
      setIsDriverEdit(false)
    } else if (Location?.params?.userRole?.permission?.driver === 14) { // read  create edit 
      setIsDriver(true)
      setIsDriverEdit(true)
    } else if (Location?.params?.userRole?.permission?.driver === 15) { // create edit delete 
      setIsDriver(true)
      setIsDriverEdit(true)
    } else if (Location?.params?.userRole?.permission?.driver === 0) { // no permission
      setIsDriver(false)
      setIsDriverEdit(false)
    }
  }, [Location])

  return (
    <Fragment>
      <View style={{ backgroundColor: '#FFFFFF', borderRadius: 5, marginTop: 5, paddingTop: 6, paddingBottom: 6 }}>
        <Pressable onPress={() => expanded === item?.device.id ? handlePress({ id: 0, lat: item?.position === null ? '-' : item?.position?.latitude === null ? '-' : item?.position?.latitude, long: item?.position === null ? '-' : item?.position?.longitude }) : handlePress({ id: item?.device.id, lat: item?.position === null ? '-' : item?.position?.latitude === null ? '-' : item?.position?.latitude, long: item?.position === null ? '-' : item?.position?.longitude })} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginHorizontal: 10, paddingTop: 10, paddingBottom: 10 }}>
          <Row>
            <Col xs={1} sm={1} md={1} lg={1}>
              {expanded === item?.device.id ?
                <AntDesign onPress={() => handlePress({ id: 0, lat: item?.position === null ? '-' : item?.position?.latitude === null ? '-' : item?.position?.latitude, long: item?.position === null ? '-' : item?.position?.longitude })} name={"minuscircleo"} size={20} color={'#67748E'} />
                :
                <AntDesign onPress={() => handlePress({ id: item?.device.id, lat: item?.position === null ? '-' : item?.position?.latitude === null ? '-' : item?.position?.latitude, long: item?.position === null ? '-' : item?.position?.longitude })} name={"pluscircleo"} size={20} color={'#67748E'} />
              }
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Text numberOfLines={1} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-SemiBold', }}>{item?.device?.name}</Text>
            </Col>
            <Col xs={5} sm={5} md={5} lg={5}>
              <View style={{ width: '100%', }}>
                {expanded === item?.device?.id ?
                  item?.position === null ?
                    null
                    :
                    item?.position?.latitude === null ?
                      null :
                      item?.position?.latitude === 0.0 ?
                        null :
                        Location?.params?.userRole?.view?.vehicle_map === 1 ?
                          <Pressable onPress={() => { setMapIdVehicle(item); setListComView(false); setSelectedData([item]) }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
                            <View style={{ borderRadius: 50, height: 25, width: 25, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'blue' }}>
                              <FontAwesome5 name='map-marked-alt' size={16} color={'blue'} />
                            </View>
                          </Pressable> : null
                  :
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
                    {TrackListVehicle(item?.device)}
                    <Text numberOfLines={1} style={{ color: '#4646F2', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingLeft: 10 }}>{item?.device?.category === null ? '-' : item?.device?.category}</Text>
                    {TrackListSatus(item?.device)}
                  </View>
                }
              </View>
            </Col>
          </Row>
        </Pressable>
        {expanded === item?.device.id ?
          <View style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 20 }}>
            <View style={{ marginHorizontal: 20 }}>
              <Row>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Type</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                      {TrackListVehicle(item?.device)}
                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: 'blue', paddingLeft: 5 }}>{item?.device?.category === null ? '-' : item?.device?.category}</Text>
                    </View>
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Vehicle name</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.device?.name === null ? '-' : item?.device?.name}</Text>
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>RTO Code</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.device?.rto_code === null ? '-' : item?.device?.rto_code}</Text>
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Last Update</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.device.lastUpdate === null ? '-' : `${setDateFunction(item?.device?.lastUpdate)?.DateFormate},  ${setDateFunction(item?.device?.lastUpdate)?.TimeFormate}`}</Text>
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>GPS</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <MaterialIcons name='gps-not-fixed' size={18} color={'#67748E'} />
                      {item?.position === null ?
                        <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40', paddingLeft: 5 }}>-</Text>
                        :
                        <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40', paddingLeft: 5 }}>{item?.position?.attributes?.sat === null ? '-' : item?.position?.attributes?.sat}</Text>
                      }
                    </View>
                  </View>
                </Col>

                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Permit Holder</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.device.permit_holder === null ? '-' : item?.device.permit_holder}</Text>
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Contact</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.device.contact === null ? '-' : item?.device.contact}</Text>
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Chassis No</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.device.chasisno === null ? '-' : item?.device.chasisno}</Text>
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Address</Text>
                    {showAddress ?
                      <Pressable onPress={() => setShowAddress(false)} style={{ paddingTop: 5, }}>
                        <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{dataSet}</Text>
                      </Pressable>
                      :
                      <Pressable onPress={() => setShowAddress(true)} style={{ paddingTop: 5, }}>
                        <Text style={{ color: 'blue', fontFamily: 'OpenSans-SemiBold', fontSize: 12, width: 85, textAlign: 'center' }}>Show Address</Text>
                      </Pressable>
                    }
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>IMEI</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.device.imei === null ? '-' : item?.device.imei}</Text>
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Status</Text>
                    {TrackListSatusText(item?.device)}
                  </View>
                </Col>
                {isDriver ?
                  <>
                    <Col xs={6} sm={6} md={6} lg={6}>
                      <View style={{ marginTop: 20 }}>
                        <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Driver Name</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.device?.altContactPerson === null ? '-' : item?.device?.altContactPerson}</Text>
                          <View style={{ flexGrow: .7 }} />
                          {isDriverEdit ?
                            <TouchableOpacity onPress={() => { Navigation.navigate({ name: 'EditDriverNameContactScreen', params: { deviceId: item?.device?.id } }) }}>
                              <MaterialIcons name={'edit'} size={20} color={'#252F40'} />
                            </TouchableOpacity> : null}
                        </View>
                      </View>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                      <View style={{ marginTop: 20 }}>
                        <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Driver Contact</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.device?.altPhone === null ? '-' : item?.device?.altPhone}</Text>
                          <View style={{ flexGrow: .7 }} />
                          {isDriverEdit ?
                            <TouchableOpacity onPress={() => { Navigation.navigate({ name: 'EditDriverNameContactScreen', params: { deviceId: item?.device?.id } }) }}>
                              <MaterialIcons name={'edit'} size={20} color={'#252F40'} />
                            </TouchableOpacity> : null}
                        </View>
                      </View>
                    </Col>
                  </> : null}
              </Row>
            </View>
          </View>
          : null}
      </View>
    </Fragment>
  )
}

export default VehicleDataList