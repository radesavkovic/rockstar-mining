import { Box, Typography, Button, Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { styled } from "@mui/system";

import { useContractContext } from "../../providers/ContractProvider";
import { useAuthContext } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { updateFlag } from "../../utils/web3-helpers";

const CardWrapper = styled(Card)({
  marginBottom: 24,
  background: "#000",
  boxShadow:
    "0 0 5px 2px rgb(255 255 255 / 56%), 0 0 3px 6px rgb(255 255 255 / 14%), inset 0 -1px 0px 2px rgb(0 0 0), inset 0 -2px 3px 4px rgb(141 141 141)",
  borderRadius: "10px"
});
const BoxWrapper = styled(Box)({
  backgroundImage:
    "linear-gradient(180deg ,#545454 9%,#262626 23%, #292929 39%, #262626 67%, #545454 90%,#545454 69%)",
  color: "#fff",
  padding: "0 8px",
  borderRadius: "5px"
});
const GoldBtn = styled(Button)(({ theme }) => ({
  backgroundImage:
    "linear-gradient(180deg, #d8a909 0%, #d8a909 48%, #f9f42e 67%,#f9f42e 100%)",
  color: "#000",
  fontFamily: "'Titan One', cursive",
  fontSize: 14,
  padding: "8px 18px",
  lineHeight: 1
}));


export default function FAQs() {
  const state = useSelector(state => state.dataReducer);

  const { contract, wrongNetwork, fromWei, web3 } = useContractContext();
  const { address, chainId } = useAuthContext();
  const [rewards, setRewards] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const fetchData = async () => {
    if (!web3 || wrongNetwork || !address) {
      setRewards(0);
      return;
    }

    try {
      const [rewardsAmount] = await Promise.all([
        contract.methods.getAvailableEarnings(address).call(),
      ]);

      setRewards(fromWei(`${rewardsAmount}`));
    } catch (err) {
      console.error(err);
      setRewards(0);
    }
  };
  
  const reBake = async () => {
    setLoading(true);

    try {
      await contract.methods.rehearse(true).send({
        from: address,
      });
    } catch (err) {
      console.error(err);
    }
    updateFlag();
    setLoading(false);
  };

  const eatBeans = async () => {
    setLoading(true);

    try {
      await contract.methods.showtime().send({
        from: address,
      });
    } catch (err) {
      console.error(err);
    }
    updateFlag();
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [address, web3, chainId, state.updateFlag]);

  return (
    <>
      <Box component="div" sx={{ px: 2 }}>
        <CardWrapper>
          <CardContent sx={{ pb: 0 }}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                md={3}
                sx={{ textAlign: { md: "start", xs: "center" } }}
              >
                <GoldBtn 
                  variant="contained"
                  disabled={wrongNetwork || !address || loading}
                  onClick={reBake}
                >
                  Rehearse
                </GoldBtn>
              </Grid>
              <Grid item xs={12} md={6} align="center">
                <BoxWrapper
                  component="div"
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Typography variant="h6" sx={{ fontSize: "18px" }}>
                    Your Reward:
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "18px" }}
                    color="primary"
                  >
                    {rewards}
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "18px", ml: 1 }}
                      component="span"
                    >
                      ETH
                    </Typography>
                  </Typography>
                </BoxWrapper>
              </Grid>
              <Grid
                item
                xs={12}
                md={3}
                align="center"
                sx={{ textAlign: { md: "end", xs: "center" } }}
              >
                <GoldBtn 
                  variant="contained"
                  disabled={wrongNetwork || !address || loading}
                  onClick={eatBeans}
                >
                  Showtime
                </GoldBtn>
              </Grid>
            </Grid>
          </CardContent>
        </CardWrapper>
      </Box>
    </>
  );
}
