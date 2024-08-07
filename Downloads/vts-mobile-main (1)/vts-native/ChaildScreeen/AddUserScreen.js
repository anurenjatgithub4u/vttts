import React, { lazy, Fragment, useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Dimensions, Pressable, BackHandler } from 'react-native';
import { Box, Text, Center, } from 'native-base';
import { Row, Col } from 'react-native-responsive-grid-system';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ComponentLoadable from '../Suspense_Component/ComponentLoadable';


// import AddUserPersonalInfo from '../ChaildComponent/AddUserComponent/AddUserPersonalInfo';
// import AddUserSettings from '../ChaildComponent/AddUserComponent/AddUserSettings';

const AddUserPersonalInfo = ComponentLoadable(lazy(() => import('../ChaildComponent/AddUserComponent/AddUserPersonalInfo')));
const AddUserSettings = ComponentLoadable(lazy(() => import('../ChaildComponent/AddUserComponent/AddUserSettings')));
const AddUserPermission = ComponentLoadable(lazy(() => import('../ChaildComponent/AddUserComponent/AddUserPermission')));

const AddUserScreen = ({ navigation }) => {
  const [addUserPersonalInfoView, setAddUserPersonalInfoView] = useState(true);
  const [addUserSettingsView, setAddUserSettingsView] = useState(false);
  const [addUserPermissionView, setAddUserPermissionView] = useState(false);

  const [addUserPersonalInfoActive, setAddUserPersonalInfoActive] = useState(true);
  const [addUserSettingsActive, setAddUserSettingsActive] = useState(false);
  const [addUserPermissionActive, setAddUserPermissionActive] = useState(false);


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
            <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', color: '#000000' }}>Add User</Text>
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

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        nestedScrollEnabled={false}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: '#f5f6fa', width: Dimensions.get('window').width, height: Dimensions.get('window').height, }}
        scrollEnabled={true}
      >
        <View style={{ marginHorizontal: 15, marginTop: 15, backgroundColor: '#e2e2e2', borderRadius: 50 }}>
          <Row>
            <Col xs={4} sm={4} md={4} lg={4}>
              <View style={{ backgroundColor: addUserPersonalInfoActive ? '#a1a1f8' : 'transparent', borderRadius: 50 }}>
                <View style={{ backgroundColor: addUserSettingsActive ? 'blue' : '#ffffff', width: 12, height: 12, borderRadius: 50, margin: 1 }} />
              </View>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
              <View style={{ backgroundColor: addUserSettingsActive ? '#a1a1f8' : 'transparent', borderRadius: 50 }}>
                <View style={{ backgroundColor: addUserPermissionActive ? 'blue' : '#ffffff', width: 12, height: 12, borderRadius: 50, margin: 1 }} />
              </View>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
              <View style={{ backgroundColor: addUserPermissionActive ? '#a1a1f8' : 'transparent', borderRadius: 50 }}>
                <View style={{ backgroundColor: '#ffffff', width: 12, height: 12, borderRadius: 50, margin: 1 }} />
              </View>
            </Col>
          </Row>
        </View>
        <View style={{ marginHorizontal: 15, }}>
          <Row>
            <Col xs={4} sm={4} md={4} lg={4}>
              {addUserPersonalInfoActive ?
                <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'OpenSans-SemiBold' }}>Personal Info</Text>
                :
                <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'OpenSans-Regular' }}>Personal Info</Text>
              }
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
              {addUserSettingsActive ?
                <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'OpenSans-SemiBold' }}>Preference</Text>
                :
                <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'OpenSans-Regular' }}>Preference</Text>
              }
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
              {addUserSettingsActive ?
                <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'OpenSans-SemiBold' }}>Permission</Text>
                :
                <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'OpenSans-Regular' }}>Permission</Text>
              }
            </Col>
          </Row>
        </View>



        {addUserPersonalInfoView ?
          <AddUserPersonalInfo
            setAddUserPersonalInfoView={setAddUserPersonalInfoView}
            setAddUserSettingsView={setAddUserSettingsView}
            addUserPersonalInfoView={addUserPersonalInfoView}
            addUserSettingsView={addUserSettingsView}

            addUserPermissionView={addUserPermissionView}
            setAddUserPermissionView={setAddUserPermissionView}


            navigation={navigation}
            setAddUserPersonalInfoActive={setAddUserPersonalInfoActive}
            setAddUserSettingsActive={setAddUserSettingsActive}
            setAddUserPermissionActive={setAddUserPermissionActive}
          />
          : null}
        {addUserSettingsView ?
          <AddUserSettings
            setAddUserPersonalInfoView={setAddUserPersonalInfoView}
            setAddUserSettingsView={setAddUserSettingsView}
            addUserPersonalInfoView={addUserPersonalInfoView}
            addUserSettingsView={addUserSettingsView}
            addUserPermissionView={addUserPermissionView}
            setAddUserPermissionView={setAddUserPermissionView}
            navigation={navigation}
            setAddUserPersonalInfoActive={setAddUserPersonalInfoActive}
            setAddUserSettingsActive={setAddUserSettingsActive}
            setAddUserPermissionActive={setAddUserPermissionActive}
          />
          : null}
        {addUserPermissionView ?
          <AddUserPermission
            setAddUserPersonalInfoView={setAddUserPersonalInfoView}
            setAddUserSettingsView={setAddUserSettingsView}
            addUserPersonalInfoView={addUserPersonalInfoView}
            addUserSettingsView={addUserSettingsView}
            addUserPermissionView={addUserPermissionView}
            setAddUserPermissionView={setAddUserPermissionView}
            navigation={navigation}
            setAddUserPersonalInfoActive={setAddUserPersonalInfoActive}
            setAddUserSettingsActive={setAddUserSettingsActive}
            setAddUserPermissionActive={setAddUserPermissionActive}
          />
          : null}

      </ScrollView>
    </Fragment>
  )
}

export default AddUserScreen