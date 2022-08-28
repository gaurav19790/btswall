
import React, {useEffect, useState} from 'react';
// import type {Node} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import { AppOpenAd, InterstitialAd, RewardedAd, BannerAd, TestIds, BannerAdSize } from 'react-native-google-mobile-ads';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import firestore from '@react-native-firebase/firestore';

const {width, height} = Dimensions.get('window');

const HomePage = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users

  useEffect(() => {
    const subscriber = firestore()
      .collection('bst')
      .onSnapshot(querySnapshot => {
        // see next step
        const users = [];

        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setUsers(users);
        setLoading(false);
      });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  // if (loading) {
  //   return <ActivityIndicator />;
  // }
  return (
    <View style={[backgroundStyle, {flex:1,width: width, height: height}]}>
    <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    {/* <FullPage /> */}
    <BannerAd size={BannerAdSize.FULL_BANNER} unitId="ca-app-pub-3940256099942544/6300978111" />

    <FlatList
      data={users}
      style={{flex:1}}
      numColumns={3}
      renderItem={({item:{image}}) => (
        <TouchableOpacity
          style={{
            marginTop: 5,
            // marginRight: 20,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            width: width / 3,
            height: height / 2.5,
            padding: 5,
            // backgroundColor: "black"
          }}
          onPress={ ()=>navigation.navigate("Full",{image})}
        >
          <Image
            source={{uri: image}}
            resizeMode="cover"
            style={{width: '100%', height: '100%', borderRadius: 10}}
          />
        </TouchableOpacity>
      )}
    />
    
  </View>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});



export default HomePage