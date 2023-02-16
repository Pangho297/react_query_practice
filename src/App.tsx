import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";

function App() {
  const [list, setList] = useState<any[]>([]);

  useQuery<{ dataseries: any[] }, AxiosError>(
    "weather",
    async () => {
      const res = await axios.get(`http://www.7timer.info/bin/astro.php`, {
        params: {
          let: "37.456328",
          lon: "126.7053223",
          lang: "ko",
          unit: "Metric",
          output: "json",
          tzshift: 0,
        },
      });
      return res.data;
    },
    {
      onSuccess: (data) => {
        setList(data.dataseries);
      },
    }
  );

  return (
    <div>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item.cloudcover}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
