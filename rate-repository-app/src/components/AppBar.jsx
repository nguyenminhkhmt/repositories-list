import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppbarTab from './AppBarTab';

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: theme.colors.navBackground,
    paddingTop: Constants.statusBarHeight,
    display: 'flex',
    flexDirection: 'row',
  }
});

const AppBar = () => {
  return (
    <View style={styles.appBar}>
      <ScrollView horizontal>
        <AppbarTab name="Repositories" link="/repositories" />
        <AppbarTab name="Sign In" link="signin" />
      </ScrollView>
    </View>
  );
};

export default AppBar;