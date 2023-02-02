import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppbarTab from './AppBarTab';
import useCurrentUser from '../hooks/useCurrentUser';
import Text from './Text';
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: theme.colors.navBackground,
    paddingTop: Constants.statusBarHeight,
    display: 'flex',
    flexDirection: 'row',
  },
});

const AppBar = ({ handleSignOut }) => {
  const { currentUser } = useCurrentUser();
  return (
    <View style={styles.appBar}>
      <ScrollView horizontal>
        <AppbarTab name="Repositories" link="/repositories" />
        {currentUser ?
          <Link onPress={handleSignOut}>
            <Text color="navText" fontWeight="bold" fontSize="subheading" style={{ padding: 10 }}>Sign Out</Text>
          </Link> :
          <AppbarTab name="Sign In" link="signin" />
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;