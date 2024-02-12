import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
  ListItemButton,
  ListItemIcon,
  IconButton,
  Divider,
  AppBar,
  Toolbar,
  Badge,
} from "@mui/material";
import "@fontsource/montez";
import SearchIcon from "@mui/icons-material/Search";
import Actions from "./actions";
import MenuIcon from "@mui/icons-material/Menu";
import ShopingCardIcon from "@mui/icons-material/ShoppingCart";
import { Favorite, Person } from "@mui/icons-material";
import NextLink from "next/link";
import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "@/src/context/AppContext";
import { CartContext } from "@/src/context/CartContext";
import { useRouter } from "next/router";
import { UiContext } from "@/src/context/UiContext";

// import { MyList } from "@/src/theme/appbar";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
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

const Appbar = () => {
  const { userData, handleLogoClick } = useContext(AppContext);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.up("xs"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const router = useRouter();
  const { numOfCartItems } = useContext(CartContext);
  const { setDrawerOpen } = useContext(UiContext);

  const handleCartMobile = () => {
    router.push("/cart");
  };

  return (
    <>
      {isMd ? (
        <Box
          sx={{
            display: "flex",
            // mt: 4,
            justifyContent: "center",
            alignItems: "center",
            // px: "2px",
            backgroundColor: theme.palette.primary.main,
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          {/* <NextLink passHref style={{ textDecoration: "none" }}> */}
          <Box onClick={handleLogoClick} sx={{ cursor: "pointer" }}>
            <Typography
              // onClick={handleTypographyClick}
              sx={{
                // p: "4px",
                flexGrow: 1,
                fontFamily: '"Montez" , "cursive"',
                fontSize: "4em",
                color: theme.palette.secondary.main,
                ml: 5,
              }}
            >
              Ayoub
            </Typography>
          </Box>

          {/* </NextLink> */}

          {userData !== null ? (
            <List
              sx={{
                display: "flex",
                flexGrow: 3,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <NextLink href="/" passHref style={{ textDecoration: "none" }}>
                <ListItemButton>
                  <ListItemText
                    primary="Home"
                    sx={{ color: theme.palette.secondary.light }}
                  />
                </ListItemButton>
              </NextLink>

              <NextLink href="/" passHref style={{ textDecoration: "none" }}>
                <ListItemButton>
                  <ListItemText
                    primary="Categories"
                    sx={{ color: theme.palette.secondary.light }}
                  />
                </ListItemButton>
              </NextLink>

              <NextLink
                href="/products"
                passHref
                style={{ textDecoration: "none" }}
              >
                <ListItemButton>
                  <ListItemText
                    primary="Products"
                    sx={{ color: theme.palette.secondary.light }}
                  />
                </ListItemButton>
              </NextLink>

              <NextLink
                href="/contact"
                passHref
                style={{ textDecoration: "none" }}
              >
                <ListItemButton>
                  <ListItemText
                    primary="Contact Us"
                    sx={{ color: theme.palette.secondary.light }}
                  />
                </ListItemButton>
              </NextLink>
              {/* <ListItemButton>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
            </ListItemButton> */}
            </List>
          ) : null}

          <Actions />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            mt: 4,
            justifyContent: "space-between",
            alignItems: "center",
            p: "2px 8px",
            // backgroundColor: "secandary.light",
            // position: "sticky",
            // top: 0,
            // zIndex: 1000,
          }}
        >
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          {/* <NextLink href="/" passHref style={{ textDecoration: "none" }}> */}
          <Box onClick={handleLogoClick} sx={{ cursor: "pointer" }}>
            <Typography
              textAlign="center"
              variant="h4"
              sx={{
                p: "4px",
                flexGrow: 1,
                fontFamily: '"Montez" , "cursive"',
                fontSize: "4em",
                color: theme.palette.secondary.main,
              }}
            >
              Ayoub
            </Typography>
          </Box>

          {/* </NextLink> */}

          <IconButton>
            <SearchIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              background: theme.palette.secondary.dark,
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              alignItems: "center",
              zIndex: 99,
              border: `1px solid #dddef1`,
            }}
          >
            <List
              sx={{
                display: "flex",
                flexGrow: 3,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ListItemButton
                sx={{
                  justifyContent: "center",
                }}
                onClick={handleCartMobile}
              >
                <ListItemIcon
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: theme.palette.secondary.light,
                  }}
                >
                  <ShopingCardIcon />
                  {/* <span
                    style={{
                      backgroundColor: "secondary.main",
                      color: "white",
                    }}
                  >
                    {numOfCartItems}
                  </span> */}
                  <StyledBadge
                    color="secondary"
                    badgeContent={numOfCartItems}
                  />
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
                    color: theme.palette.secondary.light,
                  }}
                >
                  <Favorite />
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
                    color: theme.palette.secondary.light,
                  }}
                >
                  <Person />
                </ListItemIcon>
              </ListItemButton>
              <Divider orientation="vertical" flexItem />
            </List>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Appbar;
