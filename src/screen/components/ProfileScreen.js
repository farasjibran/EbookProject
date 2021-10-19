/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ProfileScreen = () => {
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [user]);

  function logoutButton() {
    auth().signOut();
  }

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
          <View style={styles.container2}>
            <Icon name="create-outline" style={styles.iconedit} />
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

            <Text style={styles.textver}>Ver 1.0</Text>
          </View>
        </View>
      )}
    </>
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
    width: 120,
    height: 120,
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

  iconedit: {
    fontSize: wp(7),
    color: '#000000',
    marginLeft: wp(83),
    marginTop: hp(-6),
    marginBottom: hp(2),
  },

  textver: {
    fontSize: wp(3.5),
    color: '#8F8F8F',
    marginTop: '100%',
    marginLeft: wp(-5),
    textAlign: 'center',
  },
});

export default ProfileScreen;
