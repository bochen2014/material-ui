// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import TabIndicator, { styleSheet } from './TabIndicator';

describe('<TabIndicator />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render with the root class', () => {
    const wrapper = shallow(
      <TabIndicator indicatorColor="accent" style={{}} />,
    );
    assert.strictEqual(wrapper.is('div'), true, 'should be a div');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  describe('prop: style', () => {
    it('should be applied on the root element', () => {
      const style = {};
      const wrapper = shallow(
        <TabIndicator indicatorColor="accent" style={style} />,
      );
      assert.strictEqual(wrapper.props().style, style, 'should apply directly the property');
    });
  });

  describe('prop: className', () => {
    it('should append the className on the root element', () => {
      const wrapper = shallow(
        <TabIndicator indicatorColor="accent" style={{}} className="foo" />,
      );
      assert.strictEqual(wrapper.is('div'), true, 'should be a div');
      assert.strictEqual(wrapper.hasClass('foo'), true, 'should have the property class');
    });
  });

  describe('prop: indicatorColor', () => {
    it('should use the style when indicatorColor is a string', () => {
      const indicatorColor = 'blue';
      const wrapper = shallow(
        <TabIndicator indicatorColor={indicatorColor} style={{ foo: 'bar' }} />,
      );

      assert.strictEqual(wrapper.props().style.backgroundColor, indicatorColor);
      assert.strictEqual(wrapper.props().style.foo, 'bar');
    });
  });
});
