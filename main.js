import './style.css';

import { SidePanel } from 'ol-side-panel';
import { Map, View } from 'ol';
import { getPlotMapWMS, getVillageMapWMS, setExtent} from './loadmap';
import { getlevellables } from './level';
import { getPlotAtXY, getVVVVExtentGeoref } from './map';

var plotLyr = null;
var selPlotLyr = null;

const map = new Map({
  layers: [],
  target: 'map',
  view: new View({
    zoom: 4
  })
});

const levellables = await getlevellables();

for (var i=0; i<levellables.length; i++) {
  console.log(levellables[i]);
}

const gisLevels = '06,01,001,000,002';
const srs = 0;
const vvvvrefData = await getVVVVExtentGeoref(gisLevels, srs);
const giscode = vvvvrefData.gisCode;
plotLyr = await getVillageMapWMS(giscode);
map.addLayer(plotLyr);
setExtent(map, vvvvrefData);

map.on('click', function (evt) {
  var coordinates = evt.coordinate;
  console.log(coordinates);
  showPlotDetails(coordinates, giscode);
});

async function showPlotDetails(coordinates, giscode) {
  const plotdetails = await getPlotAtXY(coordinates, giscode);
  console.log(plotdetails.id);
  if (plotdetails.id == null) return;

  if (selPlotLyr == null) {
    const templayer = await getPlotMapWMS(giscode, plotdetails.id);
    if (templayer == null) {
      map.removeLayer(selPlotLyr);
      return;
    }
    selPlotLyr = templayer;
    map.addLayer(selPlotLyr);
  }
  else {
    selPlotLyr.getSource().updateParams(
      {
          plot_id: plotdetails.id
      });
  }
}


const sidePanel = new SidePanel();
map.addControl(sidePanel);

const layersPane = sidePanel.definePane({
  paneId: 'layers',
  name: "Layers",
  icon: '<i class="bi bi-layers-half"></i>'
});

const layersGreeting = document.createElement('p');
layersGreeting.innerHTML = "Hi there layers!";
layersPane.addWidgetElement(layersGreeting);