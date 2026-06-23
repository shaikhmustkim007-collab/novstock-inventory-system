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
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const { data } = await axiosInstance.post("/user/login", {
        email,
        password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
      toast.success(data.message || "Login successful!");
      setTimeout(() => navigate("/home"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      dispatch({ type: "LOGIN_FAIL" });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-50">
      <ToastContainer />
      <Card className="w-full max-w-sm shadow-xl border-slate-200">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome Back
          </CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <FieldGroup>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  value={email}
                  placeholder="name@company.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <div className="flex items-center justify-between mb-1.5">
                  <FieldLabel>Password</FieldLabel>
                  <Link
                    to="/"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  type="password"
                  value={password}
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>

              <div className="pt-2 space-y-3">
                <Button
                  className="w-full bg-slate-900 hover:bg-slate-800"
                  type="submit"
                  disabled={state.loading}
                >
                  {state.loading ? "Authenticating..." : "Sign in"}
                </Button>
                <Button variant="outline" className="w-full" type="button">
                  Login with Google
                </Button>
              </div>

              <FieldDescription className="text-center text-sm pt-2">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Sign up
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
