import React, { lazy, Fragment, } from 'react';
import { View, StatusBar, Pressable, } from 'react-native';
import { Box, Text, Center, } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused, useNavigation, } from '@react-navigation/native';
import ComponentLoadable from '../Suspense_Component/ComponentLoadable';
const CitizensReportPermitViolation = ComponentLoadable(lazy(() => import('../CitizensComponent/CitizensReportPermitViolation/CitizensReportPermitViolation')))


function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const CitizensReportPermitViolationScreen = () => {
  let Navigation = useNavigation();

  return (
    <Fragment>
      <View style={{ backgroundColor: '#F6F6FE', flex: 1 }}>
        <FocusAwareStatusBar barStyle={'dark-content'} backgroundColor="#ebebfd" />
        <View style={{ paddingHorizontal: 15, paddingTop: 30, paddingBottom: 20, backgroundColor: '#ebebfd', elevation: 12 }}>
          <Box style={[{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: 20, }]}>
            <Center>
              <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', color: '#252F40' }}>Permit Violation</Text>
            </Center>
            <View style={{ position: 'absolute', left: 0, display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
              <Pressable onPress={() => Navigation.goBack()}>
                <Center style={{ backgroundColor: '#d0d0fb', width: 40, height: 40, borderRadius: 5 }}>
                  <Ionicons name='chevron-back-sharp' color={'#FFFFFF'} size={28} />
                </Center>
              </Pressable>
            </View>
          </Box>
        </View>
        <CitizensReportPermitViolation />
      </View>
    </Fragment>
  )
}

export default CitizensReportPermitViolationScreen