import React, { lazy, Fragment, useEffect } from 'react';
import { View, ScrollView, StatusBar, Dimensions, Pressable, BackHandler } from 'react-native';
import { Box, Text, Center, } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ComponentLoadable from '../Suspense_Component/ComponentLoadable';

const EditGeofence = ComponentLoadable(lazy(() => import('../ChaildComponent/EditGeofenceComponent/EditGeofence')));

const EditGeofenceScreen = ({ navigation }) => {
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [])
  return (
    <Fragment>
      <StatusBar barStyle={'dark-content'} backgroundColor="#ebebfd" />
      <View style={{
        paddingHorizontal: 15, paddingTop: 25, backgroundColor: '#ebebfd', width: Dimensions.get('window').width, shadowColor: '#470000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        elevation: 1
      }}>
        <Box style={[{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: 20, }]}>
          <Center>
            <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', color: '#000000' }}>Edit Geofence</Text>
          </Center>
          <View style={{ position: 'absolute', left: 0, display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
            <Pressable onPress={() => navigation.goBack(-1)}>
              <Center style={{ backgroundColor: '#d0d0fb', width: 40, height: 40, borderRadius: 5 }}>
                <Ionicons name='chevron-back-outline' color={'blue'} size={18} />
              </Center>
            </Pressable>
          </View>
        </Box>
      </View>

      <ScrollView style={{}} showsVerticalScrollIndicator={true}>
        <EditGeofence navigation={navigation} />
      </ScrollView>
    </Fragment>
  )
}

export default EditGeofenceScreen