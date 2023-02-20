import { KeyboardEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { DrinkResType } from "./type";

function App() {
  const [name, setName] = useState<string>("");
  const [list, setList] = useState<DrinkResType[]>([]);
  const [search, setSearch] = useState<boolean>(false);

  const { isLoading } = useQuery<{ drinks: DrinkResType[] }, AxiosError>(
    "cocktail",
    async () => {
      const res = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php`,
        {
          params: {
            s: name,
          },
        }
      );
      return res.data;
    },
    {
      onSuccess: (data) => {
        setList(data.drinks);
        setSearch(false);
      },
      enabled: search,
    }
  );

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearch(true);
      return;
    }
  };

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => handleSearch(e)}
        value={name}
      />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {list?.map((item, index) => (
            <li key={index}>
              <div>{item.strDrink}</div>
              <img src={item.strDrinkThumb} alt="img" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
