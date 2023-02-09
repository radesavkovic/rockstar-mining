import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import { useContractContext } from "../../providers/ContractProvider";
import { useAuthContext } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import copy from "copy-to-clipboard";

const CardWrapper = styled(Card)({
  background: "#000",
  boxShadow:
    "0 0 5px 2px rgb(255 255 255 / 56%), 0 0 3px 6px rgb(255 255 255 / 14%), inset 0 -1px 0px 2px rgb(0 0 0), inset 0 -2px 3px 4px rgb(141 141 141)",
  borderRadius: "50px",
  width: "100%",
  height: "100%"
});

const Input = styled("input")(({ theme }) => ({
  fontSize: 14,
  fontFamily: "'Titan One', cursive",
  padding: "4px 10px",
  textAlign: "center",
  borderRadius: 5,
  border: "1px solid #555",
  backgroundImage:
    "linear-gradient(180deg ,#545454 9%,#262626 23%, #292929 39%, #262626 67%, #545454 90%,#545454 69%)",
  width: "100%",
  outline: "none",
  color: theme.palette.text.primary,
  height: "40px"
}));

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

const copyToClipboard = str => {
  copy(str);
};


export default function ReferralLink() {
  const state = useSelector(state => state.dataReducer);

  const { contract, wrongNetwork, web3 } = useContractContext();
  const { address, chainId } = useAuthContext();
  const [userData, setUserData] = useState({
    ticket: 0,
    checkpoint: 0,
  });

  const fetchData = async () => {
    if (!web3 || wrongNetwork || !address) {
      setUserData({
        ticket: 0,
        checkpoint: 0,
      });
      return;
    }

    try {
      const [user] = await Promise.all([
        contract.methods.getUserInfo(address).call(),
      ]);

      setUserData({
        ticket: user._miners,
        checkpoint: user._lastHatch,
      });
    } catch (err) {
      console.error(err);
      setUserData({
        ticket: 0,
        checkpoint: 0,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [address, web3, chainId, state.updateFlag]);


  const [countdown, setCountdown] = useState({
    cpTotal: 0,
    cpHours: 0,
    cpMinutes: 0,
    cpSeconds: 0,
  });

  const getCountdown = (deadline) => {
    const now = Date.now() / 1000;
    let total = deadline - now - 150;
    if (total < 0) {
      total = 0;
    }
    const seconds = Math.floor((total) % 60);
    const minutes = Math.floor((total / 60) % 60);
    const hours = Math.floor((total / (60 * 60)));
    return {
        total,
        hours,
        minutes,
        seconds
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
        try {
          const time = 24*60*60 + Number(userData.checkpoint);
            const _data = getCountdown(time)
            setCountdown({
                cpTotal: _data.total,
                cpHours: _data.hours,
                cpMinutes: _data.minutes,
                cpSeconds: _data.seconds,
            })
        } catch (err) {
            console.log(err);
        }
    }, 1000);

    return () => clearInterval(interval);
  }, [userData]);

  const link = `${window.origin}?ref=${address}`;

  return (
    <>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100%"
        }}
      >
        <CardWrapper sx={{ p: 2 }}>
          <CardContent>
            <Typography
              variant="h5"
              textAlign="center"
              sx={{ fontSize: { sm: 22, xs: 18 }, mb: 4 }}
            >
              Congratulations on your ticket sales
            </Typography>
            <BoxWrapper
              component="div"
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2
              }}
            >
              <Typography variant="h6" sx={{ fontSize: { sm: 24, xs: 16 } }}>Tickets Sold:</Typography>
              <Typography variant="h5" sx={{ fontSize: { sm: 24, xs: 16 } }}>{userData.ticket}</Typography>
            </BoxWrapper>
            <Typography
              textAlign="center"
              variant="h6"
              marginY={2}
              sx={{ fontSize: { sm: 18, xs: 16 } }}
            >
              Now it is time to promote the tour!
            </Typography>
            <Typography
              textAlign="center"
              variant="h5"
              sx={{ fontSize: "16px" }}
              mb={3}
            >
              Rockstar Accelerator Link:
            </Typography>
            <Input value={address ? link : ""} readOnly />
            <Box component="div" sx={{ width: "100%", textAlign: "center" }}>
              <IconButton size="large" color="primary" onClick={()=>{copyToClipboard(link)}}>
                <ContentPasteIcon />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ fontSize: "12px" }}
                component="span"
                color="primary"
              >
                Copy
              </Typography>
            </Box>
          </CardContent>
        </CardWrapper>

        <CardWrapper sx={{ borderRadius: 5, mt: 4 }}>
          <CardContent>
            <Typography variant="h5" textAlign="center">
              Mandatory Rehearsal Timer
            </Typography>
            <Typography
              variant="h6"
              textAlign="center"
              sx={{ fontSize: "18px" }}
            >
              {countdown.cpHours<10?`0${countdown.cpHours}`:`${countdown.cpHours}`}{countdown.cpMinutes<10?`:0${countdown.cpMinutes}`: `:${countdown.cpMinutes}`}
            </Typography>
          </CardContent>
        </CardWrapper>
      </Box>
    </>
  );
}
