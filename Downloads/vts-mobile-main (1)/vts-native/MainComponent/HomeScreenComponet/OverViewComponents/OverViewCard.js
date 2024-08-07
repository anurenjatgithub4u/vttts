import React, { Fragment, useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { Row, Col } from 'react-native-responsive-grid-system';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useHeader } from '../../../ApiHeader';

const OverViewCard = ({ }) => {
  let Navigation = useNavigation();
  let location = useRoute();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [vehicleStatus, setVehicleStatus] = useState({});
  const [loadingvehicleStatus, setLoadingVehicleStatus] = useState(true)

  const fetchData = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get('/dashboard/vehiclestatus', { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setVehicleStatus(response.data);
        } else {

        }
      })
      .catch(function (error) {
        console.log('VehicleStatus', error);
      })
      .finally(function () {
        setLoadingVehicleStatus(false)
      });
    return () => {
      controller.abort();
    };
  }

  useEffect(() => {
    fetchData();
  }, [vehicleStatus])//vehicleStatus

  useEffect(() => {
    const unsubscribe = Navigation.addListener('focus', () => {
      Navigation.setParams({ search_key: undefined })
    });
    return unsubscribe;
  }, [Navigation])


  useEffect(() => {
    var ws = new WebSocket(`wss://cgvtsapi.trackolet.in/api/socket`);
    ws.close = (e) => { console.log('onclose', e); };
  }, [location]);

  const CardData = [
    { id: 1, search_key: 'Total', name: 'Total Vehicle', value: vehicleStatus?.total_devices === undefined || null ? 0 : vehicleStatus?.total_devices, title: 'Total', bgcolor: ['#4646F2', '#7272F2', '#A478EA'] },
    { id: 2, search_key: 'moving', name: 'Moving Vehicle', value: vehicleStatus?.vehicle_motion === undefined || null ? 0 : vehicleStatus?.vehicle_motion, title: 'Moving', bgcolor: ['#6CCF7F', '#92D972'] },
    { id: 3, search_key: 'idle', name: 'Idle Vehicle', value: vehicleStatus?.vehicle_idle === undefined || null ? 0 : vehicleStatus?.vehicle_idle, title: 'Idle', bgcolor: ['#E38527', '#E57D15', '#BF9545'] },
    { id: 4, search_key: 'stopped', name: 'Stopped Vehicle', value: vehicleStatus?.vehicle_stopped === undefined || null ? 0 : vehicleStatus?.vehicle_stopped, title: 'Stopped', bgcolor: ['#F25555', '#F08080', '#F2A355'] },
    { id: 5, search_key: 'other', name: 'Other Vehicle', value: vehicleStatus?.no_data === undefined || null ? 0 : vehicleStatus?.no_data, title: 'Other', bgcolor: ['#48556F', '#698EF2'] },
    { id: 6, search_key: 'inactive', name: 'Inactive Vehicle', value: vehicleStatus?.unknown === undefined || null ? 0 : vehicleStatus?.unknown, title: 'Inactive', bgcolor: ['#E2C421', '#E6B376'] },
  ]

  return (
    <Fragment>
      {loadingvehicleStatus ?
        <View style={{ flex: 1, marginTop: 10 }}>
          <Row>
            {CardData?.map((value, id) => (
              <Col key={id} xs={4} sm={4} md={4} lg={4}>
                <LinearGradient
                  colors={value.bgcolor}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  style={{ borderRadius: 9, width: "100%", marginTop: 10, height: 100, }}>
                  <Pressable style={{ margin: 10 }} onPress={() => { value?.title === 'Total' ? null : value?.value === 0 ? null : location?.params?.userRole?.view?.vehicle_list === 1 ? Navigation.navigate({ name: 'TrackScreen', params: { search_key: value?.search_key } }) : null }}>
                    <Text numberOfLines={1} style={{ color: '#FFFFFF', fontSize: 12, fontFamily: 'OpenSans-Bold', }}>{value?.name}</Text>
                    <Text style={{ color: '#FFFFFF', fontSize: 20, fontFamily: 'OpenSans-Bold', marginTop: 10 }}>{value?.value}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <Text style={{ color: '#FFFFFF', fontSize: 10, fontFamily: 'OpenSans-Regular', }}>{value?.title}</Text>
                      <View style={{ flexGrow: 1 }} />
                      {location?.params?.userRole?.view?.vehicle_list === 1 ?
                        <Pressable style={{ width: 16, height: 16, justifyContent: 'center', alignItems: 'center' }}>
                          {value?.title === 'Total' ?
                            null
                            :
                            value?.value === 0 ?
                              null :
                              <AntDesign
                                onPress={() => { value?.title === 'Total' ? null : value?.value === 0 ? null : Navigation.navigate({ name: 'TrackScreen', params: { search_key: value?.search_key } }) }}
                                name="arrowright"
                                color={Colors.white}
                                size={17}
                              />
                          }
                        </Pressable> : null}
                    </View>
                  </Pressable>
                </LinearGradient>
              </Col>
            ))}
          </Row>
        </View>
        :
        <View style={{ flex: 1, }}>
          <Row>
            {CardData.map((value, id) => (
              <Col key={id} xs={4} sm={4} md={4} lg={4}>
                <LinearGradient
                  colors={value.bgcolor}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  style={{ borderRadius: 9, width: "100%", marginTop: 10, height: 100, }}>
                  <Pressable style={{ margin: 10 }} onPress={() => { value?.title === 'Total' ? null : value?.value === 0 ? null : location?.params?.userRole?.view?.vehicle_list === 1 ? Navigation.navigate({ name: 'TrackScreen', params: { search_key: value?.search_key } }) : null }}>
                    <Text numberOfLines={1} style={{ color: '#FFFFFF', fontSize: 12, fontFamily: 'OpenSans-Bold', }}>{value?.name}</Text>
                    <Text style={{ color: '#FFFFFF', fontSize: 20, fontFamily: 'OpenSans-Bold', marginTop: 10 }}>{value?.value}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <Text style={{ color: '#FFFFFF', fontSize: 10, fontFamily: 'OpenSans-Regular', }}>{value?.title}</Text>
                      <View style={{ flexGrow: 1 }} />
                      {location?.params?.userRole?.view?.vehicle_list === 1 ?
                        <Pressable style={{ width: 16, height: 16, justifyContent: 'center', alignItems: 'center' }}>
                          {value?.title === 'Total' ?
                            null
                            :
                            value?.value === 0 ?
                              null :
                              <AntDesign
                                name="arrowright"
                                color={Colors.white}
                                size={17}
                              />
                          }
                        </Pressable> : null}
                    </View>
                  </Pressable>
                </LinearGradient>
              </Col>
            ))}
          </Row>
        </View >
      }
    </Fragment >
  )
}

export default OverViewCard;
