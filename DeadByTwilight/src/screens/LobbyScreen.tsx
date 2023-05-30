import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Button} from 'react-native';
import {DefaultStackParamList} from '../navigators';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {usePresenceChannel} from '../hooks';
import {PusherMember} from '@pusher/pusher-websocket-react-native';

export type Role = 'SURVIVOR' | 'KILLER' | undefined;

export const LobbyScreen: React.FC<
  NativeStackScreenProps<DefaultStackParamList, 'Lobby'>
> = ({route}) => {
  const [survivors, setSurvivors] = useState<Array<PusherMember>>([]);
  const [killer, setKiller] = useState<PusherMember | undefined>(undefined);
  const [role, setRole] = useState<Role>(undefined);
  const {id} = route.params;
  const {channelMembers, playerCount, me} = usePresenceChannel(id);

  const onPressSurvivor = () => {
    if (survivors.length <= 4 && me && !role) {
      setSurvivors(prev => {
        const newSurvivors = prev.slice();
        newSurvivors.push(me);
        return newSurvivors;
      });
      setRole('SURVIVOR');
    }
  };

  const onPressKiller = () => {
    if (!killer && me && !role) {
      setKiller(me);
      setRole('KILLER');
    }
  };

  const onStartGame = () => undefined;

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <View
          style={{
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          <Text style={{width: '100%', textAlign: 'center'}}>
            {' '}
            {'Choose your role: '}{' '}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Button
              color={styles.survivorButton.backgroundColor}
              disabled={survivors.length >= 4 || !!role}
              onPress={onPressSurvivor}
              title="Survivor"
            />
            <Button
              color={styles.killerButton.backgroundColor}
              disabled={!!killer || !!role}
              onPress={onPressKiller}
              title="Killer"
            />
          </View>
        </View>
        <View>
          <Text>
            {' '}
            {`Players(${playerCount}) : ${channelMembers.map(
              m => m.userInfo?.name,
            )}`}{' '}
          </Text>
        </View>
        <View>
          <Text> {`Game Id : ${id}`} </Text>
        </View>
        <View>
          <Text>
            {' '}
            {`survivor count: ${survivors.length} -- killer: ${
              killer?.userInfo.name || 'unclaimed'
            }`}{' '}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            backgroundColor: '#841584',
            width: '50%',
          }}>
          <Button
            disabled={
              !(survivors.length >= 2 && survivors.length < 5 && !!killer)
            }
            onPress={onStartGame}
            color="#fff"
            title="Start Game"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header: {
    height: '20%',
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
  },
  button: {
    justifyContent: 'flex-end',
  },
  survivorButton: {
    backgroundColor: 'blue',
  },
  killerButton: {
    backgroundColor: 'red',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 40,
  },
});
