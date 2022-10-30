import { useContext, useEffect } from "react";
import MapContext from "../MapOld/MapContext";
import OLTileLayer from "ol/layer/Tile";
const TileLayer = ({ source, zIndex = 0 }) => {
  const { map } = useContext(MapContext); 
  useEffect(() => {
    if (!map) return;
    
    let tileLayer = new OLTileLayer({
      source,
      zIndex,
    });
    map.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);
    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
  }, [map]);
  return null;
};
export default TileLayer;
//https://medium.com/swlh/how-to-incorporate-openlayers-maps-into-react-65b411985744