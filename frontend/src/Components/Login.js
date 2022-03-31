import React from "react";

function Login() {
    
  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="login-section p-5">
            <form onSubmit={handleSubmit}>
              <div class="form-outline mb-4">
                <label class="form-label" for="form2Example1">
                  Email address
                </label>
                <input
                  type="email"
                  id="form2Example1"
                  class="form-control"
                  autoFocus
                  placeholder="Enter email..."
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" for="form2Example2">
                  Password
                </label>
                <input
                  type="password"
                  id="form2Example2"
                  class="form-control"
                  placeholder="Enter password..."
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  class="btn btn-outline-primary  btn-block mb-4"
                >
                  Sign in
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger mx-3  btn-block mb-4"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
