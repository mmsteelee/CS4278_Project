import { Vector as VectorSource } from 'ol/source';

function vector({ features }) {
	return new VectorSource({
		features
	});
}

export default vector;
//https://github.com/mbrown3321/openlayers-react-map/tree/master/src/Source