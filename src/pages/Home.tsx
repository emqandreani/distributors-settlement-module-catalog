import { Typography } from "@mui/material";

import { useAccount } from "../context/Account";

export default function Home() {
  const account = useAccount();

  const email = account?.idTokenClaims?.["signInNames.emailAddress"];
  const name = account?.name;

  return (
    <div
      style={{
        border: "4px dashed var(--primary)",
      }}
    >
      <Typography>Home Remote Page</Typography>
      <Typography>Email: {email}</Typography>
      <Typography>Nombre: {name}</Typography>
    </div>
  );
}
