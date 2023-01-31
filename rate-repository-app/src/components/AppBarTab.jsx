import { Pressable, Alert } from "react-native";
import Text from "./Text";

const PressableText = props => {
  return (
    <Pressable onPress={() => Alert.alert(`You pressed the ${props.name}`)}>
      {props.children}
    </Pressable>
  );
};

const AppBarTab = props => {
  return (
    <PressableText name={props.name}>
      <Text color="navText" fontWeight="bold" fontSize="subheading" style={{ padding: 10 }}>{props.name}</Text>
    </PressableText>
  );
};

export default AppBarTab;