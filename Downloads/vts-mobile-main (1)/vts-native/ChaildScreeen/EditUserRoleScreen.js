import React, { lazy } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { View, StatusBar, } from 'react-native';
import ComponentLoadable from '../Suspense_Component/ComponentLoadable';

const EditUserRole = ComponentLoadable(lazy(() => import('../ChaildComponent/EditUserRoleComponent/EditUserRole')));

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const EditUserRoleScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#000000d4', justifyContent: 'center', alignItems: 'center', }}>
      <FocusAwareStatusBar barStyle={'light-content'} backgroundColor="#000000d4" />
      <EditUserRole />
    </View>
  )
}

export default EditUserRoleScreen