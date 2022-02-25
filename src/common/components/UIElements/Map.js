import React, {useRef, useEffect} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './Map.module.css';

const Map = (props) => {
    const map = useRef(null);
    const mapContainer = useRef(null);

    const {lat, lng} = props.coordinate;

    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: 9,
        });
    }, [lat, lng]);

    return <div ref={mapContainer} className={styles.map}></div>;
};

export default Map;
