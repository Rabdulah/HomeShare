import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import UtilityFunctions from '../server/utility/UtilityFunctions';

class UtilitiesScreen extends Component {
  constructor() {
    super();
    this.state = { utilities: [] };
  }

  create = () => {
    UtilityFunctions.shared.createUtility();
  };
  read = () => {
    UtilityFunctions.shared.getUtilities(utility => {
      this.setState(previousState => {
        return {
          utilities: [...previousState.utilities, utility]
        };
      });
    });
  };
  update = () => {
    UtilityFunctions.shared.updateUtility('YSDlRiV8x13uEXTfJmzJ', {
      cost: 121,
      name: 'updated utility'
    });
  };
  delete = () => {
    UtilityFunctions.shared.deleteUtility('YSDlRiV8x13uEXTfJmzJ');
    this.setState(previousState => {
      return {
        utilities: previousState.utilities.filter(
          previousUtility => previousUtility._id != 'YSDlRiV8x13uEXTfJmzJ'
        )
      };
    });
  };

  render() {
    return (
      <View>
        <FlatList
          keyExtractor={item => item._id}
          data={this.state.utilities}
          renderItem={({ item }) => {
            return (
              <View>
                <Text>
                  ID: {item._id} name: {item.name} cost: {item.cost}
                </Text>
              </View>
            );
          }}
        />
        <Button title="add" onPress={this.create} />
        <Button title="read" onPress={this.read} />
        <Button title="update" onPress={this.update} />
        <Button title="delete" onPress={this.delete} />
      </View>
    );
  }

  componentDidMount() {
    UtilityFunctions.shared.getUtilities(utility => {
      this.setState(previousState => {
        // The filter is to deal with rendering a new item when it should be updating an existing one instead.
        // The filter deletes the existing item in the list that has been modfied, and replaces it with the
        // same but newly modifed item.
        return {
          utilities: [
            ...previousState.utilities.filter(
              previousUtility => previousUtility._id != utility._id
            ),
            utility
          ]
        };
      });
    });
  }

  componentWillUnmount() {
    UtilityFunctions.shared.off();
  }
}

export default UtilitiesScreen;
