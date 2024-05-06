import {useState} from 'react';
import {Animated, StyleProp, ViewStyle} from 'react-native';
import {Searchbar as RNPSearchBar, useTheme} from 'react-native-paper';
import {Heights} from '../../../constants/numbers';
import {CommonStyles} from '../../../styles';
import {CommonColors} from '../../../themes/colors/commonColors';
import {TypographyStyles} from '../../../typography';

type Props = {
  placeholder?: string;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  onChangeText?: (query: string) => void;
};

const SearchBar = (props: Props) => {
  const {placeholder, style, onChangeText} = props;
  const {colors} = useTheme();

  const [value, setValue] = useState('');

  return (
    <RNPSearchBar
      style={[
        CommonStyles.normalRadius,
        CommonStyles.normalBorderWidth,
        {
          backgroundColor: colors.background,
          height: Heights.commonInput,
        },
        style,
      ]}
      iconColor={colors.primary}
      placeholder={placeholder}
      placeholderTextColor={CommonColors.gray}
      inputStyle={[TypographyStyles.body1]}
      onChangeText={text => {
        setValue(text);
        onChangeText?.(text);
      }}
      value={value}
    />
  );
};

export default SearchBar;
