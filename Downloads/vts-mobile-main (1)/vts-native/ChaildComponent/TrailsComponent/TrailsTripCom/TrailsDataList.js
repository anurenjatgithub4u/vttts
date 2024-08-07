import React, { Fragment, useEffect, useState } from 'react';
import { View, LogBox, Text, Pressable, TouchableOpacity, Modal } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Box, Divider, } from 'native-base'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Slider } from 'react-native-elements';
import { Col, Row } from 'react-native-responsive-grid-system';
import TrailsChart from './TrailsChart';
import TrailsListHeader from './TrailsListHeader';
import BlurViewScreen from '../../../BlurViewScreen';

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();

const TrailsDataList = ({ routeGraph, CurrentPoint, sliderHandler, totalLenght, setIsAnimate, setIsSpeed, isSpeed, isAnimate, onToggle, onStop, onStart, onPause, itemObject, }) => {
  const [isConfirm, setIsConfirm] = useState({ isVisible: false, isSpeed: '' })
  let index = 0
  if (CurrentPoint) {
    if (CurrentPoint.properties && CurrentPoint.properties.nearestIndex) {
      index = CurrentPoint.properties.nearestIndex
    }
  }

  useEffect(() => {
    if (index === -1) {
      setIsAnimate(false);
      sliderHandler(index + 1)
    }
  }, [index]);

  const onHandleSpeed = (event) => {
    setIsSpeed(event);
    onPause();
    onStop();
    setIsAnimate(false);
    setIsConfirm({ ...isConfirm, isVisible: false })
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return (
    <Fragment>
      <Modal visible={isConfirm?.isVisible} transparent={true}>
        <BlurViewScreen />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000094', paddingHorizontal: 15 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', width: '100%', borderRadius: 10, paddingTop: 30, paddingBottom: 30, paddingLeft: 15, paddingRight: 15, elevation: 12 }}>
            <View style={{ paddingBottom: 15 }}>
              <Text style={{ textAlign: 'center', color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 15 }}>CGVTS</Text>
            </View>
            <View style={{ paddingBottom: 15 }}>
              <Text style={{ textAlign: 'center', color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 13 }}>This operation will stop current moving in the map, please confirm to continue?</Text>
            </View>
            <Row>
              <Col xs={6}>
                <TouchableOpacity onPress={() => setIsConfirm({ ...isConfirm, isVisible: false })} activeOpacity={0.50} style={{ backgroundColor: "#F25555", height: 35, alignItems: "center", width: "100%", justifyContent: "center", borderRadius: 5 }}>
                  <Text style={{ color: '#FFFFFF', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Cancel</Text>
                </TouchableOpacity>
              </Col>
              <Col xs={6}>
                <TouchableOpacity onPress={() => onHandleSpeed(isConfirm?.isSpeed)} activeOpacity={0.50} style={{ backgroundColor: "#7171F3", height: 35, alignItems: "center", width: "100%", justifyContent: "center", borderRadius: 5 }}>
                  <Text style={{ color: '#FFFFFF', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Confirm</Text>
                </TouchableOpacity>
              </Col>
            </Row>
          </View>
        </View>
      </Modal>

      <View style={{
        marginHorizontal: 15,
        backgroundColor: Colors.white, borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, elevation: 5, position: 'relative', top: -50, paddingHorizontal: 10, paddingBottom: 10
      }}>
        <TrailsListHeader routeGraph={routeGraph} itemObject={itemObject} />

        <TrailsChart routeGraph={routeGraph} itemObject={itemObject} />

        <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
          <View style={{ flexGrow: 1 }} />
          {index === 0 ?
            <TouchableOpacity disabled={true} onPress={() => { sliderHandler(index - 1) }} style={{ alignItems: 'center', justifyContent: 'center' }}>
              <AntDesign name='verticleright' size={24} color={'#67748E'} />
            </TouchableOpacity>
            :
            index === -1 ?
              <TouchableOpacity disabled={true} onPress={() => { sliderHandler(index - 1) }} style={{ alignItems: 'center', justifyContent: 'center' }}>
                <AntDesign name='verticleright' size={24} color={'#67748E'} />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => { sliderHandler(index - 1) }} style={{ alignItems: 'center', justifyContent: 'center' }}>
                <AntDesign name='verticleright' size={24} color={'#252F40'} />
              </TouchableOpacity>
          }
          <View style={{ flexGrow: 1 }} />

          {isAnimate ?
            <TouchableOpacity onPress={() => { onPause(); onToggle() }} style={{ alignItems: 'center', justifyContent: 'center' }}>
              <AntDesign name={'pausecircleo'} size={24} color={'#252F40'} />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => { onStart(); onToggle() }} style={{ alignItems: 'center', justifyContent: 'center' }}>
              <AntDesign name={'playcircleo'} size={24} color={'#252F40'} />
            </TouchableOpacity>
          }

          <View style={{ flexGrow: 1 }} />
          <TouchableOpacity disabled={index === totalLenght} onPress={() => { sliderHandler(index + 1) }} style={{ alignItems: 'center', justifyContent: 'center' }}>
            <AntDesign name='verticleleft' size={24} color={index === totalLenght ? '#67748E' : '#252F40'} />
          </TouchableOpacity>
          <View style={{ flexGrow: 1 }} />
        </View>
        <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
          <Slider
            style={{ width: '80%', marginTop: 10, }}
            step={1}
            value={index}
            onValueChange={(val) => { sliderHandler(val) }}
            minimumValue={0}
            maximumValue={totalLenght}
            minimumTrackTintColor={"#4646f2"}
            maximumTrackTintColor={"#62676f"}
            trackStyle={{ height: 7, borderRadius: 50 }}
            thumbStyle={{ height: 20, width: 20, backgroundColor: '#FFFFFF', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, elevation: 5, }}
          />
          <View style={{ flexGrow: 1 }} />
          {isSpeed === 0.002 ?
            <TouchableOpacity onPress={() => setIsConfirm({ ...isConfirm, isVisible: true, isSpeed: isSpeed * 2 })} style={{ width: '15%', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: isSpeed === 0.002 ? '#4646F2' : 'gray', borderRadius: 5, height: 25, marginTop: 9, }}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 14, color: isSpeed === 0.002 ? '#4646F2' : '#000000' }}>1X</Text>
            </TouchableOpacity>
            :
            isSpeed === 0.004 ?
              <TouchableOpacity onPress={() => setIsConfirm({ ...isConfirm, isVisible: true, isSpeed: isSpeed * 4 })} style={{ width: '15%', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: isSpeed === 0.004 ? '#4646F2' : 'gray', borderRadius: 5, height: 25, marginTop: 9, }}>
                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 14, color: isSpeed === 0.004 ? '#4646F2' : '#000000' }}>2X</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => setIsConfirm({ ...isConfirm, isVisible: true, isSpeed: 0.002 })} style={{ width: '15%', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: isSpeed === 0.016 ? '#4646F2' : 'gray', borderRadius: 5, height: 25, marginTop: 9, }}>
                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 14, color: isSpeed === 0.016 ? '#4646F2' : '#000000' }}>4X</Text>
              </TouchableOpacity>
          }
        </View>
        <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginTop: 15 }}>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#e2e2fd', borderRadius: 50, height: 25, width: 25 }}>
              <Fontisto name='truck' size={13} color={'#252F40'} />
            </View>
            <Text style={{ color: 'blue', fontFamily: 'OpenSans-SemiBold', fontSize: 14, marginLeft: 10 }}>{itemObject?.vehicleNo === null ? '-' : itemObject?.vehicleNo}</Text>
            <View style={{ flexGrow: 1 }} />
          </Pressable>
        </Pressable>
        <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20, paddingTop: 20 }}>
          <Box>
            <Row>
              <Col xs={3} sm={3} md={3} lg={3}>
                <View>
                  <Text style={{ color: '#2E2C33', fontSize: 10, fontFamily: 'OpenSans-Regular', textAlign: 'center' }}>{itemObject?.startTime === null ? '-' : `${new Date(itemObject?.startTime).getDate()} ${months[new Date(itemObject?.startTime).getMonth()]} ${new Date(itemObject?.startTime).getFullYear()}`}</Text>
                </View>
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <View>
                  <AntDesign name='checkcircle' size={20} color={'#63ce78'} />
                </View>
              </Col>
              <Col xs={8} sm={8} md={8} lg={8}>
                <View>
                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 10, color: '#252F40' }}>
                    {itemObject?.startAddress === null ? '-' : itemObject?.startAddress}
                  </Text>
                </View>
              </Col>
            </Row>
            <Row>
              <Col xs={3} sm={3} md={3} lg={3}>
                <View>
                </View>
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <View>
                  <Divider thickness="2" mx="2" orientation="vertical" style={{ height: 80, /* borderWidth: 1, */ borderStyle: 'dashed', /* borderColor: '#63ce78' */ }} />
                </View>
              </Col>
              <Col xs={8} sm={8} md={8} lg={8}>
                <View>
                </View>
              </Col>
            </Row>
            <Row>
              <Col xs={3} sm={3} md={3} lg={3}>
                <View>
                  <Text style={{ paddingRight: 6, color: '#2E2C33', fontSize: 10, fontFamily: 'OpenSans-Regular', }}>
                    {itemObject?.endTime === null ? '-' : `${new Date(itemObject?.endTime).getDate()} ${months[new Date(itemObject?.endTime).getMonth()]} ${new Date(itemObject?.endTime).getFullYear()}`}
                  </Text>
                </View>
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <View>
                  <AntDesign name='checkcircle' size={20} color={'#63ce78'} />
                </View>
              </Col>
              <Col xs={8} sm={8} md={8} lg={8}>
                <View>
                  <Text style={{ paddingLeft: 6, fontFamily: 'OpenSans-Regular', fontSize: 10, color: '#252F40' }}>
                    {itemObject?.endAddress === null ? '-' : itemObject?.endAddress}
                  </Text>
                </View>
              </Col>
            </Row>
          </Box>
          <View style={{ flexGrow: 1 }} />
        </View>
      </View>
    </Fragment>
  )
}

export default TrailsDataList
