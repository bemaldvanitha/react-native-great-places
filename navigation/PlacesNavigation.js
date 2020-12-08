import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Platform} from 'react-native';

import PlaceDetail from "../screens/PlaceDetail";
import PlacesList from "../screens/PlacesList";
import NewPlace from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";
import Colors from "../constants/Colors";


const PlacesNavigator = createStackNavigator({
    Places: PlacesList,
    PlaceDetail: PlaceDetail,
    NewPlace: NewPlace,
    Map: MapScreen
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
});

export default createAppContainer(PlacesNavigator);