import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {debounce} from 'lodash';
import React, {Fragment, useCallback, useEffect} from 'react';
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

  const getSalesOpportunities = useCallback(() => {
    dispatch(querySalesOpportunities({customerId: customer.id}));
  }, []);

  useEffect(() => {
    getSalesOpportunities();
  }, []);

  const {salesOpportunities, loading}: SalesOpportunityState = useSelector(
    (state: RootState) => state.salesOpportunity,
  );

  const searchCustomer = debounce(query => {
    dispatch(
      querySalesOpportunities({customerId: customer.id, searchQuery: query}),
    );
  }, CommonDelays.debounce);

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
              {`${customer.name}'s sales opportunities`}
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
