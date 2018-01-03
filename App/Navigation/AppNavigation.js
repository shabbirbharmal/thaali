import {TabNavigator, StackNavigator} from 'react-navigation'
//import OrdersScreen from '../Containers/OrdersScreen'
//import SettingsScreen from '../Containers/SettingsScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import styles from './Styles/NavigationStyles'
import {Colors} from '../Themes/'

// Manifest of possible screens
const MainScreenNavigator = TabNavigator({
  LaunchScreen: {screen: LaunchScreen, title: 'POS'},
  //OrdersScreen: {screen: OrdersScreen},
  //SettingsScreen: {screen: SettingsScreen}

}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  },
  tabBarOptions: {
    activeTintColor: Colors.turquoise,
  }
})

export default MainScreenNavigator
