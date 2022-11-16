import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';
import { options, serverurl, statecode } from './serverproperties';

export async function getVillageMapWMS(gisCode) {
  return  new ImageLayer({
    source: new ImageWMS({
      url: serverurl + 'WMS',
      params: {
        LAYERS: 'VILLAGE_MAP',
        transparent: true,
        state: statecode,
        gis_code: gisCode,
        overlay_codes: '',
        CRS: '',
        STYLES: "VILLAGE_MAP"
      },
      serverType: 'geoserver',
      visible: true,
    }),
  });
}

export async function getPlotMapWMS(gisCode, id) {
  return  new ImageLayer({
    source: new ImageWMS({
            url: serverurl + 'WMS',
            params: {
              LAYERS: 'PLOT_LIST',
                state: statecode,
                gis_code: gisCode,
                plot_id: id,
                STYLE: 'PLOT_SELECTION'
              },
            serverType: 'geoserver',
            visibl: true
        }),
        opacity: 0.8
    });
}

export async function setExtent(map, extent) {
  map.getView().fit([extent.xmin, extent.ymin, extent.xmax, extent.ymax], map.getSize());
}