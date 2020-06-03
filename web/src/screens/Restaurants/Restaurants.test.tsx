import React from 'react';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import ThemeProvider from 'styles/themeProvider';
import Header from 'components/Header';
import RestautantList from 'components/RestautantList';
import { mount } from 'enzyme';
import Restaurants from './Restaurants';

describe('Screen: Restaurants', () => {
  it('Should render Header and dashboard', () => {
    const component = mount(
      <Provider store={store}>
        <ThemeProvider>
          <Restaurants />
        </ThemeProvider>
      </Provider>,
    );

    expect(component.find(Header)).toHaveLength(1);
    expect(component.find(RestautantList)).toHaveLength(1);
  });
});
