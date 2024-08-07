import { View, Text } from 'react-native'
import React, { Fragment } from 'react';
import { BlurView, } from "@react-native-community/blur";

const BlurViewScreen = () => {
  return (
    <Fragment>
      <BlurView
        blurType={"light"}
        blurAmount={1}
        reducedTransparencyFallbackColor={'#353232d1'}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, }}
      />
    </Fragment>
  )
}

export default BlurViewScreen