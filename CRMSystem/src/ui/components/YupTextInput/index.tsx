import {Control, Controller, FieldErrors} from 'react-hook-form';
import {KeyboardTypeOptions, StyleProp, ViewStyle} from 'react-native';
import TextInput from '../TextInput';

type Props = {
  control: Control<any>;
  name: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  containerStyle: StyleProp<ViewStyle>;
  errors: FieldErrors;
};

function YupTextInput(props: Props) {
  const {
    control,
    name,
    placeholder,
    secureTextEntry,
    keyboardType,
    containerStyle,
    errors,
  } = props;
  return (
    <Controller
      control={control}
      render={({field: {onChange, onBlur, value}}) => {
        return (
          <TextInput
            containerStyle={containerStyle}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            valid={!errors?.[name]}
            errorMessage={errors?.[name]?.message?.toString?.()}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
          />
        );
      }}
      name={name}
    />
  );
}

export default YupTextInput;
