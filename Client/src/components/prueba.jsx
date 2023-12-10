import { useState } from "react";
import { useDispatch } from "react-redux";
import { fechSearch } from "../redux/slices/ProducSlice";

const SearchPru = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fechSearch(input));
    setInput("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} action="">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Search pokemon"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchPru;
