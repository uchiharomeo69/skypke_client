import { ErrorMessage } from "formik";
import { FormFeedback } from "reactstrap";
import PropTypes from "prop-types";
import React from "react";

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  disable: PropTypes.bool,
};

InputField.defaultProps = {
  type: "text",
  placeholder: "",
  className: "",
  disable: false,
};

function InputField({
  field,
  className,
  form,
  type,
  placeholder,
  disable,
  autoComplete1,
}) {
  const { name } = field;
  const isError = form.errors[name] && form.touched[name];
  className += isError ? " is-invalid" : "";
  return (
    <div>
      <input
        autoComplete={autoComplete1 ? "on" : "new-password"}
        id={name}
        {...field}
        type={type}
        className={className}
        placeholder={placeholder}
        disabled={disable}
      />
      <ErrorMessage name={name} component={FormFeedback} />
    </div>
  );
}

export default InputField;
