import axios from "axios";

export const instance = axios.create({
  baseURL: "https://www.thecocktaildb.com/api/json/v1/1",
});
