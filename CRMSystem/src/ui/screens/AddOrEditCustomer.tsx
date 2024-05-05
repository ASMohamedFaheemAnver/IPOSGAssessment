import {View} from 'react-native';
import ScrollView from '../components/ScrollView';
import {CommonStyles} from '../../styles';
import Text from '../atoms/Text';
import {FontWeights, TypographyStyles} from '../../typography';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import NetworkButton from '../components/NetworkButton';
import YupTextInput from '../components/YupTextInput';
import {PHONE_REG_EXP} from '../../constants/reg-exp';
import YupGroupRadioButton from '../components/YupGroupRadioButton';
import {
  Customer,
  CustomerState,
  createCustomer,
  updateCustomer,
} from '../../redux/slices/customerSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {
  ParamListBase,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {RouteNames} from '../../constants/strings';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {MainStackParamList} from '../navigations/MainStack';

// If we need to add extra functions/hooks eg. translation, move it inside component
const formSchema = yup.object({
  name: yup.string().min(1).required(),
  phoneNumber: yup
    .string()
    .matches(PHONE_REG_EXP, 'Phone number must be valid')
    .required(),
  status: yup.string().required(),
});
type CustomerFormValues = yup.InferType<typeof formSchema>;

type Props = NativeStackScreenProps<MainStackParamList, 'AddOrEditCustomer'>;

const AddOrEditCustomer = (props: Props) => {
  const customer = props.route?.params?.customer;
  console.log({customer});
  const {loading}: CustomerState = useSelector(
    (state: RootState) => state.customer,
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const STATUS_OPTIONS = [
    {value: 'active', label: 'Active'},
    {value: 'inactive', label: 'Inactive'},
    {value: 'lead', label: 'Lead'},
  ];

  const methods = useForm<CustomerFormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: customer?.name,
      phoneNumber: customer?.phoneNumber,
      status: customer?.status || 'active',
    },
    mode: 'all',
  });

  const {
    handleSubmit,
    control,
    formState: {isValid, errors},
  } = methods;

  const onCreateOrEditCustomer = async (values: CustomerFormValues) => {
    if (customer) {
      await dispatch(
        updateCustomer({
          updatedCustomer: {...values, id: customer.id},
        }),
      );
    } else {
      await dispatch(
        createCustomer({
          customerDto: values,
        }),
      );
    }
    navigation.navigate('Home');
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
          Add or Edit customers
        </Text>
        <Text>
          Please make sure to fill all required fields before adding customer
        </Text>
      </View>
      <YupTextInput
        containerStyle={[CommonStyles.bigMarginBottom]}
        control={control}
        name={'name'}
        placeholder={'Customer name'}
        errors={errors}
      />
      <YupTextInput
        containerStyle={[CommonStyles.bigMarginBottom]}
        control={control}
        name={'phoneNumber'}
        placeholder={'Enter customer phone number'}
        errors={errors}
        keyboardType="number-pad"
      />
      <YupGroupRadioButton
        label={'Select customer status'}
        containerStyle={[CommonStyles.bigMarginBottom]}
        options={STATUS_OPTIONS}
        control={control}
        name="status"
        errors={errors}
      />
      <NetworkButton
        loading={loading}
        disabled={!isValid || loading}
        onPress={handleSubmit(onCreateOrEditCustomer)}>
        <Text style={{color: 'white'}}>{customer ? 'Edit' : 'Add'}</Text>
      </NetworkButton>
    </ScrollView>
  );
};

export default AddOrEditCustomer;
