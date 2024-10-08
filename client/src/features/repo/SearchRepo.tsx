import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchRepo() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      Searchbar
    </div>
  )
}

export default SearchRepo;
