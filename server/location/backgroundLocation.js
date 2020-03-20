import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

_getLocationAsync = async () => {
    let { status } = await Permissions.getAsync(Permissions.LOCATION);
    if(status !== 'granted'){
    status = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
}
    console.log(status);
    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
  };

export default _getLocationAsync;