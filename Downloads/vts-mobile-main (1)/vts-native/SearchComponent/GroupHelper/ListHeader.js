import React, { Fragment, useEffect } from 'react';
import { View } from 'react-native';
import { Text, Pressable } from 'react-native';
import { Center, Divider, } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';

const ListHeader = ({ groupDataCount }) => {
  let Navigation = useNavigation();
  let Location = useRoute();
  const [isNewAdd, setIsNewAdd] = useState(false)

  useEffect(() => {
    if (Location?.params?.userRole?.permission?.group === 12) { // create
      setIsNewAdd(true)
    } else if (Location?.params?.userRole?.permission?.group === 6) { // edit 
      setIsNewAdd(false)
    } else if (Location?.params?.userRole?.permission?.group === 5) { // delete 
      setIsNewAdd(false)
    } else if (Location?.params?.userRole?.permission?.group === 4) { // read
      setIsNewAdd(false)
    } else if (Location?.params?.userRole?.permission?.group === 14) {// read  create edit 
      setIsNewAdd(true)
    } else if (Location?.params?.userRole?.permission?.group === 15) { // create edit delete 
      setIsNewAdd(true)
    } else if (Location?.params?.userRole?.permission?.group === 0) { // no permission
      setIsNewAdd(false)
    }
  }, [Location])

  return (
    <Fragment>
      <View style={{ marginTop: 10, paddingHorizontal: 15 }}>
        <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <Divider thickness={5} orientation='vertical' bg="#4646F2" style={{ height: 25, borderRadius: 2 }} />
          <Text style={{ color: '#000000', fontSize: 14, paddingLeft: 10, fontFamily: 'OpenSans-Bold' }}>{groupDataCount}</Text>
          <Text style={{ color: '#000000', fontSize: 14, paddingLeft: 5, fontFamily: 'OpenSans-Regular' }}>Result Found</Text>
          <View style={{ flexGrow: 1 }} />
          <Center>
            {isNewAdd ?
              <Pressable onPress={() => Navigation.navigate('AddEntityGroupScreen')} style={{ backgroundColor: '#4646f2', padding: 6, borderRadius: 5 }}>
                <Text style={{ color: '#ffffff', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>Add Group</Text>
              </Pressable> : null}
          </Center>
        </View>
      </View>
    </Fragment>
  )
}

export default ListHeader