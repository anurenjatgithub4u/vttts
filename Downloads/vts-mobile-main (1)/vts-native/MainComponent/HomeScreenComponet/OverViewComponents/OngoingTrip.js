import React, { Fragment, useState, useEffect } from 'react';
import { TextInput, Text, View, Pressable, ActivityIndicator } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Center, useDisclose } from 'native-base';
import { useHeader } from '../../../ApiHeader';
import OngoingTripUpdate from './Helper/OngoingTripUpdate';
import OngoingTripList from './Helper/OngoingTripList';

const OngoingTrip = () => {
  let Navigation = useNavigation();
  const [value, setValue] = useState({ value: '', isSearch: false });
  const [searchBar, setSerchBar] = useState(false);
  const [tripsDetails, setTripsDetails] = useState(null);
  const [onGoingTrips, setOnGoingTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclose();
  const { ApiRequestAuthorizationHook, } = useHeader();

  const onPreeEvent = () => {
    setSerchBar(searchBar => !searchBar);
  }

  const fetchTripsData = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    await ApiRequestAuthorizationHook.get(`/dashboard/active/trips?${value?.value === '' ? '' : `searchKey=${value?.value}`}`, { signal: signal })
      .then(function (ress) {
        if (ress?.status === 200) {
          setOnGoingTrips(ress?.data?.data)
          if (value?.value === '') {
            setSerchBar(false);
          }
        }
      })
      .catch(function (err) {
        console.log('fetchTripsData', err)
      })
      .finally(function () {
        setLoading(false)
      })
    return () => {
      controller.abort();
    };
  }
  useEffect(() => {
    const unsubscribe = Navigation.addListener('focus', () => {
      fetchTripsData();
    });
    return unsubscribe;
  }, [Navigation]);
  useEffect(() => { fetchTripsData() }, []);

  const onHandleSearch = async () => {
    fetchTripsData();
    setLoading(true)
  }

  return (
    <Fragment>
      <View style={{ marginTop: 10 }}>
        <View style={{ marginTop: 5, elevation: 0, backgroundColor: Colors.white, borderRadius: 10, padding: 10, }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#63ce78', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingBottom: 10 }}>Ongoing Trip</Text>
            <View style={{ flexGrow: 1 }} />
            {/* <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-Regular', }}><Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 12 }}>{value?.isSearch === false ? onGoingTrips?.length : searchOnGoingTrips?.length}</Text> Result Found</Text> */}
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
            {searchBar ?
              <View style={{ alignItems: 'center', flexDirection: 'row', borderColor: '#000', borderRadius: 10, backgroundColor: '#ededff', width: '100%', height: 35 }}>
                <TextInput
                  autoCorrect={false}
                  autoComplete={'off'}
                  textContentType='none'
                  autoCapitalize='none'
                  style={{ flex: 1, fontSize: 12, fontFamily: 'OpenSans-Regular', color: '#252F40', fontFamily: 'OpenSans-Regular' }}
                  placeholder="Search"
                  onChangeText={(Text) => setValue({ ...value, value: Text })}
                  placeholderTextColor='#7D8EAB'
                  value={value?.value}
                  keyboardType="default"
                  onSubmitEditing={() => onHandleSearch()}
                  returnKeyType='search'
                />
                <Pressable onPress={() => onHandleSearch()} style={{ backgroundColor: '#4646f2', height: 35, width: 35, borderRadius: 10, alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                  <Feather name='search' color={'#FFFFFF'} size={20} />
                </Pressable>
              </View>
              :
              <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-Regular', }}>Showing <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 12 }}>{onGoingTrips?.length}</Text> active trips</Text>
            }
            <View style={{ flexGrow: 1 }} />
            {searchBar ?
              null :
              <Center bg="#f0f2f5" style={{ borderRadius: 5, height: 35, width: 35, marginRight: 5 }}>
                <Feather onPress={() => onPreeEvent()} name='search' size={20} color={'#69748C'} />
              </Center >
            }

          </View>

          <Fragment>
            <View style={{ flexDirection: 'row', width: '100%', height: /* onGoingTrips?.length === 1 ? 200 : */ 350, overflow: 'scroll', }}>
              {loading === true ?
                <View style={{ width: '100%', justifyContent: 'center' }}>
                  <ActivityIndicator color={'#63CE78'} size='large' />
                </View>
                :
                onGoingTrips?.length === 0 ?
                  <View style={{ width: '100%', justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontFamily: 'OpenSans-Regular', color: 'gray', fontSize: 14, paddingTop: 10, paddingBottom: 10 }}>NO RECORDS</Text>
                  </View>
                  :
                  <OngoingTripList onGoingTrips={onGoingTrips} Navigation={Navigation} setTripsDetails={setTripsDetails} onOpen={onOpen} />
              }

            </View>
          </Fragment>

        </View>
      </View>

      <OngoingTripUpdate isOpen={isOpen} onClose={onClose} Navigation={Navigation} tripsDetails={tripsDetails} />
    </Fragment >
  )
}

export default OngoingTrip;