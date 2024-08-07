import React, { Fragment, useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useHeader } from '../../../ApiHeader';

const PanicStatus = ({ }) => {
  let Navigation = useNavigation();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [loaderPanicStatus, setLoaderPanicStatus] = useState(true);
  const [panicData, setPanicData] = useState({});

  const fetchData = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    await ApiRequestAuthorizationHook.get('/dashboard/panicstatus', { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setPanicData(response.data);
        }
      })
      .catch(function (error) {
        setLoaderPanicStatus(true)
        console.log('PanicStatus', error);
      })
      .finally(function () {
        setLoaderPanicStatus(false)
      });
    return () => {
      controller.abort();
    };
  }

  useEffect(() => {
    const unsubscribe = Navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [Navigation])

  useEffect(() => {
    fetchData();
  }, [])

  const Status_Data = [
    { id: 1, icon: <Octicons name='issue-closed' color={'#63CE78'} size={22} />, name: 'Resolved', value: panicData?.num_sos_resolved === undefined ? 0 : panicData?.num_sos_resolved },
    { id: 2, icon: <Ionicons name='md-warning' color={'#F18F6E'} size={26} />, name: 'Pending', value: panicData?.num_sos_pending === undefined ? 0 : panicData?.num_sos_pending },
    { id: 4, icon: <AntDesign name='closecircleo' color={'#F25555'} size={22} />, name: 'Cancelled', value: panicData?.num_sos_cancelled === undefined ? 0 : panicData?.num_sos_cancelled },
    { id: 5, icon: <Feather name='thumbs-up' color={'#7272F2'} size={22} />, name: 'Acknowledged', value: panicData?.num_sos_acknowledged === undefined ? 0 : panicData?.num_sos_acknowledged },
    { id: 6, icon: null, name: 'Total', value: panicData?.total_sos === undefined ? 0 : panicData?.total_sos },
  ]

  return (
    <Fragment>
      <View style={{ marginTop: 10 }}>
        <View style={{ flex: 1, elevation: 0, backgroundColor: Colors.white, borderRadius: 10, height: 145, marginTop: 10, paddingBottom: 15 }}>
          <Text style={{ color: '#f16b6b', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 10, paddingTop: 15, paddingBottom: 25 }}>Panic status</Text>
          <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} horizontal={true}>
            {Status_Data?.map((value, id) => (
              <View key={id} style={{ width: 120, margin: 1, alignItems: "center", justifyContent: "center", marginBottom: 5, borderRightWidth: value?.id === 6 ? 0 : 1, borderRightColor: '#67748E' }}>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                  {value?.icon}
                  <Text style={{ color: '#252F40', fontSize: 24, fontFamily: 'OpenSans-Bold', marginLeft: 3, }}>{value?.value}</Text>
                </View>
                <Text style={{ marginTop: 9, fontSize: 12, fontFamily: 'OpenSans-Regular', color: '#67748E' }}>{value?.name}</Text>
              </View>
            ))}
          </ScrollView>
          <Pressable onPress={() => Navigation.navigate('PanicScreen')} style={{ position: 'absolute', right: 8, bottom: 25, }}>
            <AntDesign name="arrowright" color={'#67748E'} size={20} />
          </Pressable>
        </View>
      </View>
    </Fragment>
  )
}

export default PanicStatus;