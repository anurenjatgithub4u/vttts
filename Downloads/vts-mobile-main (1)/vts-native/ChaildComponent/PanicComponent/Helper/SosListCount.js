import React from 'react';
import { View, Text } from 'react-native';
import { Divider } from 'native-base';

const SosListCount = ({ searchsosDataCount }) => {
  return (
    <View style={{ backgroundColor: '#ebebfd', }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15, paddingBottom: 10 }}>
        <Divider bg={'#4646f2'} thickness="7" orientation='vertical' style={{ height: 30, borderRadius: 2 }} />
        <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 8 }}>{searchsosDataCount}</Text>
        <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingLeft: 8 }}>SOS Found </Text>
        <View style={{ flexGrow: 1 }} />
      </View>
    </View>
  )
}

export default SosListCount