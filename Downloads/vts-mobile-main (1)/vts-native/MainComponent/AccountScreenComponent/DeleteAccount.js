import React, { useState } from "react";
import { View, Text, Modal, Button, StyleSheet , TouchableOpacity, Clipboard, ToastAndroid} from 'react-native';

const DeleteAccount = () => {
    const [showModal, setShowModal] = useState(false);

    const handleDelete = () => {
        setShowModal(true);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    // const handleCopymailid = () => {
    //     // Add logic for confirmation herecg-vts@cg.gov.in
    //     console.log('Confirmed');
    //     setShowModal(false);
    // };
    const handleCopymailid = () => {
        Clipboard.setString('cg-vts@cg.gov.in');
        setShowModal(false);
        showToast(); // Display tooltip indicating text has been copied
    };

    const showToast = () => {
        ToastAndroid.showWithGravity(
            'Copied!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        );
    };

    return (
     <View style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleDelete} style={styles.button}>
          <Text style={[styles.buttonText, styles.blackText]}>Delete Account</Text>
        </TouchableOpacity>
      </View>
            <Modal transparent={true} visible={showModal}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <Text style={[styles.modalText,styles.boldText, styles.centerText, styles.blackText]}>
                            Are you sure you want to delete your account?
                            </Text>
                        <Text style={[styles.modalText, styles.centerText, styles.blackText,, styles.largeText]}>To proceed, please connect with us via email at {}<Text style={styles.blueText}>cg-vts@cg.gov.in</Text>
                        </Text>
                        <Text style={[styles.modalText, styles.centerText, styles.blackText, styles.largeText]}>
                        <Text style={{ textAlign: 'center' }}>Once your request is received and verified, your account will be permanently deleted.</Text>
                        </Text>
                        <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            {/* <Button title="Cancel" onPress={handleCancel} Color={"#4702e8"} /> */}
                            <TouchableOpacity onPress={handleCopymailid} style={styles.copymailidButton} color={'#4702e8'}>
                                <Text style={styles.copymailidButtonText}>Copy Mail Id</Text>
                            </TouchableOpacity>
                            {/* <Button ="Copy mail id" onPress={handleCopymailid} color={"#4702e8"}/> */}
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
        
    );
};

const styles = StyleSheet.create({
    buttonText: {
        color: '#000000',
      },
    cancelButtonText: {
        color: '#000000', 
    },
    cancelButton: {
        backgroundColor: '#FFFFFF', 
        borderWidth: 1,
        borderColor: '#000000', 
        borderRadius: 6,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        alignItems: 'center',
        width:"45%", 
    },
    centerText: {
        textAlign: 'center',
    },
    blueText: {
        color: '#0000FF',
    },
    blackText:{
        color: '#000000',
    },
    boldText: {
        fontWeight: 'bold',
    },
    copymailidButton: {
        backgroundColor: '#0000FF', 
        borderWidth: 1,
        // borderColor: '#000000', 
        borderRadius: 6,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        alignItems: 'center',
        color:'#4702e8',
        width: "45%",
    },
    copymailidButtonText: {
        color: '#FFFFFF', // White text color
    },
    
    button: {
        width:"120%",
        backgroundColor: '#EBEBFD',
        paddingVertical: 12,
        paddingHorizontal: 100,
        marginBottom:50,    
        marginLeft: 70,
        borderRadius: 6,
        bottom: 197,

      },
      text: {
        color: '#fff',
        fontSize: 20,
      },
    container: {
        flex: 1,
        marginTop: 100,
        borderRadius: 100,
        alignItems: 'center',
        right: 75,
        flexDirection: "row",
    },
    header: {
        fontSize: 30,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 35,
        alignItems: 'center',
        width: "90%",
    },
    modalText: {
        fontSize: 20,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    largeText: {
        fontSize: 18, // Adjust the font size as needed
    },
    
    
});

export default DeleteAccount;
