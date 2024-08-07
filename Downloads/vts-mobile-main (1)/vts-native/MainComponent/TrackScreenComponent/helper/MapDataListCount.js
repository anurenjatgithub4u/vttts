import React from 'react';
import { Text } from 'react-native';
import { Box, Divider, } from 'native-base';

const MapDataListCount = ({ nullMapListFilter }) => {
  function uniqByKeepLast(data, key) {
    return [...new Map(data?.map(x => [key(x), x]))?.values()]
  }


  return (
    <Box style={{ display: 'flex', backgroundColor: '#ebebfd', alignItems: 'center', flexDirection: 'row', paddingTop: 10, paddingBottom: 5, paddingHorizontal: 15 }}>
      <Divider bg={'#4646f2'} thickness="7" orientation='vertical' style={{ height: 30, borderRadius: 2 }} />
      <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingLeft: 8 }}>Total Count</Text>
      <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 8 }}>{uniqByKeepLast(nullMapListFilter, it => it?.device?.id)?.length}</Text>
    </Box>
  )
}

export default MapDataListCount