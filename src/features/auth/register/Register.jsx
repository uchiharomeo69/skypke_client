import * as Yup from "yup";

import { FastField, Form, Formik } from "formik";
import React, { useState } from "react";

import InputField from "custom_fields/InputFields/InputField";
import { Spinner } from "reactstrap";
import logo from "dist/images/logo.svg";
import { useHistory } from "react-router-dom";
import userApi from "api/user.api";

function Register() {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, "Name too short")
      .max(30, "Name too long")
      .required("This field is require"),

    email: Yup.string()
      .email("Invalid Email")
      .required("This field is require"),
    password: Yup.string().required("This field is require"),
    re_password: Yup.string()
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.password === value;
      })
      .required("This field is require"),
  });
  const history = useHistory();
  const [error, setError] = useState(null);
  const [res, setRes] = useState(null);
  async function formRegister(value) {
    try {
      const res = await userApi.register(value);
      if (res) {
        setError(null);
        setRes({
          message:
            "Check email to active account \n. (Nếu không nhận được mail (534-5.7.14 eror) vẫn đăng nhập được )",
        });
      }
    } catch (error) {
      setError(error.response.data);
    }
  }

  return (
    <>
      <div className="w-full min-h-screen p-5 md:p-20 flex items-center justify-center">
        <div className="intro-y auth">
          <img
            className="intro-y mx-auto w-16"
            alt="Topson Messenger Tailwind HTML Admin Template"
            src={logo}
          />
          <div className="intro-y text-gray-700 dark:text-gray-300 text-2xl font-medium text-center mt-16">
            Register New Account
          </div>
          <Formik
            className="intro-y box px-5 py-8 mt-8"
            onSubmit={formRegister}
            initialValues={{
              email: "",
              password: "",
              name: "",
              re_password: "",
            }}
            validationSchema={validationSchema}
          >
            {({ isSubmitting }) => {
              return (
                <Form autoComplete="new-password">
                  <div className="intro-y box px-5 py-8 mt-8">
                    <div className="intro-y">
                      <FastField
                        name="name"
                        placeholder="Enter your name"
                        autocomplete="off"
                        className="form-control py-3 px-4 auth__input intro-y mt-4"
                        component={InputField}
                      />
                      <FastField
                        name="email"
                        autoComplete1={true}
                        placeholder="abc@example.com"
                        autocomplete="new-password"
                        className="form-control py-3 px-4 auth__input intro-y mt-4"
                        component={InputField}
                      />
                      <FastField
                        name="password"
                        type="password"
                        placeholder="********"
                        autocomplete="off"
                        className="form-control py-3 px-4 auth__input intro-y mt-4"
                        component={InputField}
                      />
                      <FastField
                        name="re_password"
                        type="password"
                        placeholder="********"
                        autocomplete="off"
                        className="form-control py-3 px-4 auth__input intro-y mt-4"
                        component={InputField}
                      />
                    </div>
                    <div className="intro-x flex items-center text-gray-700 dark:text-gray-600 mt-4 text-xs sm:text-sm">
                      <input
                        type="checkbox"
                        className="form-check-input border mr-2"
                        id="remember-me"
                      />
                      <label
                        className="cursor-pointer select-none"
                        htmlFor="remember-me"
                      >
                        I agree to the Envato
                      </label>
                      <a
                        className="text-theme-1 dark:text-theme-10 ml-1"
                        href="#"
                      >
                        Privacy Policy
                      </a>
                      .
                    </div>
                    <p className="mt-4" style={{ color: "red" }}>
                      {error?.message}
                    </p>
                    <p className="mt-4" style={{ color: "green" }}>
                      {res?.message}
                    </p>
                    <div className="intro-y mt-5 xl:mt-8 text-center xl:text-left">
                      <button
                        type="submit"
                        className="btn btn-primary intro-y w-full xl:mr-3"
                      >
                        {isSubmitting && <Spinner size="sm" />} Register
                      </button>

                      <button
                        onClick={() => {
                          history.push("/login");
                        }}
                        className="btn btn-outline-secondary intro-y w-full mt-3"
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default Register;
