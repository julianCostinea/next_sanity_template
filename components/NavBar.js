import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="nav-container">
      <div className="nav-item-container">
        <Link href={"/"}>
            <Image alt="logo" src={"/favicon.ico"} width={140} height={140}/>
        </Link>
      </div>
      <div className="nav-item-container">
        <p>ZZZZ</p>
      </div>
    </nav>
  );
};

export default NavBar;
