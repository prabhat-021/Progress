import React from "react";
import NavListMenu from "./NavlistMenu";
import {
  Typography,
  List,
  ListItem,
} from "@material-tailwind/react";

function NavList() {
  return (
    <List className="mt-4 mb-6  lg:mt-0 lg:mb-0  lg:flex-row  lg:p-1">
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 p-2 font-normal bg-stone-600">Home</ListItem>
      </Typography>
      <NavListMenu />
      <Typography
        as="a"
        href="#"
        variant="small"
       
      >
        <ListItem className="flex items-center gap-2  hover:bg-stone-600 font-normal py-2 p-2">
         About 
        </ListItem>
      </Typography>
      <Typography
        as="a"
        href="#"
        variant="small"
       
      >
        <ListItem className="flex items-center gap-2 hover:bg-stone-600 font-normal py-2 p-2">
          Contact Us
        </ListItem>
      </Typography>
    </List>
  );
}
export default NavList