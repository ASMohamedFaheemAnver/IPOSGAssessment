import React, {Fragment} from 'react';
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

type Props = NativeStackScreenProps<MainStackParamList, 'SalesOpportunity'>;

const SalesOpportunity = (props: Props) => {
  const customer = props.route.params.customer;
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  return (
    <Fragment>
      <NetworkFlatList
        ListHeaderComponent={
          <Text style={[TypographyStyles.title1, CommonStyles.bigMarginBottom]}>
            {`${customer.name}'s sales opportunities`}
          </Text>
        }
        // refreshing={loading}
        // onRefresh={getCustomers}
        data={[]}
        renderItem={() => null}
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

export default SalesOpportunity;
