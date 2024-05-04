import {ActivityIndicator, View} from 'react-native';

// Centered loading indicator to show component side effect state
const SubLoading = () => {
  return (
    <View
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

export default SubLoading;
