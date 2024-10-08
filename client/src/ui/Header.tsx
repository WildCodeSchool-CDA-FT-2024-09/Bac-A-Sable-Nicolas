import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex flex-wrap text-5xl font-bold justify-center mt-3">
      <Link to="/">MY REPOSITORIES</Link>
    </header>
  )
}

export default Header;
