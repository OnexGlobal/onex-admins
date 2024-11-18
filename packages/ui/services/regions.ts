import axios from "axios";

export const GetRegions = async () => await axios.get("/regions");
export const GetTowns = async () => await axios.get("/towns");
