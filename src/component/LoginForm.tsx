import * as React from 'react';
import  { useState } from 'react'
import { Box, styled} from '@mui/system'
import { Snackbar } from '@mui/material';
import { useRouter } from 'next/navigation';


const StyledButton = styled('button')(({theme}) => ({
  margin:theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.secondary.light,
  padding: theme.spacing(2),
  width:'100px',
  height:'50px',
}));
const StyledTextbox=styled('input')(({theme})=>({
    margin:theme.spacing(3),
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    width:'200px',
    height:'25px',
    label:"Email Address",
})
);
const StyledLabel=styled('label')(({theme})=>({   
    color: theme.palette.text.primary, 
    width:'200px',
    height:'25px',  
})
); 

const LoginForm: React.FC<{ setLoggedIn: (value: boolean) => void }> = ({ setLoggedIn }) => {
    const router=useRouter();       
    const[email,SetEmail]=useState('');
    const[password,SetPassword]=useState('');
    const[error,SetError]=useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleClear=()=>{
        SetEmail('');
        SetPassword('');
        SetError('');
        setOpenSnackbar(false);
    }
    const handleLogin=async()=>{
      
        console.log(email);
        console.log(password);
        try{
                const response= await fetch('https://api.escuelajs.co/api/v1/auth/login',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify(
                        {
                            email,
                            password,
                        }
                    ),
                });
                if(response.ok){
                    const data= await response.json();
                    console.log("Login successful",data); 
                    SetEmail('');
                    SetPassword('');
                    SetError('');
                    setLoggedIn(true);                  
                       router.push("/Products");                
                }
                else{
                    if (response.status === 401) {
                        console.log('Unauthorized: Invalid username or password');
                        SetError('Invalid username or password');
                        setOpenSnackbar(true);
                      } 
                      else{
                        console.log("Error loggin in: ",response.statusText);
                        SetError("Invalid username or password");
                        setOpenSnackbar(true);
                      }                   
                     
                } 
        }
        catch(error)
        {
                console.log("Error in logging");
                SetError("An error occured");
                setOpenSnackbar(true);
                SetEmail('');
                SetPassword('');
                SetError('');

        }
    };
    const handleCloseSnackbar = (
        event: React.SyntheticEvent | Event, reason?: string
      ) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSnackbar(false);
      };
      
  return (
       <>
       <Box  sx={{ p: 2, border: '2px dashed grey',textAlign: 'center' }} >      
        <h2> ADMIN LOGIN</h2>
        <div>
            <StyledLabel>Email:&emsp;</StyledLabel>
            <StyledTextbox type='text' id='email' value={email} onChange={(e)=>SetEmail(e.target.value)} placeholder='UserEmail'/>
        </div>
        <div>
            <StyledLabel>Password:</StyledLabel>
            <StyledTextbox type='password' id='password'  value={password} onChange={(e)=>SetPassword(e.target.value)} placeholder='Password'/>

        </div>
        <div>
            <StyledButton onClick={handleLogin}>Login</StyledButton>
            <StyledButton onClick={handleClear}>Try Again</StyledButton>
        </div>           
        </Box>  
        <Snackbar
        open={openSnackbar}
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}       
        message={error}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
        {error && <div style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</div>} 
        </>
  ); 
  
  };
 
  export default LoginForm;

