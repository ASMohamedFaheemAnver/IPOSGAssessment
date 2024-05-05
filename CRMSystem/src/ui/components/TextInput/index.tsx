import {capitalize} from 'lodash';
import {LegacyRef, useState} from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInput as RnTextInput,
  StyleProp,
  TextInputChangeEventData,
  TextInputFocusEventData,
  TextInputKeyPressEventData,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Text from '../../atoms/Text';
import styles from './styles';
import {CommonStyles} from '../../../styles';
import {CommonColors} from '../../../themes/colors/commonColors';
import {IconSizes} from '../../../constants/numbers';
import {TypographyStyles} from '../../../typography';
import IconButton from '../IconButton';

type Props = {
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (text: string) => void;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  value?: string;
  containerStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  textRef?: LegacyRef<any>;
  maxLength?: number;
  onKeyPress?: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
  valid?: boolean;
  errorMessage?: string;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  multiline?: boolean;
};

function TextInput(props: Props) {
  const {
    placeholder,
    secureTextEntry,
    keyboardType,
    onChangeText,
    onChange,
    value,
    containerStyle,
    wrapperStyle,
    textInputStyle,
    onBlur,
    textRef,
    maxLength,
    onKeyPress,
    valid = true,
    errorMessage,
    onFocus,
    multiline,
  } = props;

  const [secure, setSecure] = useState<boolean>(!!secureTextEntry);

  const toggleSecure = () => {
    setSecure(prevValue => !prevValue);
  };

  return (
    <View style={[containerStyle]}>
      <View
        style={[
          styles.container,
          CommonStyles.normalRadius,
          CommonStyles.normalBorderWidth,
          !valid && {borderColor: CommonColors.red},
          wrapperStyle,
        ]}>
        <RnTextInput
          multiline={multiline}
          ref={textRef}
          style={[
            styles.textInput,
            CommonStyles.bigPaddingLeft,
            textInputStyle,
          ]}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor={CommonColors.gray}
          secureTextEntry={secure}
          keyboardType={keyboardType}
          onChange={onChange}
          value={value}
          onChangeText={
            onChangeText ? text => onChangeText?.(text) : onChangeText
          }
          onKeyPress={onKeyPress}
          maxLength={maxLength}
          onFocus={onFocus}
        />
        {secureTextEntry && (
          <View style={[styles.iconContainer]}>
            {secure ? (
              <IconButton
                iconStyle={[{fontSize: IconSizes.normal}]}
                onPress={toggleSecure}
                iconName={'eye'}
              />
            ) : (
              <IconButton
                iconStyle={[{fontSize: IconSizes.normal}]}
                onPress={toggleSecure}
                iconName={'eye-slash'}
              />
            )}
          </View>
        )}
      </View>
      {!!errorMessage && (
        <Text style={[TypographyStyles.caption1, {color: CommonColors.red}]}>
          {capitalize(errorMessage)}
        </Text>
      )}
    </View>
  );
}
export default TextInput;
