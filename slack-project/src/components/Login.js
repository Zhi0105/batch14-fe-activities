import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import LoginSharpIcon from '@mui/icons-material/LoginSharp'
import AppRegistrationSharpIcon from '@mui/icons-material/AppRegistrationSharp'


import {
    TextField,
    Button,
    InputAdornment,
    OutlinedInput,
    InputLabel,
    IconButton,
    FormControl,

} from '@mui/material'
import {
    Visibility,
    VisibilityOff,
} from '@mui/icons-material'


const Login = () => {

    const navigate = useNavigate()

    const navigateRegister = () => {
        navigate(`/create-user`)
    }

        //HANDLES PASSWORD SHOW/NOT SHOW START
        const [values, setValues] = useState({
            showPassword: false,
        });
        const handleChange = (prop) => (event) => {
            setValues({ ...values, [prop]: event.target.value });
        }
        const handleClickShowPassword = () => {
            setValues({
            ...values,
            showPassword: !values.showPassword,
            });
        };
        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };
        //HANDLES PASSWORD SHOW/NOT SHOW END
        
    return (
        <div className='login-main'>
            <div className='container'>
                <div className="login-form">
                    <form>
                        <div className='login-form-header'><span>Login</span></div>
                        <div className='login-form-content'>
                            <TextField className="textfield" label="Email" variant="outlined" autoComplete='off'/>
                            {/* <TextField className="textfield" label="Password" type="password"  autoComplete="current-password" variant="standard" /> */}
                            <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput className="textfield"
                                autoComplete='off'
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                onChange={handleChange('password')}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                            </FormControl>
                            <Button className="button" variant="contained">login <LoginSharpIcon /></Button>
                            <Button className="button" variant="contained" onClick={navigateRegister}>Sign up<AppRegistrationSharpIcon /></Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
