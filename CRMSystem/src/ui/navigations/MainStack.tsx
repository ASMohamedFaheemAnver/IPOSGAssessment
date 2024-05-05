import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import {RouteNames} from '../../constants/strings';
import AddOrEditCustomer from '../screens/AddOrEditCustomer';
import {Customer} from '../../redux/slices/customerSlice';
import SalesOpportunities from '../screens/SalesOpportunities';
import AddOrEditSalesOpportunity from '../screens/AddOrEditSalesOpportunity';
import {SalesOpportunity} from '../../redux/slices/salesOpportunitySlice';

export type MainStackParamList = {
  Home: undefined;
  AddOrEditCustomer?: {customer?: Customer};
  SalesOpportunities: {customer: Customer};
  AddOrEditSalesOpportunity: {
    customerId: number;
    salesOpportunity?: SalesOpportunity;
  };
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
        name={'SalesOpportunities'}
        options={{
          title: RouteNames.SalesOpportunities.title,
        }}
        component={SalesOpportunities}
      />
      <Stack.Screen
        name={'AddOrEditSalesOpportunity'}
        options={{
          title: RouteNames.AddOrEditSalesOpportunity.title,
        }}
        component={AddOrEditSalesOpportunity}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
