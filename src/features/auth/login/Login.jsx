import "dist/css/app.css";

import * as Yup from "yup";

import { FastField, Form, Formik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { setError, setToken } from "app/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";

import InputField from "custom_fields/InputFields/InputField";
import React from "react";
import { Spinner } from "reactstrap";
import logo from "dist/images/logo.svg";
import { useCookies } from "react-cookie";
import userApi from "api/user.api";

function Login() {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This field is require"),
    password: Yup.string().required("This field is require").nullable(),
  });
  const dispatch = useDispatch();
  const loginError = useSelector((state) => state.auth.error);
  const history = useHistory();
  const [, setCookies] = useCookies();

  async function formLogin(value) {
    try {
      const res = await userApi.login(value);
      if (res) {
        setCookies("token", res?.token);
        dispatch(setToken(res?.token));
        dispatch(setError(null));
        history.push("/home");
      }
    } catch (error) {
      dispatch(setError(error.response.data));
    }
  }

  return (
    <div className="w-full min-h-screen p-5 md:p-20 flex items-center justify-center">
      <div className="intro-y auth">
        <img
          className="intro-y mx-auto w-16"
          alt="Topson Messenger Tailwind HTML Admin Template"
          src={logo}
        />
        <div className="intro-y text-gray-700 dark:text-gray-300 text-2xl font-medium text-center mt-16">
          Login to Your Account!
        </div>

        <Formik
          onSubmit={formLogin}
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => {
            return (
              <Form>
                <div className="intro-y box px-5 py-8 mt-8">
                  <div className="intro-y">
                    <FastField
                      name="email"
                      placeholder="abc@example.com"
                      className="form-control py-3 px-4 auth__input intro-y"
                      component={InputField}
                    />
                    <FastField
                      name="password"
                      type="password"
                      placeholder="********"
                      className="form-control py-3 px-4 auth__input intro-y mt-4"
                      component={InputField}
                    />
                  </div>
                  <div className="intro-y text-gray-600 dark:text-gray-300 flex text-xs sm:text-sm mt-4">
                    <div className="flex items-center mr-auto">
                      <input
                        type="checkbox"
                        className="form-check-input border mr-2"
                        id="remember-me"
                      />
                      <label
                        className="cursor-pointer select-none"
                        htmlFor="remember-me"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link to="#">Forgot Password?</Link>
                  </div>
                  <p className="mt-4" style={{ color: "red" }}>
                    {loginError?.message}
                  </p>
                  <div className="intro-y mt-5 xl:mt-8 text-center xl:text-left">
                    <button
                      type="submit"
                      className="btn btn-primary intro-y w-full xl:mr-3"
                    >
                      {isSubmitting && <Spinner size="sm" />} Login
                    </button>

                    <button className="btn btn-outline-secondary intro-y w-full mt-3">
                      Sign up
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
