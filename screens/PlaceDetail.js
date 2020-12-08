import React,{useEffect,useState} from 'react';
import {View,StyleSheet,Text,Image,ScrollView,Dimensions,Slider} from 'react-native';
import {useDispatch,useSelector} from 'react-redux';

import {loadPlaces} from '../store/actions/placesAction';
import Colors from "../constants/Colors";


const PlaceDetail = (props) => {
    const [zoom,setZoom] = useState(8);
    const id = props.navigation.getParam('placeId');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadPlaces())
    },[dispatch]);

    const place = useSelector(state => state.places.places.find(pls => pls.id === id));
    console.log(place);
    console.log(zoom);
    return(
        <ScrollView>
            <View style={styles.screen}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>{place.title}</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: place.imageUri}}/>
                </View>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${place.lng},${place.lat},${zoom},0/300x200@2x?access_token=pk.eyJ1IjoiYmVtYWxkdmFuaXRoYSIsImEiOiJja2M3MmRrZmgwZ3Q5MnpwOG1mY2tyaGZyIn0.pCTpNJ9P0idzkGsYp2t8dw`}}/>
                </View>
                <Text> map zoom</Text>
                <Slider style={styles.slider} minimumValue={1} maximumValue={15} thumbTintColor={Colors.primary} step={1} minimumTrackTintColor={Colors.primary} value={zoom} onValueChange={val => setZoom(val)}/>
            </View>
        </ScrollView>
    )
};

PlaceDetail.navigationOptions = navData => {
  return{
      headerTitle: navData.navigation.getParam('placeTitle')
  }
};

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 60
    },
    titleView: {
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    title:{
        fontSize: 25,
    },
    imageContainer: {
        marginTop: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'black',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowRadius: 10,
        shadowOffset: {
            width: 5,
            height: 5
        },
        elevation: 8
    },
    image:{
        width: Dimensions.get('screen').width*0.75,
        height: Dimensions.get('screen').height *0.35
    },
    slider: {
        width: Dimensions.get('screen').width *0.7,
        height: 10
    }
});

export default PlaceDetail;