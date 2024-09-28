import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import TodoList from './TodoList';
import CreateTodo from './Calender.js/index.js';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Analytics from './Analytics';
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="TodoList"
      
      screenOptions={{
        tabBarStyle: { backgroundColor: 'white', height: 60},
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: 'tomato',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="TodoList"
        component={TodoList}
        options={{
          tabBarLabel: 'Todo List',
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome5 name="list-ul" color={color} size={25} />;
          },
        }}
      />

        <Tab.Screen
         name = "Analytics"
          component = {Analytics}
          options = {{
            tabBarLabel: 'Analytics',
            tabBarIcon: ({ color, size }) => {
              return <AntDesign name="linechart" color={color} size={25} />;
            },
          }}
        />
      <Tab.Screen
        name="Calendar"
        component={CreateTodo}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name="calendar" color={color} size={25} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name="user" color={color} size={25} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
