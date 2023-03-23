import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
export function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.clear();
      console.log("Logged out successfully.");
    };
  
    useEffect(() => {
      handleLogout();
      navigate("/auth/sign-in");
    }, []);

    return (
        <>
        </>
    )

}

export default Logout;