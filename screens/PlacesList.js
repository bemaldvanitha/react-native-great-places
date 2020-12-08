import React,{useEffect} from 'react';
import {View,StyleSheet,Text,FlatList,Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useSelector,useDispatch} from 'react-redux';

import Colors from "../constants/Colors";
import PlaceItem from "../components/PlaceItem"
import {loadPlaces} from '../store/actions/placesAction';

const PlacesList = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadPlaces())
    },[dispatch]);
    const places = useSelector(state => state.places.places);
    return(
        <FlatList data={places} keyExtractor={item => item.id} renderItem={(itemData) => {
            return(
                <PlaceItem image={itemData.item.imageUri} title={itemData.item.title} address={null} onSelect={() => {
                    props.navigation.navigate({routeName: 'PlaceDetail',params: {placeTitle: itemData.item.title,placeId: itemData.item.id}})
                }}/>
            )
        }}/>
    )
};

PlacesList.navigationOptions = navData => {
    return {
        headerTitle: 'All Places',
        headerRight: () => (
            <Ionicons name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                      color={Platform.OS === 'android' ? 'white' : Colors.primary} size={23} onPress={
                () => {
                    navData.navigation.navigate({routeName: 'NewPlace'})
                }
            }/>
        )
    }
};

const styles = StyleSheet.create({

});

export default PlacesList;