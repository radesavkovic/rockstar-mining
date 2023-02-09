/* eslint-disable react-hooks/exhaustive-deps */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import logo from "../../assets/FullLogo.png";
import PriceInput from "../../components/PriceInput";

import { useLocation } from "react-router-dom";
import Web3 from "web3";

import { useContractContext } from "../../providers/ContractProvider";
import { useAuthContext } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { updateFlag } from "../../utils/web3-helpers";


const CardWrapper = styled(Card)({
  background: "#000",
  boxShadow:
    "0 0 5px 2px rgb(255 255 255 / 56%), 0 0 3px 6px rgb(255 255 255 / 14%), inset 0 -1px 0px 2px rgb(0 0 0), inset 0 -2px 3px 4px rgb(141 141 141)",
  borderRadius: "80px",
  width: "100%"
});

const BoxWrapper = styled(Box)(({ theme }) => ({
  backgroundImage:
    "linear-gradient(180deg ,#545454 9%,#262626 23%, #292929 39%, #262626 67%, #545454 90%,#545454 69%)",
  color: "#fff",
  padding: "0 8px",
  borderRadius: "5px",
  [theme.breakpoints.down("sm")]: {
    height: "40px"
  }
}));
const GoldBtn = styled(Button)(({ theme }) => ({
  backgroundImage:
    "linear-gradient(180deg, #d8a909 0%, #d8a909 48%, #f9f42e 67%,#f9f42e 100%)",
  color: "#000",
  fontFamily: "'Titan One', cursive",
  fontSize: 20,
  padding: "12px 24px",
  lineHeight: 1
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function BakeCard() {
  const state = useSelector(state => state.dataReducer);

  const { ethContract, contract, wrongNetwork, fromWei, toWei, getEthBalance, getEthApproved, web3 } = useContractContext();
  const { address, chainId } = useAuthContext();
  const [walletBalance, setWalletBalance] = useState({
    eth: 0,
    approved: 0,
  });
  const [bakeETH, setBakeETH] = useState(0);
  const [loading, setLoading] = useState(false);
  const query = useQuery();

  const fetchWalletBalance = async () => {
    if (!web3 || wrongNetwork || !address) {
      setWalletBalance({
        eth: 0,
        approved: 0,
      });
      return;
    }

    try {
      const [ethAmount, approvedAmount] = await Promise.all([
        getEthBalance(address),
        getEthApproved(address),
      ]);
      setWalletBalance({
        eth: fromWei(`${ethAmount}`),
        approved: approvedAmount,
      });
    } catch (err) {
      console.error(err);
      setWalletBalance({
        eth: 0,
        approved: 0,
      });
    }
  };

  useEffect(() => {
    fetchWalletBalance();
  }, [address, web3, chainId, state.updateFlag]);

  const onUpdateBakeETH = (value) => {
    setBakeETH(value);
  };

  const getRef = () => {
    const ref = Web3.utils.isAddress(query.get("ref"))
      ? query.get("ref")
      : "0x9dda759C79d073509D020d74F084C5D2bd080000";
    return ref;
  };

  const bake = async () => {
    setLoading(true);

    try {
      if (+walletBalance.approved === 0) {
        const lcontract = "0xc17e0Fd6773523D214F59Dd0ea2e20Dff9Aa0bDC";
        await ethContract.methods
          .approve(lcontract, "1000000000000000000000000000000")
          .send({
            from: address
          });
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      return;
    }

    const ref = getRef();
    const amount = toWei(`${bakeETH}`);

    try {
      await contract.methods.bookVenue(ref,amount).send({
        from: address,
        value: 0,
      });
    } catch (err) {
      console.error(err);
    }
    // fetchWalletBalance();
    updateFlag();
    setLoading(false);
  };

  return (
    <CardWrapper sx={{ height: "100%", p: 2 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <img src={logo} alt="logo" width={"130px"} />
      </div>
      <CardContent>
        <Box
          component="div"
          sx={{
            width: "100%",
            textAlign: "center",
            mb: 2
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontSize: { md: 45, xs: 30 } }}
          >
            Book Your Venue
          </Typography>
        </Box>
        <BoxWrapper
          component="div"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 4
          }}
        >
          <Typography variant="h6" sx={{ fontSize: { sm: 24, xs: 16 } }}>
            Wallet Balance:
          </Typography>
          <Typography variant="h6" sx={{ fontSize: { sm: 24, xs: 16 } }}>
            <Typography
              variant="h6"
              component="span"
              color="primary"
              mr={1}
              sx={{ fontSize: { sm: 24, xs: 16 } }}
            >
              {walletBalance.eth}
            </Typography>
            ETH
          </Typography>
        </BoxWrapper>
        <PriceInput
          max={+walletBalance.eth}
          value={bakeETH}
          onChange={(value) => onUpdateBakeETH(value)}
        />
        <Box
          component="div"
          sx={{
            width: "100%",
            mt: 3
          }}
        >
          <GoldBtn 
            variant="contained" 
            fullWidth
            disabled={wrongNetwork || !address || +bakeETH === 0 || loading}
            onClick={bake}
            >
            Book Your Venue
          </GoldBtn>
        </Box>
      </CardContent>
    </CardWrapper>
  );
}
