import React, { Fragment, } from 'react';
import { View, Text, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather'
import DocumentPicker from 'react-native-document-picker';

const BulkFileImport = ({ setSingleFile, singleFile }) => {

  const onBulkFileImport = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.xlsx],
      });
      setSingleFile(...res);
    } catch (err) {
      setSingleFile(null);
      if (DocumentPicker.isCancel(err)) {
        setSingleFile(null);
      } else {
        setSingleFile(null);
        throw err;
      }
    }
  }
  return (
    <Fragment>
      <Pressable onPress={() => onBulkFileImport()} style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: '#ededff', width: '90%', height: 180, marginTop: 30, borderRadius: 10, borderWidth: 1, borderColor: '#d0d1f8', borderStyle: 'dashed' }}>

        <View>
          <Feather name='upload' color={'#7474f5'} size={25} style={{ textAlign: 'center' }} />
          <Text style={{ color: '#7474f5', fontFamily: 'OpenSans-SemiBold', fontSize: 14, textAlign: 'center', paddingTop: 15 }}>Select file to import</Text>
          <Text style={{ color: '#67748e', fontFamily: 'OpenSans-SemiBold', fontSize: 12, textAlign: 'center', paddingTop: 15 }}>Only .xls or .xlsx format</Text>
          {singleFile != null ? (
            <View style={{ paddingHorizontal: 10 }}>
              <Text numberOfLines={1} style={{ color: '#7474f5', fontFamily: 'OpenSans-SemiBold', fontSize: 12, paddingTop: 10 }}><Ionicons name='document-text-outline' size={15} color={'#7474f5'} /> {singleFile?.name}</Text>
            </View>
          ) : (
            null
          )}
        </View>
      </Pressable>
    </Fragment>
  )
}

export default BulkFileImport