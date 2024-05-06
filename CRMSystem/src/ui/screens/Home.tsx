import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {debounce} from 'lodash';
import {Fragment, useCallback, useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CommonDelays} from '../../constants/numbers';
import {
  Customer,
  CustomerState,
  queryCustomers,
} from '../../redux/slices/customerSlice';
import {AppDispatch, RootState} from '../../redux/store';
import {CommonStyles} from '../../styles';
import {TypographyStyles} from '../../typography';
import FAB from '../atoms/FAB';
import Text from '../atoms/Text';
import CustomerCard from '../components/CustomerCard';
import NetworkFlatList from '../components/NetworkFlatList';
import SearchBar from '../components/SearchBar';
import {MainStackParamList} from '../navigations/MainStack';

function Home(): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
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

  const searchCustomer = debounce(query => {
    dispatch(queryCustomers({searchQuery: query}));
  }, CommonDelays.debounce);

  return (
    <Fragment>
      <NetworkFlatList
        ListHeaderComponent={
          <View>
            <SearchBar
              placeholder={'Search customers'}
              style={[CommonStyles.bigMarginBottom]}
              onChangeText={searchCustomer}
            />
            <Text
              style={[TypographyStyles.title1, CommonStyles.bigMarginBottom]}>
              Registered customers
            </Text>
          </View>
        }
        refreshing={loading}
        onRefresh={getCustomers}
        data={customers}
        renderItem={({item}: {item: Customer}) => {
          return <CustomerCard customer={item} />;
        }}
        emptyMessage="No customers registered."
      />
      <FAB onPress={() => navigation.navigate('AddOrEditCustomer')} />
    </Fragment>
  );
}

export default Home;
