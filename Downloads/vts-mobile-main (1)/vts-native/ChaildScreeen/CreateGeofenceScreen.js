import React, { lazy, Fragment, } from 'react';
import { View, ScrollView, StatusBar, Dimensions, Pressable, } from 'react-native';
import { Box, Text, Center, } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ComponentLoadable from '../Suspense_Component/ComponentLoadable';

// import CreateGeofence from '../ChaildComponent/CreateGeofenceComponent/CreateGeofence';

const CreateGeofence = ComponentLoadable(lazy(() => import('../ChaildComponent/CreateGeofenceComponent/CreateGeofence')));

const CreateGeofenceScreen = ({ navigation }) => {

  return (
    <Fragment>
      <StatusBar barStyle={'dark-content'} backgroundColor="#ebebfd" />
      <View style={{
        paddingHorizontal: 15, paddingTop: 25, backgroundColor: '#ebebfd', width: Dimensions.get('window').width,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      }}>
        <Box style={[{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: 20, }]}>
          <Center>
            <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', color: '#252F40' }}>Create Geofence</Text>
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
        <CreateGeofence navigation={navigation} />
      </ScrollView>
    </Fragment>
  );
};

export default CreateGeofenceScreen;