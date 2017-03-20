import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
//import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import LoginInput from '../../components/LoginInput';
import styles from './LoginApp.css';

import * as LoginActions from './actions';

const validateMatch = (username, password) => username.length === 0 && password.length === 0;

@connect(state => ({
  login: state.login,
}))

export default class LoginApp extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    login: PropTypes.shape({
      error: PropTypes.string.isRequired,
      currentlySending: PropTypes.bool.isRequired,
//      loggedIn: PropTypes.bool.isRequired,
      formState: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
      }),
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      matchError: false,
    };

    this.login = ::this.login;
    this.cleanErrors = ::this.cleanErrors;
    this.onChange = ::this.onChange;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.props.login) !== JSON.stringify(nextProps.login) ||
      this.state.matchError !== nextState.matchError;
  }

  onChange() {
    if (this.state.matchError || this.props.login.error !== '') { this.cleanErrors(); }
  }

  login() {
    const { dispatch } = this.props;
    const actions = bindActionCreators(LoginActions, dispatch);
    const username = this.usernameInput.state.value;
    const password = this.passwordInput.state.value;

    if (validateMatch(username, password)) {
      if (!this.state.matchError) {
        this.setState({ matchError: true });
      }
    } else {
      actions.loginRequest({ username, password });
    }
  }

  cleanErrors() {
    this.setState({ matchError: false });
    const { dispatch } = this.props;
    const actions = bindActionCreators(LoginActions, dispatch);
    actions.clearError();
  }

  render() {
    const loginError = this.props.login.error === 'Unsuccessful HTTP response';

    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginForm}>
          <div className={styles.logoLayout}>
          </div>
          <LoginInput
            ref={(c) => { this.usernameInput = c; }}
            type="text"
            label={'username'}
            loginError={false}
            matchError={this.state.matchError}
            cleanErrors={this.cleanErrors}
            onChange={this.onChange}
          />
          <LoginInput
            ref={(c) => { this.passwordInput = c; }}
            type="password"
            label="password"
            loginError={loginError}
            matchError={this.state.matchError}
            cleanErrors={this.cleanErrors}
            onChange={this.onChange}
          />
          <button
            className={styles.loginBtn}
            onClick={this.login}
          >
            "buttonLogin"
          </button>
        </div>
      </div>
    );
  }
}
