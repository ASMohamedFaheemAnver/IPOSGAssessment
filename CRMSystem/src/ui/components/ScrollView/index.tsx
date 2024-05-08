import {Paddings} from '@constants/numbers';
import {CommonStyles} from '@src/styles';
import {ScrollView as RNScrollView, View} from 'react-native';

type Props = {
  children: React.JSX.Element[];
};

const ScrollView = (props: Props) => {
  const {children, ...rest} = props;
  return (
    <RNScrollView
      contentContainerStyle={[{padding: Paddings.big}]}
      keyboardShouldPersistTaps={'handled'}
      {...rest}>
      {children}
      <View style={[CommonStyles.scrollViewBottomSpace]}></View>
    </RNScrollView>
  );
};

export default ScrollView;
