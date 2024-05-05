import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {IconSizes, Paddings} from '../../../constants/numbers';
import {TypographyStyles} from '../../../typography';
import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';
import Text from '../../atoms/Text';

type Props = {
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  iconName: string;
  iconStyle?: StyleProp<TextStyle>;
  iconType?: string;
  loading?: boolean;
  label?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
};

export default function NetworkIconButton(props: Props) {
  const {
    onPress,
    iconName,
    iconStyle,
    disabled,
    iconType,
    loading,
    label,
    buttonStyle,
    indicatorStyle,
  } = props;
  return (
    <Button
      disabled={disabled}
      style={[buttonStyle]}
      onPress={onPress}
      disabledStyle={[{backgroundColor: 'transparent'}]}>
      {loading ? (
        <ActivityIndicator
          style={[{padding: Paddings.small}, indicatorStyle]}
          size={IconSizes.small}
        />
      ) : (
        <Icon
          style={[iconStyle]}
          name={iconName}
          type={iconType}
          size={IconSizes.normal}
        />
      )}
      <Text style={[TypographyStyles.body1]}>{label}</Text>
    </Button>
  );
}
