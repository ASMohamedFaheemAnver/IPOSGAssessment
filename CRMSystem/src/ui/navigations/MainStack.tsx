import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import {RouteNames} from '../../constants/strings';

const MainStack = (): React.JSX.Element => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={RouteNames.Home.value}>
      <Stack.Screen
        name={RouteNames.Home.value}
        options={{
          // title: RouteNames.Home.title,
          headerShown: false,
        }}
        component={Home}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
