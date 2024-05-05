import {
  GestureResponderEvent,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {CommonColors} from '../../../themes/colors/commonColors';

type Props = {
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  disabledStyle?: StyleProp<ViewStyle>;
  children: React.JSX.Element | React.JSX.Element[];
};

export default function Button(props: Props) {
  const {children, onPress, style, disabled, disabledStyle, ...rest} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        style,
        disabled &&
          !!disabledStyle && [
            {backgroundColor: CommonColors.gray},
            disabledStyle,
          ],
      ]}
      {...rest}>
      {children}
    </TouchableOpacity>
  );
}
