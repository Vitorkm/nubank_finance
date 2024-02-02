"use client";
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
  Avatar,
} from "@nextui-org/react";
import Login from "./Login";

export default function NavbarComponent() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                isBordered
                className="transition-transform"
                color="secondary"
                name="Vitor Kretiska"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
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
          {/* <Button onPress={onOpen} color="secondary" href="#" variant="flat">
            Connect Account
          </Button>
          <Login isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} /> */}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
