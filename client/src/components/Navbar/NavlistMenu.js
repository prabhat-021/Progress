import React from "react";
import {

  Collapse,
  Typography,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,

} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
const navListMenuItems = [
  {
    title: "Graduation",
    course1: "B.Tech",
    course2: "B.A.",
    course3: "B.Sc.",
    course4: "M.B.B.S",
    
  },
  {
    title: "Post Graduation",
    course1: "M.Tech",
    course2: "M.A.",
    course3: "M.Sc.",
    course4: "M.D.",
    
  },
  {
    title: "Management",
    course1: "B.B.A",
    course2: "B.C.A",
    course3: "M.C.A",
    course4: "M.B.A",
    
  },

 
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(
    ({  title, course1,course2,course3,course4  }, key) => (
      <a href="#" key={key}>
        <MenuItem className=" h-full gap-5   items-center lg:flex lg:justify-center  rounded-lg">
         
          <div className="">
            <Typography
              variant="h6"
              
              className="flex font-semibold items-center text-sm "
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-sm lg:flex lg:justify-center sm:justify-items-start flex-col p-2    text-blue-gray-500"
            >
              <div className="hover:text-green-700 p-1 ">{course1}</div>
              <div className="hover:text-green-700 p-1">{course2}</div>
              <div className="hover:text-green-700 p-1">{course3}</div>
              <div className="hover:text-green-700 p-1">{course4}</div>
      
            </Typography>
          </div>
        </MenuItem>
      </a>
    ),
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-normal hover:text-green-600 text-black"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Courses
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-lg  lg:block">
          <ul className="grid grid-cols-3 gap-y-3 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}
export default NavListMenu