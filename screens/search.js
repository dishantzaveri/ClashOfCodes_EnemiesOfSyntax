import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
  
const DATA = [
  {
    id: "1",
    title: "Mumbai",
  },
  {
    id: "2",
    title: "Delhi",
  },
  {
    id: "3",
    title: "Vancouver",
  },
  {
    id: "4",
    title: "Canada",
  },
  {
    id: "5",
    title: "New York",
  },
  {
    id: "6",
    title: "Mexico",
  },
  {
    id: "7",
    title: "Chennai",
  },
  {
    id: "8",
    title: "Hyderabad",
  },
  {
    id: "9",
    title: "Kashmir",
  },
  {
    id: "10",
    title: "Los Angeles",
  },
];
  
const Item = ({ title }) => {
  return (
    <View style={styles.item}>
      <Text>{title}</Text>
    </View>
  );
};
  
const renderItem = ({ item }) => <Item title={item.title} />;
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: DATA,
      error: null,
      searchValue: "",
    };
    this.arrayholder = DATA;
  }
  
  searchFunction = (text) => {
    const updatedData = this.arrayholder.filter((item) => {
      const item_data = `${item.title.toUpperCase()})`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    this.setState({ data: updatedData, searchValue: text });
  };
  
  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Search Here..."
          lightTheme
          round
          value={this.state.searchValue}
          onChangeText={(text) => this.searchFunction(text)}
          autoCorrect={false}
        />
        <FlatList
          data={this.state.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}
  
export default Search;
  
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 2,
  },
  item: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});