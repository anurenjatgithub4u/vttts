import React, { Fragment, useRef, useState } from 'react';
import { Text, View, Pressable, TouchableOpacity, ScrollView, Animated, Modal } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Dash from 'react-native-dash';
import moment from 'moment';
import { useRoute } from '@react-navigation/native';
import RouteModal from './RouteModal';

const OngoingTripList = ({ onGoingTrips, Navigation, setTripsDetails, onOpen }) => {
  let Location = useRoute();
  const [updateStartModal, setUpdateStartModal] = useState(null)
  const [updateEndModal, setUpdateEndModal] = useState(null)
  const scrollIndicator = useRef(new Animated.Value(0)).current;
  const [completeScrollBarHeight, setCompleteScrollBarHeight] = useState(1);
  const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(0);

  const scrollIndicatorSize =
    completeScrollBarHeight > visibleScrollBarHeight
      ? (visibleScrollBarHeight * visibleScrollBarHeight)
      / completeScrollBarHeight
      : visibleScrollBarHeight;

  const difference =
    visibleScrollBarHeight > scrollIndicatorSize
      ? visibleScrollBarHeight - scrollIndicatorSize
      : 1;

  const scrollIndicatorPosition = Animated.multiply(
    scrollIndicator,
    visibleScrollBarHeight / completeScrollBarHeight,
  ).interpolate({
    extrapolate: 'clamp',
    inputRange: [0, difference],
    outputRange: [0, difference],
  });

  const onContentSizeChange = (_, contentHeight) =>
    setCompleteScrollBarHeight(contentHeight);

  const onLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }) => {
    setVisibleScrollBarHeight(height);
  };

  return (
    <Fragment>
      <ScrollView
        contentContainerStyle={{ paddingRight: 8 }}
        onContentSizeChange={onContentSizeChange}
        onLayout={onLayout}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollIndicator } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        style={{ width: '100%', }}
      >
        {onGoingTrips?.map((value, index) => (
          <View key={index} style={{ backgroundColor: '#f9f9f9', borderRadius: 5, padding: 10, marginTop: 5, }}>
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
              <View>
                <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 14, color: '#252F40' }}>
                  {value?.vehicleNo}
                </Text>
                <Text style={{ color: '#252F40', fontSize: 11, fontFamily: 'OpenSans-Regular', paddingTop: 4 }}>({value?.groupName === null ? '-' : value?.groupName}, {value?.driverName === null ? '-' : value?.driverName}, {value?.category === null ? '-' : value?.category})</Text>
                <Text style={{ color: '#67748E', fontSize: 11, fontFamily: 'OpenSans-Regular', paddingTop: 4 }}>{value?.permitHolderName === null ? '-' : value?.permitHolderName} - {value?.permitHolderContact === null ? '-' : value?.permitHolderContact}</Text>
              </View>
              <View style={{ flexGrow: 1 }} />
              {Location?.params?.userRole?.view?.vehicle_map === 1 ?
                <TouchableOpacity onPress={() => Navigation.navigate({ name: 'TrackScreen', params: { panicDevice: value?.vehicleNo } })} style={{ borderColor: 'blue', borderWidth: 1, borderRadius: 50, padding: 4 }}>
                  <FontAwesome5 name={'map-marked-alt'} color={'#4646F2'} />
                </TouchableOpacity> : null}
            </View>

            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
              <TouchableOpacity onPress={() => setUpdateStartModal(value)}>
                <AntDesign name='checkcircle' size={20} color={value?.tripLegSummarys[0]?.status === 'finished' ? '#63CE78' : '#B9B9B9'} />
              </TouchableOpacity>
              <Dash dashColor={value?.tripLegSummarys[value?.tripLegSummarys?.length - 1]?.status === 'finished' ? '#63CE78' : '#707070'} dashThickness={2} dashLength={2} dashGap={3} style={{ width: '85%', flexDirection: 'row', }} />
              <TouchableOpacity onPress={() => setUpdateEndModal(value)}>
                {value?.tripLegSummarys[value?.tripLegSummarys?.length - 1]?.status === 'finished' ?
                  <AntDesign name='checkcircle' size={20} color={'#63CE78'} />
                  :
                  <FontAwesome name='circle' size={20} color={'#B9B9B9'} />
                }
              </TouchableOpacity>
            </View>

            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
              <View>
                {value?.routeLegs?.length === 0 ?
                  <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 11, color: '#252F40' }}>
                    -
                  </Text>
                  :
                  <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 11, color: '#252F40' }}>
                    {value?.routeLegs[0]?.nameFrom === null ? '-' : value?.routeLegs[0]?.nameFrom}
                  </Text>
                }
                {value?.startTime === null ?
                  <Text style={{ color: '#252F40', fontSize: 9, fontFamily: 'OpenSans-Regular', paddingTop: 3 }}>-</Text>
                  :
                  <Text style={{ color: '#252F40', fontSize: 9, fontFamily: 'OpenSans-Regular', paddingTop: 3 }}>{moment(value?.startTime).format("Do MMM YY") + ',' + ' ' + moment(value?.startTime).format('LT')}</Text>
                }
              </View>
              <View style={{ flexGrow: 1 }} />
              <View style={{ alignItems: 'flex-end' }}>
                {value?.routeLegs?.length === 0 ?
                  <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 11, color: '#252F40' }}>
                    -
                  </Text>
                  :
                  <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 11, color: '#252F40' }}>
                    {value?.routeLegs[value?.routeLegs?.length - 1]?.nameTo === null ? '-' : value?.routeLegs[value?.routeLegs?.length - 1]?.nameTo}
                  </Text>
                }
                {value?.endTime === null ?
                  <Text style={{ color: '#252F40', fontSize: 9, fontFamily: 'OpenSans-Regular', paddingTop: 3 }}>-</Text>
                  :
                  <Text style={{ color: '#252F40', fontSize: 9, fontFamily: 'OpenSans-Regular', paddingTop: 3 }}>{moment(value?.endTime).format("Do MMM YY") + ',' + ' ' + moment(value?.endTime).format('LT')}</Text>
                }
              </View>
            </View>

            <Pressable onPress={() => { setTripsDetails(value), onOpen() }} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', paddingTop: 10 }}>
              <MaterialCommunityIcons name='clock-time-four-outline' size={20} color={'#FA9826'} />
              <Text style={{ color: '#FA9826', paddingLeft: 10, fontFamily: 'OpenSans-SemiBold' }}>See All Updates</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
      <View style={{ backgroundColor: '#F9F9F9', borderRadius: 50, height: '100%', width: 8, }}>
        <Animated.View
          style={[
            { backgroundColor: '#E2E2FD', borderRadius: 50, width: 8, },
            {
              height: scrollIndicatorSize,
              transform: [{ translateY: scrollIndicatorPosition }],
            },
          ]}
        />
      </View>


      <RouteModal updateStartModal={updateStartModal} updateEndModal={updateEndModal} setUpdateStartModal={setUpdateStartModal} setUpdateEndModal={setUpdateEndModal} />
    </Fragment >
  )
}

export default OngoingTripList;

const data = { "category": "Car", "currentLat": 23.616179, "currentLng": 83.619835, "deviceId": 10, "driverContact": "8943969888", "driverName": "Raj Kumar", "endTime": null, "groupName": "ABC", "permitHolderContact": "5555577777", "permitHolderName": "update", "routeId": 336, "routeLegs": [{ "estDistanceFromOrigin": 2.256, "estDurationFromOrigin": 412, "latitudeFrom": 21.239839435610527, "latitudeTo": 21.23918540751396, "longitudeFrom": 81.6486292622986, "longitudeTo": 81.66150584717309, "nameFrom": "Dial112", "nameTo": "MarineDrive", "radiusFrom": 57.423469829735794, "radiusTo": 185.46119175869634 }, { "estDistanceFromOrigin": 9.469, "estDurationFromOrigin": 1293, "latitudeFrom": 21.23918540751396, "latitudeTo": 21.216264443560476, "longitudeFrom": 81.66150584717309, "longitudeTo": 81.62414463009775, "nameFrom": "MarineDrive", "nameTo": "Centrum", "radiusFrom": 185.46119175869634, "radiusTo": 103.64847686825964 }], "routeName": "Place1 to Place2", "startTime": null, "tripDelayed": false, "tripDeviated": false, "tripId": 74, "tripLegSummarys": [{ "distanceTraveled": 3.12, "durationTraveled": 30, "finishTime": 1675495651675, "legIndex": 0, "plannedDistance": 4.5, "plannedDuration": 40, "plannedTime": 1675496095675, "startTime": 1675495551675, "status": "finished" }, { "distanceTraveled": 7.99, "durationTraveled": 70, "finishTime": 1675496755675, "legIndex": 1, "plannedDistance": 24.91, "plannedDuration": 80, "plannedTime": 1675496695675, "startTime": 1675495655675, "status": "finished" }], "vehicleNo": "CG99ZZ1111" }