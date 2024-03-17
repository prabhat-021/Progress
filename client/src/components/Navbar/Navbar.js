import React from "react";
import { LinearGradient } from 'react-text-gradients'
import NavListMenu from "./NavlistMenu";
import NavList from "./Navlist";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import ProfileMenu from "./ProfileMenu";
// import NavProfileMenu from "./NavProfileMenu";

function NavbarWithMegaMenu() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-2xl px-4 border-none  text-white rounded-none py-2 bg-black">
      <div className="flex items-center justify-between  text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer font-semibold  py-1.5 lg:ml-2"
        >College Dekhiye
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          <Button variant="text" size="sm" color="blue-gray" className="font-thin">
            <ProfileMenu/>
          </Button>
         
          
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden pb-5 pr-5"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-5 " strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6   w-5 " strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
       
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
          <ProfileMenu/>
          </Button>
        </div>

      </Collapse>
    </Navbar>
  );
}
export default NavbarWithMegaMenu