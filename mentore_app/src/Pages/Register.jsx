
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [emialError, setEmailError] = useState("");

  const validationEmail = (emailValue) => {
    if (!emailValue.includes("@")) {
      setEmailError("Bhai Email Mai '@' hona jaruri hai");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const isEmailValid = validationEmail(email);
    if (!isEmailValid) return;
    if (password !== conformPassword) {
      toast.error("Password Do Not Match");
      return;
    }

    dispatch({ type: "LOGIN_START" });

    try {
      const { data } = await axiosInstance.post("/user/register", {
        fullName,
        email,
        password,
        conformPassword,
      });
      toast.success(data.message || "Register Success");
      setTimeout(() => navigate("/login"), 1000);
      dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
      dispatch({ type: "LOGIN_FAIL" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <ToastContainer />
      <Card className="w-full max-w-md shadow-xl border-slate-200">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>Enter your details to join NovStock</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} noValidate className="space-y-4">
            <FieldGroup>
              <Field>
                <FieldLabel>Full Name</FieldLabel>
                <Input value={fullName} placeholder="John Doe" onChange={(e) => setFullName(e.target.value)} required />
              </Field>
              
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input 
                  type="email" 
                  value={email} 
                  onChange={(e) => { setEmail(e.target.value); validationEmail(e.target.value); }} 
                  placeholder="m@example.com" 
                  className={emialError ? "border-red-500" : ""}
                  required 
                />
                {emialError && <p className="text-red-600 text-xs mt-1">{emialError}</p>}
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Field>
                <Field>
                  <FieldLabel>Confirm</FieldLabel>
                  <Input type="password" value={conformPassword} onChange={(e) => setConformPassword(e.target.value)} required />
                </Field>
              </div>

              <div className="pt-4 space-y-3">
                <Button className="w-full bg-slate-900 hover:bg-slate-800" type="submit">Create Account</Button>
                <Button variant="outline" className="w-full" type="button">Sign up with Google</Button>
              </div>

              <FieldDescription className="text-center text-sm mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;