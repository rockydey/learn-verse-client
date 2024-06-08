import axios from "axios";

const axoisPublic = axios.create({
  baseURL: "https://learn-verse-server.vercel.app",
});

const useAxoisPublic = () => {
  return axoisPublic;
};

export default useAxoisPublic;
