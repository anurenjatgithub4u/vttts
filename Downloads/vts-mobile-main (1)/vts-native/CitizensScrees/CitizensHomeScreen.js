import React, { Fragment, } from 'react';
import { View, StatusBar, TouchableOpacity, Image } from 'react-native';
import { Text } from 'native-base';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import imagePath from '../constants/imagePath'; //stayAlert

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const CitizensHomeScreen = () => {
  const Navigation = useNavigation();

  return (
    <Fragment>
      <Animatable.View duration={800} animation="zoomIn" style={{ flex: 1, backgroundColor: '#7e80ed' }}>
        <FocusAwareStatusBar barStyle='light-content' backgroundColor="#7e80ed" />
        <View style={{ elevation: 0, backgroundColor: '#7e80ed', height: 400, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={imagePath?.hero_img} style={{ width: '100%', height: '100%', }} resizeMode='contain' />
        </View>
        <View style={{ elevation: 0, backgroundColor: '#F9F9F9', height: 400, width: '100%', position: 'absolute', bottom: 0 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
            <TouchableOpacity activeOpacity={0.40} onPress={() => Navigation.navigate('CitizensReportEmergencyScreen')} style={{ width: '50%', height: 200, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', borderRightColor: '#EBEBFD', borderRightWidth: .9, borderBottomColor: '#EBEBFD', borderBottomWidth: .9 }}>
              <View style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: '#F9F9F9', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={imagePath?.Group_21138} style={{ width: '100%', height: '100%', }} resizeMode='contain' />
              </View>
              <Text style={{ paddingTop: 15, textTransform: 'capitalize', fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#252F40' }}>report emergency</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.40} onPress={() => Navigation.navigate('CitizensReportPermitViolationScreen')} style={{ width: '50%', height: 200, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', borderLeftColor: '#EBEBFD', borderLeftWidth: .9, borderBottomColor: '#EBEBFD', borderBottomWidth: .9 }}>
              <View style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: '#F9F9F9', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={imagePath?.Group_21060} style={{ width: '100%', height: '100%', }} resizeMode='contain' />
              </View>
              <Text style={{ paddingTop: 15, textTransform: 'capitalize', fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#252F40' }}>report permit violation</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
            <TouchableOpacity activeOpacity={0.40} onPress={() => Navigation.navigate('CitizensAccountScreen')} style={{ width: '50%', height: 200, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', borderRightColor: '#EBEBFD', borderRightWidth: .9, borderTopColor: '#EBEBFD', borderTopWidth: .9 }}>
              <View style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: '#F9F9F9', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={imagePath?.Group_21136} style={{ width: '100%', height: '100%', }} resizeMode='contain' />
              </View>
              <Text style={{ paddingTop: 15, textTransform: 'capitalize', fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#252F40' }}>account</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.40} onPress={() => Navigation.navigate('CitizensHistory')} style={{ width: '50%', height: 200, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', borderLeftColor: '#EBEBFD', borderLeftWidth: .9, borderTopColor: '#EBEBFD', borderTopWidth: .9 }}>
              <View style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: '#F9F9F9', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={imagePath?.Group_21137} style={{ width: '100%', height: '100%', }} resizeMode='contain' />
              </View>
              <Text style={{ paddingTop: 15, textTransform: 'capitalize', fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#252F40' }}>history</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    </Fragment>
  )
}

export default CitizensHomeScreen