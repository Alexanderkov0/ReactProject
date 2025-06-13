//controlled component

import React, { useState } from 'react';
import { Form } from "../loginPages/Form";
import { Button } from "../ui/Button";

export function FormControlledComponent({
  fields = [
    { name: "email", type: "text", placeholder: "Enter your email" },
    { name: "password", type: "password", placeholder: "Enter your password" }
  ],
  initialValues = {},
  onSubmit,
  buttonText = "Submit",
  generalError= ""
}) {
  const [inputValue, setInputValue] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: initialValues[field.name] || "" }), {})
  );
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};
    fields.forEach(field => {
      const value = inputValue[field.name];
      if (!value) {
        newErrors[field.name] = "This field is required";
      } else if (field.type === "email") {
        // Simple email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.name] = "Invalid email format";
        }
      }
      // Add more type checks if needed (e.g., password length)
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e) {
    const { value, name } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); // Clear error on change
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      if (onSubmit) onSubmit(inputValue);
    }
  }

  return (
    <Form>
      {fields.map((field) => (
        <div key={field.name}>
          <input
            name={field.name}
            type={field.type}
            value={inputValue[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className={`input-field form-control mb-3 validate${errors[field.name] ? " is-invalid" : ""}`}
            required
          />
          {errors[field.name] && (
            <div className="text-danger mb-2" style={{ fontSize: "0.9rem" }}>
              {errors[field.name]}
            </div>
          )}
        </div>
      ))}
      {/* Show general error below the fields */}
      {generalError && (
        <div className="text-danger mb-3" style={{ fontWeight: "bold" }}>
          {generalError}
        </div>
      )}
      <Button className="button btn btn-dark w-100" onClick={handleSubmit}>
        {buttonText}
      </Button>
    </Form>
  );
}