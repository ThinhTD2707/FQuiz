import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, db, provider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import axios from "axios";
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
import { ToastContainer, toast } from 'react-toastify';


export function SignIn() {
  const navitage = useNavigate();
  
  const [value, setValue] = useState("");
  const accessToken = localStorage.getItem('token');
  const headerAxios = {
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:5173',
      'accept': '*/*',
      'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization'
    }
  };
  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const { user } = userCredential;
      // const name = user.displayName;
      // console.log(user)
      // const { email } = user;
      console.log(user.displayName)
      console.log(user.email)

      // const usersCollectionRef = doc(db, "users", user.uid);
      // await setDoc(usersCollectionRef, {
      //    img: user.photoURL,
      //    timeStamp: serverTimestamp()
      //   });
      //   navitage(-1)

      axios.post('http://18.143.173.183:8080/auth/login', {
        email: user.email,
        password: '123456'
      },headerAxios
      )
        .then(function (response) {
          console.log(response)
          console.log('Login thanh cong roi')
          const token = response.data.accessToken;
          const tokenType = response.data.tokenType;
          localStorage.setItem('token', tokenType + " " + token);
          localStorage.setItem("user", JSON.stringify(user));
          toast.success('Log in Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            setTimeout(function () {
              navitage('/dashboard/home');
            }, 5000);
          // console.log(response)
        })
        .catch(function (error) {
          console.log("dang nhap k thanh cong, cho dang ky")
          axios.post('http://18.143.173.183:8080/auth/signup', {
            email: user.email,
            name: user.displayName,
            password: '123456'
          })
            .then(function (response) {
              console.log(response)
              console.log('signup thanh cong roi')
              navitage("/auth/sign-in")
              // const token = response.data.accessToken;
              // const tokenType = response.data.tokenType;
              // localStorage.setItem('token', tokenType + " " + token);
              // localStorage.setItem("user", JSON.stringify(user));
              // console.log(response)
            })
            .catch(function (errorSignup) {
              console.log(errorSignup)
            })
        });


      // const usersCollectionRef = doc(db, "users", user.uid);
      // await setDoc(usersCollectionRef, {
      //    email, googleAuth: true,
      //    img: data.img,
      //   });
      // localStorage.setItem("user", JSON.stringify(user));
      // rtn.setGlobal({ user: JSON.parse(JSON.stringify(user)) });
      // rtn.user = JSON.parse(JSON.stringify(user));
      // console.log('check login ' + usersCollectionRef)

    } catch (error) {
      console.log("error: ", error);
    }
  };
  const nav = useNavigate();
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">

          <form>
            <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
              <CardHeader
                variant="gradient"
                color="blue"
                className="mb-4 grid h-28 place-items-center"
              >
                <Typography variant="h3" color="white">
                  Sign In
                </Typography>
              </CardHeader>
              <CardBody className="flex flex-col gap-4">
                <Input name="name" type="email" label="Email" size="lg" />
                <Input name="password" type="password" label="Password" size="lg" />
                <div className="-ml-2.5">
                  <Checkbox label="Remember Me" />
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                <Button variant="gradient" className="mb-4" fullWidth onClick={signInWithGoogle}>
                  Sign In with google
                </Button>
                <Button variant="gradient" fullWidth>
                  Sign In
                </Button>
                <Typography variant="small" className="mt-6 flex justify-center">
                  Don't have an account?
                  <Link to="/auth/sign-up">
                    <Typography
                      as="span"
                      variant="small"
                      color="blue"
                      className="ml-1 font-bold"
                    >
                      Sign up
                    </Typography>
                  </Link>
                </Typography>
              </CardFooter>
            </Card>
            <ToastContainer/>
          </form>
      </div>
    </>
  );
}

export default SignIn;
