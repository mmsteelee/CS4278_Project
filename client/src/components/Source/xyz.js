import * as olSource from "ol/source";

function xyz({ url, attributions, maxZoom }) {
	return new olSource.XYZ({ url, attributions, maxZoom });
}

export default xyz;
//https://github.com/mbrown3321/openlayers-react-map/tree/master/src/Source