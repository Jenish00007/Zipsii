import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import navigationService from './navigationService';
import * as Notifications from 'expo-notifications';
import * as Screen from '../screens';

const NavigationStack = createStackNavigator();
const MainStack = createStackNavigator();
// const SideDrawer = createDrawerNavigator();

// Main Drawer Navigator
// function Drawer() {
//   return (
//     <SideDrawer.Navigator
//       initialRouteName="MainLanding"
//       drawerContent={props => <MainMenu {...props} />}>
//       <SideDrawer.Screen name="MainLanding" component={Screen.MainLanding} />
//       <SideDrawer.Screen name="noDrawer" component={noDrawer} />
//     </SideDrawer.Navigator>
//   );
// }

// Navigation Stack for screens without Drawer
function Drawer() {
  return (
    <NavigationStack.Navigator screenOptions={{ headerShown: false }}>
      <NavigationStack.Screen name='Login' component={Screen.Login}/>
      <NavigationStack.Screen name="MainLanding" component={Screen.MainLanding} />
      <NavigationStack.Screen name="DeleteButton" component={Screen.DeleteButton} />
      <NavigationStack.Screen name="Logout" component={Screen.LogoutButton} />
      <NavigationStack.Screen name="ProfileDashboard" component={Screen.ProfileDashboard} />
      <NavigationStack.Screen name="Review" component={Screen.Review} />
      <NavigationStack.Screen name="DummyScreen" component={Screen.DummyScreen} />
      <NavigationStack.Screen name="WhereToGo" component={Screen.DiscoverPlace} />
      <NavigationStack.Screen name="MySchedule" component={Screen.MySchedule}/>
      <NavigationStack.Screen name="Destination" component={Screen.Destination}/>
      <NavigationStack.Screen name= "MakeSchedule" component={Screen.MakeSchedule}/>
      <NavigationStack.Screen name="TripDetail" component={Screen.TripDetail}/>
      <NavigationStack.Screen name="Map" component={Screen.Map}/>
      <NavigationStack.Screen name='Schedule' component={Screen.Schedule}/>
      <NavigationStack.Screen name="DiscoverPlace" component={Screen.DiscoverPlace} />
      <NavigationStack.Screen name='SearchPage' component={Screen.SearchPage}/>
      <NavigationStack.Screen name='Notification' component={Screen.Notification}/>
      <NavigationStack.Screen name='CreatePoll' component={Screen.CreatePoll}/>
      <NavigationStack.Screen name='PageCreation' component={Screen.PageCreation}/>
      <NavigationStack.Screen name='ReelUpload' component={Screen.ReelUpload}/>
      <NavigationStack.Screen name='LocationPage' component={Screen.LocationPage}/>
      <NavigationStack.Screen name="ChatScreen" component={Screen.ChatScreen} />
      <NavigationStack.Screen name="MessageList" component={Screen.MessageList} />
      <NavigationStack.Screen name="SignUp" component={Screen.SignUp} />
      <NavigationStack.Screen name="Favourite" component={Screen.FavoritesPage} />
      <NavigationStack.Screen name="MapScreen" component={Screen.MapScreen} />


      
    </NavigationStack.Navigator>
  );
}

// Main App Container
function AppContainer() {
  // function _handleNotification(notification) {
  //   try {
  //     if (notification.origin === 'selected') {
  //       if (notification.data.order) {
  //         navigationService.navigate('OrderDetail', {
  //           _id: notification.data._id
  //         });
  //       }
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // useEffect(() => {
  //   Notifications.setNotificationHandler({
  //     handleNotification: async () => ({
  //       shouldShowAlert: true,
  //       shouldPlaySound: false,
  //       shouldSetBadge: false
  //     })
  //   });
  //   const subscription = Notifications.addNotificationResponseReceivedListener(
  //     _handleNotification
  //   );
  //   return () => subscription.remove();
  // }, []);

  return (
    <NavigationContainer
      ref={ref => {
        navigationService.setGlobalRef(ref);
      }}>
      <MainStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Onboarding">
        <MainStack.Screen name="Onboarding" component={Screen.OnboardingScreen} />
        <MainStack.Screen name="Drawer" component={Drawer} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;
