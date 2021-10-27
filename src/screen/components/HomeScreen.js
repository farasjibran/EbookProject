/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
  Alert,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Toggle from 'react-native-toggle-element';
import * as booksAPI from '../../service/API/BooksAPI';

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [books, setBooks] = useState();
  const [loading, setLoading] = useState(true);

  // Fetch API
  const getBooks = async () => {
    try {
      const responseJson = await booksAPI.getAllEbooks();
      if (responseJson.items !== undefined) {
        const volumeItem = responseJson.items;
        setBooks(volumeItem);
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.log(error);
      Alert.alert(error.toString());
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    if (books) {
      setLoading(false);
    }
  });

  return (
    <>
      {loading ? (
        <ActivityIndicator
          visible={loading}
          size="large"
          color="#FFAB48"
          style={{justifyContent: 'center', marginTop: hp(50)}}
        />
      ) : (
        <View style={styles.container}>
          {/* Modal Search */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TextInput
                  style={styles.textsearch}
                  placeholder="Search Books..."
                />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Icon name="search-outline" style={styles.iconbutton} />
                </Pressable>
              </View>
            </View>
          </Modal>
          {/* Modal Search */}
          <View style={styles.header}>
            <Text style={styles.headertext}>All Books</Text>
            <TouchableOpacity
              style={styles.buttonicon}
              onPress={() => setModalVisible(true)}>
              <Icon name="search-outline" style={styles.iconsearch} />
            </TouchableOpacity>
          </View>
          {/* Button Pilih */}
          <View style={styles.containerswitch}>
            <Toggle
              leftTitle="E-Book"
              rightTitle="Audio Books"
              trackBar={styles.trackbarcomponent}
              thumbButton={styles.buttonswitch}
            />
          </View>

          <FlatList
            contentContainerStyle={{flexGrow: 0, height: hp(155)}}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            data={books}
            numColumns={2}
            renderItem={({item}) => {
              console.log(item.volumeInfo.imageLinks);
              return (
                <View style={styles.card}>
                  <Image
                    style={styles.imagecard}
                    source={{
                      uri: item.volumeInfo.imageLinks.thumbnail,
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: wp(6),
    paddingLeft: wp(5),
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignSelf: 'center',
  },

  headertext: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: '#202020',
    textAlign: 'center',
    marginRight: wp(25),
    marginLeft: wp(20),
  },

  iconsearch: {
    fontSize: wp(6),
    fontWeight: 'bold',
    color: '#202020',
  },

  buttonicon: {
    marginRight: wp(-4),
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: hp(8),
    width: wp(80),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: '#FF8A00',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  textsearch: {
    height: hp(20),
    fontSize: wp(5),
    marginLeft: wp(2),
    width: wp(65),
  },

  iconbutton: {
    fontSize: wp(5),
    color: '#fff',
  },

  trackbarcomponent: {
    width: wp(90),
    radius: 10,
    activeBackgroundColor: '#FFB966',
    inActiveBackgroundColor: '#FFDCB2',
  },

  containerswitch: {
    alignSelf: 'center',
    marginTop: wp(10),
    marginLeft: wp(-5),
  },

  buttonswitch: {
    width: wp(45),
    radius: 10,
    activeBackgroundColor: '#FFDCB2',
    inActiveBackgroundColor: '#FFB966',
    activeColor: '#fff',
    inActiveColor: '#fff',
  },

  card: {
    backgroundColor: '#fff',
    marginRight: wp(6),
    marginLeft: wp(1),
    marginTop: hp(5),
    marginBottom: hp(-2),
    width: wp(40),
    height: hp(25),
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },

  imagecard: {
    width: wp(40),
    height: hp(25),
    borderRadius: 10,
  },
});

export default HomeScreen;
