import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import UtilityFunctions from '../server/utility/UtilityFunctions';

class UtilitiesScreen extends Component {
    constructor() {
        super();
        this.state = { utilities: [] };
    }

    read = () => {
        UtilityFunctions.shared.getUtilities(utility => {
            this.setState(previousState => {
                return {
                    utilities: [...previousState.utilities, utility]
                };
            });
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
                <Button title="read" onPress={this.read} />
            </View>
        );
    }

    componentDidMount() {
        UtilityFunctions.shared.getUtilities(utility => {
            this.setState(previousState => {
                return {
                    utilities: [...previousState.utilities, utility]
                };
            });
        });
    }

    componentWillUnmount() {
        UtilityFunctions.shared.off();
    }
}

export default UtilitiesScreen;