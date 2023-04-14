import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { getAuth, signOut } from "firebase/auth";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Box } from "@mui/material";

export default function NavBar() {
  const { user } = useUser();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Toolbar
        component="nav"
        variant="regular"
        sx={{
          borderBottom: 1,
          borderColor: "ActiveBorder",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography component="h2" variant="h5" color="inherit">
          my-blog
        </Typography>

        {isSmallerScreen ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem component={Link} to="/">
                Home
              </MenuItem>

              <MenuItem component={Link} to="/articles">
                Articles
              </MenuItem>
              {user ? (
                <MenuItem
                  onClick={() => {
                    signOut(getAuth()).then(() => {
                      navigate("/login");
                    });
                  }}
                >
                  Sign Out
                </MenuItem>
              ) : (
                <MenuItem component={Link} to="/login">
                  Login
                </MenuItem>
              )}
            </Menu>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: "40px",
            }}
          >
            <Button component={Link} to="/" variant="text" size="small">
              Home
            </Button>

            <Button component={Link} to="/articles" variant="text" size="small">
              Articles
            </Button>
            {user ? (
              <Button
                onClick={() => {
                  signOut(getAuth()).then(() => {
                    navigate("/login");
                  });
                }}
                variant="contained"
                size="small"
              >
                Sign Out
              </Button>
            ) : (
              <Button
                component={Link}
                to="/login"
                variant="contained"
                size="small"
              >
                Login
              </Button>
            )}
          </Box>
        )}
      </Toolbar>
    </>
  );
}
