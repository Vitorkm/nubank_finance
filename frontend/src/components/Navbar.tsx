import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  useDisclosure,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/react";
import Avatar from 'boring-avatars';
import { ButtonLogin } from "./ButtonLogin";

export default function NavbarComponent() {

  return (
    <Navbar>
      <NavbarBrand>
        <Image src="nu.svg" alt="nu" height={46} width={46} />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link aria-current="page" color="secondary" href="#">
            Present
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" color="foreground">
            Historic
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Balance
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button color="secondary" variant="shadow" endContent={
              <Avatar
                variant="pixel"
                name="Vitor Kretiska"
                size={32}
              />}>
                Vitor Kretiska
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">Vitor Kretiska</p>
              </DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {/* <ButtonLogin color="secondary" href="#" variant="flat">
            Connect Account
          </ButtonLogin> */}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
