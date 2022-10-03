import React from 'react';
import './PostMap.scss';

//////////////////學儒專用地圖
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_URL } from '../../../utils/config';
const centers = [
  {
    id: 1,
    name: '礁溪好好玩',
    position: { lat: 24.8311324, lng: 121.7742168 },
    photo: 'https://picsum.photos/200/300?random2',
  },
  {
    id: 2,
    name: '羅東超讚',
    position: { lat: 24.8211324, lng: 121.7642168 },
    photo: 'https://picsum.photos/200/300?random1',
  },
  {
    id: 3,
    name: '花東真漂亮',
    position: { lat: 24.8111324, lng: 121.7742168 },
    photo: 'https://picsum.photos/200/300?random21',
  },
  {
    id: 4,
    name: '花東五日遊',
    position: { lat: 24.8011324, lng: 121.6742168 },
    photo: 'https://picsum.photos/200/300?random5',
  },
  {
    id: 5,
    name: '礁溪泡溫泉去',
    position: { lat: 24.685587, lng: 121.824053 },
    photo: 'https://picsum.photos/200/300?random5',
  },
];
function PostMap({ post }) {
  // const [mapLocate, setMapLocate] = useState({});
  // console.log('地圖值', post);
  // const lat = post.latitude
  // useEffect(() => {
  //   const fetchLocate = async () => {
  //     try {
  //       const result = await axios.get(`${API_URL}/community/mapLocate`);
  //       // 取得後端來的資料
  //       console.log('result,data', result.data);
  //       setMapLocate(result.data);
  //     } catch (err) {
  //       console.log('fetchLikeState', err);
  //     }
  //   };
  //   fetchLocate();
  // }, []);

  const mapRef = useRef(null);
  return (
    <div className="post_map">
      <p className="post_map_list_title">行程地圖</p>

      <div className="communitymap_body">
        <GoogleMap
          ref={mapRef}
          center={{ lat: 24.8451324, lng: 121.7842168 }}
          zoom={14}
          mapContainerClassName="communitymap_container"
        >
          {centers.map(({ id, position, name, days, photo, user }) => {
            return (
              <Marker
                draggable={true}
                animation={'Animation :BOUNCE'}
                label={days}
                labelStyle={{ background: '#fff' }}
                key={id}
                position={position}
              >
                <InfoWindow className="" key={id} position={position}>
                  <div className="travelmap_InfoWindow_Countain">
                    <div className="travelmap_InfoWindow_wrap">
                      <img
                        src={photo}
                        alt="#123"
                        className="travelmap_InfoWindow_photo"
                      />
                    </div>
                    <div className="travelmap_InfoWindow_aside">
                      <p className="travelmap_InfoWindow_tittle">{name}</p>
                      {/* <p className="travelmap_InfoWindow_user">{user}</p> */}
                    </div>
                  </div>
                </InfoWindow>
              </Marker>
            );
          })}
        </GoogleMap>
      </div>
    </div>
  );
}

export default PostMap;
