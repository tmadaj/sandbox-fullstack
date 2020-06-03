import React from 'react';
import { mount } from 'enzyme';
import Layout from './Layout';

describe('Component: Layout', () => {
  it('Should render just Viewport whithout any children passed', () => {
    const component = mount(<Layout />);

    expect(component.find('div')).toHaveLength(1);
  });
  it('Should render children', () => {
    const component = mount(
      <Layout>
        <p>dummy</p>
      </Layout>,
    );

    expect(component.find('p')).toHaveLength(1);
  });
});
