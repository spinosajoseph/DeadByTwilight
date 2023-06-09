import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TitleScreen, CreateOrJoinScreen} from '../screens';
import {GameStack} from './GameStack';

export type DefaultStackParamList = {
  Title: undefined;
  CreateOrJoin: undefined;
  GameStack: {id: string; name: string};
};

const Stack = createNativeStackNavigator<DefaultStackParamList>();

export const DefaultStack = () => {
  return (
    <Stack.Navigator initialRouteName="Title">
      <Stack.Screen name="Title" component={TitleScreen} />
      <Stack.Screen name="CreateOrJoin" component={CreateOrJoinScreen} />
      <Stack.Screen name="GameStack" component={GameStack} />
    </Stack.Navigator>
  );
};
