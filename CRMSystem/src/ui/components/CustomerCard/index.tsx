import {Gaps} from '@constants/numbers';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Customer, deleteCustomer} from '@redux/slices/customerSlice';
import {AppDispatch, RootState} from '@redux/store';
import {CUSTOMER_STATUS_OPTIONS, IconTypes} from '@src/constants/strings';
import {CommonStyles} from '@src/styles';
import {FontWeights, TypographyStyles} from '@src/typography';
import {CommonColors} from '@themes/colors/commonColors';
import Button from '@ui/atoms/Button';
import Text from '@ui/atoms/Text';
import {MainStackParamList} from '@ui/navigations/MainStack';
import React from 'react';
import {View} from 'react-native';
import {Badge, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import IconButton from '../IconButton';
import NetworkIconButton from '../NetworkIconButton';

type Props = {
  customer: Customer;
};

const statusColorMap: {
  [key: string]: string;
} = {
  active: CommonColors.green,
  inactive: CommonColors.red,
  lead: CommonColors.orange,
};

const CustomerCard = (props: Props) => {
  const {customer} = props;
  const {colors} = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const {deleting} = useSelector((state: RootState) => state.customer);

  return (
    <Button
      onPress={() => navigation.navigate('SalesOpportunities', {customer})}
      style={[
        {backgroundColor: CommonColors.gray},
        CommonStyles.normalPadding,
        CommonStyles.normalRadius,
      ]}>
      <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
        {/* Left */}
        <View style={[{flex: 1, alignItems: 'flex-start', gap: Gaps.small}]}>
          <Text
            style={[TypographyStyles.body1, {fontWeight: FontWeights.bold}]}>
            {customer.name}
          </Text>
          <Text style={[TypographyStyles.caption1, {color: colors.secondary}]}>
            {customer.phoneNumber}
          </Text>
          <Badge
            style={[
              TypographyStyles.caption1,
              {
                alignSelf: 'flex-start',
                backgroundColor: statusColorMap[customer.status],
                fontWeight: FontWeights.medium,
              },
            ]}>
            {CUSTOMER_STATUS_OPTIONS?.[customer.status]?.label}
          </Badge>
        </View>
        {/* Right */}
        <View
          style={[
            {
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: Gaps.normal,
            },
          ]}>
          <NetworkIconButton
            onPress={() => dispatch(deleteCustomer(customer.id!))}
            loading={deleting === customer.id}
            buttonStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}
            iconType={IconTypes.MaterialCommunityIcons}
            iconName="delete"
            iconStyle={{color: CommonColors.red}}
          />
          <IconButton
            onPress={() =>
              navigation.navigate('AddOrEditCustomer', {
                customer,
              })
            }
            buttonStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}
            iconType={IconTypes.EntypoIcon}
            iconName="edit"
            iconStyle={{color: CommonColors.navyBlue}}
          />
        </View>
      </View>
    </Button>
  );
};

export default CustomerCard;
