import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { instance as axios } from "./utils/axios";
import { InputType, PayloadType, PostResType } from "./type";
import { AxiosError } from "axios";

function App() {
  const [input, setInput] = useState<InputType>({
    title: "",
    body: "",
  });
  const [list, setList] = useState<PostResType[]>([]);
  const { title, body } = input;

  // 리터럴 타입 순서는 응답, 에러, payload 순
  const { mutate } = useMutation<
    { data: PostResType },
    AxiosError,
    PayloadType
  >(
    (payload) => {
      return axios.post("/posts", payload, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
    },
    {
      onSuccess: ({ data }) => {
        setList((prev) => [data, ...prev]);
        console.log(data, "POST done");
      },
    }
  );

  const { isLoading } = useQuery<PostResType[], AxiosError>(
    "posts",
    async () => {
      try {
        const res = await axios.get("/posts");
        return res.data;
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: (data) => {
        setList(data);
        console.log(data, "GET done");
      },
    }
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      title,
      body,
      userId: 345,
    });
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="title"
          onChange={(e) => handleChange(e)}
          value={input.title}
        />
        <textarea name="body" onChange={(e) => handleChange(e)} />
        <button type="submit">submit</button>
      </form>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {list?.map((item, index) => (
            <li key={index}>
              <div>{item.title}</div>
              <div>{item.body}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
