import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { MainLayout } from "@p-layouts/main-layout";
import { withPageConfig } from "@p/page";
import NextLink from "next/link";
import Copyright from "../src/Copyright";
import ProTip from "../src/ProTip";

function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          MUI v5 + Next.js with TypeScript example
        </Typography>
        <NextLink passHref href="/about">
          <MuiLink color="secondary">Go to the about page</MuiLink>
        </NextLink>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}

export default withPageConfig(Home, {
  layoutComponent: MainLayout,
});
