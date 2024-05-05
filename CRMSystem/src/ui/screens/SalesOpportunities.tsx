import React, {Fragment, useCallback, useEffect} from 'react';
import NetworkFlatList from '../components/NetworkFlatList';
import {TypographyStyles} from '../../typography';
import {CommonStyles} from '../../styles';
import Text from '../atoms/Text';
import FAB from '../atoms/FAB';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {MainStackParamList} from '../navigations/MainStack';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {
  SalesOpportunity,
  SalesOpportunityState,
  querySalesOpportunities,
} from '../../redux/slices/salesOpportunitySlice';
import SalesOpportunityCard from '../components/SalesOpportunityCard';

type Props = NativeStackScreenProps<MainStackParamList, 'SalesOpportunities'>;

const SalesOpportunities = (props: Props) => {
  const customer = props.route.params.customer;
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();

  const getSalesOpportunities = useCallback(() => {
    dispatch(querySalesOpportunities(customer.id));
  }, []);

  useEffect(() => {
    getSalesOpportunities();
  }, []);

  const {salesOpportunities, loading}: SalesOpportunityState = useSelector(
    (state: RootState) => state.salesOpportunity,
  );

  return (
    <Fragment>
      <NetworkFlatList
        ListHeaderComponent={
          <Text style={[TypographyStyles.title1, CommonStyles.bigMarginBottom]}>
            {`${customer.name}'s sales opportunities`}
          </Text>
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
