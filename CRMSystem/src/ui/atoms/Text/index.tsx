import {TypographyStyles} from '@src/typography';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {Text as RnPText} from 'react-native-paper';

type Props = {
  children: React.JSX.Element | string | undefined;
  style?: StyleProp<TextStyle> | undefined;
};

// Note: Thinking about using react-native-paper here
function Text(props: Props): React.JSX.Element {
  const {children, style, ...rest} = props;
  return (
    <RnPText style={[TypographyStyles.body1, style]} {...rest}>
      {children}
    </RnPText>
  );
}

Text.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Text;
