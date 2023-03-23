import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { auth, db, provider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { doc } from "firebase/firestore";
import axios from "axios";

export function SignUp() {
  const navitage = useNavigate();
  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const { user } = userCredential;
      const { email } = user;
      axios.post('http://18.143.173.183:8080/auth/signup', {
            email: user.email,
            name: user.displayName,
            password: '123456'
          })
          .then(function (response) {
            console.log('signup thanh cong roi')
            navitage("/auth/sign-in")
          })
          .catch(function (errorSignup) {
            console.log(errorSignup)
          })
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Name" size="lg" />
            <Input type="email" label="Email" size="lg" />
            <Input type="password" label="Password" size="lg" />
            <div className="-ml-2.5">
              <Checkbox label="I agree the Terms and Conditions" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
          <Button variant="gradient" className="mb-4" fullWidth onClick={signInWithGoogle}>
                  Sign In with google
                </Button>
            <Button variant="gradient" fullWidth>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/auth/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignUp;
