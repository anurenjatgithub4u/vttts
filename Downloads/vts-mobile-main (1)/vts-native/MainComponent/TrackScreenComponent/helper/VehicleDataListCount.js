import React from 'react';
import { Text } from 'react-native';
import { Box, Divider, } from 'native-base';

const VehicleDataListCount = ({ vehicle_count }) => {
  return (
    <Box style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ebebfd', flexDirection: 'row', paddingTop: 10, paddingBottom: 10, paddingHorizontal: 15 }}>
      <Divider bg={'#4646f2'} thickness="7" orientation='vertical' style={{ height: 30, borderRadius: 2 }} />
      <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 8 }}>{vehicle_count}</Text>
      <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingLeft: 8 }}>Result Found</Text>
    </Box>
  )
}

export default VehicleDataListCount