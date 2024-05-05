import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import {RouteNames} from '../../constants/strings';
import AddOrEditCustomer from '../screens/AddOrEditCustomer';
import {Customer} from '../../redux/slices/customerSlice';
import SalesOpportunity from '../screens/SalesOpportunity';
import AddOrEditSalesOpportunity from '../screens/AddOrEditSalesOpportunity';

export type MainStackParamList = {
  Home: undefined;
  AddOrEditCustomer?: {customer?: Customer};
  SalesOpportunity: {customer: Customer};
  AddOrEditSalesOpportunity: {customerId: number};
};

const MainStack = (): React.JSX.Element => {
  const Stack = createNativeStackNavigator<MainStackParamList>();
  return (
    <Stack.Navigator initialRouteName={'Home'}>
      <Stack.Screen
        name={'Home'}
        options={{
          // title: RouteNames.Home.title,
          headerShown: false,
        }}
        component={Home}
      />
      <Stack.Screen
        name={'AddOrEditCustomer'}
        options={{
          title: RouteNames.AddOrEditCustomer.title,
        }}
        component={AddOrEditCustomer}
      />
      <Stack.Screen
        name={'SalesOpportunity'}
        options={{
          title: RouteNames.SalesOpportunity.title,
        }}
        component={SalesOpportunity}
      />
      <Stack.Screen
        name={'AddOrEditSalesOpportunity'}
        options={{
          title: RouteNames.SalesOpportunity.title,
        }}
        component={AddOrEditSalesOpportunity}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
