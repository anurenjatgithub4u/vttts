import React, { Fragment } from 'react';;
import { Text, View, Pressable, Modal, TouchableOpacity } from 'react-native';
import { Row, Col } from 'react-native-responsive-grid-system';
import AntDesign from 'react-native-vector-icons/AntDesign'
import BlurViewScreen from '../../../../BlurViewScreen';
import { msToTime } from '../../../constants/UnitConvert';

const RouteModal = ({ updateStartModal, setUpdateStartModal, updateEndModal, setUpdateEndModal }) => {

  return (
    <Fragment>
      <Modal visible={updateStartModal === null ? false : true} transparent={true} onRequestClose={() => { setUpdateStartModal(null) }}>
        <BlurViewScreen />
        <Pressable onPress={() => { setUpdateStartModal(null) }} style={{ flex: 1, backgroundColor: '#000000a1', justifyContent: 'center', alignItems: "center" }}>
          <View style={{ width: '100%', paddingHorizontal: 15 }}>
            <View style={{ backgroundColor: "#FFFFFF", elevation: 4, padding: 20, borderRadius: 3 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center", }}>
                <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 15, color: '#63CE78' }}>{updateStartModal?.vehicleNo}</Text>
                <View style={{ flexGrow: 1 }} />
                <TouchableOpacity onPress={() => { setUpdateStartModal(null) }}>
                  <AntDesign name='closecircleo' size={22} />
                </TouchableOpacity>
              </View>
              <Row>
                <Col xs={6}>
                  <View style={{ marginTop: 15 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Start Time</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{updateStartModal?.tripLegSummarys[0]?.startTime === null ? msToTime(0) : msToTime(updateStartModal?.tripLegSummarys[0]?.startTime)}</Text>
                  </View>
                </Col>
                <Col xs={6}>
                  <View style={{ marginTop: 15 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Distance Travelled</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{updateStartModal?.tripLegSummarys[0]?.distanceTraveled}</Text>
                  </View>
                </Col>
                <Col xs={6}>
                  <View style={{ marginTop: 15 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Duration Travelled</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{updateStartModal?.tripLegSummarys[0]?.durationTraveled === null ? msToTime(0) : msToTime(updateStartModal?.tripLegSummarys[0]?.durationTraveled)}</Text>
                  </View>
                </Col>
                <Col xs={6}>
                  <View style={{ marginTop: 15 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Finish Time</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{updateStartModal?.tripLegSummarys[0]?.finishTime === null ? msToTime(0) : msToTime(updateStartModal?.tripLegSummarys[0]?.finishTime)}</Text>
                  </View>
                </Col>
                <Col xs={6}>
                  <View style={{ marginTop: 15 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Status</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{updateStartModal?.tripLegSummarys[0]?.status}</Text>
                  </View>
                </Col>
                <Col xs={6}>
                  <View style={{ marginTop: 15 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Planned Time</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{updateStartModal?.tripLegSummarys[0]?.plannedTime === null ? msToTime(0) : msToTime(updateStartModal?.tripLegSummarys[0]?.plannedTime)}</Text>
                  </View>
                </Col>
                <Col xs={6}>
                  <View style={{ marginTop: 15 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Planned Distance</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{updateStartModal?.tripLegSummarys[0]?.plannedDistance}</Text>
                  </View>
                </Col>
                <Col xs={6}>
                  <View style={{ marginTop: 15 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Leg Index</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{updateStartModal?.tripLegSummarys[0]?.legIndex}</Text>
                  </View>
                </Col>


                <Col xs={6}>
                  <View style={{ marginTop: 15 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Name From</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{updateStartModal?.routeLegs[0]?.nameFrom}</Text>
                  </View>
                </Col>
                <Col xs={6}>
                  <View style={{ marginTop: 15 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Name To</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{updateStartModal?.routeLegs[0]?.nameTo}</Text>
                  </View>
                </Col>
                <Col xs={6}>
                  <View style={{ marginTop: 15 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Actual Time</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>-</Text>
                  </View>
                </Col>
              </Row>
            </View>
          </View>
        </Pressable>
      </Modal>


      <Modal visible={updateEndModal === null ? false : true} transparent={true} onRequestClose={() => { setUpdateEndModal(null) }}>
        <BlurViewScreen />
        <Pressable onPress={() => { setUpdateEndModal(null) }} style={{ flex: 1, backgroundColor: '#000000a1', justifyContent: 'center', alignItems: "center" }}>
          <View style={{ width: '100%', paddingHorizontal: 15 }}>
            <View style={{ backgroundColor: "#FFFFFF", elevation: 4, padding: 20, borderRadius: 3 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center", }}>
                <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 15, color: '#63CE78' }}>{updateEndModal?.vehicleNo}</Text>
                <View style={{ flexGrow: 1 }} />
                <TouchableOpacity onPress={() => { setUpdateEndModal(null) }}>
                  <AntDesign name='closecircleo' size={22} />
                </TouchableOpacity>
              </View>
              <Row>
                <Col xs={6}>
                  <View style={{ marginTop: 15 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Start Time</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{updateEndModal?.tripLegSummarys[updateEndModal?.tripLegSummarys?.length - 1]?.startTime === null ? msToTime(0) : msToTime(updateEndModal?.tripLegSummarys[updateEndModal?.tripLegSummarys?.length - 1]?.startTime)}</Text>
                  </View>
                </Col>
                <Col xs={6}>
                  <View style={{ marginTop: 15 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Distance Travelled</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{updateEndModal?.tripLegSummarys[updateEndModal?.tripLegSummarys?.length - 1]?.distanceTraveled}</Text>
                  </View>
                </Col>
                <Col xs={6}>
                  <View style={{ marginTop: 15 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Duration Travelled</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{updateEndModal?.tripLegSummarys[updateEndModal?.tripLegSummarys?.length - 1]?.durationTraveled === null ? msToTime(0) : msToTime(updateEndModal?.tripLegSummarys[updateEndModal?.tripLegSummarys?.length - 1]?.durationTraveled)}</Text>
                  </View>
                </Col>
                <Col xs={6}>
                  <View style={{ marginTop: 15 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Finish Time</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{updateEndModal?.tripLegSummarys[updateEndModal?.tripLegSummarys?.length - 1]?.finishTime === null ? msToTime(0) : msToTime(updateEndModal?.tripLegSummarys[updateEndModal?.tripLegSummarys?.length - 1]?.finishTime)}</Text>
                  </View>
                </Col>
                <Col xs={6}>
                  <View style={{ marginTop: 15 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Status</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{updateEndModal?.tripLegSummarys[updateEndModal?.tripLegSummarys?.length - 1]?.status}</Text>
                  </View>
                </Col>
                <Col xs={6}>
                  <View style={{ marginTop: 15 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Planned Time</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{updateEndModal?.tripLegSummarys[updateEndModal?.tripLegSummarys?.length - 1]?.plannedTime === null ? msToTime(0) : msToTime(updateEndModal?.tripLegSummarys[updateEndModal?.tripLegSummarys?.length - 1]?.plannedTime)}</Text>
                  </View>
                </Col>
                <Col xs={6}>
                  <View style={{ marginTop: 15 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Planned Distance</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{updateEndModal?.tripLegSummarys[updateEndModal?.tripLegSummarys?.length - 1]?.plannedDistance}</Text>
                  </View>
                </Col>
                <Col xs={6}>
                  <View style={{ marginTop: 15 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Leg Index</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{updateEndModal?.tripLegSummarys[updateEndModal?.tripLegSummarys?.length - 1]?.legIndex}</Text>
                  </View>
                </Col>


                <Col xs={6}>
                  <View style={{ marginTop: 15 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Name From</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{updateEndModal?.routeLegs[updateEndModal?.routeLegs?.length - 1]?.nameFrom}</Text>
                  </View>
                </Col>
                <Col xs={6}>
                  <View style={{ marginTop: 15 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Name To</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{updateEndModal?.routeLegs[updateEndModal?.routeLegs?.length - 1]?.nameTo}</Text>
                  </View>
                </Col>
                <Col xs={6}>
                  <View style={{ marginTop: 15 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Actual Time</Text>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>-</Text>
                  </View>
                </Col>
              </Row>
            </View>
          </View>
        </Pressable>
      </Modal>
    </Fragment>
  )
}

export default RouteModal