import React, { Fragment, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native';
import { FlatList, LayoutAnimation, UIManager, Platform, ActivityIndicator, } from 'react-native'
import RenderList from './GroupHelper/RenderList';
import ListHeader from './GroupHelper/ListHeader';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Group = ({ setGroupData, requestGroup, setPageGroup, setLoadingGroup, fetchMoreData, groupData, groupDataCount, loadingGroup, loadMoreGroup, }) => {
  const [expanded, setExpanded] = useState();
  const handlePress = (id) => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(id)
  };

  return (
    <Fragment>
      <ListHeader groupDataCount={groupDataCount} />

      <View style={{ marginTop: 10, backgroundColor: loadingGroup ? '#ebebfd' : '#F5F6FA', flex: 1, paddingHorizontal: loadingGroup ? 0 : 15 }}>
        {loadingGroup ?
          <View style={{ paddingTop: 100, backgroundColor: '#ebebfd', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <ActivityIndicator color={'#63CE78'} size={'large'} />
          </View>
          :
          <View>
            <FlatList
              ListHeaderComponent={() => {
                return (
                  <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingTop: 8, paddingBottom: 8 }}>
                    <View style={{ flexGrow: .3 }} />
                    <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>Name</Text>
                    <View style={{ flexGrow: 1 }} />
                    <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>No. of Vehicles</Text>
                    <View style={{ flexGrow: .3 }} />
                  </View>
                )
              }}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() => {
                return (
                  <>
                    {loadMoreGroup ?
                      <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 0 }}>
                        <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Fetching More Data....</Text>
                      </View>
                      :
                      <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 0 }}>
                        {/* <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text> */}
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
              onEndReachedThreshold={0.5}
              onEndReached={fetchMoreData}
              horizontal={false}
              data={groupData}
              renderItem={({ item, index }) => {
                return (
                  <RenderList setGroupData={setGroupData} requestGroup={requestGroup} setPageGroup={setPageGroup} setLoadingGroup={setLoadingGroup} handlePress={handlePress} expanded={expanded} item={item} />
                )
              }}
              keyExtractor={(item) => item.id}
            />
          </View>
        }
      </View>
    </Fragment>
  )
}

export default Group