import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {IconSizes} from '../../../constants/numbers';
import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';
import styles from './styles';

type Props = {
  iconName: string;
  iconStyle?: StyleProp<TextStyle>;
  iconType?: string;
  size?: number;
  buttonStyle?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function IconButton(props: Props) {
  const {onPress, iconName, iconStyle, iconType, buttonStyle} = props;

  return (
    <Button style={[styles.button, buttonStyle]} onPress={onPress}>
      <Icon
        style={[iconStyle]}
        name={iconName}
        type={iconType}
        size={IconSizes.normal}
      />
    </Button>
  );
}
