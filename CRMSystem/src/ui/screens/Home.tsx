import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {debounce} from 'lodash';
import {Fragment, useCallback, useEffect, useRef} from 'react';
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
  const {customers, loading, page, isLastPage}: CustomerState = useSelector(
    (state: RootState) => state.customer,
  );
  const dispatch = useDispatch<AppDispatch>();
  const getCustomers = useCallback((query?: string, page?: number) => {
    dispatch(queryCustomers({searchQuery: query, page}));
  }, []);
  useEffect(() => {
    getCustomers();
  }, []);

  const queryRef = useRef('');

  const searchCustomer = debounce(query => {
    queryRef.current = query;
    getCustomers(query, 0);
  }, CommonDelays.debounce);

  const onEndReached = () => {
    if (!isLastPage) {
      getCustomers(queryRef.current, page + 1);
    }
  };

  console.log({isLastPage});

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
              {`Registered customers (${customers.length})`}
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
        onEndReached={onEndReached}
      />
      <FAB onPress={() => navigation.navigate('AddOrEditCustomer')} />
    </Fragment>
  );
}

export default Home;
