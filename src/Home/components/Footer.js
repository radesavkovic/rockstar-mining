import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import logo from "../../assets/FullLogo.png";
const ConnectButton = styled(Button)(({ theme }) => ({
  marginTop: 20,
  textShadow: "3px 2px 3px rgb(0 0 0 / 78%)",
  borderRadius: "3px",
  fontWeight: "400",
  fontSize: "1rem",
  padding: "12px 24px",
  lineHeight: 1,
  color: theme.palette.text.primary
}));

function returnHome() {
  window.location.href = "https://rockstar-mining.com/";
}

export default function Footer() {
  return (
    <>
      <Box component="div" sx={{ px: 2, textAlign: "center" }}>
        <ConnectButton variant="contained" onClick={returnHome}>
          Return to the Home Page
        </ConnectButton>
        <Grid container justifyContent="center" spacing={2} marginTop={1}>
          <Grid item>
            <a href="https://rockstar-mining.com/">
              <img src={logo} alt="" width={"100px"} />
            </a>
          </Grid>
        </Grid>

        <Typography variant="body2" marginTop={1}>
          All Rights Reserved.
        </Typography>
      </Box>
    </>
  );
}
