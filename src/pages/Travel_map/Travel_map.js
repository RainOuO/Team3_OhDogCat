import Map from '../../components/Travel_googlemap/Travel_MapBody';
import { useLoadScript } from '@react-google-maps/api';
import { Googlemap_key } from '../../utils/config';
import { API_URL } from '../../utils/config';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const TravelPlaces = () => {
  // ID從網址字串抓
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const travelid = urlSearchParams.get('travelid');

  const [travelTicket, setTravelTicket] = useState([]); //拿票卷
  const [planning, setPlanning] = useState([]); //拿詳細地點資訊名稱
  const [getlocate, setGetlocate] = useState([]); // 拿經緯度給地圖
  const [gettravelid, setGettravelid] = useState(''); //拿travelid進入行程用
  const [traveltitle, setTraveltitle] = useState([]); // 拿日期 標題
  const [ifDelete, setIfDelete] = useState(false); //重新render畫面

  useEffect(() => {
    const callTravelTicketApi = async () => {
      try {
        const result = await axios.get(`${API_URL}/travelTicket/title`, {
          withCredentials: true,
        });
        const data = result.data;
        setTravelTicket(data);
      } catch (err) {
        console.error('callTravelTicketApi Error', err);
      }
    };
    callTravelTicketApi();
  }, []);
  //planning
  useEffect(() => {
    const callPlanningAPI = async () => {
      try {
        const result = await axios.get(
          `${API_URL}/travelplanning?travelid=${travelid}`
        );
        // console.log('travelid', travelid);
        const data = result.data;
        setIfDelete(false); ///重新render
        setPlanning(data);
        console.log('TravelmapifDelete', ifDelete);
      } catch (err) {
        console.error('callPlanningAPI Error', err);
      }
    };
    callPlanningAPI();
  }, [ifDelete]);
  // 拿日期頁面 標題
  useEffect(() => {
    const calltitledateApi = async () => {
      try {
        const result = await axios.get(
          `${API_URL}/travelTitle?travelid=${travelid}`
        );
        const data = result.data;
        setGettravelid(travelid);
        setTraveltitle(data);
      } catch (err) {
        console.error('calltitledateApi Error', err);
      }
    };
    calltitledateApi();
  }, []);
  //拿經緯度給地圖用
  useEffect(() => {
    const callPlanningAPI = async () => {
      try {
        const result = await axios.get(
          `${API_URL}/travelLocate?travelid=${travelid}`
        );
        // console.log('travelid', travelid);
        const data = result.data;
        setGetlocate(data);
        // console.log('TravelmapifDelete', ifDelete);
      } catch (err) {
        console.error('callPlanningAPI Error', err);
      }
    };
    callPlanningAPI();
  }, [planning]);
  // console.log('getlocate========', getlocate);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: Googlemap_key,
    libraries: ['places'],
  });
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Map
      travelTicket={travelTicket}
      planning={planning}
      traveltitle={traveltitle}
      gettravelid={gettravelid}
      setIfDelete={setIfDelete}
      ifDelete={ifDelete}
      getlocate={getlocate}
    />
  );
};
export default TravelPlaces;
