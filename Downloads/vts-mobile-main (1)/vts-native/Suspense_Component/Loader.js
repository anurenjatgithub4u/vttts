import React from 'react';
import { Modal, } from 'react-native';

import { SafeAreaView, Image, StatusBar, } from 'react-native';
import { Text, } from 'native-base';
import imagePath from '../constants/imagePath';

const Loader = () => (
    <Modal
        // animationType="slide"
        transparent={true}
        visible={true}>
        <SafeAreaView style={{ backgroundColor: '#636976', flex: 1, alignItems: "center", justifyContent: "center" }}>
            <StatusBar barStyle='light-content' backgroundColor="#636976" style={{ backgroundColor: '#636976' }} />
            <Image
                source={imagePath.icLocPin}
            />
            <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 16 }}>Processing</Text>
            <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Please wait while we setup things for you</Text>
        </SafeAreaView>
    </Modal>
);

export default Loader;
