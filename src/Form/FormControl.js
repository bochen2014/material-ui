// @flow weak

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('FormControl', () => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    },
    row: {
      flexDirection: 'row',
    },
  };
});

/**
 * FormControl - provides context such as dirty/focused/error/required for form inputs
 */
export default class FormControl extends Component {
  static propTypes = {
    /**
     * The contents of the `FormControl`.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Whether the label should be displayed in an error state.
     */
    error: PropTypes.bool,
    required: PropTypes.bool,
  };

  static defaultProps = {
    error: false,
    required: false,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  static childContextTypes = {
    muiFormControl: PropTypes.object.isRequired,
  };

  state = {
    dirty: false,
    focused: false,
  };

  getChildContext() {
    const { error, required } = this.props;
    const { dirty, focused } = this.state;

    return {
      muiFormControl: {
        dirty,
        error,
        focused,
        required,
        onDirty: this.handleDirty,
        onClean: this.handleClean,
      },
    };
  }

  handleFocus = () => {
    if (!this.state.focused) {
      this.setState({ focused: true });
    }
  };

  handleBlur = () => {
    if (this.state.focused) {
      this.setState({ focused: false });
    }
  };

  handleDirty = () => {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  };

  handleClean = () => {
    if (this.state.dirty) {
      this.setState({ dirty: false });
    }
  };

  render() {
    const {
      children,
      className,
      error, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);

    return (
      <div
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        className={classNames(classes.root, className)}
        {...other}
      >
        {children}
      </div>
    );
  }
}
