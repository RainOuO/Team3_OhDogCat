import React from 'react';
import mapicon from '../../../images/Travel_input_location.svg';
import axios from 'axios';
import { API_URL } from '../../../utils/config';
import { HiChevronLeft } from 'react-icons/hi';
import { HiOutlinePhone } from 'react-icons/hi';
import { handleSuccess } from '../../../utils/handler/handleStatusCard';

import '@reach/combobox/styles.css';

import './travelsearchBar.scss';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getDetails,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import { useState } from 'react';
import { useEffect } from 'react';
const PlacesAutocomplete = ({
  selected,
  setSelected,
  travelTicket,
  getDays,
  gettravelid,
  setIfDelete,
  ifDelete,
}) => {
  // render新增行程後畫面
  useEffect(() => {
    async function PosthandleSubmit(e) {
      try {
        // let response = await axios.post(`${API_URL}/submit/tripdetail`, {
        //   mapPhone,
        //   mapPhoto,
        //   mapName,
        //   selected,
        //   getDays,
        //   gettravelid,
        // });
        // console.log('景點圖片新增成功', response);

        setIfDelete(true);
        console.log('新增地圖後狀態usEffect', ifDelete);
      } catch (e) {
        console.log('地圖景點新增錯誤', e);
      }
      // handleSuccess('成功建立此行程!', `/Travel_map?travelid=${gettravelid}`);
    }
    PosthandleSubmit();
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let response = await axios.post(`${API_URL}/submit/tripdetail`, {
        mapPhone,
        mapPhoto,
        mapName,
        selected,
        getDays,
        gettravelid,
      });
      console.log('景點圖片新增成功', response);
      handleSuccess('成功建立此行程!', `/Travel_map?travelid=${gettravelid}`);

      setIfDelete(true);
      console.log('新增地圖後狀態false', ifDelete);
    } catch (e) {
      console.log('地圖景點新增錯誤', e);
    }
    // handleSuccess('成功建立此行程!', `/Travel_map?travelid=${gettravelid}`);
  }
  const pictureOnclick = (e) => {
    setStoredetail(1);
    setbackicon(0);
  };

  const iconBackClick = (e) => {
    setbackicon(1);
  };

  const [mapPhoto, setmapPhoto] = useState([]);
  const [mapName, setmapName] = useState([]);
  const [mapPhone, setMapPhone] = useState([]);
  const [mapopenTime, setMapopenTime] = useState([]);
  const [placeId, setPlaceId] = useState('');
  const [showBox, setShowBox] = useState(0);
  const [storedetail, setStoredetail] = useState(0);
  const [backicon, setbackicon] = useState(0);
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const [resultsAll] = await getGeocode({ address });
    setPlaceId(resultsAll.place_id);

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  const submit = (pId) => {
    setShowBox(placeId);
    const parameter = {
      placeId: pId,
      fields: [
        'name',
        'rating',
        'photo',
        'formatted_phone_number',
        'adr_address',
        'business_status',
        'opening_hours',
      ],
    };
    getDetails(parameter)
      .then((details) => {
        console.log('53 Details: ', details);
        console.log('adr_address', details.adr_address);
        console.log('business_status', details.business_status);
        // console.log('utc_offset_minutes', details.utc_offset_minutes);
        console.log(
          'opening_hours/open_now',
          details.opening_hours.weekday_text
        );
        // console.log('formatted_phone_number: ', details.formatted_phone_number); //電話
        // console.log('name: ', details.name); //使用者可理解的地點地址
        setMapopenTime([details.opening_hours.weekday_text]);
        setmapName([details.name]);
        // console.log('setmapName', setmapName);
        console.log('mapName', mapName);

        setmapPhoto([details.photos[0].getUrl()]);
        console.log('IMAGEurl ', mapPhoto);
        setMapPhone([details.formatted_phone_number]);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };

  return (
    <Combobox onSelect={handleSelect} className="travelmap_coboboxBody">
      <div className="travel_input_searchBar_sum  d-flex  ">
        <div className="travel_input_searchBar_sum">
          <ComboboxInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!ready}
            className="travelmap_combobox-input "
            placeholder="請輸入城市、地區"
          />
        </div>
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
        <button
          className="travelmap_SearchBtn "
          onClick={() => {
            submit(placeId);
          }}
        >
          搜尋
        </button>
      </div>
      {/* TODO: useStae 狀態要存到localstorage */}
      <div
        className={
          showBox === placeId
            ? 'travelSearchBar_Wrap  card border-primary '
            : 'd-none'
        }
      >
        <div className="d-flex d-flex justify-content-between">
          <div className="travelSearchBar_Card">
            {/* Getapi storeName */}
            {mapName.length === 0 ? (
              <div>
                <h5 className="travelSearchBar_CardTittle">
                  還沒有行程趕緊搜尋吧!
                </h5>
              </div>
            ) : (
              mapName.map((element, index) => {
                return (
                  <div key={index}>
                    <h5 className="travelSearchBar_CardTittle">{element}</h5>
                  </div>
                );
              })
            )}
          </div>
          <div className="TravelSearchBar_Card ">
            {/* Getapi Image */}
            {mapPhoto.length === 0 ? (
              <div>
                <div
                  onClick={() => pictureOnclick(1)}
                  className="travelSearchBar_photo"
                />
              </div>
            ) : (
              mapPhoto.map((vaule, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => pictureOnclick(1)}
                    className="travelSearchBar_photo"
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
      {/* 店家資訊開始 */}
      <div className={backicon === 1 ? 'searchBAR_IconBack' : ''}>
        <div
          className={storedetail === 1 ? 'travelSearch_storedetail' : 'd-none'}
        >
          <div className="travelSearch_storedetail_card card border-primary  d-flex">
            <div className="d-flex travelSearch_storedetail_Div">
              <div className="travelSearchBar_backIcon ">
                <HiChevronLeft onClick={() => iconBackClick(1)} />
              </div>
              {/*  */}
              {/* Getapi 景點圖片 */}
              {mapPhoto.length === 0 ? (
                <img
                  src="https://picsum.photos/1000/300?random31"
                  alt="#/"
                  onClick={() => pictureOnclick(1)}
                  className="travelSearch_storedetail_photo"
                />
              ) : (
                mapPhoto.map((vaule) => {
                  return (
                    <img
                      src={vaule}
                      alt="#/"
                      key={vaule.id}
                      onClick={() => pictureOnclick(1)}
                      className="travelSearch_storedetail_photo"
                    />
                  );
                })
              )}

              {/*  */}
            </div>
            {/* 景點名稱 */}
            {mapName.length === 0 ? (
              <div className="travelSearch_storedetail_Div">
                <h5 className="travelSearch_storedetail_tittle">
                  台中肯德基一中店
                </h5>
              </div>
            ) : (
              mapName.map((element, index) => {
                return (
                  <div key={index} className="travelSearch_storedetail_Div">
                    <h5 className="travelSearch_storedetail_tittle">
                      {element}
                    </h5>
                  </div>
                );
              })
            )}
            {/* Getapi phone */}
            {mapPhone.length === 0 ? (
              <div className="mt-2">
                <p className="travelSearch_storedetail_phone">
                  <HiOutlinePhone className="me-7" />
                  06 298 4722
                </p>
              </div>
            ) : (
              mapPhone.map((element, index) => {
                return (
                  <div className="mt-2" key={index}>
                    <p className="travelSearch_storedetail_phone ">
                      <HiOutlinePhone className="me-7" />
                      {element}
                    </p>
                  </div>
                );
              })
            )}
            <div className="mt-2">
              {mapopenTime.length === 0 ? (
                <div className="travelSearch_storedetail_contain">
                  <ul>
                    <li className="travelSearch_storedetail_starTime">
                      星期一: 09:00 – 18:00星期二: 09:00 – 18:00星期三: 09:00 –
                      18:00星期四: 09:00 – 18:00星期五: 09:00 – 18:00星期六:
                      09:00 – 18:00星期日: 09:00 – 18:00
                    </li>
                  </ul>
                </div>
              ) : (
                mapopenTime.map((element, index) => {
                  return (
                    <div
                      key={index}
                      className="travelSearch_storedetail_contain"
                    >
                      <ul>
                        <li className="travelSearch_storedetail_starTime">
                          {element}
                        </li>
                      </ul>
                    </div>
                  );
                })
              )}
            </div>
            <div>
              <button className="travelmap_input_button" onClick={handleSubmit}>
                新增此行程
              </button>
            </div>
          </div>
        </div>
      </div>
    </Combobox>
  );
};
const TravelSearchBar = ({
  selected,
  setSelected,
  getDays,
  gettravelid,
  setIfDelete,
  ifDelete,
}) => {
  return (
    <>
      <PlacesAutocomplete
        setSelected={setSelected}
        selected={selected}
        getDays={getDays}
        gettravelid={gettravelid}
        setIfDelete={setIfDelete}
        ifDelete={ifDelete}
      />
    </>
  );
};

export default TravelSearchBar;
