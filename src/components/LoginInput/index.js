import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './LoginInput.css';
import { ERROR_MESSAGE_USERNAME, ERROR_MESSAGE_PASSWORD, ERROR_MESSAGE_NOT_MATCH } from './constants';

export default class LoginInput extends Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    matchError: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    loginError: PropTypes.bool.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      value: '',
    };
    this.onInputChange = ::this.onInputChange;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.label !== nextProps.label ||
            this.props.matchError !== nextProps.matchError ||
            this.props.type !== nextProps.type ||
            this.state.value !== nextState.value ||
            this.props.loginError !== nextProps.loginError;
  }

  onInputChange(e) {
    this.setState({
      value: e.target.value,
    });
    this.props.onChange();
  }


  render() {
    const loginError = this.props.loginError;
    const stylesWarning = loginError ? 'loginWarning' : 'loginWarningMatch';
    const stylesWarningArraw = loginError ? 'loginWarningArrow' : 'loginWarningMatchArrow';
    let errorMessage = ERROR_MESSAGE_PASSWORD;

    if (this.props.type === 'text') {
      errorMessage = ERROR_MESSAGE_USERNAME;
    }

    if (loginError) {
      errorMessage = ERROR_MESSAGE_NOT_MATCH;
    }

    const inputStyles = classnames(
      styles.loginInput,
      { [styles.hasError]: loginError || this.props.matchError },
      { [styles.loginError]: loginError },
    );

    return (
      <div className={styles.loginInputItem}>
        <span className={styles.loginLabel}>{this.props.label}</span>
        <input
          type={this.props.type}
          className={inputStyles}
          placeholder={this.props.label}
          onChange={this.onInputChange}
        />
        {(loginError || this.props.matchError) && <div className={styles[stylesWarning]}>
          <div className={styles.loginWarningContainer}>
            <div className={styles.loginWarningMessage}>{errorMessage}</div>
          </div>
          <div className={styles[stylesWarningArraw]} />
        </div>}
      </div>
    );
  }
}
