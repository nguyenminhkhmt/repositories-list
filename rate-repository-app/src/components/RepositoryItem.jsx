import { View, Image, StyleSheet } from "react-native";
import Text from './Text';
import theme from "../theme";

const styles = StyleSheet.create({
  component: {
    backgroundColor: theme.colors.repoItemBackground,
  },
  horisontalView: {
    flexDirection: "row",
    padding: 8,
  },
  verticalView: {
    flexDirection: "column",
    alignSelf: "center",
    flex: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 8,
  },
  languageContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    alignSelf: "left",
  },
  language: {
    color: "white",
    padding: 8,
    backgroundColor: "transparent",
    textAlign: "center",
  },
  statistics: {
    textAlign: "center",
    fontWeight: "bold",
  },
  textNormal: {
    textAlign: "center",
  },
});

const HorisontalView = props => <View style={styles.horisontalView}>{props.children}</View>;
const VerticalView = props => <View style={styles.verticalView}>{props.children}</View>;

const RepositoryHeader = ({ repository }) => {
  return (
    <HorisontalView>
      <Image style={styles.image} source={{ uri: repository.ownerAvatarUrl }} />
      <VerticalView>
        <Text fontWeight='bold'>{repository.fullName}</Text>
        <Text style={{ ellipsizeMode: "tail" }}>{repository.description}</Text>
        <View style={styles.languageContainer}>
          <Text style={styles.language}>
            {repository.language}
          </Text>
        </View>
      </VerticalView>
    </HorisontalView>
  )
}

const RepositoryStatistics = props => {
  const { repository } = props;
  const shorterNumber = (number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'k';
    } else {
      return number;
    }
  };

  return (
    <HorisontalView>
      <VerticalView>
        <Text style={styles.statistics}>{shorterNumber(repository.stargazersCount)}</Text>
        <Text style={styles.textNormal}>Stars</Text>
      </VerticalView>
      <VerticalView>
        <Text style={styles.statistics}>{shorterNumber(repository.forksCount)}</Text>
        <Text style={styles.textNormal}>Forks</Text>
      </VerticalView>
      <VerticalView>
        <Text style={styles.statistics}>{shorterNumber(repository.reviewCount)}</Text>
        <Text style={styles.textNormal}>Review</Text>
      </VerticalView>
      <VerticalView>
        <Text style={styles.statistics}>{shorterNumber(repository.ratingAverage)}</Text>
        <Text style={styles.textNormal}>Rating</Text>
      </VerticalView>
    </HorisontalView >
  )
};

const RepositoryItem = props => {
  return (
    <View style={styles.component}>
      <RepositoryHeader {...props} />
      <RepositoryStatistics {...props} />
    </View>
  )
}

export default RepositoryItem