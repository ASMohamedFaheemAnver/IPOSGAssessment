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
import YupGroupRadioButton from '../components/YupGroupRadioButton';
import {CustomerState} from '../../redux/slices/customerSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {MainStackParamList} from '../navigations/MainStack';

// If we need to add extra functions/hooks eg. translation, move it inside component
const formSchema = yup.object({
  name: yup.string().min(1).required(),
  status: yup.string().required(),
});
type CustomerFormValues = yup.InferType<typeof formSchema>;

type Props = NativeStackScreenProps<
  MainStackParamList,
  'AddOrEditSalesOpportunity'
>;

const AddOrEditSalesOpportunity = (props: Props) => {
  const customerId = props.route?.params?.customerId;
  const {loading}: CustomerState = useSelector(
    (state: RootState) => state.customer,
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const STATUS_OPTIONS = [
    {value: 'new', label: 'New'},
    {value: 'closedWon', label: 'Closed Won'},
    {value: 'closedLost', label: 'Closed Lost'},
  ];

  const methods = useForm<CustomerFormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {},
    mode: 'all',
  });

  const {
    handleSubmit,
    control,
    formState: {isValid, errors},
  } = methods;

  const onCreateOrEditCustomer = async (values: CustomerFormValues) => {
    // await dispatch(
    //   createCustomer({
    //     customerDto: values,
    //   }),
    // );
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
        options={STATUS_OPTIONS}
        control={control}
        name="status"
        errors={errors}
      />
      <NetworkButton
        loading={loading}
        disabled={!isValid || loading}
        onPress={handleSubmit(onCreateOrEditCustomer)}>
        <Text style={{color: 'white'}}>{'Add'}</Text>
      </NetworkButton>
    </ScrollView>
  );
};

export default AddOrEditSalesOpportunity;
