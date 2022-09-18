import SearchBar from '../../components/SearchBar/SearchBar_search';
import CommunityListCard from '../../components/Community/CommunityListCard/CommunityListCardluis';
// import test_photo from '../../images/test.jpg';
// import test_photo2 from '../../images/test2.jpg';
// import { IoHeartOutline } from 'react-icons/io5';
// import { TiLocation } from 'react-icons/ti';
// import { BiLike } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/config';


import './_CommunityList.scss';

const CommunityList = () => {

  const [postAll, setPostAll] = useState([]);

  useEffect(() => {
    const fetchPostAll = async () => {
      const result = await axios.get(`${API_URL}/community/`);
      // 取得後端來的資料
      console.log(result.data);
      setPostAll(result.data);
      // 存回 useState 狀態
    };
    fetchPostAll();
  }, []);
  return (
    <>
      {/* <div style={{ minHeight: '100vh' }}> */}
      <div className="CommunityList">
        <SearchBar
          searchBar_title="想找什麼貼文呢"
          searchBar_placeholder="狗狗假日放電好去處"
        />
        <section>
          <div className="d-flex justify-content-center align-items-center m-3">
            <h5 className="comList_search_result">
              搜尋”柯基”關鍵字的結果如下，共{postAll.length}筆資料:
            </h5>
          </div>
          <div className="container d-flex flex-column align-items-center">
            <CommunityListCard post={postAll} />
          </div>
        </section>
      </div>
    </>
  );
};

export default CommunityList;
