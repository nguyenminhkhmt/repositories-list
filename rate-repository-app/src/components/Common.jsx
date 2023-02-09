import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  horisontalView: {
    flexDirection: "row",
    padding: 8,
    gap: 4,
  },
  verticalView: {
    flexDirection: "column",
    alignSelf: "center",
    flex: 1,
    gap: 4,
  }
});

export const HorisontalView = props => <View style={styles.horisontalView}>{props.children}</View>;
export const VerticalView = props => <View style={styles.verticalView}>{props.children}</View>;