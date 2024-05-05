import {ActivityIndicator, View} from 'react-native';
import {CommonStyles} from '../../../styles';
import Text from '../../atoms/Text';
import {FontWeights, TypographyStyles} from '../../../typography';
import {Paddings} from '../../../constants/numbers';

type Props = {
  label: string;
};

const MainLoading = (props: Props) => {
  const {label} = props;

  return (
    <View
      style={[
        {
          flex: 1,

          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <Text
        style={[
          TypographyStyles.header,
          CommonStyles.smallMarginBottom,
          {
            fontWeight: FontWeights.bold,
          },
        ]}>
        {label}
      </Text>
      <ActivityIndicator style={[{padding: Paddings.small}]} size={'small'} />
    </View>
  );
};

export default MainLoading;
