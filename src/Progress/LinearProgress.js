// @flow weak

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('LinearProgress', (theme) => {
  const { palette } = theme;
  const transitionDuration = 4; // 400ms

  return {
    root: {
      position: 'relative',
      overflow: 'hidden',
      height: 5,
      backgroundColor: palette.primary[100],
    },
    rootBuffer: {
      backgroundColor: 'transparent',
    },
    rootQuery: {
      transform: 'rotate(180deg)',
    },
    bar: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      top: 0,
      transition: 'transform 0.2s linear',
      backgroundColor: palette.primary[500],
    },
    dashed: {
      position: 'absolute',
      marginTop: 0,
      height: '100%',
      width: '100%',
      background:
        `radial-gradient(${palette.primary[100]} 0%, ${palette.primary[100]} 16%, transparent 42%)`,
      backgroundSize: '10px 10px',
      backgroundPosition: '0px -23px',
      animation: 'buffer 3s infinite linear',
    },
    indeterminateBar1: {
      willChange: 'left, right',
      animation: 'indeterminate-1 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite',
    },
    indeterminateBar2: {
      willChange: 'left, right',
      animation: 'indeterminate-2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite',
      animationDelay: '1.15s',
    },
    determinateBar1: {
      willChange: 'width',
      transition: `width .${transitionDuration}s linear`,
    },
    determinateBar2: {
      display: 'none',
    },
    bufferBar1: {
      transition: `width .${transitionDuration}s linear`,
      backgroundColor: palette.primary[100],
    },
    bufferBar2: {
      transition: `width .${transitionDuration}s linear`,
    },
    '@keyframes indeterminate-1': {
      '0%': {
        left: '-35%',
        right: '100%',
      },
      '60%': {
        left: '100%',
        right: '-90%',
      },
      '100%': {
        left: '100%',
        right: '-90%',
      },
    },
    '@keyframes indeterminate-2': {
      '0%': {
        left: '-200%',
        right: '100%',
      },
      '60%': {
        left: '107%',
        right: '-8%',
      },
      '100%': {
        left: '107%',
        right: '-8%',
      },
    },
    '@keyframes buffer': {
      '0%': {
        opacity: 1,
        backgroundPosition: '0px -23px',
      },
      '50%': {
        opacity: 0,
        backgroundPosition: '0px -23px',
      },
      '100%': {
        opacity: 1,
        backgroundPosition: '-200px -23px',
      },
    },
    '@keyframes query': {
      '0%': {
        opacity: 1,
        transform: 'translateX(35%) scale(.3, 1)',
      },
      '100%': {
        opacity: 0,
        transform: 'translateX(-50%) scale(0, 1)',
      },
    },
  };
});

export default class LinearProgress extends Component {
  static propTypes = {
    className: PropTypes.string,
    /**
     * The mode of show your progress, indeterminate
     * for when there is no value for progress.
     */
    mode: PropTypes.oneOf(['determinate', 'indeterminate', 'buffer', 'query']),
    /**
     * The value of progress, only works in determinate and buffer mode.
     */
    value: PropTypes.number,
    /**
     * The value of buffer, only works in buffer mode.
     */
    valueBuffer: PropTypes.number,
  };

  static defaultProps = {
    mode: 'indeterminate',
    value: 0,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  render() {
    const {
      className,
      mode,
      value,
      valueBuffer,
      ...other
    } = this.props;
    const classes = this.context.styleManager.render(styleSheet);
    const rootClasses = classNames(classes.root, {
      [classes.rootBuffer]: mode === 'buffer',
      [classes.rootQuery]: mode === 'query',
    }, className);
    const dashedClasses = classNames({
      [classes.dashed]: mode === 'buffer',
    });
    const bar1Classes = classNames(classes.bar, {
      [classes.indeterminateBar1]: mode === 'indeterminate' || mode === 'query',
      [classes.determinateBar1]: mode === 'determinate',
      [classes.bufferBar1]: mode === 'buffer',
    });
    const bar2Classes = classNames(classes.bar, {
      [classes.indeterminateBar2]: mode === 'indeterminate' || mode === 'query',
      [classes.determinateBar2]: mode === 'determinate',
      [classes.bufferBar2]: mode === 'buffer',
    });
    const styles = { bar1: {}, bar2: {} };

    if (mode === 'determinate') {
      styles.bar1.width = `${value}%`;
    } else if (mode === 'buffer') {
      styles.bar1.width = `${valueBuffer}%`;
      styles.bar2.width = `${value}%`;
    }

    return (
      <div className={rootClasses} {...other}>
        <div className={dashedClasses} />
        <div className={bar1Classes} style={styles.bar1} />
        <div className={bar2Classes} style={styles.bar2} />
      </div>
    );
  }
}
