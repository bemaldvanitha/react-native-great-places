import React,{useState} from 'react';
import {View,Button,Text,StyleSheet,Image,Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from "../constants/Colors";

const ImgPicker = props => {
    const [pickedImage,setPickedImage] = useState();
    const verifyPermission = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA_ROLL,Permissions.CAMERA);
        if(result.status !== 'granted'){
            Alert.alert('insufficient permission','you need to press ok',[
                {text: 'ok'}
            ]);
            return false;
        }
        return true;
    };

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermission();
        if(!hasPermission){
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.8
        });
        setPickedImage(image.uri);
        props.onImageTake(image.uri);
        console.log(image);
    };
  return(
      <View style={styles.imagePicker}>
        <View style={styles.imagePreview}>
            {!pickedImage && <Text>No Image Piked Yet</Text>}
            <Image style={styles.image} source={{uri: pickedImage}}/>
        </View>
          <View style={styles.button}>
            <Button title='Take Image' color={Colors.primary} onPress={takeImageHandler}/>
          </View>
      </View>
  )
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 15
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%',
    },
    button: {
        marginTop: 20,
        marginBottom: 20
    }
});

export default ImgPicker;