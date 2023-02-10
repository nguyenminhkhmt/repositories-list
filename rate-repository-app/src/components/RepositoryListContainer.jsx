import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';

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
    flex: 1,
    backgroundColor: theme.colors.mainComponent,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = props => {
  const { repositories, navigateRepo, onEndReached, loading } = props;
  const { searchKeyword, orderBy, orderDirection } = props;
  const { setSearchKeyword, setOrderBy, setOrderDirection } = props;

  const onChangeSearch = query => setSearchKeyword(query);

  // Get the nodes from the edges array
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];
  const PickerContainer = () => {
    return (
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.onePicker}
          selectedValue={`${orderBy}_${orderDirection}`}
          onValueChange={(itemValue) => {
            if (itemValue === 'RATING_AVERAGE_DESC') {
              setOrderBy('RATING_AVERAGE');
              setOrderDirection('DESC');
            } else if (itemValue === 'RATING_AVERAGE_ASC') {
              setOrderBy('RATING_AVERAGE');
              setOrderDirection('ASC');
            } else {
              setOrderBy('CREATED_AT');
              setOrderDirection('DESC');
            }
          }}>
          <Picker.Item label="Latest repositories" value="CREATED_AT_DESC" />
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
        value={searchKeyword}
      />
      {loading ? null :
        <FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={<PickerContainer />}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.7}
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

export default RepositoryListContainer;