import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TravelDrag from '../TravelDrag/TravelDrag';
import { HiChevronLeft } from 'react-icons/hi';
import { MdPhotoSizeSelectActual } from 'react-icons/md';
import { handleSuccess } from '../../../utils/handler/handleStatusCard';
import { HiOutlinePencilAlt } from 'react-icons/hi';
// import CoverBackground from '../../../images/post_edit_background_banner.png';

import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../utils/config';

////////////////Date  start
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'} variant={'body2'}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
const travelprops = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};
const TravelDate = ({
  planning,
  traveltitle,
  setGetDays,
  gettravelid,
  setIfDelete,
  ifDelete,
}) => {
  ////傳給子層
  const [deviceDetial, setDeviceDetial] = useState({}); //axios post 到後端
  ///
  const [editPlanning, setEditPlanning] = useState([]);
  const moment = require('moment');
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [showdate, setShowdate] = useState([]);
  // console.log('showdate', showdate);
  const handleClick = () => {
    let newDate = [...showdate];
    newDate.push(
      moment(showdate[showdate.length - 1])
        .add(1, 'days')
        .format('yyyy-MM-DD')
    );
    setShowdate(newDate);
  };

  useEffect(() => {
    // = 處理資料
    let tmpItemAry = [];
    planning.sort((a, b) => {
      return a.days - b.days;
    });
    // console.log('traveltitle', traveltitle);
    // console.log('planning 原始資料', planning);
    for (const [index, item] of planning.entries()) {
      let isExist = tmpItemAry.some((element) => element[0].days === item.days);
      if (isExist) {
        // console.log('index', index);
        tmpItemAry[tmpItemAry.length - 1].push(item);
      } else {
        // console.log('index', index);
        tmpItemAry.push([item]);
      }
    }
    const newShowDate = tmpItemAry.map((item) => item[0].day);
    // setShowdate(tmpItemAry);
  }, []);

  useEffect(() => {
    if (traveltitle.length === 0) return;
    // = '開始整理日期'
    const startDate = moment(
      traveltitle[0] ? traveltitle[0].start_time : ''
    ).format('yyyy-MM-DD');
    const endDate = moment(traveltitle[0] ? traveltitle[0].end_time : '');
    const differentDate = endDate.diff(startDate, 'days') + 1;
    let newDateary = [];
    for (let i = 0; i < differentDate; i++) {
      newDateary.push(moment(startDate).add(i, 'days').format('yyyy-MM-DD'));
    }
    setShowdate(newDateary);
    // = 整理完畢

    // 設定資料
    setMember({
      title: traveltitle[0].title,
      photo:
        process.env.REACT_APP_BASE_API_URL + '/' + traveltitle[0].main_photo,
    });
  }, [traveltitle]);

  useEffect(() => {
    setEditPlanning(planning);
  }, [planning]);

  const [editdetail, setEditdetail] = useState(0);
  //開關 編輯送出 完成
  const [closeeditdetail, setCloseEditdetail] = useState(0);
  //設定form表單的東西
  const [member, setMember] = useState({
    title: '',
    photo: '',
  });
  function inputhandleChange(e) {
    let newMember = { ...member };
    newMember[e.target.name] = e.target.value;
    setMember(newMember);
  }
  async function handleSubmit(e) {
    if (!editdetail) {
      setEditdetail(closeeditdetail + 1);
      setCloseEditdetail(1);
    } else {
      setEditdetail(closeeditdetail - 1);
      setCloseEditdetail(0);
    }
    e.preventDefault();

    if (editdetail) {
      try {
        const copyShowdate = [...showdate];
        let formData = new FormData();
        // console.log('ALLllllllmember', member);
        formData.append('title', member.title);
        formData.append('photo', member.photo);
        formData.append('date', copyShowdate.pop());
        formData.append('travelID', gettravelid);
        console.log('formData', formData);
        let response = await axios.post(
          `${API_URL}/post/datelocationId`,
          formData
        );
        handleSuccess('成功更改此行程', `/Travel_map?travelid=${gettravelid}`);

        console.log('照片標題新增成功', response);
      } catch (e) {
        console.log('錯誤', e);
      }
    }
  }

  //上傳圖片
  const changeHandler = (e) => {
    setMember({ ...member, photo: e.target.files[0] });
  };
  return (
    <>
      <div className="travleDrag_body">
        <div className="travleDrag_menu">
          <div className="travleDrag_header_top  mt-3 d-flex">
            <div className="travleDrag_header_top_left d-flex flex-row">
              <div className="travleDrag_header_bactravleDrag_header_editk me-2">
                <NavLink to="/travel" className="travleDrag_header_backIcon">
                  <HiChevronLeft />
                </NavLink>
              </div>
              {traveltitle.map((data) => {
                return (
                  <div key={data.user_id}>
                    {editdetail ? (
                      <input
                        className="travelDrage_input_title ms-2"
                        type="text"
                        id="title"
                        name="title"
                        value={member.title}
                        onChange={inputhandleChange}
                      />
                    ) : (
                      <h4 className="travleDrag_header_tittle ">
                        {data.title}
                      </h4>
                    )}

                    <h6 className="travleDrag_header_date">
                      {data.start_time}~{data.end_time}
                    </h6>
                  </div>
                );
              })}
            </div>
            <div className="travleDrag_header_upImage">
              <label className="cover_photo_upload d-flex flex-column justify-content-center align-items-center">
                {editdetail ? (
                  <MdPhotoSizeSelectActual className="travleDrag_header_upicon"></MdPhotoSizeSelectActual>
                ) : (
                  ''
                )}

                <div className="travleDrag_photoupdate">
                  {editdetail ? '封面照上傳' : ''}
                </div>
                <input
                  type="file"
                  className=" mt-2"
                  accept="image/*"
                  id="photo"
                  name="photo"
                  onChange={changeHandler}
                  hidden
                />
              </label>
            </div>

            <div
              className="travleDrag_header_edit d-flex"
              onClick={handleSubmit}
            >
              <HiOutlinePencilAlt className="travleDrag_header_icon" />
              <div className="ms-1">{editdetail ? '完成' : '編輯'} </div>
            </div>
          </div>

          <Box>
            <div className="travleDrag_day_container">
              <Box
                sx={{
                  maxWidth: { xs: 530, sm: 730 },
                  bgcolor: 'background.paper',
                }}
              >
                {traveltitle.map((data) => {
                  return (
                    <Tabs
                      key={data.user_id}
                      value={value}
                      onChange={handleChange}
                      variant="scrollable"
                      scrollButtons="auto"
                      aria-label="scrollable auto tabs example"
                    >
                      {showdate.map((value, index) => {
                        return (
                          <Tab
                            label={value}
                            {...travelprops(index)}
                            className="travelDrage_Tab  "
                          />
                        );
                      })}
                      <Tab
                        label="+"
                        {...travelprops()}
                        onClick={handleClick}
                        className="travelDrage_Tab"
                      />
                    </Tabs>
                  );
                })}
              </Box>
            </div>

            {/* 記得這沒有key 找時間補上 */}
            {showdate.map((data, indexs) => {
              return (
                <TabPanel value={value} index={indexs}>
                  <TravelDrag
                    className="boxsizing1"
                    planning={planning}
                    indexs={indexs}
                    dayLength={showdate.length}
                    setDeviceDetial={setDeviceDetial}
                    editdetail={editdetail}
                    setGetDays={setGetDays}
                    gettravelid={gettravelid}
                    editPlanning={editPlanning}
                    setEditPlanning={setEditPlanning}
                    setIfDelete={setIfDelete} //重新render畫面用
                    ifDelete={ifDelete} // render用
                  />
                </TabPanel>
              );
            })}
          </Box>
        </div>
      </div>
    </>
  );
};

export default TravelDate;
