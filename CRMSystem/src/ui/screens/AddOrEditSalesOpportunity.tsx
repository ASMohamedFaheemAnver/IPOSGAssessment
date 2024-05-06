import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useForm} from 'react-hook-form';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {OPPORTUNITY_STATUS_OPTIONS} from '../../constants/strings';
import {CustomerState} from '../../redux/slices/customerSlice';
import {
  createSalesOpportunity,
  updateSalesOpportunity,
} from '../../redux/slices/salesOpportunitySlice';
import {AppDispatch, RootState} from '../../redux/store';
import {CommonStyles} from '../../styles';
import {FontWeights, TypographyStyles} from '../../typography';
import Text from '../atoms/Text';
import NetworkButton from '../components/NetworkButton';
import ScrollView from '../components/ScrollView';
import YupGroupRadioButton from '../components/YupGroupRadioButton';
import YupTextInput from '../components/YupTextInput';
import {MainStackParamList} from '../navigations/MainStack';

// If we need to add extra functions/hooks eg. translation, move it inside component
const formSchema = yup.object({
  name: yup.string().min(1).required(),
  status: yup.string().oneOf(['new', 'closedLost', 'closedWon']).required(),
});
type CustomerFormValues = yup.InferType<typeof formSchema>;

type Props = NativeStackScreenProps<
  MainStackParamList,
  'AddOrEditSalesOpportunity'
>;

const AddOrEditSalesOpportunity = (props: Props) => {
  const {customerId, salesOpportunity} = props.route?.params;
  const {loading}: CustomerState = useSelector(
    (state: RootState) => state.customer,
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const methods = useForm<CustomerFormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: salesOpportunity?.name,
      status: salesOpportunity?.status,
    },
    mode: 'all',
  });

  const {
    handleSubmit,
    control,
    formState: {isValid, errors},
  } = methods;

  const onCreateOrEditCustomer = async (values: CustomerFormValues) => {
    if (salesOpportunity) {
      await dispatch(
        updateSalesOpportunity({
          updateSalesOpportunityDto: {...salesOpportunity, ...values},
        }),
      );
    } else {
      await dispatch(
        createSalesOpportunity({
          salesOpportunityDto: {...values, customerId},
        }),
      );
    }

    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={[CommonStyles.bigMarginBottom]}>
        <Text
          style={[
            TypographyStyles.title1,
            CommonStyles.smallMarginBottom,
            {fontWeight: FontWeights.bold},
          ]}>
          Add or Edit sales opportunity
        </Text>
        <Text>
          Please make sure to fill all required fields before sales opportunity
        </Text>
      </View>
      <YupTextInput
        containerStyle={[CommonStyles.bigMarginBottom]}
        control={control}
        name={'name'}
        placeholder={'Opportunity name'}
        errors={errors}
      />
      <YupGroupRadioButton
        label={'Select opportunity status'}
        containerStyle={[CommonStyles.bigMarginBottom]}
        options={Object.values(OPPORTUNITY_STATUS_OPTIONS)}
        control={control}
        name="status"
        errors={errors}
      />
      <NetworkButton
        loading={loading}
        disabled={!isValid || loading}
        onPress={handleSubmit(onCreateOrEditCustomer)}>
        <Text style={{color: 'white'}}>
          {salesOpportunity ? 'Edit' : 'Add'}
        </Text>
      </NetworkButton>
    </ScrollView>
  );
};

export default AddOrEditSalesOpportunity;
