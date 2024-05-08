import {zIndices} from '@constants/numbers';
import {CommonStyles} from '@src/styles';
import {CommonColors} from '@themes/colors/commonColors';
import {GestureResponderEvent} from 'react-native';
import {FAB as RNPFAB} from 'react-native-paper';

type Props = {
  onPress: (e: GestureResponderEvent) => void;
};

const FAB = (props: Props): React.JSX.Element => {
  const {onPress} = props;
  return (
    <RNPFAB
      style={[
        {
          position: 'absolute',
          zIndex: zIndices.first,
          right: 0,
          bottom: 0,
        },
        CommonStyles.bigMargin,
      ]}
      onPress={onPress}
      icon={'plus'}
      color={CommonColors.black}
    />
  );
};

export default FAB;
