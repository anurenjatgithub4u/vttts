import React, { lazy } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { View, StatusBar, } from 'react-native';
import ComponentLoadable from '../Suspense_Component/ComponentLoadable';

const UploadBulkComponent = ComponentLoadable(lazy(() => import('../ChaildComponent/UploadBulkComponent/UploadBulkComponent')));

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const UploadBulkScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#000000d4', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>
      <FocusAwareStatusBar barStyle={'light-content'} backgroundColor="#000000d4" />
      <UploadBulkComponent />
    </View>
  )
}

export default UploadBulkScreen