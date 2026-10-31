
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useContext } from "react";
import { authContext } from "../context/auth.context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function NavbarCom() {
  const context = useContext(authContext);
  const navigate = useNavigate();

  if (!context) throw new Error("authContext must be used within AuthContextProvider");

  const { setLogin } = context;

  function logout() {
    localStorage.removeItem("tkn");
    setLogin(null);
    navigate("/login"); // أو المسار الذي تريده بعد تسجيل الخروج
    toast.success("Log out successful");
  }

  return (
    <Navbar fluid className="bg-social-blue">
      <div className="container flex flex-wrap justify-between items-center">
        <NavbarBrand href="#">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Flowbite React
          </span>
        </NavbarBrand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <DropdownItem>profile</DropdownItem>
            <DropdownItem>setting</DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={logout}>log out</DropdownItem>
          </Dropdown>
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink href="#">Feed</NavbarLink>
          <NavbarLink href="#">Profile</NavbarLink>
          <NavbarLink href="#">Notification</NavbarLink>
        </NavbarCollapse>
      </div>
    </Navbar>
  );
}