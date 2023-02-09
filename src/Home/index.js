import { Box, Grid } from "@mui/material";
import { styled } from "@mui/system";
import backgroundImage from "../assets/bg-img.jpg";
import BakeCard from "./components/BakeCard";
import FAQs from "./components/FAQ";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NutritionFacts from "./components/NutritionFacts";
import ReferralLink from "./components/ReferralLink";

const Wrapper = styled("div")(({ theme }) => ({
  maxWidth: 1100,
  margin: "0 auto",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%"
  }
}));

export default function Home() {
  return (
    <>
      <Wrapper>
        <Header />
      </Wrapper>
      <Box
        component="div"
        sx={{
          background: `url(${backgroundImage})`,
          backgroundSize: "contain",
          backgroundPosition: "center center",
          mb: 4,
          py: 3,
          px: 2
        }}
      >
        <Wrapper>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={10} md={6} mx="auto">
              <BakeCard />
            </Grid>
            <Grid item xs={12} sm={10} md={6} mx="auto">
              <ReferralLink />
            </Grid>
          </Grid>
        </Wrapper>
      </Box>
      <Wrapper>
        <Grid container>
          <Grid item xs={12} sm={10} md={10} mx="auto">
            <FAQs />
          </Grid>
        </Grid>
        <NutritionFacts />
        <Footer />
      </Wrapper>
    </>
  );
}
