// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, Dimensions, Image, Text, View } from 'react-native';
import FullPage from './screens/FullPage';
import HomePage from './screens/HomeScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width, height} =Dimensions.get('window')
// import { createDrawerNavigator } from '@react-navigation/drawer';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function MyTabs() {
  return (

    <Tab.Navigator 
    screenOptions={({ route }) => ({  tabBarShowLabel:false,
          tabBarIcon: () => {
            // You can return any component that you like here!
            
            return <Text  style={{fontSize:30}}  >🏠</Text>;
          }
        })}
     >
      <Tab.Screen  name="Home" component={HomePage}  
            />
      {/* <Tab.Screen  name="Setting" component={Setting} /> */}
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>

  );
}


const App=()=> {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)

  }, []);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff" }}>
        <View style={{ justifyContent: 'center', width: width, height: height/3, borderRadius: 10,alignItems: 'center', }}>
          <Image style={{ width:width/2 , height: height/3, borderRadius: 15}} source={require("./play_store_512.png")} />
          {/* <Image style={{ width: 100, height: 100, borderRadius: 15, marginBottom: 20 }} source={{uri:"https://i.pinimg.com/564x/3e/a4/21/3ea4213b4002dbb429c4bfde662d4d4e.jpg"}} /> */}
        </View>
        <ActivityIndicator size="large" color="blue" />
      </View>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{
    headerShown: false
  }}   initialRouteName="Tab">
        <Stack.Screen name="Tab" component={MyTabs} />
        <Stack.Screen name="Full" component={FullPage}  options={({route})=>{return( { title : route.params.item, }) }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;