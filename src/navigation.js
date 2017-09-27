import React, { Component } from 'react';
import { addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation';
import { Ionicons, EvilIcons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Keyboard, Platform, StatusBar } from 'react-native';

import { colors } from './util/constants';
import ButtonHeader from './components/ButtonHeader';
import HistoricalScreen from './screens/HistoricalScreen';
import HOrderScreen from './screens/HOrderScreen';
import MeScreen from './screens/MeScreen';
import OrdersClientScreen from './screens/OrdersClientScreen';
import AuthenticationScreen from './screens/AuthenticationScreen';
import MapScreen from './screens/MapScreen';
import ServicesScreen from './screens/ServicesScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import EmployeeHomeScreen from './screens/Employee.HomeScreen'
import EmployeeOrderListScreen from './screens/Employee.OrdersListScreen';
import EmployeeOrderDetailScreen from './screens/EmployeeOrderDetailScreen';
import HowScreen from './screens/HowScreen';

const tabIcon = 27;

const TNavigator = TabNavigator({
    Map:{
        screen: MapScreen, 
        navigationOptions:() =>({
            title: 'Mapa',
            // header: null,
            headerTitle: 'Mapa',
            tabBarIcon: ({ tintColor, focused }) =>( 
                <Ionicons name={focused ? 'ios-map' : 'ios-map-outline'} size={Platform.OS === 'ios' ? tabIcon : 24} style={{color: tintColor}}/>
            )
        })
    },
    Cards:{
        screen: HistoricalScreen,
        navigationOptions:() =>({
            title: 'Tarjetas',
            headerTitle: 'Tarjetas',
            tabBarIcon: ({ tintColor, focused }) =>( 
                <Ionicons name={focused ? 'ios-list-box' : 'ios-list-box-outline'} size={Platform.OS === 'ios' ? tabIcon : 24} style={{color: tintColor}} badgeCount={6}/>
            )
        })
    }
},{
    lazy: true,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    initialRouteName: 'Map',
    backBehavior: 'none',
    tabBarOptions:{
        showIcon: true,
        showLabel: true,
        activeTintColor: colors.PRIMARY,
        inactiveTintColor: colors.GRAY600,
        pressColor: colors.PRIMARY,
        indicatorStyle: { backgroundColor: colors.PRIMARY },
        style:{
            backgroundColor: colors.WHITE,
            height: 50,
            paddingVertical: 5,
            borderTopWidth: 2,
            borderTopColor: colors.PRIMARYRGBA,
        }
    }
});

const AuthenticationModal = StackNavigator({
    Authentication: {
        screen: AuthenticationScreen,
        navigationOptions: ({ navigation }) => ({
            headerRight: (
                <ButtonHeader side="right" onPress={() => {
                    Keyboard.dismiss();
                    navigation.goBack(null)
                    }}>
                    <EvilIcons name="close" size={30} color={colors.WHITE}/>
                </ButtonHeader>
            ),
            headerLeft: null
        })
    }
},
    { headerMode: 'none'}
);

const SNavigator = StackNavigator({
    Historical:{
        screen: TNavigator,
        navigationOptions: ({ navigation }) => ({
            headerRight: (
                <ButtonHeader side="right" 
                onPress={() => { navigation.navigate('Authentication')}}>
                    <MaterialCommunityIcons name='plus' size={Platform.OS === 'ios' ? tabIcon : 25} color={colors.WHITE}/>
                </ButtonHeader>
            ),
            headerLeft: (null)
        })
    },
    Authentication:{
        screen: AuthenticationModal,
        navigationOptions:() => ({
            title: 'Ingresar',
            header: null
        })
    }
},{
    cardStyle: {        
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        borderBottomWidth: 1,
        borderBottomColor: colors.PRIMARY,
        backgroundColor: colors.GRAY100
    },
    navigationOptions: () => ({
        headerStyle:{
            borderBottomWidth: 1,
            borderBottomColor: colors.PRIMARY,
            backgroundColor: colors.PRIMARY,
        },
        headerTitleStyle:{
            color: colors.WHITE,
            fontSize: 20,
            fontWeight: '400',
            fontFamily: 'sspRegular'
        }
    }),
    gesturesEnabled: true,
    mode: 'modal',
})

class AppNavigator extends Component {
    render() {
        return (
            <SNavigator/>
        );
    }
}

export default AppNavigator;