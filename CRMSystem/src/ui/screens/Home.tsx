import FAB from '../atoms/FAB';
import {Fragment, useCallback, useEffect} from 'react';
import NetworkFlatList from '../components/NetworkFlatList';
import Text from '../atoms/Text';
import {TypographyStyles} from '../../typography';
import {RouteNames} from '../../constants/strings';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Customer,
  CustomerState,
  queryCustomers,
} from '../../redux/slices/customerSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {CommonStyles} from '../../styles';
import CustomerCard from '../components/CustomerCard';

function Home(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {customers, loading}: CustomerState = useSelector(
    (state: RootState) => state.customer,
  );
  const dispatch = useDispatch<AppDispatch>();
  const getCustomers = useCallback(() => {
    dispatch(queryCustomers());
  }, []);
  useEffect(() => {
    getCustomers();
  }, []);
  return (
    <Fragment>
      <NetworkFlatList
        ListHeaderComponent={
          <Text style={[TypographyStyles.title1, CommonStyles.bigMarginBottom]}>
            Registered customers
          </Text>
        }
        refreshing={loading}
        onRefresh={getCustomers}
        data={customers}
        renderItem={({item}: {item: Customer}) => {
          return <CustomerCard customer={item} />;
        }}
        emptyMessage="No customers registered."
      />
      <FAB
        onPress={() => navigation.navigate(RouteNames.AddOrEditCustomer.value)}
      />
    </Fragment>
  );
}

export default Home;
