import React, { useState, useRef } from 'react'
import { ScrollView, Animated, } from 'react-native';
import { View } from 'react-native';
import { Text, Pressable } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Divider } from 'native-base'

const ReportList = ({ value, setValue }) => {
  const [completeScrollBarHeight, setCompleteScrollBarHeight] = useState(1);
  const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(0);
  const scrollIndicator = useRef(new Animated.Value(0)).current;

  const scrollIndicatorSize =
    completeScrollBarHeight > visibleScrollBarHeight
      ? (visibleScrollBarHeight * visibleScrollBarHeight)
      / completeScrollBarHeight
      : visibleScrollBarHeight;

  const difference =
    visibleScrollBarHeight > scrollIndicatorSize
      ? visibleScrollBarHeight - scrollIndicatorSize
      : 1;

  const scrollIndicatorPosition = Animated.multiply(
    scrollIndicator,
    visibleScrollBarHeight / completeScrollBarHeight,
  ).interpolate({
    extrapolate: 'clamp',
    inputRange: [0, difference],
    outputRange: [0, difference],
  });

  const onContentSizeChange = (_, contentHeight) =>
    setCompleteScrollBarHeight(contentHeight);

  const onLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }) => {
    setVisibleScrollBarHeight(height);
  };
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <View style={{ backgroundColor: '#F7F7F7', flexDirection: 'row', width: '100%', height: 300, padding: 10 }}>
        <ScrollView
          contentContainerStyle={{ paddingRight: 14 }}
          onContentSizeChange={onContentSizeChange}
          onLayout={onLayout}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollIndicator } } }],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          style={{ width: '100%', }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>Menu</Text>
            <View style={{ flexGrow: 1 }} />
            <Text style={{ color: '#7D8EAB', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>Read</Text>
          </View>
          <Divider orientation='horizontal' style={{ marginTop: 5, marginBottom: 5 }} />

          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-Regular', color: '#000000', textTransform: 'capitalize' }}>All</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.all ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, all: !value?.all })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-Regular', color: '#000000', textTransform: 'capitalize' }}>route</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.route ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, route: !value?.route })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-Regular', color: '#000000', textTransform: 'capitalize' }}>trip</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.trip ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, trip: !value?.trip })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-Regular', color: '#000000', textTransform: 'capitalize' }}>summary</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.summary ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, summary: !value?.summary })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-Regular', color: '#000000', textTransform: 'capitalize' }}>event</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.event ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, event: !value?.event })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-Regular', color: '#000000', textTransform: 'capitalize' }}>stop</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.stop ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, stop: !value?.stop })}
            />
          </View>




        </ScrollView>
        <View style={{ backgroundColor: '#D8D8D8', borderRadius: 50, height: '100%', width: 8, }}>
          <Animated.View
            style={[
              { backgroundColor: '#7D8EAB', borderRadius: 50, width: 8, },
              {
                height: scrollIndicatorSize,
                transform: [{ translateY: scrollIndicatorPosition }],
              },
            ]}
          />
        </View>

      </View>
    </View>
  )
}

export default ReportList;