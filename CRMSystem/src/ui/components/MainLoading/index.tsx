import {Paddings} from '@constants/numbers';
import {CommonStyles} from '@src/styles';
import {FontWeights, TypographyStyles} from '@src/typography';
import Text from '@ui/atoms/Text';
import {ActivityIndicator, View} from 'react-native';

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
