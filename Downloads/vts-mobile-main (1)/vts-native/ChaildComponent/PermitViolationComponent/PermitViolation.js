import React, { Fragment, useState, useEffect } from 'react';
import { Input, TextArea, Icon, Actionsheet, useDisclose, } from 'native-base';
import { View, Text, Pressable, ScrollView, ActivityIndicator, LayoutAnimation, UIManager, Image, Platform, Modal, TouchableOpacity, } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Col, Row } from "react-native-responsive-grid-system";
import { useHeader } from '../../ApiHeader';
import BlurViewScreen from '../../BlurViewScreen';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const includeExtra = true;
const PermitViolation = () => {
  let Navigation = useNavigation();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [expanded, setExpanded] = React.useState();
  const [response, setResponse] = useState(null);

  const [customModal, setCustomModal] = useState({ message: 'message', isModal: false, status: null });
  const { isOpen, onOpen, onClose } = useDisclose();
  const [onOpenLib, setOnOpenLib] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [violationLoader, setViolationLoader] = useState(true)
  const [violationData, setGetViolationData] = useState([])
  const [loader, setLoader] = useState(false)
  const [inputs, setInputs] = useState([]);
  const [validVehicleNumber, setValidVehicleNumber] = useState(false);
  const [value, setValue] = useState({
    VehicleNumber: '',
    TypeofViolation: [],
    Remark: '',
  });
  const [responseImage, setResponseImage] = useState([]);

  const addHandlerRemark = () => {
    const _inputs = [...inputs];
    _inputs.push({ key: '', value: '' });
    setInputs(_inputs);
  }
  const deleteHandlerRemark = (key) => {
    const _inputs = inputs.filter((input, index) => index != key);
    setInputs(_inputs);
  }

  const addHandlerImage = () => {
    const _inputs = [...responseImage];
    _inputs.push({ key: '', value: [] });
    setResponseImage(_inputs);
  }
  const deleteHandlerImage = (key) => {
    const _inputs = responseImage.filter((input, index) => index != key);
    setResponseImage(_inputs);
  }

  const handleChange = (id) => {
    addHandlerRemark();
    addHandlerImage();
    let temp = violationData?.map((product) => {
      if (id === product?.id) {
        return { ...product, isChecked: !product?.isChecked };
      }
      return product;
    });
    setGetViolationData(temp);
  };
  const handleRemoveChange = (id) => {
    let temp = violationData?.map((product) => {
      if (id === product?.id) {
        return { ...product, isChecked: !product?.isChecked };
      }
      return product;
    });
    setGetViolationData(temp);
  };

  const getViolationData = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    setViolationLoader(true)

    await ApiRequestAuthorizationHook.get(`/permit/violations`, { signal: signal })
      .then(function (params) {
        if (params?.status === 200) {
          const ListData = params?.data?.data.map((value) => ({
            id: value?.id,
            violations: value?.violations,
            penalty: value?.penalty,
            createdBy: value?.createdBy,
            createrName: value?.createrName,
            isChecked: false
          }));
          setGetViolationData(ListData)
        }
      })
      .catch(function (params) {
        console.log('violations data', params)
      })
      .finally(function () {
        setViolationLoader(false)
      })

    return () => {
      controller.abort();
    };
  }

  useEffect(() => {
    getViolationData();
  }, [])

  const handlePress = (id) => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(id)
  };

  let selected = violationData?.filter((product) => product?.isChecked);
  const Data = JSON.stringify({
    vehicleNumber: value?.VehicleNumber,
    violationIds: selected.map((value) => (value?.id)),
    remark: value?.Remark,
    image: "http://imag2e1.com/png",
    totalPenalty: selected.map((value) => (value?.penalty)).reduce((a, b) => a + b, 0),
    createdAt: new Date()
  })

  const onSubmit = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (validVehicleNumber === false) {
      setLoader(true)
      await ApiRequestAuthorizationHook.post(`/generated/violations`, Data, { signal: signal })
        .then(function (params) {
          if (params?.status === 200) {
            setCustomModal({ ...customModal, message: 'Successfully generated permit violation', isModal: true, status: 1 })
          }
        })
        .catch(function (params) {
          console.log('params', params)
          setCustomModal({ ...customModal, message: 'Failed to generated permit violation', isModal: true, status: 0 })
        })
        .finally(function () {
          setLoader(false)
        })
    }
    return () => {
      controller.abort();
    };
  }

  const onSuccess = () => {
    Navigation.goBack()
  }
  const onFaield = () => {
    Navigation.goBack()
  }

  const onButtonPress = (event, index) => {
    if (event?.type === 'capture') {
      ImagePicker?.launchCamera(event?.options, (ress) => {
        if (ress && !ress?.didCancel) {
          setResponse(ress?.assets);
          setOnOpenLib(false);
          const _inputs = [...responseImage];
          _inputs[index].value = [...responseImage[index].value, ...ress?.assets];
          _inputs[index].key = index;
          setResponseImage(_inputs);
        }
      });
    } else {
      ImagePicker?.launchImageLibrary(event?.options, (ress) => {
        if (ress && !ress?.didCancel) {
          setResponse(ress?.assets);
          setOnOpenLib(false);
          const _inputs = [...responseImage];
          _inputs[index].value = [...responseImage[index].value, ...ress?.assets];
          _inputs[index].key = index;
          setResponseImage(_inputs);
          // console.log([..._inputs[index].value])
        }
      });
    }
  };

  const removeData = (key, index) => {
    const _inputs = [...responseImage];
    _inputs[index].value = [...responseImage[index]?.value?.slice(0, key), ...responseImage[index]?.value?.slice(key + 1, responseImage[index]?.value?.length)];
    _inputs[index].key = index;
    setResponseImage(_inputs);
  }

  const inputHandler = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].value = text;
    _inputs[key].key = key;
    setInputs(_inputs);
  }

  const onChageVehicleNumber = (Text) => {
    if (Text.trim().length >= 10) {
      setValue({ ...value, VehicleNumber: Text, });
      setValidVehicleNumber(false)
    } else {
      setValue({ ...value, VehicleNumber: Text, });
      setValidVehicleNumber(true)
    }
  }

  const violationDataFilter = violationData?.filter(
    ViolationData => {
      return (
        ViolationData
          .violations
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    }
  );

  const imagevalid = responseImage?.map((value, index) => (value?.value?.length))?.filter(item => item === 0).length;
  const remarkvalid = inputs?.map((value, index) => (value?.value?.length))?.filter(item => item === 0).length;

  return (
    <Fragment>
      <Modal visible={loader} transparent={true}>
        <BlurViewScreen />
        <View style={{ flex: 1, backgroundColor: "#353232d1", justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'} color={'#63CE78'} />
        </View>
      </Modal>
      <Modal visible={customModal?.isModal} transparent={true}>
        <BlurViewScreen />
        <View style={{ flex: 1, backgroundColor: "#353232d1", justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#ffffff', width: '90%', justifyContent: 'center', alignItems: 'center', borderRadius: 5, padding: 35, elevation: 12 }}>
            <Text style={{ fontSize: 16, color: '#252F40', fontFamily: 'OpenSans-Bold' }}>CGVTS</Text>
            <Text style={{ fontSize: 13, color: '#69768F', fontFamily: 'OpenSans-SemiBold', paddingTop: 10, paddingBottom: 25 }}>{customModal?.message}</Text>

            {customModal?.status === 1 ?
              <TouchableOpacity onPress={() => onSuccess()} style={{ backgroundColor: '#7171F3', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginHorizontal: 15, height: 45, borderRadius: 4, width: '100%' }}>
                <Text style={{ color: "#FFFFFF", fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>Ok</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => onFaield()} style={{ backgroundColor: '#F25555', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginHorizontal: 15, height: 45, borderRadius: 4, width: '100%' }}>
                <Text style={{ color: "#FFFFFF", fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>Ok</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
      </Modal>

      <View style={{ marginHorizontal: 15, marginTop: 20, backgroundColor: '#FFFFFF', elevation: 6, borderRadius: 5, padding: 10 }}>
        <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 14, paddingBottom: 25 }}>Enter Details</Text>
        <View>
          <View style={{ flexDirection: 'row', paddingBottom: 7 }}>
            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 12, }}>Vehicle Number</Text>
            <Text style={{ color: '#CE5B68', fontFamily: 'OpenSans-SemiBold', fontSize: 12, }}> *</Text>
          </View>
          <Input variant={'unstyled'} maxLength={10} value={value?.VehicleNumber} onChangeText={(Text) => onChageVehicleNumber(Text)} style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14, backgroundColor: '#F4F4FD', height: 40 }} placeholderTextColor={'#7D8EAB'} placeholder='Enter' />
          {validVehicleNumber ?
            <Text style={{ color: '#CE5B68', fontFamily: 'OpenSans-SemiBold', fontSize: 12, }}>Enter 10 digit vehicle number</Text>
            : null}
        </View>
        <View style={{ paddingTop: 20 }}>
          <View style={{ flexDirection: 'row', paddingBottom: 7 }}>
            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 12, }}>Type of Violation</Text>
            <Text style={{ color: '#CE5B68', fontFamily: 'OpenSans-SemiBold', fontSize: 12, }}> *</Text>
          </View>
          <Pressable onPress={onOpen} style={{ backgroundColor: '#F4F4FD', height: 40, borderRadius: 5 }} >
            <Input editable={false} value={selected?.map((value) => (value?.violations)).toString()} variant={'unstyled'} style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14, backgroundColor: '#F4F4FD', height: 40 }} placeholderTextColor={'#7D8EAB'} placeholder='Search'
              InputRightElement={
                <Pressable>
                  <Icon as={<Entypo name={'chevron-small-down'} />} size={8} mr="2" color="#67748E" />
                </Pressable>} />
          </Pressable>
        </View>
      </View>

      <View style={{ paddingTop: 10, paddingBottom: 80 }}>
        {selected?.map((value, index) => (
          <Pressable key={index} style={{ marginHorizontal: 15, marginTop: 5, backgroundColor: '#FFFFFF', elevation: 1, borderRadius: 5, padding: 10, justifyContent: 'center' }}>
            <Pressable onPress={() => expanded === value?.id ? handlePress(0) : handlePress(value?.id)} style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 8, paddingBottom: 8 }}>
              <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, }}>{index + 1}.</Text>
              <Text numberOfLines={1} style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, paddingLeft: 8 }}>{value?.violations}.</Text>
              <View style={{ flexGrow: 1 }} />

              <TouchableOpacity onPress={() => { handleRemoveChange(value?.id); deleteHandlerRemark(index); deleteHandlerImage(index) }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 3 }}>
                <MaterialCommunityIcons name={'delete'} size={23} color={'#E64444'} />
              </TouchableOpacity>
              <Entypo name={expanded === value?.id ? 'chevron-up' : 'chevron-down'} size={20} color={'#67748E'} />
            </Pressable>

            {expanded === value?.id ?
              <View>
                {/* <View style={{ paddingTop: 20 }}>
                  <View style={{ flexDirection: 'row', paddingBottom: 7 }}>
                    <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 12, }}>Amount</Text>
                    <Text style={{ color: '#CE5B68', fontFamily: 'OpenSans-SemiBold', fontSize: 12, }}> *</Text>
                  </View>
                  <Pressable style={{ backgroundColor: '#F4F4FD', height: 40, borderRadius: 5 }} >
                    <Input variant={'unstyled'} value={`${value?.penalty}`} style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14, backgroundColor: '#F4F4FD', height: 40 }} placeholderTextColor={'#7D8EAB'} placeholder='Enter Penalty'
                      InputRightElement={
                        <Pressable>
                          <Icon as={<FontAwesome name={'rupee'} />} size={3} mr="2" color="#67748E" />
                        </Pressable>} />
                  </Pressable>
                </View> */}
                <View style={{ paddingTop: 10 }}>
                  <View style={{ flexDirection: 'row', paddingBottom: 7 }}>
                    <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 12, }}>Remarks</Text>
                    <Text style={{ color: '#CE5B68', fontFamily: 'OpenSans-SemiBold', fontSize: 12, }}> *</Text>
                  </View>
                  <Pressable style={{ backgroundColor: '#F4F4FD', borderRadius: 5 }} >
                    <TextArea h={20} value={inputs[index]?.value} onChangeText={(text) => inputHandler(text, index)} variant={'unstyled'} style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14, backgroundColor: '#F4F4FD', }} placeholderTextColor={'#7D8EAB'} placeholder='Enter' />
                  </Pressable>
                </View>

                <View style={{ paddingTop: 20 }}>
                  <View style={{ flexDirection: 'row', paddingBottom: 7 }}>
                    <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 3 }} >Images</Text>
                    <Text style={{ color: '#CE5B68', fontFamily: 'OpenSans-SemiBold', fontSize: 12, }}> *</Text>
                  </View>
                  {responseImage[index]?.value === null ?
                    <Pressable onPress={() => setOnOpenLib(!onOpenLib)} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F4FD', borderRadius: 15, height: 70, width: 70, marginTop: 5, borderWidth: 1, borderColor: '#D0D1F8', borderStyle: 'dashed' }}>
                      <AntDesign name={'plus'} color={'#252F40'} size={20} />
                      <Text style={{ color: '#252F40', fontSize: 8, fontFamily: 'OpenSans-SemiBold' }}>Add Image</Text>
                    </Pressable>
                    :
                    responseImage[index]?.value?.length === 0 ?
                      <Pressable onPress={() => setOnOpenLib(!onOpenLib)} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F4FD', borderRadius: 15, height: 70, width: 70, marginTop: 5, borderWidth: 1, borderColor: '#D0D1F8', borderStyle: 'dashed' }}>
                        <AntDesign name={'plus'} color={'#252F40'} size={20} />
                        <Text style={{ color: '#252F40', fontSize: 8, fontFamily: 'OpenSans-SemiBold' }}>Add Image</Text>
                      </Pressable>
                      :
                      <Row>
                        {responseImage[index]?.value?.map((value, key) => (
                          <Col key={key} xs={3} sm={3} md={3} lg={3}>
                            <Pressable style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F4FD', borderRadius: 15, height: 70, width: 70, marginTop: 18, /* overflow: 'hidden', */ borderWidth: 1, borderColor: '#D0D1F8', borderStyle: 'dashed' }}>
                              <Image source={{ uri: value?.uri }} style={{ width: '100%', height: '100%', borderRadius: 10 }} resizeMode={'contain'} />
                              <TouchableOpacity onPress={() => removeData(key, index)} activeOpacity={0.60} style={{ borderColor: '#F25555', borderWidth: 1, borderStyle: 'solid', width: 25, height: 25, borderRadius: 50, backgroundColor: '#F4F4FD', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: -9, right: -7, zIndex: 999999 }} >
                                <AntDesign name={'closecircle'} color={'#F25555'} size={20} />
                              </TouchableOpacity>
                            </Pressable>
                          </Col>
                        ))}
                        <Col xs={3} sm={3} md={3} lg={3}>
                          <TouchableOpacity onPress={() => setOnOpenLib(!onOpenLib)} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F4FD', borderRadius: 15, height: 70, width: 70, marginTop: 18, borderWidth: 1, borderColor: '#D0D1F8', borderStyle: 'dashed' }}>
                            <AntDesign name={'plus'} color={'#252F40'} size={20} />
                            <Text style={{ color: '#252F40', fontSize: 8, fontFamily: 'OpenSans-SemiBold' }}>Add Image</Text>
                          </TouchableOpacity>
                        </Col>
                      </Row>
                  }
                </View>
                <Actionsheet isOpen={onOpenLib} onClose={() => setOnOpenLib(!onOpenLib)}>
                  <Actionsheet.Content>
                    <View style={{ width: '100%', paddingHorizontal: 20 }} >
                      <View style={{ paddingTop: 10, paddingBottom: 15 }}>
                        <Text style={{ color: '#67748E', fontFamily: 'OpenSans-Bold', fontSize: 14 }} >
                          Select media
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', paddingBottom: 20, paddingTop: 10 }}>
                        <TouchableOpacity activeOpacity={0.60} onPress={() => onButtonPress({ type: 'library', options: { selectionLimit: 10, mediaType: 'photo', includeBase64: false, includeExtra } }, index)} style={{ alignItems: 'center', justifyContent: 'center' }}>
                          <View style={{ width: 40, height: 40, borderRadius: 3, backgroundColor: '#EBEBFD', alignItems: 'center', justifyContent: 'center' }}>
                            <MaterialIcons name={'photo-library'} color={'#252F40'} size={20} />
                          </View>
                          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, paddingTop: 10 }}>Library</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.60} onPress={() => onButtonPress({ type: 'capture', options: { saveToPhotos: true, mediaType: 'photo', includeBase64: false, includeExtra } }, index)} style={{ alignItems: 'center', justifyContent: 'center', paddingLeft: 25 }}>
                          <View style={{ width: 40, height: 40, borderRadius: 3, backgroundColor: '#EBEBFD', alignItems: 'center', justifyContent: 'center' }}>
                            <MaterialIcons name={'camera-alt'} color={'#252F40'} size={20} />
                          </View>
                          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, paddingTop: 10 }}>Camera</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Actionsheet.Content>
                </Actionsheet>
              </View>
              : null}
          </Pressable>
        ))}

        {selected?.length === 0 ?
          null
          :
          value?.VehicleNumber === '' ?
            <TouchableOpacity disabled style={{ backgroundColor: '#D0D0FB', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginHorizontal: 15, height: 45, borderRadius: 4 }}>
              <Text style={{ color: "#FFFFFF", fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>Submit</Text>
            </TouchableOpacity>
            :
            imagevalid !== 0 || remarkvalid !== 0 ?
              <TouchableOpacity disabled style={{ backgroundColor: '#D0D0FB', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginHorizontal: 15, height: 45, borderRadius: 4 }}>
                <Text style={{ color: "#FFFFFF", fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>Submit</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => onSubmit()} style={{ backgroundColor: '#4646F2', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginHorizontal: 15, height: 45, borderRadius: 4 }}>
                <Text style={{ color: "#FFFFFF", fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>Submit</Text>
              </TouchableOpacity>
        }
      </View>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          {violationLoader === true ?
            <ActivityIndicator size={'large'} color={'#63CE78'} />
            :
            <>
              <Input placeholder='Search' value={searchValue} onChangeText={(value) => setSearchValue(value)} placeholderTextColor={'#7D8EAB'} variant={'unstyled'} style={{ height: 40, fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40', backgroundColor: '#E2E2FD', }} InputRightElement={<Pressable style={{ backgroundColor: '#E2E2FD', height: 40, alignItems: 'center', justifyContent: 'center' }} onPress={() => { }}><Icon onPress={() => setSearchValue('')} as={<AntDesign name={"closecircleo"} />} size={5} mr="2" color="#252F40" /></Pressable>} />
              {violationDataFilter?.length === 0 ?
                <Text style={{ textAlign: 'center', color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingTop: 20, paddingBottom: 10 }}>No Option</Text>
                :
                <ScrollView nestedScrollEnabled={true} scrollEnabled={true} showsVerticalScrollIndicator={false} style={{ width: '100%', }}>
                  {violationDataFilter?.map((value, i) => (
                    <Pressable onPress={() => handleChange(value?.id)} key={i} style={{ flexDirection: 'row', alignItems: 'center', padding: 5, height: 50, backgroundColor: '#F4F4FD', borderRadius: 5, margin: 2, elevation: 1 }}>
                      <Pressable>
                        <MaterialCommunityIcons
                          name={value?.isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color={value?.isChecked ? "#7474F5" : "#67748E"} />
                      </Pressable>
                      <Text style={{ color: value?.isChecked ? "#252F40" : "#67748E", fontSize: 14, fontFamily: 'OpenSans-Regular', paddingLeft: 8 }}>{value?.violations}</Text>
                    </Pressable>
                  ))}
                </ScrollView>
              }
            </>
          }
        </Actionsheet.Content>
      </Actionsheet>
    </Fragment>
  )
}

export default PermitViolation;
