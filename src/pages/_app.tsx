// Create an admin app and use data from "fakeapi.platzi.com" . 
// Admins can efficiently Login , manage products and categories—adding, updating, and deleting items.
import React from "react";
import AppThemeProvider from "@/component/AppThemeProvider";
import type { AppProps } from "next/app";
import LoginForm from "@/component/LoginForm";
import { Container } from "@mui/system";
export default function App({ Component, pageProps }: AppProps) { 
  const [isLoggedIn, setLoggedIn] = React.useState(false);    
  return  <AppThemeProvider>    
   {isLoggedIn ?
    <Component {...pageProps} />: (<Container maxWidth="sm" >
    <LoginForm setLoggedIn={setLoggedIn} /> </Container>)}   
</AppThemeProvider> 
};
 