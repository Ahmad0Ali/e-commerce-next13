// import { List } from "@mui/icons-material";
import {
  ListItemButton,
  ListItemIcon,
  List,
  Divider,
  Typography,
  ListItemText,
  Badge,
  styled,
} from "@mui/material";
import React from "react";
import ShopingCardIcon from "@mui/icons-material/ShoppingCart";
import { Favorite, Person } from "@mui/icons-material";
import NextLink from "next/link";
import { useMediaQuery, useTheme } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "@/src/context/AppContext";
import { CartContext } from "@/src/context/CartContext";
import { useRouter } from "next/router";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -20,
    top: -10,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    animation: "pulse 2s infinite",
  },
  "@keyframes pulse": {
    "0%": { boxShadow: "0 0 0 0 rgba(0,0,0, 0.3)" },
    "70%": { boxShadow: "0 0 0 8px rgba(0,0,0, 0)" },
    "100%": { boxShadow: "0 0 0 0 rgba(0,0,0, 0)" },
  },
}));

const Actions = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.up("xs"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));

  const { userData, logOut } = useContext(AppContext);
  const { numOfCartItems } = useContext(CartContext);
  const router = useRouter();
  return (
    <List
      sx={{
        display: "flex",
        flexGrow: 3,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {userData === null ? (
        <>
          <ListItemButton
            sx={{
              justifyContent: "center",
            }}
            onClick={() => router.push("/login")}
          >
            <ListItemIcon
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* <Favorite /> */}
              {/* <NextLink href="/login" style={{ textDecoration: "none" }}> */}
              <ListItemText
                primary="Login"
                sx={{ color: theme.palette.secondary.light }}
              />
              {/* </NextLink> */}
            </ListItemIcon>
          </ListItemButton>
          <Divider orientation="vertical" flexItem />
          <ListItemButton
            sx={{
              justifyContent: "center",
            }}
          >
            <ListItemIcon
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* <Person /> */}
              <NextLink href="/register" style={{ textDecoration: "none" }}>
                <ListItemText
                  primary="Register"
                  sx={{ color: theme.palette.secondary.light }}
                />
              </NextLink>
            </ListItemIcon>
          </ListItemButton>
          <Divider orientation="vertical" flexItem />
        </>
      ) : (
        <>
          <ListItemButton
            sx={{
              justifyContent: "center",
            }}
            onClick={() => router.push("/cart")}
          >
            <ListItemIcon
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* <NextLink href="/cart" style={{ textDecoration: "none" }}> */}
              <StyledBadge color="secondary" badgeContent={numOfCartItems} />
              <ShopingCardIcon sx={{ color: theme.palette.secondary.light }} />
              {/* </NextLink> */}
            </ListItemIcon>
          </ListItemButton>
          <Divider orientation="vertical" flexItem />
          <ListItemButton
            sx={{
              justifyContent: "center",
            }}
            onClick={logOut}
          >
            <ListItemIcon
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* <Person /> */}
              <span style={{ textDecoration: "none", cursor: "pointer" }}>
                <ListItemText
                  primary="Logout"
                  sx={{ color: theme.palette.secondary.light }}
                />
              </span>
            </ListItemIcon>
          </ListItemButton>
          <Divider orientation="vertical" flexItem />
        </>
      )}
    </List>
  );
};

export default Actions;
