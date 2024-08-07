import React, { Fragment, useState, useEffect } from 'react';
import { View, Pressable } from 'react-native';
import { Box, Text, Image } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useHeader } from '../../../ApiHeader';

const ProfileSection = () => {
  const location = useRoute();
  const Navigation = useNavigation();
  const [getProfileData, setGetProfileData] = useState({});
  const [error, setError] = useState({});
  const { ApiRequestAuthorizationHook } = useHeader();

  const GetProfile = async () => {
    await ApiRequestAuthorizationHook.get(`/users/${location?.params?.userId}`)
      .then(function (res) {
        if (res.status === 200) {
          setGetProfileData(res.data)
        } else {

        }
      })
      .catch(function (err) {
        console.log('session', err)
        // setError(err)
      })
      .finally(function () {

      })
  }
  useEffect(() => {
    GetProfile();
  }, []);//getProfileData

  useEffect(() => {
    const unsubscribe = Navigation.addListener('focus', () => {
      GetProfile();
    });
    return unsubscribe;
  }, [Navigation])

  return (
    <Fragment>
      <View style={[{ paddingTop: 10, paddingHorizontal: 15, }]}>
        <Pressable onPress={() => Navigation.navigate('AccountScreen')} style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center' }]}>
          <Image source={{
            uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          }} alt="Rohit" size='9' style={{ borderRadius: 8, borderWidth: 2, borderColor: '#d0d0fb' }} />
          <Box style={[{ paddingLeft: 10 }]}>
            <Text style={{ color: '#252F40', fontSize: 16, fontFamily: 'OpenSans-SemiBold', textTransform: 'uppercase' }}>{getProfileData?.name}</Text>
            {/* <Text style={{ color: '#67748E', fontSize: 10, fontFamily: 'OpenSans-SemiBold' }}>{new Date(getProfileData?.createdon).toLocaleDateString()}</Text> */}
          </Box>
        </Pressable>
      </View>
    </Fragment>
  )
}

export default ProfileSection