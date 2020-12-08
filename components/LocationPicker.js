import React,{useState} from 'react';
import {View,Button,Text,StyleSheet,ActivityIndicator,Alert,Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import Colors from "../constants/Colors";

const LocationPicker = props => {
    const [pickedLocation,setPickedLocation] = useState();
    const [isFetching,setIsFetching] = useState(false);
    const hasPermission = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if(result.status !== 'granted'){
            Alert.alert('Permmision not Granted','you must allow permission to use this',[
                {text: 'ok'}
            ]);
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        const permission = await hasPermission();
        if(!permission){
            return;
        }
        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({
                timeout: 10000
            });
            //console.log(location);
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
            props.onLocationTake(pickedLocation)
        }catch (err) {
            Alert.alert('could not fetch location','can not get your posision',[
                {text: 'ok'}
            ]);
        }
        setIsFetching(false);
    };

   return(
       <View style={styles.locationPicker}>
           <View style={styles.mapPreview}>
               {isFetching && <ActivityIndicator size='large' color={Colors.primary}/>}
               {!pickedLocation ? <Text>No Location select yet</Text> :
                   <Image style={styles.mapImage} source={{uri: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${pickedLocation.lng},${pickedLocation.lat},10,0/300x200@2x?access_token=pk.eyJ1IjoiYmVtYWxkdmFuaXRoYSIsImEiOiJja2M3MmRrZmgwZ3Q5MnpwOG1mY2tyaGZyIn0.pCTpNJ9P0idzkGsYp2t8dw`}}/>
               }
           </View>
           <Button title='get User Location' color={Colors.primary} onPress={getLocationHandler}/>
       </View>
   )
};

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapImage: {
        width: '100%',
        height: '100%'
    }
});

export default LocationPicker;