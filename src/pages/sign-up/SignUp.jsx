import Input from "../../components/modal/input/Input";

const SignUp = () => {
  return (
    <form>
      <Input
        name="email"
        type="email"
        // error={data.emailError}
        // errorType={data.emailErrorType}
        // reff={emailRef}
      ></Input>
      <Input
        name="username"
        type="username"
        // error={data.emailError}
        // errorType={data.emailErrorType}
        // reff={emailRef}
      ></Input>
      <Input
        name="password"
        type="password"
        // error={data.emailError}
        // errorType={data.emailErrorType}
        // reff={emailRef}
      ></Input>
    </form>
  );
};

export default SignUp;
