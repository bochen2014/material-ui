// @flow weak

import { PropTypes, cloneElement, Component } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('ListItemIcon', () => {
  return {
    root: {
      width: 40,
    },
  };
});

export default class ListItemIcon extends Component {
  render() {
    const {
      children,
      className: classNameProp,
      ...other
    } = this.props;
    const classes = this.context.styleManager.render(styleSheet);

    return cloneElement(children, {
      className: classNames(classes.root, classNameProp, children.props.className),
      ...other,
    });
  }
}

ListItemIcon.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
};

ListItemIcon.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
