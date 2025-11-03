import React, { useState } from 'react';
import styles from './Login.module.scss';
import { Form, Formik } from 'formik';
import * as Yup from "yup";
import { REQUIRED } from '../../utils/constant';
import { mobileRegex } from '../../utils/regex';
import { LOGIN } from '../../services/apiEndPoints';
import { post } from "../../services/publicRequest";
import { Button, TextField, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Spinner from '../../components/spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import toast from '../../components/toast/toast';

function Login({ setToken }) {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const initialValues = {
    phone: "",
    password: ""
  };

  const validationSchema = Yup.object({
    phone: Yup
      .string()
      .required(REQUIRED)
      .matches(mobileRegex, "Please Enter Valid Mobile Number"),
    password: Yup
      .string()
      .required(REQUIRED)
  });

  const handleChange = (e, name, setFieldValue) => {
    if (name === "phone") {
      const re = /^[0-9\b]+$/;
      if ((e.target.value === '' || re.test(e.target.value)) && e.target.value.length <= 10) {
        setFieldValue(name, e.target.value);
      }
    } else {
      setFieldValue(name, e.target.value);
    }
  };

  const handleBlur = (name, touched, setTouched) => {
    setTouched({
      ...touched,
      [name]: true
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword); 
  };

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    const res = await post(LOGIN, {
      Username: values.phone,
      Password: values.password
    });
    if (res) {
      if (res?.data?.success) {
        toast.success("Login Successful");
        localStorage.setItem("token", btoa(values.phone + ":" + values.password));
        localStorage.setItem("userId", res?.data?.userDetail?.data?.UserId);
        localStorage.setItem("userName", res?.data?.userDetail?.data?.Name);
        navigate("/");
      } else {
        toast.error(res?.data?.errormessage || "Invalid Credentials");
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className={styles.mainContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, touched, setTouched, errors, resetForm }) => {
          return (
            <Form>
              <div className={styles.loginDiv}>
                <p className={styles.loginHeading}>Login</p>
                <div className={styles.inputField}>
                  <TextField
                    fullWidth
                    name="phone"
                    label="Mobile No."
                    variant="outlined"
                    value={values.phone}
                    onChange={(e) => handleChange(e, "phone", setFieldValue)}
                    onBlur={() => handleBlur("phone", touched, setTouched)}
                    error={!!(errors.phone && touched.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </div>
                <div className={styles.inputField}>
                  <TextField
                    fullWidth
                    name="password"
                    type={showPassword ? "text" : "password"} 
                    label="Password"
                    variant="outlined"
                    value={values.password}
                    onChange={(e) => handleChange(e, "password", setFieldValue)}
                    onBlur={() => handleBlur("password", touched, setTouched)}
                    error={!!(errors.password && touched.password)}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={toggleShowPassword} edge="end">
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  style={{ marginTop: "20px" }}
                >
                  {isSubmitting ? <Spinner size={"40px"} /> : "Login"}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Login;
