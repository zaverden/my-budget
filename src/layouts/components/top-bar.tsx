import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import NextLink from "next/link";
import { useAuth } from "@p-features/login/hooks/use-auth";

const pages = [
  {
    title: "budget",
    href: "/",
  },
  {
    title: "rules",
    href: "/rules",
  },
];

export function TopBar() {
  const { user, signOut } = useAuth();
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {pages.map(({ title, href }) => (
              <NextLink href={href} passHref>
                <Button sx={{ my: 2, color: "white", display: "block" }}>{title}</Button>
              </NextLink>
            ))}
          </Box>
          {
            user ? (<Button onClick={signOut} sx={{ my: 2, color: "white", display: "block" }}>logout</Button>): null
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
