import React from 'react'
import './global.css';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home'
import Cart from './screens/Cart'
import Otp from './screens/auth/Otp'
import Payment from './screens/Payment'
import Login from './screens/auth/Login'
import Checkout from './screens/Checkout'
import Member from './screens/Member/Member'
import Register from './screens/auth/Register'
import Editprofile from './screens/auth/Editprofile'
import ProductDetails from './screens/ProductDetails'
import Clinic from './screens/Clinic';
import Grooming from './screens/Categories/Grooming';
import Vaccination from './screens/Categories/Vaccination';
import Dogfood from './screens/Categories/Dogfood';
import Catfood from './screens/Categories/Catfood';
import Toast from 'react-native-toast-message';
import Petshop from './screens/Categories/Petshop';
import Booknow from './screens/Booknow';
import Membership from './screens/Membership';
import Shop from './screens/Shop';
import ChatScreen from './screens/ChatScreen';
import DoctorProfileScreen from './screens/DoctorProfileScreen';
import AudioCallScreen from './screens/AudioCallScreen';
// import VideoCallScreen from './screens/VideoCallScreen';
import ChatList from './screens/ChatList';
import DynamicScreen from './screens/DynamicScreen/DynamicScreen';
import SingleProduct from './screens/SingleProduct/SingleProduct';




//Routes
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name='home' component={Home} options={{ headerShown: false, }} />
        <Stack.Screen name='clinic' component={Clinic} options={{ headerShown: false, }} />
        <Stack.Screen name='grooming' component={Grooming} options={{ headerShown: false, }} />
        <Stack.Screen name='vaccination' component={Vaccination} options={{ headerShown: false, }} />
        <Stack.Screen name='dogfood' component={Dogfood} options={{ headerShown: false, }} />
        <Stack.Screen name='catfood' component={Catfood} options={{ headerShown: false, }} />
        <Stack.Screen name='petshop' component={Petshop} options={{ headerShown: false, }} />
        <Stack.Screen name='booknow' component={Booknow} options={{ headerShown: false, }} />
        <Stack.Screen name="DynamicScreen" options={{ headerShown: false, }} component={DynamicScreen} />
        <Stack.Screen name="ProductDetailPage" options={{ headerShown: false, }} component={SingleProduct} />

        <Stack.Screen name='cart' component={Cart} />
        <Stack.Screen name='otp' component={Otp} options={{ headerShown: false }} />
        <Stack.Screen name='payment' component={Payment} />
        <Stack.Screen name='login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='checkout' component={Checkout} />
        <Stack.Screen name='member' component={Member} />
        <Stack.Screen name='chatlist' component={ChatList} />
        <Stack.Screen name='shop' component={Shop} options={{ headerShown: false }} />
        <Stack.Screen name='membership' component={Membership} />
        <Stack.Screen name='register' component={Register} options={{ headerShown: false }} />
        <Stack.Screen name='editProfile' component={Editprofile} />
        <Stack.Screen name='productDetails' component={ProductDetails} />
        <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} />
        <Stack.Screen name='chat' component={ChatScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AudioCallScreen" component={AudioCallScreen} options={{ headerShown: false }} />
        {/* <Stack.Screen name="VideoCallScreen" component={VideoCallScreen} options={{ headerShown: false }}/> */}
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  )
}

export default App