import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link, Redirect } from "react-router-dom";
import { signin } from "../auth";

const Signin = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });
  const { email, password, loading, error, redirectToReferrer } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          redirectToReferrer: true,
        });
      }
    });
  };
  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          onChange={handleChange("email")}
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          onChange={handleChange("password")}
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? " " : "none" }}
      >
        {error}
      </div>
    );
  };

  const snowLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>loading...</h2>
      </div>
    );
  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to="/" />;
    }
  };

  return (
    <div>
      <Layout
        title="SignUp Page"
        description="Node React E-commerce App"
        className="container col-md-8 offset-md-2"
      >
        {snowLoading()}
        {showError()}
        {signUpForm()}
        {redirectUser()}
      </Layout>
    </div>
  );
};

export default Signin;
