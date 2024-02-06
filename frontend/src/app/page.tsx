import NavbarComponent from "@/components/Navbar";
import Unlogged from "@/components/Unlogged";
import Logged from "@/components/Logged";

export default function Home() {
  return (
    <>
      <NavbarComponent />
      {/* <Unlogged /> */}
      <Logged />
    </>
  );
}
