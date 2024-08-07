import React, { Fragment, useState, useEffect } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { View, Pressable, Text, } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Col, Row } from "react-native-responsive-grid-system";
import { useRoute } from '@react-navigation/native';
import { ListVehiCleType } from '../../../constants/ListVehiCleType';
import { TrackListSatusText } from '../../../constants/TrackListSatus';
import ListVerification from './ListVerification';
import TooltipModal from './TooltipModal';
import { setDateFunction } from '../../../constants/UnitConvert';

const EntityDataList = ({ expanded, setExpanded, handlePress, navigation, item }) => {
  const Location = useRoute();
  const [tooltipICCID, setTooltipICCID] = useState(null);
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    setExpanded();
  }, [])
  // const handlePress = () => {
  //   navigation.navigate('OtherPage', { item: item });
  // };
  

  useEffect(() => {
    if (Location?.params?.userRole?.permission?.vehicle_registration === 12) { // create
      setIsEdit(false)
    } else if (Location?.params?.userRole?.permission?.vehicle_registration === 6) { // edit 
      setIsEdit(true)
    } else if (Location?.params?.userRole?.permission?.vehicle_registration === 5) { // delete 
      setIsEdit(false)
    } else if (Location?.params?.userRole?.permission?.vehicle_registration === 4) { // read
      setIsEdit(false)
    } else if (Location?.params?.userRole?.permission?.vehicle_registration === 14) { // read  create edit 
      setIsEdit(true)
    } else if (Location?.params?.userRole?.permission?.vehicle_registration === 15) { // create edit delete read
      setIsEdit(true)
    } else if (Location?.params?.userRole?.permission?.vehicle_registration === 0) { // no permission
      setIsEdit(false)
    }
  }, [Location])

  return (
    <Fragment>
      <View style={{ backgroundColor: '#FFFFFF', borderRadius: 5, marginTop: 4, paddingTop: 6, paddingBottom: 6 }}>
        <Pressable onPress={() => expanded === item?.id ? handlePress(0) : handlePress(item?.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginHorizontal: 10, paddingTop: 10, paddingBottom: 10, }}>
          <Row>
            <Col xs={1} sm={1} md={1} lg={1}>
              {expanded === item?.id ?
                <AntDesign onPress={() => handlePress(0)} name={"minuscircleo"} size={20} color={'#7D8EAB'} />
                :
                <AntDesign onPress={() => handlePress(item?.id)} name={"pluscircleo"} size={20} color={'#7D8EAB'} />
              }
            </Col>
            <Col xs={5} sm={5} md={5} lg={5}>
              <Text numberOfLines={1} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', }}>{item?.uniqueId}</Text>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', }}>
                <Text numberOfLines={1} style={{ color: '#67748E', fontSize: 14, fontFamily: 'OpenSans-SemiBold', }}>{item?.name}</Text>
              </View>
            </Col>
          </Row>
        </Pressable>
        {expanded === item.id ?
          <View style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 20 }}>
            <View style={{ marginHorizontal: 10 }}>
              <Row>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Reg, Number</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#4646f2' }}>{item?.name === null ? '-' : item?.name}</Text>
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E', textTransform: 'capitalize' }}>rto code</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.rto_code === null ? '-' : item?.rto_code}</Text>
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Manufacturer</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.vehicleMake === null ? '-' : item?.vehicleMake}</Text>
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Vltd Model</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.vltdmodel === null ? '-' : item?.vltdmodel}</Text>
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Vltd Make</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.vltd_make === null ? '-' : item?.vltd_make}</Text>
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Vehicle Type</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                      {ListVehiCleType(item)}
                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40', paddingLeft: 5 }}>{item?.category === null ? '-' : item?.category}</Text>
                    </View>
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Color</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>-</Text>
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Year of made</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.manufacture_year === 0 ? '-' : item?.manufacture_year}</Text>
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Chassis Number</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.chasisno === null ? '-' : item?.chasisno}</Text>
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Sim Expiry</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{new Date(item?.sim1_expiry).toDateString()}</Text>
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Vehicle status</Text>
                    {TrackListSatusText(item)}
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Sos testing status</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: item?.sos_status === false ? '#FA9826' : '#000000' }}>{item?.sos_status === false ? 'Pending' : 'Completed'}</Text>
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Device Serial Number</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.serialNo === null ? '-' : item?.serialNo}</Text>
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>IMEI Number</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.uniqueId === null ? '-' : item?.uniqueId}</Text>
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>ICCID</Text>
                    <Pressable onPress={() => setTooltipICCID(item)}>
                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#4646F2' }}>{item?.iccid === null ? '-' : item?.iccid}</Text>
                    </Pressable>
                  </View>
                </Col>

                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E', textTransform: 'capitalize' }}>device Activation Status</Text>
                    {item?.deviceActivationStatus === null ?
                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}></Text>
                      :
                      <View>
                        <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.deviceActivationStatus}</Text>
                      </View>
                    }
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E', textTransform: 'capitalize' }}>device Activation Rcpt No</Text>
                    {item?.deviceActivationStatus === null ?
                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}></Text>
                      :
                      <View>
                        <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.activationRcptNo === null ? '-' : item?.activationRcptNo}</Text>
                      </View>
                    }
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E', textTransform: 'capitalize' }}>device Activated Upto</Text>
                    {item?.deviceActivatedUpto === null ?
                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}></Text>
                      :
                      <View>
                        <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{setDateFunction(item?.deviceActivatedUpto)?.DateFormate}</Text>
                      </View>
                    }
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E', textTransform: 'capitalize' }}>device Activation Date</Text>
                    {item?.deviceActivationDate === null ?
                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}></Text>
                      :
                      <View>
                        <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{setDateFunction(item?.deviceActivationDate)?.DateFormate}</Text>
                      </View>
                    }
                  </View>
                </Col>

                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Owner Name</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.permit_holder === null ? '-' : item?.permit_holder}</Text>
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Mobile Number</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.contact === null ? '-' : item?.contact}</Text>
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Driver Name</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.altContactPerson === null ? '-' : item?.altContactPerson}</Text>
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Driver Number</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.altPhone === null ? '-' : item?.altPhone}</Text>
                  </View>
                </Col>
              </Row>
              {item?.otpverified === true ?
                null
                :
                <View>
                  {isEdit ?
                    <Pressable onPress={() => navigation.navigate({ name: 'EditEntityScreen', params: { entity_id: item?.id } })} 
                    style={{ backgroundColor: '#7474f5', paddingTop: 8, paddingBottom: 8, borderRadius: 5, width: 100, marginTop: 10, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                      <FontAwesome5 name='edit' color={'#ffffff'} />
                      <Text style={{ color: "#ffffff", textAlign: 'center', paddingLeft: 5 }}>Edit</Text>
                    </Pressable> : null}
                </View>
              }
              {item?.otpverified === false ?
                null
                :
                <View>
                  {isEdit ?
                    <Pressable onPress={() => {navigation.navigate( 'OTPGenerator', {item:item})}} style={{ backgroundColor: '#4646f2', paddingTop: 8, paddingBottom: 8, borderRadius: 5, width: 350, marginTop: 10 }}>
                    <Text style={{ color: "#ffffff", textAlign: 'center', fontFamily: 'OpenSans-Reegular', fontSize: 14 }}>Untag Entity</Text>
                  </Pressable> : null}
                </View>
              }
            </View>
            <ListVerification navigation={navigation} item={item} />
          </View>
          : null} 
          </View>
      <TooltipModal tooltipICCID={tooltipICCID} setTooltipICCID={setTooltipICCID} />
    </Fragment>
  )
}

export default EntityDataList;




// let dat ={"navigation": {"addListener": [Function addListener], "canGoBack": [Function canGoBack], "dispatch": [Function dispatch], "getId": [Function getId], "getParent": [Function getParent], "getState": [Function anonymous], "goBack": [Function anonymous], "isFocused": [Function isFocused], "navigate": [Function anonymous], "pop": [Function anonymous], "popToTop": [Function anonymous], "push": [Function anonymous], "removeListener": [Function removeListener], "replace": [Function anonymous], "reset": [Function anonymous], "setOptions": [Function setOptions], "setParams": [Function anonymous]}, "route": {"key": "OTPGenerator--hHi9WaR9z2W9dUt_Tj7s", "name": "OTPGenerator", "params": {"item": [Object], "userId": 33, "userRole": [Object], "userToken": "bWFudGhhYXBwdUBjZ3Z0cy5jZ3N0YXRlLmdvdi5pbjpUcmFja29sZXRAMTIzIw=="}, "path": undefined}}