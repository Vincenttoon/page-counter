import "./SignupButton.scss";

const SignupButton = props => {
  return (
    <button onClick={props.onClick}>
      <a>{props.children}</a>
    </button>
  );
};

export default SignupButton;
