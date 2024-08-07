import React from 'react';
import { Modal, } from 'react-native';
import { BlurView, } from "@react-native-community/blur";

import { SafeAreaView, Image, StatusBar, Dimensions, } from 'react-native';
import { Text, Box, } from 'native-base';
import imagePath from '../constants/imagePath';

const SignInLoader = ({ loader }) => {
  return (
    <>
      <Modal
        transparent
        visible={loader}
        onRequestClose={() => {
          // Do smth
        }}>
        <BlurView
          blurType={"light"}
          blurAmount={1}
          reducedTransparencyFallbackColor={'white'}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, }}
        />
        <SafeAreaView style={{ backgroundColor: '#636976bd', height: Dimensions.get('screen').height, width: Dimensions.get('screen').width, zIndex: 99, }}>
          <StatusBar barStyle='dark-content' backgroundColor="#636976" style={{ backgroundColor: '#636976' }} />
          <Box flex={1} /* bg="#636976" */ alignItems="center" justifyContent="center">
            <Image
              source={imagePath.icLocPin}
            />
            <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 16 }}>Processing</Text>
            <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Please wait while we setup things for you</Text>
          </Box>
        </SafeAreaView>
      </Modal>
    </>
  )
}

export default SignInLoader