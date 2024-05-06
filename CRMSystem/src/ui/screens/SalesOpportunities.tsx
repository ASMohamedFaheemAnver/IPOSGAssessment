import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {debounce} from 'lodash';
import React, {Fragment, useCallback, useEffect, useRef} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CommonDelays} from '../../constants/numbers';
import {
  SalesOpportunity,
  SalesOpportunityState,
  querySalesOpportunities,
} from '../../redux/slices/salesOpportunitySlice';
import {AppDispatch, RootState} from '../../redux/store';
import {CommonStyles} from '../../styles';
import {TypographyStyles} from '../../typography';
import FAB from '../atoms/FAB';
import Text from '../atoms/Text';
import NetworkFlatList from '../components/NetworkFlatList';
import SalesOpportunityCard from '../components/SalesOpportunityCard';
import SearchBar from '../components/SearchBar';
import {MainStackParamList} from '../navigations/MainStack';

type Props = NativeStackScreenProps<MainStackParamList, 'SalesOpportunities'>;

const SalesOpportunities = (props: Props) => {
  const customer = props.route.params.customer;
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();

  const getSalesOpportunities = useCallback((query?: string, page?: number) => {
    dispatch(
      querySalesOpportunities({
        customerId: customer.id,
        searchQuery: query,
        page,
      }),
    );
  }, []);

  useEffect(() => {
    getSalesOpportunities();
  }, []);

  const {salesOpportunities, isLastPage, page, loading}: SalesOpportunityState =
    useSelector((state: RootState) => state.salesOpportunity);
  const queryRef = useRef(''); // Hold value of search key to paginate with query

  const searchCustomer = debounce(query => {
    queryRef.current = query;
    getSalesOpportunities(query, 0); // Always reset page number on new query search
  }, CommonDelays.debounce);

  const onEndReached = () => {
    if (!isLastPage) {
      getSalesOpportunities(queryRef.current, page + 1); // On list end, fetch next page
    }
  };

  return (
    <Fragment>
      <NetworkFlatList
        ListHeaderComponent={
          <View>
            <SearchBar
              placeholder={'Search opportunities'}
              style={[CommonStyles.bigMarginBottom]}
              onChangeText={searchCustomer}
            />
            <Text
              style={[TypographyStyles.title1, CommonStyles.bigMarginBottom]}>
              {`${customer.name}'s sales opportunities (${salesOpportunities.length})`}
            </Text>
          </View>
        }
        refreshing={loading}
        onRefresh={getSalesOpportunities}
        data={salesOpportunities}
        renderItem={({item}: {item: SalesOpportunity}) => (
          <SalesOpportunityCard salesOpportunity={item} />
        )}
        emptyMessage="No sales opportunities."
        onEndReached={onEndReached}
      />
      <FAB
        onPress={() =>
          navigation.navigate('AddOrEditSalesOpportunity', {
            customerId: customer.id,
          })
        }
      />
    </Fragment>
  );
};

export default SalesOpportunities;
