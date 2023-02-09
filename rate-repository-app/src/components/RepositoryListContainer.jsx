import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useSearchRepo } from '../hooks/useRepositories';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    backgroundColor: theme.colors.mainComponent,
    height: 10,
  },
  onePicker: {
    height: 44,
    marginLeft: 10,
    marginRight: 10,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  pickerContainer: {
    height: 50,
    justifyContent: "center",
    backgroundColor: 'transparent',
  },
  main: {
    backgroundColor: theme.colors.mainComponent,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ repositories, navigateRepo }) => {
  const [orderBy, setorderBy] = useState('CREATED_AT');
  const [searchQuery, setSearchQuery] = useState('');
  const [debounceQuery] = useDebounce(searchQuery, 500);
  const { searchData, loading } = useSearchRepo(debounceQuery);

  const onChangeSearch = query => setSearchQuery(query);

  // Get the nodes from the edges array
  const repositoriesFinal = searchQuery !== '' ? searchData : repositories;
  const repositoryNodes = repositoriesFinal
    ? repositoriesFinal.edges.map(edge => edge.node)
    : [];

  const sortedNodes = sortArray(repositoryNodes, orderBy);

  const PickerContainer = props => {
    return (
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.onePicker}
          selectedValue={orderBy}
          onValueChange={(itemValue, itemIndex) => {
            console.log(itemIndex, itemValue);
            setorderBy(itemValue)
          }}>
          <Picker.Item label="Latest repositories" value="CREATED_AT" />
          <Picker.Item label="Highest rated repositories" value="RATING_AVERAGE_DESC" />
          <Picker.Item label="Lowest rated repositories" value="RATING_AVERAGE_ASC" />
        </Picker>
      </View>
    )
  };

  return (
    <View style={styles.main}>
      <Searchbar style={{ margin: 10, height: 44 }}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {loading ? null :
        <FlatList
          data={sortedNodes}
          ItemSeparatorComponent={ItemSeparator}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={<PickerContainer />}
          renderItem={({ item }) => {
            return (
              <Pressable onPress={() => navigateRepo & navigateRepo(item.id)}>
                <RepositoryItem key={item.id} repository={item} />
              </Pressable>
            )
          }}
        />
      }
    </View>
  );
};

const sortArray = (repositories, orderBy) => {
  return repositories.sort((item1, item2) => {
    if (orderBy === "CREATED_AT") {
      const latestReview1 = item1.reviews && item1.reviews.edges ? item1.reviews.edges.slice(-1)[0] : null;
      const latestReview2 = item2.reviews && item2.reviews.edges ? item2.reviews.edges.slice(-1)[0] : null;
      if (latestReview1 && latestReview2) {
        const date1 = new Date(latestReview1.node.createdAt);
        const date2 = new Date(latestReview2.node.createdAt);
        const result = date2 - date1;
        // console.log(item1.id, "-------", result, "------", item2.id);
        return result;
      } else if (latestReview1) {
        return -1;
      } else {
        return 1;
      }
    } else if (orderBy === "RATING_AVERAGE_ASC") {
      return item1.ratingAverage - item2.ratingAverage;
    } else {
      return item2.ratingAverage - item1.ratingAverage;
    }
  });
}

export default RepositoryListContainer;