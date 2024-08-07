import React, { Fragment, useState } from 'react';
import { View, Text, Platform, UIManager, LayoutAnimation, Pressable, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { TextArea } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const ViolationHistory = ({ violationData, loadingViolation, loadMoreViolation, fetchMoreDataViolation }) => {
  const [isExpand, setIsExpand] = useState();

  const handlePress = (id) => {
    LayoutAnimation.easeInEaseOut();
    setIsExpand(id)
  };

  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  return (
    <Fragment>
      <View style={{ marginTop: 0 }}>
        {loadingViolation ?
          <View style={{ paddingTop: 100, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <ActivityIndicator color={'#63CE78'} size={'large'} />
          </View>
          :
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => {
              return (
                <View style={{ height: 20 }} />
              )
            }}
            ListFooterComponent={() => {
              return (
                <>
                  {violationData?.length === 0 ?
                    <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 100 }}>
                      <Text style={{ color: '#333' }}>NO RECORDS</Text>
                    </View>
                    :
                    loadMoreViolation ?
                      <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 100 }}>
                        <Text style={{ color: '#333' }}>Fetching More Data....</Text>
                      </View>
                      :
                      <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 100 }}>
                        <Text style={{ color: '#333' }}></Text>
                      </View>
                  }
                </>
              )
            }}
            onEndReachedThreshold={0.2}
            horizontal={false}
            onEndReached={fetchMoreDataViolation}
            data={violationData}
            renderItem={({ item, index }) => {
              return (
                <Pressable>
                  <TouchableOpacity activeOpacity={0.70} onPress={() => handlePress(isExpand === item?.id ? 0 : item?.id)} style={{ backgroundColor: '#ffffff', justifyContent: 'center', paddingHorizontal: 25, paddingRight: 50, paddingTop: 10, paddingBottom: 10, marginTop: 1, marginBottom: isExpand === item?.id ? 3 : 0 }}>
                    <View style={{ flexDirection: 'row', }}>
                      <View style={{ width: 40, height: 40, backgroundColor: '#E2C421', borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <AntDesign name={'warning'} color={'#FA9826'} size={20} />
                      </View>
                      <View style={{ paddingLeft: 8 }}>
                        <Text numberOfLines={1} style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, }}>{item?.violations === null ? '-' : item?.violations} - Type</Text>
                        <Text numberOfLines={1} style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 12, }}>{item?.vehicleNumber === null ? '-' : item?.vehicleNumber}</Text>
                        <Text numberOfLines={2} style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 12, paddingTop: 10 }}>{item?.remark === null ? '-' : item?.remark}</Text>
                        {isExpand === item?.id ?
                          null :
                          <View>
                            {item?.createdAt === null ?
                              <Text numberOfLines={1} style={{ color: '#67748E', fontFamily: 'OpenSans-SemiBold', fontSize: 10, paddingTop: 5 }}>-</Text>
                              :
                              <Text numberOfLines={1} style={{ color: '#67748E', fontFamily: 'OpenSans-SemiBold', fontSize: 10, paddingTop: 5 }}>{new Date(item?.createdAt)?.getDate()} {month[new Date(item?.createdAt)?.getMonth()]} {new Date(item?.createdAt)?.getFullYear()} {moment(item?.createdAt)?.format('LT')}</Text>
                            }
                          </View>
                        }
                        {isExpand === item?.id ?
                          <View style={{ marginTop: 10, }}>
                            <View style={{ marginTop: 10, marginBottom: 10, width: 60, height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EBEBFD', borderRadius: 7 }}>
                              <Image source={{ uri: item?.image }} style={{ width: 50, height: 50, }} resizeMode='contain' />
                            </View>
                            <View>
                              {item?.createdAt === null ?
                                <Text numberOfLines={1} style={{ color: '#67748E', fontFamily: 'OpenSans-SemiBold', fontSize: 10, paddingTop: 5 }}>-</Text>
                                :
                                <Text numberOfLines={1} style={{ color: '#67748E', fontFamily: 'OpenSans-SemiBold', fontSize: 10, paddingTop: 5 }}>{new Date(item?.createdAt)?.getDate()} {month[new Date(item?.createdAt)?.getMonth()]} {new Date(item?.createdAt)?.getFullYear()} {moment(item?.createdAt)?.format('LT')}</Text>
                              }
                            </View>
                            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 12, paddingBottom: 5, }}>Action taken against the violation</Text>
                            <TextArea editable={false} h={20} placeholder="Details" style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', backgroundColor: '#F4F4FD' }} variant={'unstyled'} placeholderTextColor={'#7D8EAB'} />
                            <View style={{ marginTop: 10, marginBottom: 10, width: 60, height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EBEBFD', borderRadius: 7 }}>
                              <Image source={{ uri: item?.image }} style={{ width: 50, height: 50, }} resizeMode='contain' />
                            </View>
                          </View>
                          : null}
                      </View>
                    </View>
                  </TouchableOpacity>
                </Pressable>
              )
            }}
            keyExtractor={(item) => item.id.toString()}
          />
        }
      </View>
    </Fragment>
  )
}

export default ViolationHistory