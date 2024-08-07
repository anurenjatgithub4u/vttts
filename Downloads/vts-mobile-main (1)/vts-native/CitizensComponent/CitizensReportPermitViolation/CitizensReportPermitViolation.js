import React, { Fragment } from 'react';
import { View, Text, Pressable, TouchableOpacity, ScrollView, Modal, Image, ActivityIndicator, Platform } from 'react-native';
import { Input, TextArea, Select, CheckIcon, Icon, Actionsheet, useDisclose } from 'native-base';
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';
import { Col, Row } from "react-native-responsive-grid-system";
import * as ImagePicker from 'react-native-image-picker';
import { useHeader } from '../../ApiHeader';
import imagePath from '../constants/imagePath'; //stayAlert
import { BlurView, } from "@react-native-community/blur";

const includeExtra = true;
const CitizensReportPermitViolation = () => {
  let Navigation = useNavigation();
  const { ApiRequestAuthorizationHook } = useHeader();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [response, setResponse] = useState(null);
  const [searchValue, setSearchValue] = useState('')
  const [loader, setLoader] = useState(false);
  const [loaderAnimate, setLoaderAnimate] = useState(false);
  const [customModal, setCustomModal] = useState({ modal: false, message: '', status: null });
  const [violationDropDownLoader, setViolationDropDownLoader] = useState(true);
  const [violationData, setViolationData] = useState([]);
  const [vehicleNumber, setVehicleNumber] = useState(false);
  const [violationId, setViolationId] = useState(false);
  const [remark, setRemark] = useState(false);
  const [responseImage, setResponseImage] = useState([]);
  const [validVehicleNumber, setValidVehicleNumber] = useState(false);
  const [value, setValue] = useState({
    vehicleNumber: '',
    violationId: '',
    remark: '',
    image: ''
  })

  const onChangeVehicleNumber = (Text) => {
    if (Text?.trim()?.length >= 10) {
      setValue({ ...value, vehicleNumber: Text });
      setVehicleNumber(false);
      setValidVehicleNumber(false)
    } else {
      setValue({ ...value, vehicleNumber: Text });
      setVehicleNumber(false);
      setValidVehicleNumber(true)
    }
  }
  const onChangeVolationId = (Text) => {
    if (Text?.trim()?.length >= 0) {
      setValue({ ...value, violationId: Text });
      setViolationId(false);
    } else {
      setValue({ ...value, violationId: Text });
      setViolationId(false);
    }
  }
  const onChangeRemark = (Text) => {
    if (Text?.trim()?.length >= 0) {
      setValue({ ...value, remark: Text });
      setRemark(false);
    } else {
      setValue({ ...value, remark: Text });
      setRemark(false);
    }
  }

  const checkStringNullEmpty = (str) => {
    if (str != null && str !== '') {
      return false;
    } else {
      return true;
    };
  };

  var validation = '';
  const validate = () => {
    if (checkStringNullEmpty(value?.vehicleNumber)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setVehicleNumber(true)
    }
    if (checkStringNullEmpty(value?.violationId)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setViolationId(true)
    }
    if (checkStringNullEmpty(value?.remark)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setRemark(true)
    }
  };

  const data = JSON.stringify({
    vehicleNumber: value?.vehicleNumber,
    violationId: value?.violationId,
    remark: value?.remark,
    status: value?.status,
    image: null, // "https://i0.wp.com/gomechanic.in/blog/wp-content/uploads/2020/04/Alto800_Blazing_Red_new.png"
    createdAt: new Date()
  });

  const onSubmit = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    validate();
    if (validation === '') {
      if (validVehicleNumber === false) {
        setLoader(true);
        await ApiRequestAuthorizationHook.post(`/reported/violations`, data, { signal: signal })
          .then(function (response) {
            if (response?.status === 200) {
              setLoaderAnimate(true);
              setTimeout(() => {
                Navigation.goBack();
                setLoaderAnimate(false);
              }, 2000);
            }
          })
          .catch(function (error) {
            console.log(error)
            setCustomModal({ ...customModal, modal: true, message: 'Violation created failed', status: 0 })
          })
          .finally(function () {
            setLoader(false)
          })
      }
    }

    return () => {
      controller.abort();
    };
  }

  const getDataViolation = async () => {
    setViolationDropDownLoader(true);
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/permit/violations?sortedFileds=violations&asc=true`, { signal: signal })
      .then(function (ress) {
        if (ress.status === 200) {
          setViolationData(ress?.data?.data)
        }
      })
      .catch(function (err) {
        console.log('setViolationData', err)
      })
      .finally(function () {
        setViolationDropDownLoader(false)
      })

    return () => {
      controller.abort();
    };
  }

  const searchViolationData = violationData?.filter(
    ViolationItem => {
      return (
        ViolationItem
          .violations
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    }
  );

  const onRoute = () => {
    Navigation.goBack();
    setCustomModal({ ...customModal, modal: false, message: '', status: null })
  }

  const onButtonPress = (event) => {
    onClose();
    if (event?.type === 'capture') {
      ImagePicker?.launchCamera(event?.options, (ress) => {
        if (ress && !ress?.didCancel) {
          // setResponse(ress);
          const _inputs = [...responseImage, ...ress?.assets];
          setResponseImage(_inputs);
        }
      });
    } else {
      ImagePicker?.launchImageLibrary(event?.options, (ress) => {
        if (ress && !ress?.didCancel) {
          // setResponse(ress);
          const _inputs = [...responseImage, ...ress?.assets];
          setResponseImage(_inputs);
        }
      });
    }
  }

  const removeData = (key) => {
    const _inputs = [...responseImage?.slice(0, key), ...responseImage?.slice(key + 1, responseImage?.length)];
    setResponseImage(_inputs);
  }

  return (
    <Fragment>
      <Modal visible={loaderAnimate} transparent={true}>
        <BlurView
          blurType={"light"}
          blurAmount={1}
          reducedTransparencyFallbackColor={'white'}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, }}
        />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0000008a' }}>
          <Image source={imagePath?.animation__500__lauq92sz} style={{ width: 300, height: 300, }} resizeMode={'contain'} />
          <Text style={{ textAlign: 'center', color: '#FFFFFF', fontFamily: 'OpenSans-SemiBold', fontSize: 16, paddingTop: 20 }}>Request send successfully</Text>
        </View>
      </Modal>
      <Modal visible={loader} transparent={true}>
        <BlurView
          blurType={"light"}
          blurAmount={1}
          reducedTransparencyFallbackColor={'white'}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, }}
        />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0000008a' }}>
          <ActivityIndicator color={'#63CE78'} size={'large'} />
        </View>
      </Modal>
      <Modal visible={customModal.modal} transparent={true}>
        <BlurView
          blurType={"light"}
          blurAmount={1}
          reducedTransparencyFallbackColor={'white'}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, }}
        />
        <View style={{ flex: 1, backgroundColor: '#0000ff4d', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', paddingTop: 15, paddingBottom: 15, backgroundColor: '#ffffff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>
            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 16 }}>CGVTS</Text>
            <Text style={{ color: customModal?.status === 1 ? 'green' : '#CE5B68', fontFamily: 'OpenSans-Bold', fontSize: 12, paddingBottom: 15, paddingTop: 15 }}>{customModal?.message}</Text>
            <Pressable onPress={() => onRoute()} style={{ width: '100%', backgroundColor: 'blue', borderRadius: 5, padding: 10 }}>
              <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Regular', textAlign: 'center' }}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: "#FFFFFF", marginHorizontal: 20, elevation: 3, borderRadius: 5, marginTop: 30, padding: 10 }}>
          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Enter Deatils</Text>

          <View style={{ paddingTop: 20 }}>
            <View style={{ flexDirection: 'row', paddingBottom: 7 }}>
              <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 3 }} >Vehicle Number</Text>
              <Text style={{ color: '#CE5B68', fontFamily: 'OpenSans-SemiBold', fontSize: 12, }}> *</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#F4F4FD', borderRadius: 5, height: 40, marginTop: 5 }}>
              <Input value={value?.vehicleNumber} maxLength={10} onChangeText={(Text) => onChangeVehicleNumber(Text?.replace(/[^A-Z0-9]/ig, ""))} placeholder='Enter' style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} variant={'unstyled'} placeholderTextColor={'#7D8EAB'} />
            </View>
            {vehicleNumber ?
              <Text style={{ color: '#CE5B68', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Vehicle Number is required</Text>
              : null}
            {validVehicleNumber ?
              <Text style={{ color: '#CE5B68', fontFamily: 'OpenSans-Regular', fontSize: 12, }}>Enter 10 digit vehicle number</Text>
              : null}
          </View>
          <View style={{ paddingTop: 20 }}>
            <View style={{ flexDirection: 'row', paddingBottom: 7 }}>
              <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 3 }} >Type of Violation</Text>
              <Text style={{ color: '#CE5B68', fontFamily: 'OpenSans-SemiBold', fontSize: 12, }}> *</Text>
            </View>
            <Select onOpen={() => searchViolationData?.length === 0 ? getDataViolation() : null} selectedValue={value?.violationId} borderWidth={0} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} variant={'unstyled'} placeholderTextColor={'#7D8EAB'} accessibilityLabel="Select" placeholder="Select" _selectedItem={{
              bg: "#F4F4FD",
              endIcon: <CheckIcon size="5" />
            }}
              _light={{
                bg: "#F4F4FD"
              }} _dark={{
                bg: "#F4F4FD"
              }} mt={1}
              _actionSheetBody={{
                ListHeaderComponent:
                  <View>
                    {violationDropDownLoader === true ?
                      <ActivityIndicator color={'#63ce78'} size={'large'} />
                      :
                      <Pressable style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 10, marginBottom: 10, borderWidth: 1, borderColor: '#7D8EAB' }}>
                        <Input
                          value={searchValue}
                          placeholder="Search here"
                          type='text'
                          onChangeText={(value) => {
                            setSearchValue(value);
                          }}
                          variant={'unstyled'}
                          InputRightElement={<Icon as={<MaterialIcons name="clear" onPress={() => setSearchValue('')} />} size={6} mr="2" color="#7D8EAB" />}
                          placeholderTextColor={'#7D8EAB'}
                          style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }}
                        />
                      </Pressable>
                    }
                  </View>,
                ListEmptyComponent:
                  <View>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40', textAlign: 'center' }}>Data Not Found</Text>
                  </View>,
              }}
              onValueChange={itemValue => onChangeVolationId(itemValue)}
            >
              {violationDropDownLoader ?
                <View>
                  <ActivityIndicator color={'#63CE78'} size={'large'} />
                </View>
                :
                searchViolationData?.map((value, index) => (
                  <Select.Item key={index} label={value?.violations} value={value?.id?.toString()} />
                ))
              }
            </Select>
            {violationId ?
              <Text style={{ color: '#CE5B68', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Violation type is required</Text>
              : null}
          </View>
          <View style={{ paddingTop: 20 }}>
            <View style={{ flexDirection: 'row', paddingBottom: 7 }}>
              <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 3 }} >Remark</Text>
              <Text style={{ color: '#CE5B68', fontFamily: 'OpenSans-SemiBold', fontSize: 12, }}> *</Text>
            </View>
            <TextArea value={value?.remark} onChangeText={(Text) => onChangeRemark(Text)} h={40} placeholder="Enter" style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', backgroundColor: '#F4F4FD' }} variant={'unstyled'} placeholderTextColor={'#7D8EAB'} />
            {remark ?
              <Text style={{ color: '#CE5B68', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Remark is required</Text>
              : null}
          </View>

          <View style={{ paddingTop: 20 }}>
            <View style={{ flexDirection: 'row', paddingBottom: 7 }}>
              <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 3 }} >Images</Text>
              <Text style={{ color: '#CE5B68', fontFamily: 'OpenSans-SemiBold', fontSize: 12, }}> *</Text>
            </View>
            {responseImage?.length === 0 ?
              <TouchableOpacity onPress={() => onOpen()} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F4FD', borderRadius: 15, height: 70, width: 70, marginTop: 5, borderWidth: 1, borderColor: '#D0D1F8', borderStyle: 'dashed' }}>
                <Feather name={'upload'} color={'#252F40'} size={20} />
                <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-Bold' }}>Upload</Text>
              </TouchableOpacity>
              :
              <Row>
                {responseImage?.map((value, key) => (
                  <Col key={key} xs={3} sm={3} md={3} lg={3}>
                    <Pressable style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F4FD', borderRadius: 15, height: 70, width: 70, marginTop: 18, /* overflow: 'hidden', */ borderWidth: 1, borderColor: '#D0D1F8', borderStyle: 'dashed' }}>
                      <Image source={{ uri: value?.uri }} style={{ width: '100%', height: '100%', borderRadius: 10 }} resizeMode={'contain'} />
                      <TouchableOpacity onPress={() => removeData(key)} activeOpacity={0.60} style={{ borderColor: '#F25555', borderWidth: 1, borderStyle: 'solid', width: 25, height: 25, borderRadius: 50, backgroundColor: '#F4F4FD', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: -9, right: -7, zIndex: 999999 }} >
                        <AntDesign name={'closecircle'} color={'#F25555'} size={20} />
                      </TouchableOpacity>
                    </Pressable>
                  </Col>
                ))}
                <Col xs={3} sm={3} md={3} lg={3}>
                  <TouchableOpacity onPress={() => onOpen()} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F4FD', borderRadius: 15, height: 70, width: 70, marginTop: 18, borderWidth: 1, borderColor: '#D0D1F8', borderStyle: 'dashed' }}>
                    <AntDesign name={'plus'} color={'#252F40'} size={20} />
                    <Text style={{ color: '#252F40', fontSize: 8, fontFamily: 'OpenSans-SemiBold' }}>Add Image</Text>
                  </TouchableOpacity>
                </Col>
              </Row>
            }
          </View>

        </View>
        <Pressable style={{ paddingTop: 40, paddingBottom: 15, zIndex: 99, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
          {responseImage?.length === 0 ?
            <TouchableOpacity activeOpacity={0.70} style={{ backgroundColor: '#A1A2F2', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 5, height: 42 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>Submit</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => onSubmit()} activeOpacity={0.70} style={{ backgroundColor: '#4646F2', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 5, height: 42 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>Submit</Text>
            </TouchableOpacity>
          }
        </Pressable>
      </ScrollView>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <View style={{ width: '100%', paddingHorizontal: 20 }} >
            <View style={{ paddingTop: 10, paddingBottom: 15 }}>
              <Text style={{ color: '#67748E', fontFamily: 'OpenSans-Bold', fontSize: 14 }} >
                Select media
              </Text>
            </View>
            <View style={{ flexDirection: 'row', paddingBottom: 20, paddingTop: 10 }}>
              <TouchableOpacity activeOpacity={0.60} onPress={() => onButtonPress({ type: 'library', options: { selectionLimit: 0, mediaType: 'photo', includeBase64: false, includeExtra } })} style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: 40, height: 40, borderRadius: 3, backgroundColor: '#EBEBFD', alignItems: 'center', justifyContent: 'center' }}>
                  <MaterialIcons name={'photo-library'} color={'#252F40'} size={20} />
                </View>
                <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, paddingTop: 10 }}>Library</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.60} onPress={() => onButtonPress({ type: 'capture', options: { saveToPhotos: true, mediaType: 'photo', includeBase64: false, includeExtra }, })} style={{ alignItems: 'center', justifyContent: 'center', paddingLeft: 25 }}>
                <View style={{ width: 40, height: 40, borderRadius: 3, backgroundColor: '#EBEBFD', alignItems: 'center', justifyContent: 'center' }}>
                  <MaterialIcons name={'camera-alt'} color={'#252F40'} size={20} />
                </View>
                <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, paddingTop: 10 }}>Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Actionsheet.Content>
      </Actionsheet>
    </Fragment >
  )
}

export default CitizensReportPermitViolation;