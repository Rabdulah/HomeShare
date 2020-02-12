import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { BarChart, XAxis, Grid } from 'react-native-svg-charts';
import { Layout } from '@ui-kitten/components';

class CustomBarChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = [29, 30, 70, 50, 34, 98, 51, 35, 53, 24, 50];

    return (
      <Layout style={styles.container}>
        <BarChart
          style={{ flex: 1 }}
          data={data}
          contentInset={{ top: 30, bottom: 30 }}
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '60%'
  }
});

export default CustomBarChart;
