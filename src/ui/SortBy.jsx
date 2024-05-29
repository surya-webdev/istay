import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeUrl = searchParams.get("sortBy") || "";

  console.log(activeUrl);

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return <Select onChange={handleChange} value={activeUrl} options={options} />;
}

export default SortBy;
