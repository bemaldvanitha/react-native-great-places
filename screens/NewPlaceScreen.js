import React,{useState} from 'react';
import {View,StyleSheet,Text,TextInput,ScrollView,Button,Alert} from 'react-native';
import {useDispatch} from 'react-redux';

import {addPlace} from '../store/actions/placesAction';
import Colors from "../constants/Colors";
import ImgPicker from "../components/ImageSelector";
import LocationPicker from "../components/LocationPicker";

const NewPlace = (props) => {
    const [title,setTitle] = useState('');
    const [image,setImage] = useState();
    const [location,setLocation] = useState();
    const dispatch = useDispatch();

    const titleChangeHandler = text => {
      setTitle(text);
    };

    const savePlaceHandler = () => {
        try {
            dispatch(addPlace(title, image, location.lat, location.lng));
            props.navigation.goBack();
        }catch (e) {
            Alert.alert('gps slow','try again by press set location',[
                {text: 'ok'}
            ])
        }
    };

    const imageTaken = (imagePath) => {
        setImage(imagePath);
    };

    const locationTaken = (loc) => {
        setLocation(loc);
        console.log(location);
    };

    return(
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} value={title} onChangeText={titleChangeHandler}/>
                <ImgPicker onImageTake={imageTaken}/>
                <LocationPicker onLocationTake={locationTaken}/>
                <Button title='Save Place' color={Colors.primary} onPress={savePlaceHandler}/>
            </View>
        </ScrollView>
    )
};

NewPlace.navigationOptions = {
  headerTitle: 'Add Place'
};

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});

export default NewPlace;