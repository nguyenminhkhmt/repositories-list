import { View, StyleSheet, ScrollView } from 'react-native';
import theme from '../theme';
import AppbarTab from './AppBarTab';
import useCurrentUser from '../hooks/useCurrentUser';
import Text from './Text';
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: theme.colors.navBackground,
    display: 'flex',
    flexDirection: 'row',
  },
});

const LoggedInTabs = ({ handleSignOut }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <AppbarTab name="Create a review" link="/create-review" />
      <AppbarTab name="My reviews" link="/my-reviews" />
      <Link onPress={handleSignOut}>
        <Text color="navText" fontWeight="bold" fontSize="subheading" style={{ padding: 10 }}>Sign Out</Text>
      </Link>
    </View>
  );
};

const LoggedOutTabs = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      <AppbarTab name="Sign In" link="signin" />
      <AppbarTab name="Sign Up" link="signup" />
    </View>
  )
};

const AppBar = ({ handleSignOut }) => {
  const { currentUser } = useCurrentUser();
  return (
    <View style={styles.appBar}>
      <ScrollView horizontal>
        <AppbarTab name="Repositories" link="/repositories" />
        {currentUser ?
          <LoggedInTabs handleSignOut={handleSignOut} /> :
          <LoggedOutTabs />
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;