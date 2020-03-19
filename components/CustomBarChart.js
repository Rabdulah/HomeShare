import React, { Component } from 'react';
import { Layout, Text as KittenText } from '@ui-kitten/components';
import { BarChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
import { ORANGE } from '../styles/colours';

class CustomBarChart extends Component {
  componentDidMount() { }

  nameToInitials = name => {
    const initials = name.firstName.charAt(0) + name.lastName.charAt(0);
    return initials.toUpperCase();
  };

  render() {
    const fill = ORANGE;
    const CUT_OFF = 20;
    const BottomLabels = ({ x, y, bandwidth, data }) =>
      data.map((value, index) => (
        <Text
          key={index}
          x={x(index) + bandwidth / 2}
          y={312}
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
            y={value.count < CUT_OFF ? y(value.count) - 10 : y(value.count) + 15}
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
      <Layout
        style={{
          height: 360,
          width: '100%',
          paddingHorizontal: 70,
          backgroundColor: 'white',
          borderRadius: 5,
          shadowColor: 'rgba(0,0,0,0.19)',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
          elevation: 1
        }}
      >
        <Layout style={{ flex: 1, padding: 10 }}>
          <KittenText style={{ textAlign: 'center' }}>Tally Breakdown</KittenText>
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
        </Layout>
      </Layout>
    );
  }
}

export default CustomBarChart;
