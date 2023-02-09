import Button from "@mui/material/Button";
import { styled } from "@mui/system";

import { useAuthContext } from "../../providers/AuthProvider";

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

export default function Connect() {
  const { address, loading, connect, disconnect } = useAuthContext();

  return (
    <ConnectButton
      color="secondary"
      variant="contained"
      disabled={loading}
      onClick={() => (address ? disconnect() : connect())}
    >
      {address ? "Disconnect" : "Connect"}
    </ConnectButton>
  );
}
