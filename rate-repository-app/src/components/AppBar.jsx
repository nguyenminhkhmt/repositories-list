import { View, StyleSheet } from 'react-native';
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
      <AppbarTab name="Repositories" />
      <AppbarTab name="Repositories1" />
      <AppbarTab name="Repositories2" />
    </View>
  );
};

export default AppBar;