import axios from "axios";
import { options, serverurl, statecode } from "./serverproperties";

export async function getPlotAtXY(coordinates, gisCode) {

    const parameters = new URLSearchParams({
        giscode: gisCode,
        x: coordinates[0],
        y: coordinates[1],
    });

    return axios.post(serverurl + 'mapinfo/getPlotAtXY', parameters, options)
        .then((res) => {
            console.log(res.data);
            return res.data;
        })
        .catch((error) => {
            console.log(error)

            return null;
        });
}

export async function getVVVVExtentGeoref(gislevels, srs) {
    const parameters = new URLSearchParams({
      gisLevels: gislevels,
      srs: srs,
      state: statecode,
    });
  
    return axios.post(serverurl + 'mapinfo/getVVVVExtentGeoref', parameters, options)
      .then((res) => {
        console.log(res.data);
        $('#attribution').html(res.data.attribution);
        return res.data;
      })
      .catch((error) => {
        console.log(error)
  
        return null;
      });
  }