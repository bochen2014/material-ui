// @flow weak
/* eslint-env mocha */

import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import Checkbox, { LabelCheckbox, styleSheet } from './Checkbox';

describe('<Checkbox />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  describe('styleSheet', () => {
    it('should have the classes required for SwitchBase', () => {
      assert.strictEqual(typeof classes.default, 'string');
      assert.strictEqual(typeof classes.checked, 'string');
      assert.strictEqual(typeof classes.disabled, 'string');
    });
  });

  describe('default Checkbox export', () => {
    it('should be a SwitchBase with the displayName set for debugging', () => {
      assert.strictEqual(Checkbox.name, 'SwitchBase');
      assert.strictEqual(Checkbox.displayName, 'Checkbox');
    });
  });

  describe('named LabelCheckbox export', () => {
    it('should be Checkbox wrapped with SwitchLabel', () => {
      assert.strictEqual(LabelCheckbox.name, 'SwitchLabel');
      assert.strictEqual(LabelCheckbox.displayName, 'withSwitchLabel(Checkbox)');
    });
  });
});
