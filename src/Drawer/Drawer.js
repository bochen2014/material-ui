// @flow weak

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import Modal from '../internal/Modal';
import customPropTypes from '../utils/customPropTypes';
import Slide from '../transitions/Slide';
import Paper from '../Paper';

function getSlideDirection(anchor) {
  if (anchor === 'left') {
    return 'right';
  } else if (anchor === 'right') {
    return 'left';
  } else if (anchor === 'top') {
    return 'down';
  } else if (anchor === 'bottom') {
    return 'up';
  }

  return 'left';
}

export const styleSheet = createStyleSheet('Drawer', (theme) => {
  return {
    paper: {
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      flex: '1 0 auto',
      position: 'fixed',
      top: 0,
      zIndex: theme.zIndex.navDrawer,
      willChange: 'transform',
      '&:focus': {
        outline: 'none',
      },
      WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
    },
    docked: {
      flex: '0 0 auto',
      '& $paper': {
        borderRight: `1px solid ${theme.palette.text.divider}`,
      },
    },
    modal: {
    },
  };
});

/**
 * This is a drawer.
 */
export default class Drawer extends Component {
  static propTypes = {
    anchor: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
    /**
     * The contents of the `Drawer`.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * If set to true, the drawer will dock itself
     * and will no longer slide in with an overlay.
     */
    docked: PropTypes.bool,
    open: PropTypes.bool,
    /**
     * The CSS class name of the paper element.
     */
    paperClassName: PropTypes.string,
    zDepth: PropTypes.number,
  };

  static defaultProps = {
    docked: false,
    open: false,
    zDepth: 16,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  render() {
    const {
      anchor: anchorProp,
      children,
      className,
      docked,
      open,
      paperClassName,
      zDepth,
      ...other
    } = this.props;

    const { theme: { dir }, render } = this.context.styleManager;
    const classes = render(styleSheet);
    const rtl = dir === 'rtl';
    const anchor = anchorProp || (rtl ? 'right' : 'left');
    const slideDirection = getSlideDirection(anchor);

    const drawer = (
      <Slide in={open} direction={slideDirection} transitionAppear>
        <Paper
          zDepth={docked ? 0 : zDepth}
          rounded={false}
          className={classNames(classes.paper, paperClassName)}
        >
          {children}
        </Paper>
      </Slide>
    );

    const containerProps = {
      className: classNames(classes.modal, className),
      ...other,
    };

    if (docked) {
      return (
        <div className={classNames(classes.docked, className)}>
          {drawer}
        </div>
      );
    }

    return (
      <Modal {...containerProps} show={open}>
        {drawer}
      </Modal>
    );
  }
}
