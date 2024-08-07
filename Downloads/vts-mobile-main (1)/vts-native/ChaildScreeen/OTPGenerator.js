import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useHeader } from '../../ApiHeader';
// import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OTPGenerator =  (props) => {
  
  // AsyncStorage.getItem('DeviceDetails').then(data=>{console.log("dataaa.....>>>>",data)})
  // console.log("dattaa....************",props.route.params.item)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [otp, setOTP] = useState('');
  const navigation = useNavigation();
  const [otpBoxes, setOTPBoxes] = useState(['', '', '', '','','']);
  const { ApiRequestAuthorizationHook, } = useHeader();
    const [loading, setLoading] = useState(false);
    const [otpValue, setOTPValue] = useState('');
    const [pin, setPin] = useState('');
    const handleOTPChange = (text) => {
      setOTP(text);
      setOTPBoxes([
        text[0] || '',
        text[1] || '',
        text[2] || '',
        text[3] || '',
        text[4] || '',
        text[5] || '',
      ]);
  
      // Auto shift focus to next input box
      if (text.length === 1) {
        textInput2.focus();
      } else if (text.length === 2) {
        textInput3.focus();
      } else if (text.length === 3) {
        textInput4.focus();
      } else if (text.length === 4) {
        textInput5.focus();
      } else if (text.length === 5) {
        textInput6.focus();
      }
    };
    // const [pin1, setpin1] = useState(null)
    // const [pin1, setpin1] = useState(null) 
    // const [pin1, setpin1] = useState(null)
    // const [pin1, setpin1] = useState(null)
    // const [pin1, setpin1] = useState(null)
    // const [pin1, setpin1] = useState(null)

  const generateOTP = async () => {
    // const otp = Math.floor(Math.random() * 10000);
    setModalVisible(true);
    setOTP('');
    
    // const clientPhoneNo = ;
    const clientPhoneNo = props.route.params.item?.contact;
    const deviceId = props.route.params.item?.id;
    // console.log("clientPhoneNo>>>>>>!!",clientPhoneNo)
    // console.log("deviceId>>>>>>!!",deviceId)
    // const apiUrl = `https://cgvtsapi.trackolet.in/api/untag/otp?clientPhoneNo=${clientPhoneNo}&deviceId=${deviceId}`;
  
    try {
      const response = await ApiRequestAuthorizationHook.get(`/untag/otp?clientPhoneNo=${clientPhoneNo}&deviceId=${deviceId}`);
      if (response.status === 200) {
         console.log("success Response",response)
        // handle successful response
      } else {
        console.log("failuare response!")
        // handle error response
      }
    } catch (error) {
      console.log(error)
      // handle network error
    }
  };
  
  // const generateOTP = () => {
  //   const otp = Math.floor(Math.random() * 10000);
  //   setModalVisible(true);
  //   setOTP(otp.toString());
  // };


// const handleOTPSubmit = async () => {
//   setModalVisible(false);
//   setModalVisible2(true);

  
  

  // const putOTPData = async (otpValue) => {
    // const url = 'https://cgvtsapi.trackolet.in/api/untag/otp';
    // const otpdata = JSON.stringify({
    //   "otp": props.route.params.item?.otpValue,
    //   "phone": props.route.params.item?.contact,
    //   "deviceId": props.route.params.item?.id, 
    // });
    // const options = {
    //   method: 'PUT',
      // headers: {
        // 'Content-Type': 'application/json'
      // },
      // body: JSON.stringify(data)
    // };
//     try {
//     // const url = 'https://cgvtsapi.trackolet.in/api/untag/otp';
//     //  await ApiRequestAuthorizationHook.put('/untag/otp/,${props.route.params.item?}'.otpdata);
//     if (response.status === 200) {
//       console.log("success response",response)
//      // handle successful response
//    } else {
//      console.log("failuare")
//      // handle error response
//    }
//       const responseData = await response.json();
//       // console.log('Response:', responseData);
//       // Handle the response data here
//     } catch (error) {
//       console.error('Error:', error);
//       // Handle the error here
//     }
// };


const handleOTPCancel = () => {
  setModalVisible(false);
  setOTP('');
  setOTPBoxes(['', '', '', '','','']);
  navigation.goBack();
};

const handleOK = () => {
  setModalVisible2(false);
  setOTP('');
  setOTPBoxes(['', '', '', '','','']);
  navigation.goBack();
};

const [otp_data, setOTPData] = useState({
  otp: "",
  phone: props.route.params.item?.contact,
  deviceId: props.route.params.item?.id,
});

const handleOTPInputChange = (index, value) => {
  if (value.length > 1) {
    // value = value.substr(value.length - 1);
    // const App = () => {
    //   const [pin, setPin] = useState('');
    
    //   const generatePin = () => {
    //     const min = 100000;
    //     const max = 999999;
    //     const randomPin = Math.floor(Math.random() * (max - min + 1)) + min;
    //     setPin(randomPin.toString());
    //   };
    
    //   return (
    //     <View>
    //       <Text>{pin}</Text>
    //       <Button title="Generate PIN" onPress={generatePin} />
    //     </View>
    //   );
    // };
    }

  console.log("index>>>????", index);
  console.log("value>>>????", value);

  const updatedOTPBoxes = [...otpBoxes];
  updatedOTPBoxes[index] = value.toString();
  setOTPBoxes(updatedOTPBoxes);
  console.log("updatedOTPBoxes>>>????", updatedOTPBoxes);

  const otpValue = updatedOTPBoxes.join('');
  setOTPData({
    ...otp_data,
    otp: otpValue,
  });
  console.log("otpValue>>>????", otpValue);
};

const handleOTPSubmit = async () => {
  setLoading(true);
  try {
    const response = await ApiRequestAuthorizationHook.put(`/untag/otp`, JSON.stringify(otp_data));
    if (response?.status === 200) {
      console.log("put method response??", response);
      const successdata = response.data.status
      console.log("successdata????%%%%$%^%$#@#$%^&&^%",successdata)
      if (successdata === 'Valid Otp') {
        setModalVisible(false);
        setModalVisible2(true);
      } else {
        console.log('Invalid OTP');
      }
    } 
  } catch (error) {
    console.log("put method failed with error", error);
    // setCustomModal({ ...customModal, modal: true, message: 'User Account Updated Failed', status: 0 })
  } finally {
    setLoading(false);
  }
};

const closeModalAndGoBack = () => {
  // Set the modal visibility to false to close it
  setModalVisible(false);

  // Use navigation.goBack() function to go back
  navigation.goBack();
}


  // const handleOTPSubmit = () => {
  //   setModalVisible(false);
  //   setModalVisible2(true);
  // };

  // const handleOTPCancel = () => {
  //   setModalVisible(false);
  //   setOTP('');
  //   setOTPBoxes(['', '', '', '','','']);
  // };

  // const handleOK = () => {
  //   setModalVisible2(false);
  //   setOTP('');
  //   setOTPBoxes(['', '', '', '','','']);
  // };

  // const handleOTPInputChange = (index, value) => {
  //   if (value.length > 1) {
  //     value = value.substr(value.length - 1);
  //   }

    // const updatedOTPBoxes = [...otpBoxes];
    // updatedOTPBoxes[index] = value;
    // setOTPBoxes(updatedOTPBoxes);

    // const otpValue = updatedOTPBoxes.join('');
    // setOTP(otpValue);
  
  
    // const [otp, setOtp] = useState('');
  
    // function generateOTP() {
    //   let digits = '0123456789';
    //   let OTPValue = '';
    //   for(let i = 0; i < 6; i++) {
    //     OTPValue += digits[Math.floor(Math.random() * 10)];
    //   }
    //   setOtp(OTPValue);
    // } 
  
    // return (
    //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //     <Text style={{ fontSize: 25, marginBottom: 10 }}>OTP: {otp}</Text>
    //     <Button title="Generate OTP" onPress={generateOTP} />
    //   </View>
    // );
     

   return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ backgroundColor: 'white', padding: 90, borderRadius: 50, }}>
        <Text style={{ fontSize: 25, marginBottom: 10, textAlign: 'center', fontWeight: 'bold' }}>Are you sure </Text>
        <Text style={{ fontSize: 20, marginBottom: 5, textAlign: 'center' }}>Are you sure you wants to initiate the untagging of the entity? </Text>
        <Text style={{ fontSize: 15, marginBottom: 5, textAlign: 'center'  }}>permit_holder : {props.route.params.item?.permit_holder === null ? '-' : props.route.params.item?.permit_holder}</Text>
        <Text style={{ fontSize: 15, marginBottom: 10, textAlign: 'center' }}>contact : {props.route.params.item?.contact === null ? '-' : props.route.params.item?.contact}</Text>
        <Text style={{ fontSize: 15, marginBottom: 10, textAlign: 'center' }}>chasisno : {props.route.params.item?.chasisno === null ? '-' : props.route.params.item?.chasisno}</Text>
        <Text style={{ fontSize: 15, marginBottom: 10, textAlign: 'center' }}>IMEI : {props.route.params.item?.uniqueId === null ? '-' : props.route.params.item?.uniqueId}</Text>
        <Text style={{ fontSize: 15, marginBottom: 10, textAlign: 'center' }}>Vehicle number : {props.route.params.item?.name === null ? '-' : props.route.params.item?.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, marginRight: 10, borderRadius: 5, overflow: 'hidden' }}>
            <Button title="Cancel" onPress={handleOTPCancel} color="#4702e8"
              backgroundColor="white" />

          </View>
          <View style={{ flex: 1, marginLeft: 10, borderRadius: 5, overflow: 'hidden' }}>
            <Button title="send OTP " onPress={generateOTP} color="#4702e8"
              backgroundColor="white" />
          </View>
        </View>
        <Modal
          animationType="slide" 
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            closeModalAndGoBack();
          }}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'white', padding: 90, borderRadius: 50 }}>
              <Text style={{ fontSize: 25, marginBottom: 10, textAlign: 'center', fontWeight: 'bold' }}>Verification</Text>
              <Text style={{ fontSize: 20, marginBottom: 10, textAlign: 'center' }}>Please enter the OTP send the verified mobile number</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                {otpBoxes.map((boxValue, index) => (
                  <View key={index} style={{ marginHorizontal: 5 }}>
                    <TextInput  
                      style={{
                        height: 50,
                        width: 50,
                        borderWidth: 2,
                        borderRadius: 10,
                        textAlign: 'center',
                        fontSize: 20, 
                        fontWeight: 'bold'
                      }}
                      keyboardType="numeric"
                      maxLength={1}
                      onChangeText={(text) => handleOTPInputChange(index, text)}
                      value={boxValue}
                    />
                  </View>
                ))}
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, marginBottom: 5, textAlign: 'center' }}>Didn't receive the OTP?  </Text>
                <Text style={{ fontSize: 14, marginBottom: 5 }} onPress={generateOTP}>Resend OTP</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, marginRight: 10, borderRadius: 5, overflow: 'hidden' }}>
                  <Button title="Cancel" onPress={handleOTPCancel} color="#4702e8"
                    backgroundColor="white" />
                    {/* <View style={styles.container}>
                       {inputBoxes.map((_, index) => (
                       <TextInput
                     key={index}
                   ref={refs.current[index]}
                 style={styles.inputBox}
             keyboardType="numeric"
          maxLength={1}
          onChangeText={(text) => handleOnChange(text, index)}
        />
      ))}
    </View> */}
                </View>
                <View style={{ flex: 1, marginLeft: 10, borderRadius: 5, overflow: 'hidden' }}>
                  <Button title="Submit" onPress={handleOTPSubmit} color="#4702e8"
                    backgroundColor="white" />
                </View>
              </View>
            </View>
          </View>
        </Modal>
    
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible2}
            onRequestClose={() => {
              // Alert.alert("Modal has been closed.");
            }}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ backgroundColor: 'white', padding: 90, borderRadius: 50 }}>
                <Text style={{ fontSize: 25, marginBottom: 10, textAlign: 'center', fontWeight: 'bold' }}>Successfull</Text>
                <Text style={{ fontSize: 20, marginBottom: 10, textAlign: 'center' }}>Entity has been successfully untagged.</Text>
                <Button
                  title="Okay"
                  onPress={handleOK}
                  color="#4702e8"
                  style={{ width: 100, backgroundColor: 'white' }}
                />
              </View>
            </View>
          </Modal>

          {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'white', padding: 90, borderRadius: 50 }}>
              <Text style={{ fontSize: 25, marginBottom: 10, textAlign: 'center', fontWeight: 'bold' }}>Successfull</Text>
              <Text style={{ fontSize: 20, marginBottom: 10, textAlign: 'center' }}>Entity has been successfully untagged.</Text>
              <Button
                title="Okay"
                onPress={handleOK}
                color="#4702e8"
                style={{ width: 100, backgroundColor: 'white' }}
              /> */}

            </View>
          </View>
        // </Modal>
    //   </View>
    // </View>
  );

};

export default OTPGenerator;


