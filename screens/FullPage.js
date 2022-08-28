
import React, { useState } from 'react'
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import objectPath from 'object-path';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  ActivityIndicator,
  Pressable,
  Linking,
} from 'react-native';
import Modal from 'react-native-modal';

const {width, height} =Dimensions.get('window')
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { SetWallpaperAndroid } from '../Modules';


const FullPage= ({navigation,route}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  
  const list=route.params.image;

const [modalVisible, setModalVisible] = useState(false);
  const [creatorModalVisible, setCreatorModalVisible] = useState(false);
  const [loader, setLoader] = useState({ flag: null, loading: false });

  const setWallOptions = [
    {
      title: 'Home Screen',
      name: 'homeScreen',
      flag: 1,
    },
    {
      title: 'Lock Screen',
      name: 'lockScreen',
      flag: 2,
    },
    {
      title: 'Both Screen',
      name: 'bothScreen',
      flag: 0,
    },
  ];
 const setWallpaper = (obj) => {
    setLoader({ flag: obj.flag, loading: true });
    if (Platform.OS === 'android') {
      SetWallpaperAndroid.setWallpaper(list, obj.flag, (isWallpaperSet) => {
        setLoader({ flag: obj.flag, loading: false });
        if (isWallpaperSet) {
          setModalVisible(false);
        }
      });
    }
  };



  return (
   
    <View style={{height: height,width: width,}}>
    
    <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
     <TouchableOpacity
        style={{
          position: "absolute",
          top: 20,
          left: 10,
          paddingHorizontal: 5,
          paddingVertical: 5,
          backgroundColor: "#fff",
        //   backgroundColor: color,
          borderRadius: 50,
        zIndex:1,
        }}
        onPress={()=>navigation.goBack()} 
      >
      {/* <Image source={{uri:"https://www.dlf.pt/dfpng/middlepng/196-1964608_clip-art-arrow-icon-png-back-arrow-icon.png"}} style={{width:25,height:25,color: "white", fontSize: 20,padding:10 }}/> */}
      <Text style={{color: "white", fontSize: 20,padding:5 }}>⬅️</Text>
     
        {/* <Text style={{ color: "white", fontSize: 20,padding:4 }}>back</Text> */}
      </TouchableOpacity>
    <Image resize="cover" style={{width:width, height:height}} source={{uri:list}}/>
    <View
        style={{
          position: "absolute",
          bottom: 20,
          left: "25%",
          paddingHorizontal: 5,
          paddingVertical: 5,
          backgroundColor: "#f54242",
        //   backgroundColor: color,
          borderRadius: 10,
          borderTopEndRadius: 0,
          borderBottomStartRadius: 0
        
        }}
      > 
       <TouchableOpacity style={{ color: "white", fontSize: 20,padding:4 }} onPress={() => {setModalVisible(true)}}>
          <Text style={{ color: "white", fontSize: 20,padding:4 }}>Set Wallpaper</Text>
        </TouchableOpacity>

        {/* <Text style={{ color: "white", fontSize: 20,padding:4 }}>SetWallpaper</Text> */}
      
      </View>
    {/* <View
        style={{
          position: "absolute",
          bottom: 25,
          right: 15,
          paddingHorizontal: 5,
          paddingVertical: 5,
          backgroundColor: "#fff",
        //   backgroundColor: color,
          borderRadius: 40,
        
        }}
      >
      <Image source={{uri:"https://cdn-icons-png.flaticon.com/512/724/724933.png"}} style={{width:25,height:25,color: "white", fontSize: 20,padding:10 }}/>
      </View> */}
      <View>
        <Modal
          isVisible={modalVisible}
          onBackButtonPress={() => setModalVisible(false)}
          onBackdropPress={() => setModalVisible(false)}
          backdropOpacity={0}
          style={styles.modal}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Set Wallpaper</Text>
            <View style={styles.hr} />
            {setWallOptions.map((obj) => (
              <TouchableHighlight
                activeOpacity={0.2}
                underlayColor="#DDDDDD"
                style={styles.touchableOption}
                onPress={() => setWallpaper(obj)}
                key={obj.name}
              >
                <View style={styles.option}>
                  <Text style={styles.modalText}>{obj.title}</Text>
                  <ActivityIndicator
                    size="large"
                    color="#FF5353"
                    animating={obj.flag === loader.flag && loader.loading}
                  />
                </View>
              </TouchableHighlight>
            ))}
          </View>
        </Modal>
      </View>
      <View>
        <Modal
          isVisible={creatorModalVisible}
          onBackButtonPress={() => setCreatorModalVisible(false)}
          onBackdropPress={() => setCreatorModalVisible(false)}
          backdropOpacity={0}
          style={styles.modal}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Attribution</Text>
            <View style={styles.hr} />
            <View style={styles.creatorInfo}>
              <Text style={styles.modalText}>
                This wallpaper is an creation of{' '}
                <Text
                  style={styles.link}
                  onPress={() => Linking.openURL(objectPath.get(list, 'creator.link', ''))}
                >
                  {objectPath.get(list, 'creator.name', '')}
                </Text>
                .
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
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
  infoIcon: {
    position: 'absolute',
    right: 20,
    top: 10.5,
    zIndex: 2,
  },
  wallInfo: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  wallTitle: {
    color: '#ffffff',
    fontSize: 25,
    marginVertical: 5,
  },
  wallDesc: {
    color: '#ffffff',
  },
  setWallBtn: {
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: '#FF5353',
  },
  setWallText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: '#fff',
    paddingVertical: 17,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  modalTitle: {
    fontFamily: 'Satoshi_bold',
    color: '#000000',
    fontSize: 22,
    paddingHorizontal: 22,
  },
  hr: {
    borderBottomWidth: 1,
    marginTop: 17,
  },
  touchableOption: {
    paddingVertical: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  modalText: {
    color: '#000000',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  creatorInfo: {
    margin: 24,
  },
  link: {
    color: '#ff5353',
    textDecorationLine: 'underline',
  },
});

export default FullPage;
