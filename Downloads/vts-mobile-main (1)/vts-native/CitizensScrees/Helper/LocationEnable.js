import React, { Fragment, useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, Linking, ScrollView, RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LocationEnable = ({ getPermission }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onOpenSetting = () => {
    Linking.openSettings();
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getPermission()
    }, 2000);
  }, []);

  return (
    <Fragment>
      <ScrollView
        contentContainerStyle={{ flex: 1, backgroundColor: '#F25555', }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{ flex: 1, backgroundColor: "#F25555", alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: 200, height: 200, backgroundColor: '#d0d1f882', borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name={'location'} color={'#4646F2'} size={100} />
          </View>
          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 20, paddingTop: 30 }}>Enable location</Text>
          <Text style={{ color: '#041A34', fontFamily: 'OpenSans-SemiBold', fontSize: 14, paddingTop: 15 }}>Please enable location permission in your mobile, and Refresh or Restart app</Text>
          <Pressable style={{ position: 'absolute', bottom: 20, left: 0, right: 0, zIndex: 99, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 25 }}>
            <TouchableOpacity onPress={() => onOpenSetting()} activeOpacity={0.70} style={{ backgroundColor: '#4646F2', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 5, height: 42 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>Go setting</Text>
            </TouchableOpacity>
          </Pressable>
        </View>
      </ScrollView>
    </Fragment>
  )
}

export default LocationEnable