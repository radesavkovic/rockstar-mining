import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import logo from "../../assets/FullLogo.png";
import Connect from "./Connect";

const Wrapper = styled("div")(({ theme }) => ({
  textAlign: "center",
  paddingBottom: 24,
  [theme.breakpoints.down("md")]: {
    h5: {
      fontSize: 20,
      margin: 0
    }
  }
}));

export default function Header() {
  return (
    <Box component="div" sx={{ px: 2 }}>
      <Wrapper>
        <div style={{ marginTop: -25 }}>
          <img src={logo} alt="" width={"100px"} />
        </div>

        <Connect />
        <Typography
          variant="h3"
          marginTop={3}
          color="text.primary"
          sx={{ fontSize: { md: 45, xs: 30 } }}
        >
          Let's Get This Rockstar Lifestyle Started!
        </Typography>
        <Typography
          variant="body1"
          marginTop={3}
          textAlign="justify"
          sx={{ fontSize: { md: 18, xs: 16 } }}
        >
          Connect your Metamask wallet and deposit the amount of ETH you would
          like to enter the Tour (protocol) with. You must have a minimum of
          .001 ETH to begin the tour. Make sure you have a little BNB in your
          wallet for Gas fees. Once you have booked your venue and all funds are
          deposited you will be given your Rockstar Accelerator link to share
          with up and coming Rockstars!
        </Typography>
        {/* <ButtonContainer container>
        <Grid item flexGrow={1} marginRight={1} marginTop={3} alignItems="center">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={(e) => {
              e.preventDefault();
              window.location.href='https://luckycat.money/';
              }}
              >
                  Home
            </Button>
        </Grid>
      </ButtonContainer> */}
      </Wrapper>
    </Box>
  );
}
