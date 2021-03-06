// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import ListItemIcon, { styleSheet } from './ListItemIcon';

describe('<ListItemIcon />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a span', () => {
    const wrapper = shallow(
      <ListItemIcon>
        <span />
      </ListItemIcon>,
    );
    assert.strictEqual(wrapper.is('span'), true, 'should be a span');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(
      <ListItemIcon className="foo">
        <span className="bar" />
      </ListItemIcon>,
    );
    assert.strictEqual(wrapper.hasClass('foo'), true, 'should have the "foo" class');
    assert.strictEqual(wrapper.hasClass('bar'), true, 'should have the "bar" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });
});
