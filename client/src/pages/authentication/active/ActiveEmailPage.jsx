import { Container, Divider, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import queryString from "query-string";
import { useEffect } from "react";
import { verifyEmail } from "../../api";
import { useMutation } from "@tanstack/react-query";


const ActiveEmailPage = () => {
  const location = useLocation();
  const {code } = queryString.parse(location.search);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const {mutateAsync: verifyEmailAsync} = useMutation(verifyEmail);
  useEffect (() => {
    if (code) {
      try 
      {
        verifyEmailAsync(
          {
            code: code
          }
        );
        enqueueSnackbar("Your account has been activated", {variant: "success"});
        navigate("/auth/login");
      }
      catch (error) {
        enqueueSnackbar(error.message, {variant: "error"});
      }
    }
  }, [code, enqueueSnackbar, navigate, verifyEmailAsync]);  

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom sx={{marginTop: "30px"}}>
          One more step
      </Typography>
      <Typography variant="body1" color="blue" gutterBottom>
        You account has been created. But you need to active your account before you can login.
      </Typography>
      <Typography variant="body1" color="blue" gutterBottom>
        An email has been sent to your email address. Please click the link in the email to active your account.
      </Typography>
      <Typography variant="body1" gutterBottom>
        You can close this page now.
      </Typography>
      <Divider sx={{marginTop: "30px"}} />
      <Typography variant="body1" gutterBottom sx={{marginTop: "30px"}}>
        Don't receive the email? Please check your spam folder or 
        {<Link to="/authentication/active/resend"> click here </Link>}
         to resend the email.
      </Typography>
    </Container>
  );
};
export default ActiveEmailPage;
