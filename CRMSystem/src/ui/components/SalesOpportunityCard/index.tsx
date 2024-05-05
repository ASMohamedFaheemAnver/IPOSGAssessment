import {View} from 'react-native';
import React from 'react';
import Text from '../../atoms/Text';
import {FontWeights, TypographyStyles} from '../../../typography';
import {Badge} from 'react-native-paper';
import {CommonStyles} from '../../../styles';
import {CommonColors} from '../../../themes/colors/commonColors';
import NetworkIconButton from '../NetworkIconButton';
import {IconTypes} from '../../../constants/strings';
import {Gaps} from '../../../constants/numbers';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux/store';
import IconButton from '../IconButton';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '../../navigations/MainStack';
import {
  SalesOpportunity,
  deleteSalesOpportunity,
} from '../../../redux/slices/salesOpportunitySlice';

type Props = {
  salesOpportunity: SalesOpportunity;
};

const statusColorMap: {
  [key: string]: string;
} = {
  new: CommonColors.green,
  closedLost: CommonColors.red,
  closedWon: CommonColors.orange,
};

const SalesOpportunityCard = (props: Props) => {
  const {salesOpportunity} = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const {deleting} = useSelector((state: RootState) => state.salesOpportunity);

  return (
    <View
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
            {salesOpportunity.name}
          </Text>
          <Badge
            style={[
              TypographyStyles.caption1,
              {
                alignSelf: 'flex-start',
                backgroundColor: statusColorMap[salesOpportunity.status],
                fontWeight: FontWeights.medium,
              },
            ]}>
            {salesOpportunity.status}
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
            onPress={() =>
              dispatch(deleteSalesOpportunity(salesOpportunity.id!))
            }
            loading={deleting === salesOpportunity.id}
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
              navigation.navigate('AddOrEditSalesOpportunity', {
                customerId: salesOpportunity.customerId,
                salesOpportunity: salesOpportunity,
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
    </View>
  );
};

export default SalesOpportunityCard;
