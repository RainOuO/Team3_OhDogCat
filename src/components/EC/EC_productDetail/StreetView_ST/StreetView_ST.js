import React from 'react';
import './StreetView_STMap.scss';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  StreetViewPanorama,
} from '@react-google-maps/api';
import { useState, useEffect, useRef } from 'react';
// const centers = [
//   {
//     id: 1,
//     days: '1',
//     name: '白圍牆地中海景觀咖啡餐廳',
//     position: { lat: 24.8677529, lng: 121.1843288 },
//     photo: 'https://picsum.photos/200/300?random2',
//     user: '旺旺仙貝',
//   },
// ];

function GoogleMapsST() {
  const mapRef = useRef(null);
  return (
    <div className="streeView_STMap_body">
      <GoogleMap
        ref={mapRef}
        center={{ lat: 24.8681809, lng: 121.1845288 }}
        zoom={18}
        mapContainerClassName="streeView_STMap_body_container"
      >
        {/* {centers.map(({ id, position, name, photo, user }) => {
          return (
            <Marker
              draggable={true}
              animation={'Animation :BOUNCE'}
              labelStyle={{ background: '#fff' }}
              key={id}
              position={position}
            >
              <InfoWindow className="" key={id} position={position}>
                <div className="streeView_GEMap_InfoWindow">
                  <div className="streeView_GEMap_InfoWindow_wrap">
                    <img
                      src={photo}
                      alt="#123"
                      className="streeView_GEMap_InfoWindow_photo"
                    />
                  </div>
                  <div className="streeView_GEMap_InfoWindow_aside">
                    <p className="streeView_GEMap_InfoWindow_tittle">{name}</p>
                    <p className="streeView_GEMap_InfoWindow_user">{user}</p>
                  </div>
                </div>
              </InfoWindow>
            </Marker>
          );
        })} */}
        <StreetViewPanorama
          position={{ lat: 25.012188, lng: 121.328045 }}
          visible={true}
        />
      </GoogleMap>
    </div>
  );
}

export default GoogleMapsST;
