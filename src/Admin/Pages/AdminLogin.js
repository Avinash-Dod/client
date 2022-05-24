import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import './Login_signup.css'
import { useDispatch } from "react-redux";

const AdminLogin=()=>{

    const initialValues = { email: '', password: '' };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
    
    const errors = {};
    const userData = {
      email: formValues.email,
      password: formValues.password
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };
    useEffect(() => {
      // console.log(formErrors);
      if (Object.keys(formErrors).length === 0) {
        // console.log(formValues);
      }
    }, [formErrors]);
    const validate = (values) => {
  
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!values.email) {
        errors.email = "Email is required!";
      }
       else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
      }
      if (!values.password) {
        errors.password = "Password is required!";
      } else if (values.password.length < 6) {
        errors.password = "Password must be more than 6 characters";
      }
  
      return errors;
    };
  
  
  
    function onSubmitHandler(event) {
      event.preventDefault();
      setFormErrors(validate(formValues));
      if (Object.values(errors).length !== 0) {
        return
      }
      else {
        var axios = require('axios');
        var data = JSON.stringify(userData);
  
        var config = {
          method: 'post',
          url: 'http://localhost:5000/admin/login',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
          .then(function (response) {
            sessionStorage.setItem('adminlogin', JSON.stringify(response.data.token))
            sessionStorage.setItem('admin', userData.email)
            
            navigate("/dashboard")
            if(response.status===401)
            {
              alert(response.data.msg)
            }
          })
          .catch(function (error) {
            console.log(error);
            alert("Incorrect Username or Password! login failed")
            navigate("/alogin")
          });
  
        // console.log(userData)
      };
    }
  
    return(
        <>
        <div class="container">
      <div class="row">
          <div class="col-lg-3 col-md-2"></div>
          <div class="col-lg-6 col-md-8 login-box">             
              <div class="col-lg-12 login-title">
                  IMPERIAL ADMIN PANEL
              </div>
              <div class="col-lg-12 login-form">
                  <div class="col-lg-12 login-form">
                      <form  onSubmit={onSubmitHandler} action="post">
                          <div class="form-group">
                              <label class="form-control-label">USERNAME</label>
                              <input type="text" class="form-control" 
                              
                              placeholder="Username" name="email"
                      value={formValues.email}
                      onChange={handleChange} 
                              
                              />
                          </div>
                          <p className='error-message'>{formErrors.email}</p>
                          <div class="form-group">
                              <label class="form-control-label">PASSWORD</label>
                              <input type="password" class="form-control"
                              
                              placeholder="Password" name="password"
                              value={formValues.password}
                              onChange={handleChange} 
                                      
                              
                              />
                          </div>
                          <p className='error-message'>{formErrors.password}</p>
                          <div class="col-lg-12 loginbttm">
                            <button type="submit" class="btn-long"
                            
                            
                            >LOGIN</button>
                          </div>
                      </form>
                  </div>
              </div>
              <div class="col-lg-3 col-md-2"></div>
          </div>
      </div>
  </div>

        </>
    )

}
export default AdminLogin