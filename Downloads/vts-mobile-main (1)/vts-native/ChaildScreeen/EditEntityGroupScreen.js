import React, { lazy } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { View, StatusBar, } from 'react-native';
import ComponentLoadable from '../Suspense_Component/ComponentLoadable';

const EditEntityGroup = ComponentLoadable(lazy(() => import('../ChaildComponent/EditEntityGroupComponent/EditEntityGroup')));

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const EditEntityGroupScreen = () => {

  return (
    <View style={{ flex: 1, backgroundColor: '#000000d4', justifyContent: 'center', alignItems: 'center', }}>
      <FocusAwareStatusBar barStyle={'light-content'} backgroundColor="#000000d4" />
      <EditEntityGroup />
    </View>
  )
}

export default EditEntityGroupScreen