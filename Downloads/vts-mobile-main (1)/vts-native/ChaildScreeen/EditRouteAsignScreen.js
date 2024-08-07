import React, { Fragment } from 'react';
import { StatusBar, View, Text, Pressable } from 'react-native';
import { Box, Center, } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import EditRouteAsign from '../ChaildComponent/EditRouteAsignComponent/EditRouteAsign';

const EditRouteAsignScreen = () => {
  let Navigation = useNavigation();

  return (
    <Fragment>
      <StatusBar barStyle={'dark-content'} backgroundColor="#ebebfd" />
      <View style={{ flex: 1, backgroundColor: '#f5f6fa', }}>
        <View style={{
          paddingHorizontal: 15, paddingTop: 25, backgroundColor: '#ebebfd', shadowColor: '#470000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          elevation: 1
        }}>
          <Box style={[{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: 20, }]}>
            <Center>
              <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', color: '#000000' }}>Edit Assign Route</Text>
            </Center>
            <View style={{ position: 'absolute', left: 0, display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
              <Pressable onPress={() => Navigation.goBack(-1)}>
                <Center style={{ backgroundColor: '#d0d0fb', width: 40, height: 40, borderRadius: 5 }}>
                  <Ionicons name='chevron-back-outline' color={'blue'} size={18} />
                </Center>
              </Pressable>
            </View>
          </Box>
        </View>
        <EditRouteAsign />
      </View>
    </Fragment>
  )
}

export default EditRouteAsignScreen