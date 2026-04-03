import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { LoginScreen } from './src/screens/LoginScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { InventoryScreen } from './src/screens/InventoryScreen';
import { AuditLogScreen } from './src/screens/AuditLogScreen';
import { MapScreen } from './src/screens/MapScreen';
import { AnomalyScreen } from './src/screens/AnomalyScreen';
import { Text, View, ActivityIndicator } from 'react-native';

const Tab = createBottomTabNavigator();

function RootNavigator() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#34562e" />
      </View>
    );
  }

  if (!session) {
    return <LoginScreen />;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#34562e',
        tabBarInactiveTintColor: '#5a5f65',
        tabBarStyle: { backgroundColor: '#fdf9ee', borderTopWidth: 2, borderTopColor: '#e6e2d7' },
      }}
    >
      <Tab.Screen name="Deck" component={DashboardScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Inventory" component={InventoryScreen} />
      <Tab.Screen name="Audit" component={AuditLogScreen} />
      <Tab.Screen name="Anomaly" component={AnomalyScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
