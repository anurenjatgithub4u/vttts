import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Actionsheet, } from 'native-base';
import Dash from 'react-native-dash';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';

const OngoingTripUpdate = ({ isOpen, onClose, Navigation, tripsDetails }) => {
  let Location = useRoute();
  // console.log('moment', moment(0)?.format('do MM YY, LT'))
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
      <Actionsheet.Content style={{ width: '100%' }}>
        <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20, paddingTop: 10, elevation: 12 }}>
          <View>
            <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 14, color: '#252F40' }}>
              {tripsDetails?.vehicleNo === null ? '-' : tripsDetails?.vehicleNo}
            </Text>
            <Text style={{ color: '#252F40', fontSize: 11, fontFamily: 'OpenSans-Regular', paddingTop: 5 }}>({tripsDetails?.groupName === null ? '-' : tripsDetails?.groupName}, {tripsDetails?.driverName === null ? '-' : tripsDetails?.driverName}, {tripsDetails?.category === null ? '-' : tripsDetails?.category})</Text>
            <Text style={{ color: '#67748E', fontSize: 11, fontFamily: 'OpenSans-Regular', paddingTop: 1, paddingBottom: 5 }}>{tripsDetails?.permitHolderName === null ? '-' : tripsDetails?.permitHolderName} - {tripsDetails?.permitHolderContact === null ? '-' : tripsDetails?.permitHolderContact}</Text>
          </View>
          <View style={{ flexGrow: 1 }} />
          {Location?.params?.userRole?.view?.vehicle_map === 1 ?
            <TouchableOpacity onPress={() => Navigation.navigate({ name: 'TrackScreen', params: { panicDevice: tripsDetails?.vehicleNo } })} style={{ borderColor: '#4646F2', borderWidth: 1, borderRadius: 50, padding: 4 }}>
              <FontAwesome5 name={'map-marked-alt'} color={'#4646F2'} />
            </TouchableOpacity> : null}
        </View>

        <ScrollView nestedScrollEnabled={true} scrollEnabled={true} showsVerticalScrollIndicator={false} style={{ width: '100%', }}>
          {/* {tripsDetails?.routeLegs?.length === 0 ?
            <View style={{ paddingTop: 20, paddingBottom: 10 }}>
              <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', textAlign: 'center' }}>No route found</Text>
            </View>
            :
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20, }}>
              <View>
                <AntDesign name='checkcircle' size={20} color={tripsDetails?.tripLegSummarys[0]?.status === 'pending' ? '#B9B9B9' : '#63CE78'} style={{ paddingTop: 3 }} />
                <View>
                  <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 12, color: '#252F40', paddingTop: 5, paddingBottom: 2 }}>
                    {tripsDetails?.routeLegs[0]?.nameFrom === null ? '-' : tripsDetails?.routeLegs[0]?.nameFrom}
                  </Text>
                </View>
                <Dash dashColor={'#63ce78'} dashThickness={2} dashLength={2} dashGap={3} style={{ height: 90, flexDirection: 'column', display: 'flex' }} />
              </View>
            </View>
          } */}

          {tripsDetails?.routeLegs?.map((value, index) => (
            <View key={index} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20, }}>
              <View>
                {index === 0 ?
                  <View>
                    <AntDesign name='checkcircle' size={20} color={tripsDetails?.tripLegSummarys[index]?.status === 'pending' ? '#B9B9B9' : '#63CE78'} style={{ paddingTop: 3 }} />
                    <View>
                      <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 12, color: '#252F40', paddingTop: 5, paddingBottom: 2 }}>
                        {value?.nameFrom === null ? '-' : value?.nameFrom}
                      </Text>
                      <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#252F40', paddingBottom: 2 }}>
                        {tripsDetails?.startTime === null ? '-' : moment(tripsDetails?.startTime)?.format('do MM YY, LT')}
                      </Text>
                    </View>
                    <Dash dashColor={tripsDetails?.tripLegSummarys[index]?.status === 'pending' ? '#B9B9B9' : '#63CE78'} dashThickness={2} dashLength={2} dashGap={3} style={{ height: 90, flexDirection: 'column', display: 'flex' }} />
                  </View> : null
                }
                <View>
                  <AntDesign name='checkcircle' size={20} color={tripsDetails?.tripLegSummarys[index]?.status === 'pending' ? '#B9B9B9' : '#63CE78'} style={{ paddingTop: 3 }} />
                  <View>
                    <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 12, color: '#252F40', paddingTop: 5, paddingBottom: 2 }}>
                      {value?.nameTo === null ? '-' : value?.nameTo}
                    </Text>
                    {index === tripsDetails?.tripLegSummarys?.length - 1 ?
                      <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#252F40', paddingBottom: 2 }}>
                        {tripsDetails?.endTime === null ? '-' : moment(tripsDetails?.endTime)?.format('do MM YY, LT')}
                      </Text>
                      :
                      <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#252F40', paddingBottom: 2 }}>
                        {tripsDetails?.tripLegSummarys[index + 1]?.startTime === 0 ? '-' : moment(tripsDetails?.tripLegSummarys[index + 1]?.startTime)?.format('do MM YY, LT')}
                      </Text>
                    }
                  </View>
                  <Dash dashColor={tripsDetails?.tripLegSummarys[index]?.status === 'pending' ? '#B9B9B9' : '#63CE78'} dashThickness={2} dashLength={2} dashGap={3} style={{ height: 90, flexDirection: 'column', display: tripsDetails?.routeLegs?.length === 1 ? 'none' : index === tripsDetails?.routeLegs?.length - 1 ? 'none' : 'flex' }} />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  )
}

export default OngoingTripUpdate