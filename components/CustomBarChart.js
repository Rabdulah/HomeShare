import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { BarChart, XAxis, Grid } from 'react-native-svg-charts';
import { Layout } from '@ui-kitten/components';
import { Text } from 'react-native-svg';
import * as scale from 'd3-scale';

class CustomBarChart extends Component {
  componentDidMount() {}

  nameToInitials = name => {
    const initials = name.firstName.charAt(0) + name.lastName.charAt(0);
    return initials.toUpperCase();
  };

  render() {
    const fill = 'rgb(134, 65, 244)';
    const CUT_OFF = 20;
    const BottomLabels = ({ x, y, bandwidth, data }) =>
      data.map((value, index) => (
        <Text
          key={index}
          x={x(index) + bandwidth / 2}
          y={245}
          fontSize={14}
          fill={value.count >= CUT_OFF ? 'white' : 'black'}
          alignmentBaseline="middle"
          textAnchor="middle"
        >
          {this.nameToInitials(value.user.name)}
        </Text>
      ));

    const TopLabels = ({ x, y, bandwidth, data }) =>
      data.map((value, index) => {
        return (
          <Text
            key={index}
            x={x(index) + bandwidth / 2}
            y={
              value.count < CUT_OFF ? y(value.count) - 10 : y(value.count) + 15
            }
            fontSize={14}
            fill={value.count >= CUT_OFF ? 'white' : 'black'}
            alignmentBaseline="middle"
            textAnchor="middle"
          >
            {value.count}
          </Text>
        );
      });

    const { data } = this.props;
    // PLAY WITH DYNAMIC VIEW-paddingHorizontal
    // switch statement?
    return (
      <View
        style={{
          height: 250,
          width: '80%',
          paddingHorizontal: 70,
          backgroundColor: 'pink'
        }}
      >
        <BarChart
          style={{ flex: 1 }}
          data={data}
          yAccessor={({ item }) => item.count}
          contentInset={{ top: 20, bottom: 20 }}
          gridMin={0}
          spacingInner={0.1 * data.length}
          svg={{ fill }}
        >
          <TopLabels />
          <BottomLabels />
        </BarChart>
      </View>
    );
  }
}

export default CustomBarChart;
