import { Link } from "react-router-native";
import Text from "./Text";

const AppBarTab = props => {
  return (
    <Link to={props.link}>
      <Text color="navText" fontWeight="bold" fontSize="subheading" style={{ padding: 10 }}>{props.name}</Text>
    </Link>
  );
};

export default AppBarTab;