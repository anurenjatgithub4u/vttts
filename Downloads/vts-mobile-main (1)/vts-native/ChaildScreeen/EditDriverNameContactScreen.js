import React, { Fragment, lazy, useState } from 'react'
import { View, Text, StatusBar } from 'react-native'
import { useIsFocused, useRoute } from '@react-navigation/native';
import ComponentLoadable from '../Suspense_Component/ComponentLoadable';
import { useHeader } from '../ApiHeader';
import { useEffect } from 'react';

const EditDriverNameContactComponent = ComponentLoadable(lazy(() => import('../ChaildComponent/EditDriverNameContactComponent/EditDriverNameContactComponent')));

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const EditDriverNameContactScreen = () => {
  const location = useRoute();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [loader, setLoader] = useState(false);
  const [value, setValue] = useState({
    id: '',
    altContactPerson: '',
    altPhone: '',
  });

  const getDriver = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoader(true)
    await ApiRequestAuthorizationHook.get(`devices/${location?.params?.deviceId}`, { signal: signal })
      .then(function (ress) {
        if (ress?.status === 200) {
          setValue({ ...value, id: ress?.data?.id, altContactPerson: ress?.data?.altContactPerson, altPhone: ress?.data?.altPhone })
        }
      })
      .catch(function (error) {
        console.log('driver', error)
      })
      .finally(function () {
        setLoader(false)
      })
    return () => {
      controller.abort();
    };
  }
  useEffect(() => {
    getDriver();
  }, [location?.params?.deviceId]);



  return (
    <Fragment>
      <FocusAwareStatusBar barStyle={'dark-content'} backgroundColor="#000000d4" />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000d4', paddingHorizontal: 15 }}>
        <EditDriverNameContactComponent loader={loader} setLoader={setLoader} value={value} setValue={setValue} />
      </View>
    </Fragment>
  )
}

export default EditDriverNameContactScreen