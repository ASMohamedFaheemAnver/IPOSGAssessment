import {render} from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';
import React from 'react';
import 'react-native';
import Text from '../';

describe('<Text />', () => {
  it('renders children text correctly', () => {
    const text = 'Test text';
    const {getByText} = render(<Text>{text}</Text>);
    expect(getByText(text)).toBeDefined();
  });

  it('applies provided style correctly', () => {
    const text = 'Test text';
    const {getByText} = render(<Text style={{fontSize: 16}}>{text}</Text>);
    expect(getByText(text)).toHaveStyle({fontSize: 16});
  });
});
