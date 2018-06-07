import { connect } from 'react-redux';
import SignInForm from './SignInForm.jsx';
import { login } from './authentication/actions'

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: formData => {
      console.log('sup');
      dispatch(login(formData));
    }
  };
};

const SignIn = connect(state => state, mapDispatchToProps)(SignInForm);

export default SignIn;
