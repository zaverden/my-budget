import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { MainLayout } from "@p-layouts/main-layout";
import { withPageConfig } from "@p/page";
import Copyright from "../src/Copyright";
import Link from "../src/Link";
import ProTip from "../src/ProTip";

function About() {
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
        <Box maxWidth="sm">
          <Button variant="contained" component={Link} noLinkStyle href="/">
            Go to the home page
          </Button>
          <Button variant="contained" component={Link} noLinkStyle href="/about">
            Go to the about page
          </Button>
        </Box>
        <ProTip />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
        <Copyright />
      </Box>
    </Container>
  );
}

export default withPageConfig(About, {
  layoutComponent: MainLayout,
});
