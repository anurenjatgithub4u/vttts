import React, { lazy, Fragment, useState, useEffect } from 'react';
import { View, SafeAreaView, StatusBar, Image } from 'react-native';
import { Box, Text, Center, } from 'native-base';
import SegmentedControlTab from "react-native-segmented-control-tab";
import ComponentLoadable from '../Suspense_Component/ComponentLoadable';
import TrackFloat from '../FloatNavigation/TrackFloat';
import imagePath from '../constants/imagePath';

import { useHeader } from '../ApiHeader';
import PanicStatus from '../ChaildComponent/PanicComponent/PanicStatus';
import { useNavigation, useRoute } from '@react-navigation/native';
const Sos = ComponentLoadable(lazy(() => import('../ChaildComponent/PanicComponent/Sos')));

const PanicScreen = () => {
  const navigation = useNavigation()
  const location = useRoute();
  const [tabIndex, setTabIndex] = useState(0);
  const [statusSearch, setStatusSearch] = useState({ search: '' })
  const { ApiRequestAuthorizationHook } = useHeader();

  // Panic Status Bar chart
  const [errorPanicStatus, setErrorPanicStatus] = useState(null)
  const [getPanicData, setGetPanicData] = useState([null]);
  const [panicLoader, setPanicLoader] = useState(true);
  const [value, setValue] = useState({
    date: new Date()?.getFullYear()?.toString()
  })

  const request = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get('/sos_services/bar_chart', { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setGetPanicData(response?.data);
        } else {

        }
      })
      .catch(function (error) {
        console.log('PanicStatusCom', error);
        // setErrorPanicStatus(error);
      })
      .finally(function () {
        setPanicLoader(false)
      });
    return () => {
      controller.abort();
    };
  }
  useEffect(() => {
    request();
  }, [errorPanicStatus])

  useEffect(() => {
    if (location?.params?.panicname) {
      setTabIndex(1)
    } else {
      setTabIndex(0)
    }
  }, [navigation]);


  const tabConfig = [{ id: 1, name: "Panic Status", visivle: location?.params?.userRole?.view?.panic_status === 1 ? true : false }, { id: 2, name: "SOS", visivle: location?.params?.userRole?.view?.panic_sos === 1 ? true : false }]
  return (
    <Fragment>
      <SafeAreaView>
        <StatusBar barStyle={'dark-content'} backgroundColor="#ebebfd" />

        <View style={{ backgroundColor: '#ebebfd', paddingBottom: 15, paddingHorizontal: 15 }}>
          <View style={{ paddingTop: 20, }}>
            <Box style={[{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: 20, }]}>
              <Center>
                <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', color: '#252F40' }}>Panic</Text>
              </Center>
            </Box>
          </View>

          <SegmentedControlTab
            values={tabConfig?.filter(val => val?.visivle === true)?.map((value) => (value?.name))}
            selectedIndex={tabIndex}
            onTabPress={(index) => { setTabIndex(index); setStatusSearch({ ...statusSearch, search: '' }); navigation.setParams({ panicname: undefined }); request() }}

            borderRadius={5}
            tabsContainerStyle={{ height: 40, backgroundColor: '#FFFFFF', padding: 5, borderRadius: 5, marginTop: 20 }}
            tabStyle={{ backgroundColor: '#FFFFFF', borderWidth: 0, borderRadius: 5, borderColor: 'transparent' }}
            activeTabStyle={{ backgroundColor: '#7171F3', borderRadius: 5, elevation: 12 }}
            tabTextStyle={{ color: '#7171F3', fontFamily: 'OpenSans-Regular', fontSize: 14 }}
            activeTabTextStyle={{ color: '#FFFFFF', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}
          />
        </View>

        {tabIndex === 0 ?
          location?.params?.userRole?.view?.panic_status === 1 ?
            <PanicStatus
              value={value}
              setValue={setValue}
              getPanicData={getPanicData}
              setStatusSearch={setStatusSearch}
              statusSearch={statusSearch}
              panicLoader={panicLoader}
              setTabIndex={setTabIndex}
            />
            :
            <Sos
              statusSearch={statusSearch}
              setStatusSearch={setStatusSearch}
              setTabIndex={setTabIndex}
            />
          :
          <Sos
            // statusSearch={statusSearch}
            setStatusSearch={setStatusSearch}
            setTabIndex={setTabIndex}
          />
        }

      </SafeAreaView>

      <TrackFloat />
    </Fragment >
  )
}

export default PanicScreen;
