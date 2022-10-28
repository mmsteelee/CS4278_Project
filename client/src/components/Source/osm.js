import * as olSource from "ol/source";

function osm() {
	return new olSource.OSM();
}

export default osm;
//https://github.com/mbrown3321/openlayers-react-map/tree/master/src/Source