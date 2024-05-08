import {CommonDelays} from '@constants/numbers';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Customer,
  CustomerState,
  queryCustomers,
} from '@redux/slices/customerSlice';
import {AppDispatch, RootState} from '@redux/store';
import CustomerCard from '@ui/components/CustomerCard';
import NetworkFlatList from '@ui/components/NetworkFlatList';
import SearchBar from '@ui/components/SearchBar';
import {debounce} from 'lodash';
import {Fragment, useCallback, useEffect, useRef} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CommonStyles} from '../../styles';
import {TypographyStyles} from '../../typography';
import FAB from '../atoms/FAB';
import Text from '../atoms/Text';
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

  const queryRef = useRef(''); // Hold value of search key to paginate with query

  const searchCustomer = debounce(query => {
    queryRef.current = query;
    getCustomers(query, 0); // Always reset page number on new query search
  }, CommonDelays.debounce);

  const onEndReached = () => {
    if (!isLastPage) {
      getCustomers(queryRef.current, page + 1); // On list end, fetch next page
    }
  };

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
              {`Registered customers(${customers.length}${
                isLastPage ? '' : '+'
              })`}
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
