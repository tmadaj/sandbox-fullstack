import React from 'react';
import { mount } from 'enzyme';
import Throbber from './Throbber';

describe('Component: Throbber', () => {
  it('Should render 1 div', () => {
    const component = mount(<Throbber />);

    expect(component.find('div')).toHaveLength(1);
  });
});
