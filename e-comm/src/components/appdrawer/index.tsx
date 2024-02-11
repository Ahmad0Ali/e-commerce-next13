import { UiContext } from "@/src/context/UiContext";
import {
  Button,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  lighten,
  styled,
} from "@mui/material";
import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import { AppContext } from "@/src/context/AppContext";

const MiddleDivider = styled((props) => (
  <Divider variant="middle" {...props} />
))``;
const AppDrawer = () => {
  const { drawerOpen, setDrawerOpen } = useContext(UiContext);
  const { logOut, userData } = useContext(AppContext);
  const router = useRouter();

  const openHomeInMobile = () => {
    router.push("/");
  };
  const openCategoryInMobile = () => {
    router.push("/");
  };
  const openProductsInMobile = () => {
    router.push("/products");
  };
  const openLoginInMobile = () => {
    router.push("/login");
  };
  const openRegisterInMobile = () => {
    router.push("/register");
  };

  return (
    <>
      {drawerOpen && (
        <Button
          sx={{
            position: "absolute",
            top: 10,
            left: "250px",
            zIndex: 1999,
          }}
          onClick={() => setDrawerOpen(false)}
        >
          <CloseIcon
            className="testing"
            sx={{
              fontSize: "2.5rem",
              color: lighten("#d1adcc", 0.09),
            }}
          />
        </Button>
      )}
      <Drawer open={drawerOpen}>
        {userData !== null ? (
          <List>
            <ListItemButton onClick={openHomeInMobile}>
              <ListItemText>Home</ListItemText>
            </ListItemButton>
            <MiddleDivider />
            <ListItemButton onClick={openCategoryInMobile}>
              <ListItemText>Categories</ListItemText>
            </ListItemButton>
            <MiddleDivider />
            <ListItemButton onClick={openProductsInMobile}>
              <ListItemText>Products</ListItemText>
            </ListItemButton>
            <MiddleDivider />
            <ListItemButton>
              <ListItemText>Contact Us</ListItemText>
            </ListItemButton>
            <MiddleDivider />
            <ListItemButton onClick={logOut}>
              <ListItemText>Logout</ListItemText>
            </ListItemButton>
            <MiddleDivider />
          </List>
        ) : (
          <List>
            <ListItemButton onClick={openLoginInMobile}>
              <ListItemText>Login</ListItemText>
            </ListItemButton>
            <MiddleDivider />
            <ListItemButton onClick={openRegisterInMobile}>
              <ListItemText>Register</ListItemText>
            </ListItemButton>
            <MiddleDivider />
          </List>
        )}
      </Drawer>
    </>
  );
};

export default AppDrawer;
