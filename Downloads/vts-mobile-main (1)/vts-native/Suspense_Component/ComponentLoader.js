import React from 'react';
import { View, ActivityIndicator } from 'react-native';


const ComponentLoader = () => {
  return (
    <>
      <View>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
          <ActivityIndicator color={'#63CE78'} size={'large'} style={{ color: 'blue', width: 100 }} />
        </View>
      </View>
    </>
  )
}

export default ComponentLoader