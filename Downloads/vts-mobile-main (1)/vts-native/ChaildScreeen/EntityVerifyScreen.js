import React, { lazy, Fragment } from 'react';
import { StatusBar, View } from 'react-native';
import { useIsFocused, } from '@react-navigation/native';
import ComponentLoadable from '../Suspense_Component/ComponentLoadable';

const EntityVerify = ComponentLoadable(lazy(() => import('../ChaildComponent/EntityVerifyComponent/EntityVerify')));


function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const EntityVerifyScreen = () => {
  return (
    <Fragment>
      <FocusAwareStatusBar barStyle={'dark-content'} backgroundColor="#000000d4" />
      <View style={{ backgroundColor: '#000000d4', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        <EntityVerify />
      </View>
    </Fragment>
  )
}

export default EntityVerifyScreen