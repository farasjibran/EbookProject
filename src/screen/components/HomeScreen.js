import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headertext}>All Books</Text>
        <TouchableHighlight style={styles.buttonicon}>
          <Icon name="search-outline" style={styles.iconsearch} />
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: wp(6),
    paddingLeft: wp(5),
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
});

export default HomeScreen;
