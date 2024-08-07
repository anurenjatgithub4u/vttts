import React from 'react';
import { useDisclose } from 'native-base';
import { FlatList, ActivityIndicator, Platform, UIManager, LayoutAnimation, View, Text } from 'react-native'
import { useState } from 'react';
import FilterComponent from './Helper/FilterComponent';
import ListHeaderComponent from './Helper/ListHeaderComponent';
import EntityDataList from './Helper/EntityDataList';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Entity = ({ onGetFilter, valueFilter, setValueFilter, searchBar, navigation, entityData, entityDataCount, loadMoreEntity, loadingEntity, fetchMoreDataEntity }) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [expanded, setExpanded] = useState();

  const handlePress = (id) => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(id)
  };

  return (
    <>
      <ListHeaderComponent valueFilter={valueFilter} entityDataCount={entityDataCount} navigation={navigation} />

      <View style={{ marginTop: 10, backgroundColor: loadingEntity ? '#ebebfd' : '#F5F6FA', flex: 1, paddingHorizontal: loadingEntity ? 0 : 15 }}>
        {loadingEntity ?
          <View style={{ paddingTop: 100, backgroundColor: '#ebebfd', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <ActivityIndicator color={'#63CE78'} size={'large'} />
          </View>
          :
          <FlatList
            ListHeaderComponent={() => {
              return (
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingTop: 8, paddingBottom: 8 }}>
                  <View style={{ flexGrow: .3 }} />
                  <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>IMEI Number</Text>
                  <View style={{ flexGrow: 1 }} />
                  <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>Vehicle Number</Text>
                  <View style={{ flexGrow: .3 }} />
                </View>
              )
            }}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => {
              return (
                <>
                  {loadMoreEntity ?
                    <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 0 }}>
                      <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Fetching More Data....</Text>
                    </View>
                    :
                    <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 0 }}>

                    </View>
                  }
                </>
              )
            }}
            ListEmptyComponent={() => {
              return (
                <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 0 }}>
                  <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>NO RECORDS</Text>
                </View>
              );
            }}
            onEndReachedThreshold={0.2}
            onEndReached={fetchMoreDataEntity}
            horizontal={false}
            data={entityData}
            renderItem={({ item, index }) => {
              return (
                <EntityDataList setExpanded={setExpanded} expanded={expanded} handlePress={handlePress} navigation={navigation} item={item} />
              )
            }}
            keyExtractor={(item) => item.id.toString()}
          />
        }
      </View>
      <FilterComponent searchBar={searchBar} onOpen={onOpen} isOpen={isOpen} onClose={onClose} onGetFilter={onGetFilter} setValueFilter={setValueFilter} valueFilter={valueFilter} />
    </>
  )
}

export default Entity;


const data = [
  { id: 1 },
  { id: 2 },
]