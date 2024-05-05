import {
  AppBar,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountMenu from "./menu";

const drawerWidth = 240;
interface ModalProps {
  handleDrawerToggle: () => void;
}

const header = ({ handleDrawerToggle }: ModalProps) => {
  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div className="flex items-center justify-between w-full">
            <Typography variant="h6" noWrap component="div">
              Responsive drawer
            </Typography>
            <AccountMenu />
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default header;
