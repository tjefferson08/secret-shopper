import { connect } from 'react-redux';
import SignUpForm from './SignUpForm.jsx';
import { registerUser } from './registration/actions';

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: formData => {
      dispatch(registerUser(formData));
    }
  };
};

const SignUp = connect(state => state, mapDispatchToProps)(SignUpForm);

export default SignUp;
