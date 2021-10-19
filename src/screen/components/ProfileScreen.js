/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ProfileScreen = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [userinfo, SetUserInfo] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  function getUserInfo() {
    if (user) {
      firestore()
        .collection('Users')
        .where('email', '==', user.email)
        .get()
        .then(querySnapshoot => {
          querySnapshoot.forEach(documentSnapshoot => {
            SetUserInfo(documentSnapshoot.data());
          });
        });
    }
  }

  useEffect(() => {
    getUserInfo();
  }, [user]);

  function logoutButton() {
    auth().signOut();
  }

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.imageusername}>
          {user == null ? (
            <></>
          ) : (
            <>
              <Image
                source={require('../../../assets/profile.png')}
                style={styles.profileimage}
              />
              <View style={styles.textcontainer}>
                <Text style={styles.username}>
                  {userinfo == null ? <></> : userinfo.fullname}
                </Text>
                <Text style={styles.email}>
                  {userinfo == null ? <></> : userinfo.email}
                </Text>
              </View>
            </>
          )}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.buttonlogout}
          onPress={() => logoutButton()}>
          <Icon name="power-outline" style={styles.icon} />
          <Text style={styles.textlogout}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: wp(6),
    paddingLeft: wp(5),
  },

  container2: {
    paddingTop: wp(15),
  },

  imageusername: {
    flexDirection: 'row',
  },

  profileimage: {
    width: wp(30),
    height: hp(16),
  },

  textcontainer: {
    marginLeft: wp(3),
    marginTop: hp(5),
  },

  username: {
    fontSize: wp(5),
    color: '#000000',
    fontWeight: 'bold',
  },

  email: {
    fontSize: wp(4),
    color: '#8F8F8F',
  },

  buttonlogout: {
    flexDirection: 'row',
    marginTop: hp(5),
  },

  icon: {
    fontSize: wp(7),
    color: '#FF0000',
  },

  textlogout: {
    fontSize: wp(4.5),
    color: '#FF0000',
    fontWeight: 'bold',
    marginLeft: wp(3),
  },
});

export default ProfileScreen;
