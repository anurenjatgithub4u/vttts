import React, { Fragment, useState, useEffect } from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import { useIsFocused, } from '@react-navigation/native';
import { getCurrentLocation, locationPermission } from '../helper/helperFunction';
import CitizensReportEmergency from '../CitizensComponent/CitizensReportEmergency/CitizensReportEmergency';
import LocationEnable from './Helper/LocationEnable';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const CitizensReportEmergencyScreen = () => {
  const [isPermission, setIsPermission] = useState(true)
  const [state, setState] = useState({
    latitude: null,
    longitude: null,
  });

  const getLiveLocation = async () => {
    const { latitude, longitude } = await getCurrentLocation();
    setState({ ...state, latitude: latitude, longitude: longitude })
  }
  useEffect(() => {
    getLiveLocation()
  }, [state])

  const getPermission = async () => {
    await locationPermission()
      .then(function name(params) {
        setIsPermission(true)
        getLiveLocation()
      })
      .catch(function name(params) {
        setIsPermission(false)
        getLiveLocation()
      })
  }

  useEffect(() => {
    getPermission();
  }, [])

  return (
    <Fragment>
      <FocusAwareStatusBar barStyle='light-content' backgroundColor="#F25555" />
      {isPermission === true ?
        state?.latitude === null || state?.longitude === null ?
          <View style={{ flex: 1, backgroundColor: '#F25555', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} color={'#6CCF7F'} />
          </View>
          :
          <CitizensReportEmergency state={state} />
        :
        <LocationEnable getPermission={getPermission} />
      }
    </Fragment>
  )
}

export default CitizensReportEmergencyScreen