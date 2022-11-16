import axios from "axios";
import { options, serverurl } from "./serverproperties";

export async function getlevellables() { 
    return axios.get(serverurl + 'level/getlevellables', options)
      .then((res) => {
        return res.data.lables;
      })
      .catch((error) => {
        console.log(error)
          return null;
      });
  }

export async function getlevelentries() {

}