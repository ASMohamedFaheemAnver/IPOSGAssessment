import {render} from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';
import React from 'react';
import 'react-native';
import Button from '../';
import Text from '../../Text';

describe('<Button />', () => {
  it('renders children text component correctly', () => {
    const text = 'Test text';
    const {getByText} = render(
      <Button>
        <Text>{text}</Text>
      </Button>,
    );
    expect(getByText(text)).toBeDefined();
  });

  it('renders children text component correctly', () => {
    const text = 'Test text';
    const {getByText} = render(
      <Button disabled>
        <Text>{text}</Text>
      </Button>,
    );
    expect(getByText(text)).toBeDisabled();
  });

  it('renders children text component correctly', () => {
    const text = 'Test text';
    const {getByText} = render(
      <Button disabled>
        <Text>{text}</Text>
      </Button>,
    );
    expect(getByText(text)).toBeDisabled();
  });

  test('Button custom style', () => {
    const text = 'Test text';
    const id = 'buttonId';
    const customStyle = {backgroundColor: 'blue', padding: 10};
    const {getByTestId} = render(
      <Button style={customStyle} testID={id}>
        <Text>{text}</Text>
      </Button>,
    );
    const button = getByTestId(id);
    expect(button).toHaveStyle(customStyle);
  });
});
