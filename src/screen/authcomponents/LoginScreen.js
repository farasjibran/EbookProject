/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
import React, {useState} from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useToast} from 'react-native-toast-notifications';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const onSubmitLogin = () => {
    setErrors([]);
    if (email || password) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account signed in!');
          setLoading(true);
        })
        .catch(error => {
          if ('auth/wrong-password') {
            toast.show('Wrong Password', {
              type: 'danger',
              placement: 'bottom',
              duration: 4000,
              offset: 30,
              animationType: 'slide-in',
            });
          }

          if ('auth/user-not-found') {
            toast.show('User Not Found', {
              type: 'danger',
              placement: 'bottom',
              duration: 4000,
              offset: 30,
              animationType: 'slide-in',
            });
          }
        });
      setLoading(false);
    } else {
      if (!email) {
        setErrors(prevArray => [...prevArray, 'email']);
      }

      if (!password) {
        setErrors(prevArray => [...prevArray, 'password']);
      }

      toast.show('Input Cannot Be Empty', {
        type: 'danger',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  return (
    <KeyboardAwareScrollView>
      {loading ? (
        <ActivityIndicator
          visible={loading}
          size="large"
          color="#FFAB48"
          style={{justifyContent: 'center', marginTop: hp(50)}}
        />
      ) : (
        <View style={styles.container}>
          <Image
            source={require('../../../assets/loginasset.png')}
            style={styles.imagelogin}
          />
          <Text style={styles.textlogin}>Login</Text>
          <Text style={styles.subtextlogin}>Please sign in to continue</Text>

          {/* Email Input */}
          <View
            style={[
              {
                backgroundColor: errors.some(namefull => namefull === 'email')
                  ? '#FF8888'
                  : '#FFE7CB',
              },
              styles.containeremail,
            ]}>
            <Icon
              name="mail-outline"
              style={[
                {
                  color: errors.some(namefull => namefull === 'email')
                    ? '#fff'
                    : '#000000',
                },
                styles.icon,
              ]}
            />
            <TextInput
              style={styles.inputtext}
              placeholder="Email"
              onChangeText={email => setEmail(email)}
              defaultValue={email}
              placeholderTextColor={
                errors.some(namefull => namefull === 'email')
                  ? '#fff'
                  : '#7C7C7C'
              }
            />
          </View>
          {/* Error Email */}
          {errors.some(namefull => namefull === 'email') ? (
            <Text
              style={{
                marginTop: hp(0.5),
                marginBottom: hp(-1),
                marginLeft: wp(8),
                color: 'red',
                fontWeight: 'bold',
              }}>
              email needed
            </Text>
          ) : (
            <></>
          )}

          {/* Password */}
          <View
            style={[
              {
                backgroundColor: errors.some(
                  namefull => namefull === 'password',
                )
                  ? '#FF8888'
                  : '#FFE7CB',
              },
              styles.containerpass,
            ]}>
            <Icon
              name="lock-closed-outline"
              style={[
                {
                  color: errors.some(namefull => namefull === 'password')
                    ? '#fff'
                    : '#000000',
                },
                styles.icon,
              ]}
            />
            <TextInput
              style={styles.inputtext}
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={password => setPassword(password)}
              defaultValue={password}
              placeholderTextColor={
                errors.some(namefull => namefull === 'password')
                  ? '#fff'
                  : '#7C7C7C'
              }
            />
          </View>
          {/* Error Password */}
          {errors.some(namefull => namefull === 'password') ? (
            <Text
              style={{
                marginTop: hp(0.5),
                marginBottom: hp(-1),
                marginLeft: wp(8),
                color: 'red',
                fontWeight: 'bold',
              }}>
              password needed
            </Text>
          ) : (
            <></>
          )}

          <TouchableOpacity
            onPress={() => onSubmitLogin()}
            style={styles.buttonlogin}>
            <View>
              <Text style={styles.buttontext}>Login</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.textsignup}>
            <Text style={{fontSize: 17, color: '#000000'}}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={{fontSize: 17, marginLeft: 5, color: '#FFAB48'}}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: wp(12),
    fontFamily: 'Roboto',
  },

  imagelogin: {
    width: wp(55),
    height: hp(25),
    alignSelf: 'center',
  },

  textlogin: {
    fontSize: hp(4),
    marginTop: wp(10),
    marginLeft: wp(7),
    fontWeight: 'bold',
    color: '#000000',
  },

  subtextlogin: {
    fontWeight: '500',
    marginLeft: wp(7),
    color: '#858585',
  },

  inputtext: {
    flex: 1,
    alignSelf: 'center',
    height: hp(20),
    width: wp(30),
    borderRadius: 10,
    margin: wp(3),
    color: '#000000',
  },

  icon: {
    padding: 10,
    fontSize: hp(3),
    paddingLeft: wp(4),
    paddingRight: wp(-4),
  },

  containeremail: {
    alignSelf: 'center',
    width: wp(85),
    height: hp(8),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(3),
    borderRadius: 10,
  },

  containerpass: {
    alignSelf: 'center',
    width: wp(85),
    height: hp(8),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(4),
    borderRadius: 10,
  },

  buttonlogin: {
    backgroundColor: '#FFAB48',
    height: hp(7),
    width: hp(17),
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp(4),
  },

  buttontext: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
  },

  textsignup: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hp(12),
    marginBottom: hp(3),
  },
});

export default LoginScreen;
