import axios from "axios";
import { fetchUsers } from "./types";

const fetchUser = () => {
  axios.get("/api/current_user");
};
