import React, { lazy, Fragment } from 'react';
import { View, StatusBar, Pressable, ScrollView } from 'react-native';
import { Text, Center, } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ManageFloat from '../FloatNavigation/ManageFloat';
import ComponentLoadable from '../Suspense_Component/ComponentLoadable';
const PermitViolation = ComponentLoadable(lazy(() => import('../ChaildComponent/PermitViolationComponent/PermitViolation')));

const PermitViolationScreen = () => {
  let Navigation = useNavigation();

  return (
    <Fragment>
      <StatusBar barStyle={'dark-content'} backgroundColor="#ebebfd" />
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: '#F5F6FA', paddingBottom: 15, }}>
        <View style={[{ paddingHorizontal: 15, elevation: 6, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingBottom: 30, paddingTop: 20, backgroundColor: '#ebebfd' }]}>
          <Pressable onPress={() => Navigation.goBack()}>
            <Center style={{ backgroundColor: '#d0d0fb', width: 40, height: 40, borderRadius: 5 }}>
              <Ionicons name='chevron-back' size={22} color={'#FFFFFF'} />
            </Center>
          </Pressable>
          <View style={{ flexGrow: 1 }} />
          <Center>
            <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', color: '#252F40' }}>Permit Violation</Text>
          </Center>
          <View style={{ flexGrow: 1 }} />
          <Pressable>
            <Center style={{ width: 40, height: 40, borderRadius: 5 }}>

            </Center>
          </Pressable>
        </View>

        <PermitViolation />

      </ScrollView>
      <ManageFloat />
    </Fragment>
  )
}

export default PermitViolationScreen