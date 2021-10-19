/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useToast} from 'react-native-toast-notifications';

const RegisterScreen = ({navigation}) => {
  const [fullname, setFullName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Function Submit
  const onSubmitRegister = () => {
    setErrors([]);
    if (fullname || phone || email || password || confirmpassword) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          setLoading(true);
          console.log('User account created & signed in!');
          firestore()
            .collection('Users')
            .add({
              fullname: fullname,
              phone: phone,
              email: email,
            })
            .then(() => {
              console.log('User added!');
            });
        });
      setLoading(false);
    } else {
      if (!fullname) {
        setErrors(prevArray => [...prevArray, 'fullname']);
      }

      if (!phone) {
        setErrors(prevArray => [...prevArray, 'phone']);
      }

      if (!email) {
        setErrors(prevArray => [...prevArray, 'email']);
      }

      if (!password) {
        setErrors(prevArray => [...prevArray, 'password']);
      }

      if (password !== confirmpassword) {
        setErrors(prevArray => [...prevArray, 'confirmpassword']);
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
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Icon name="chevron-back-outline" style={styles.arrowicon} />
        </TouchableOpacity>
        <Text style={styles.textregister}>Create Account</Text>
        <Text style={styles.subtextregister}>
          Please fill the input blow here
        </Text>

        {/* Fullname Input */}
        <View
          style={[
            {
              backgroundColor: errors.some(namefull => namefull === 'fullname')
                ? '#FF8888'
                : '#FFE7CB',
            },
            styles.containerfullname,
          ]}>
          <Icon
            name="person-outline"
            style={[
              {
                color: errors.some(namefull => namefull === 'fullname')
                  ? '#fff'
                  : '#000000',
              },
              styles.icon,
            ]}
          />
          <TextInput
            style={styles.inputtext}
            placeholder="Full Name"
            onChangeText={fullname => setFullName(fullname)}
            defaultValue={fullname}
            placeholderTextColor={
              errors.some(namefull => namefull === 'fullname')
                ? '#fff'
                : '#7C7C7C'
            }
          />
        </View>
        {/* Error Fullname */}
        {errors.some(namefull => namefull === 'fullname') ? (
          <Text
            style={{
              marginTop: hp(0.5),
              marginBottom: hp(-1),
              marginLeft: wp(2),
              color: 'red',
              fontWeight: 'bold',
            }}>
            fullname needed
          </Text>
        ) : (
          <></>
        )}

        {/* Phone Input */}
        <View
          style={[
            {
              backgroundColor: errors.some(namefull => namefull === 'phone')
                ? '#FF8888'
                : '#FFE7CB',
            },
            styles.containerphone,
          ]}>
          <Icon
            name="phone-portrait-outline"
            style={[
              {
                color: errors.some(namefull => namefull === 'phone')
                  ? '#fff'
                  : '#000000',
              },
              styles.icon,
            ]}
          />
          <TextInput
            style={styles.inputtext}
            placeholder="Phone Number"
            onChangeText={phone => setPhone(phone)}
            defaultValue={phone}
            placeholderTextColor={
              errors.some(namefull => namefull === 'phone') ? '#fff' : '#7C7C7C'
            }
          />
        </View>
        {/* Error Phone */}
        {errors.some(namefull => namefull === 'phone') ? (
          <Text
            style={{
              marginTop: hp(0.5),
              marginBottom: hp(-1),
              marginLeft: wp(2),
              color: 'red',
              fontWeight: 'bold',
            }}>
            phone needed
          </Text>
        ) : (
          <></>
        )}

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
              errors.some(namefull => namefull === 'email') ? '#fff' : '#7C7C7C'
            }
          />
        </View>
        {/* Error Email */}
        {errors.some(namefull => namefull === 'email') ? (
          <Text
            style={{
              marginTop: hp(0.5),
              marginBottom: hp(-1),
              marginLeft: wp(2),
              color: 'red',
              fontWeight: 'bold',
            }}>
            email needed
          </Text>
        ) : (
          <></>
        )}

        {/* Password Input */}
        <View
          style={[
            {
              backgroundColor: errors.some(namefull => namefull === 'password')
                ? '#FF8888'
                : '#FFE7CB',
            },
            styles.containerpassword,
          ]}>
          <Icon
            name="lock-closed-outline"
            style={styles.icon}
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
            placeholder="Password"
            secureTextEntry={true}
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
              marginLeft: wp(2),
              color: 'red',
              fontWeight: 'bold',
            }}>
            password needed
          </Text>
        ) : (
          <></>
        )}

        {/* Confirm Password Input */}
        <View
          style={[
            {
              backgroundColor: errors.some(
                namefull => namefull === 'confirmpassword',
              )
                ? '#FF8888'
                : '#FFE7CB',
            },
            styles.containerpassword,
          ]}>
          <Icon
            name="lock-closed-outline"
            style={styles.icon}
            style={[
              {
                color: errors.some(namefull => namefull === 'confirmpassword')
                  ? '#fff'
                  : '#000000',
              },
              styles.icon,
            ]}
          />
          <TextInput
            style={styles.inputtext}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={confirmpassword =>
              setConfirmPassword(confirmpassword)
            }
            defaultValue={confirmpassword}
            placeholderTextColor={
              errors.some(namefull => namefull === 'confirmpassword')
                ? '#fff'
                : '#7C7C7C'
            }
          />
        </View>
        {/* Error Confirm Password */}
        {errors.some(namefull => namefull === 'confirmpassword') ? (
          <Text
            style={{
              marginTop: hp(0.5),
              marginBottom: hp(-1),
              marginLeft: wp(2),
              color: 'red',
              fontWeight: 'bold',
            }}>
            confirm password not same with password
          </Text>
        ) : (
          <></>
        )}

        <TouchableOpacity
          onPress={() => onSubmitRegister()}
          style={styles.buttonregister}>
          <View>
            <Text style={styles.buttontext}>Sign Up</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.textsignin}>
          <Text style={{fontSize: 17, color: '#000000'}}>
            Already have account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={{fontSize: 17, marginLeft: 5, color: '#FFAB48'}}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: wp(6),
    paddingLeft: wp(5),
  },

  arrowicon: {
    fontSize: hp(3),
    color: '#000000',
  },

  textregister: {
    fontSize: hp(4),
    marginTop: wp(5),
    fontWeight: 'bold',
    color: '#000000',
  },

  subtextregister: {
    fontWeight: '500',
    color: '#858585',
  },

  inputtext: {
    flex: 1,
    alignSelf: 'center',
    height: hp(20),
    width: wp(30),
    borderRadius: 10,
    margin: wp(3),
  },

  icon: {
    fontSize: hp(3),
    paddingLeft: wp(4),
    paddingRight: wp(-4),
  },

  containerfullname: {
    alignSelf: 'center',
    width: wp(85),
    height: hp(8),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(3),
    borderRadius: 10,
    marginLeft: wp(-8),
  },

  containerphone: {
    alignSelf: 'center',
    width: wp(85),
    height: hp(8),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(3),
    borderRadius: 10,
    marginLeft: wp(-8),
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
    marginLeft: wp(-8),
  },

  containerpassword: {
    alignSelf: 'center',
    width: wp(85),
    height: hp(8),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(3),
    borderRadius: 10,
    marginLeft: wp(-8),
  },

  buttonregister: {
    backgroundColor: '#FFAB48',
    height: hp(7),
    width: hp(17),
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp(4),
    marginLeft: wp(-8),
  },

  buttontext: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
  },

  textsignin: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hp(8),
    marginBottom: hp(3),
  },
});

export default RegisterScreen;
