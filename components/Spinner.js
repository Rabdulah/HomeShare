import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Spinner = ({ size, colour }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={size || 'large'} color={colour} />
    </View>
  );
}

const styles = StyleSheet.create({
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Spinner;

// import React from 'react';
// import { View, ActivityIndicator } from 'react-native';

// const Spinner = ({ size }) => {
//   return (
//     <View style={styles.spinnerStyle}>
//       <ActivityIndicator size={size || 'large'} />
//     </View>
//   );
// };

// const styles = {
//   spinnerStyle: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// };

// export default Spinner ;