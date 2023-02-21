import { useState } from "react";
import { useQuery } from "react-query";
import { instance as axios } from "./utils/axios";
import { DrinkResType } from "./type";

function App() {
  const [name, setName] = useState<string>("");
  const [list, setList] = useState<DrinkResType[]>([]);
  const [search, setSearch] = useState<boolean>(false);

  const getCocktail = async (
    payload: string
  ): Promise<{ drinks: DrinkResType[] }> => {
    try {
      const res = await axios.get(`/search.php`, {
        params: {
          s: payload,
        },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const { isLoading } = useQuery("cocktail", () => getCocktail(name), {
    onSuccess: (data) => {
      setList(data.drinks);
      setSearch(false);
    },
    enabled: search,
  });

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && setSearch(true)}
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
