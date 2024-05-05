import {capitalize} from 'lodash';
import React from 'react';
import {Control, Controller, FieldErrors} from 'react-hook-form';
import {StyleProp, View, ViewStyle} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {CommonStyles} from '../../../styles';
import {CommonColors} from '../../../themes/colors/commonColors';
import {TypographyStyles} from '../../../typography';
import Text from '../../atoms/Text';

type Props = {
  control: Control<any>;
  options: {label: string; value: string}[];
  name: string;
  label: string;
  containerStyle: StyleProp<ViewStyle>;
  errors: FieldErrors;
};

const YupGroupRadioButton = (props: Props) => {
  const {control, options, name, label, containerStyle, errors} = props;
  const errorMessage = errors?.[name]?.message?.toString?.();
  return (
    <Controller
      control={control}
      render={({field: {onChange, value}}) => {
        return (
          <View style={[containerStyle]}>
            <Text
              style={[TypographyStyles.body1, CommonStyles.smallMarginBottom]}>
              {label}
            </Text>
            <RadioButton.Group onValueChange={onChange} value={value}>
              <View style={{flexDirection: 'row'}}>
                {options.map(option => {
                  return (
                    <View key={option.value}>
                      <RadioButton.Item
                        label={option.label}
                        labelVariant="bodyMedium"
                        value={option.value}
                      />
                    </View>
                  );
                })}
              </View>
            </RadioButton.Group>
            {!!errorMessage && (
              <Text
                style={[TypographyStyles.caption1, {color: CommonColors.red}]}>
                {capitalize(errorMessage)}
              </Text>
            )}
          </View>
        );
      }}
      name={name}
    />
  );
};

export default YupGroupRadioButton;
