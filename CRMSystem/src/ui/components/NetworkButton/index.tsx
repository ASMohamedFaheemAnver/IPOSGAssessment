import {
  GestureResponderEvent,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import styles from './styles';
import {CommonColors} from '../../../themes/colors/commonColors';
import {CommonStyles} from '../../../styles';
import {IconSizes} from '../../../constants/numbers';

type Props = {
  children: React.JSX.Element;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  disabled?: boolean;
};

export default function NetworkButton(props: Props) {
  const {children, onPress, style, loading, disabled, ...rest} = props;
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        {backgroundColor: colors.primary},
        styles.button,
        CommonStyles.bigPadding,
        CommonStyles.normalRadius,
        style,
        disabled && {backgroundColor: CommonColors.gray},
      ]}
      {...rest}>
      <View style={[CommonStyles.smallMarginRight]}>{children}</View>
      {loading && <ActivityIndicator size={IconSizes.small} />}
    </TouchableOpacity>
  );
}
