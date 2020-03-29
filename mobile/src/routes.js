import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Incidents from './pages/Incidents';
import Detail from './pages/Detail';

const AppStack = createStackNavigator();

export default function Routes() {
  const navigatorOptions = { headerShown: false };
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={navigatorOptions}>
        <AppStack.Screen name="Incidents" component={Incidents} />
        <AppStack.Screen name="Detail" component={Detail} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
