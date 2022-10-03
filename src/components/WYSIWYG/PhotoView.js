import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

//
import './swiper.scss';
import { BE_URL } from '../../utils/config';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import axios from 'axios';
import { API_URL } from '../../utils/config';
import defaultPhoto from '../../images/社群照片假圖300px.png';

import { useEffect } from 'react';

export default function PhotoReviewSwiper({ list }) {
  // console.log('listdata', list);
  const [selectedLocFile, setSelectedLocFile] = useState('');
  const [previewLoc, setPreviewLoc] = useState('');
  const [tripLocPhoto, setTripLocPhoto] = useState('');
  // console.log('list', list);
  // const [newList, setNewList] = useState([]);
  const [locFiles, setLocFiles] = useState({ photos: '', locateID: '' });

  //景點照片預覽/ 上傳
  let locateID = list.id;

  // console.log('原始父層', list.id);
  useEffect(() => {
    if (!selectedLocFile) {
      setPreviewLoc('');
      setTripLocPhoto(list.locate_photo);
      // console.log('tt', tripLocPhoto);
      return;
    }

    if (locFiles) {
      let formData = new FormData();
      formData.append('locateID', locFiles.locateID);
      formData.append('photo', locFiles.photos);
      try {
        console.log('formData', formData);
        let response = axios.post(
          `${API_URL}/community/tripPostLocUpload`,
          formData
        );
        console.log('景點照片新增成功', response);
      } catch (e) {
        console.log('錯誤', e);
      }
    }
    const objectUrl = URL.createObjectURL(selectedLocFile);
    console.log(objectUrl);
    setPreviewLoc(objectUrl);
    console.log('預覽照片', previewLoc);
    console.log(locFiles);
    return () => URL.revokeObjectURL(objectUrl);
  }, [locFiles, selectedLocFile]);

  const ShowSwiper = ({ data }) => {
    return (
      <PhotoProvider maskOpacity={0.8}>
        <div className="foo locate_photo_single">
          <PhotoView
            key={locateID}
            src={
              previewLoc
                ? previewLoc
                : tripLocPhoto
                ? BE_URL + '/tripPost/' + tripLocPhoto
                : defaultPhoto
            }
          >
            <img
              src={
                previewLoc
                  ? previewLoc
                  : tripLocPhoto
                  ? BE_URL + '/tripPost/' + tripLocPhoto
                  : defaultPhoto
              }
              style={{ objectFit: 'cover' }}
              alt=""
            ></img>
          </PhotoView>
        </div>
      </PhotoProvider>
    );
  };
  return (
    <>
      <div className="d-flex justify-content-end me-4">
        <label className="photo_upload d-flex align-items-center justify-content-center mb-2 mt-2">
          上傳照片
          <input
            type="file"
            accept="images/*"
            name="photos"
            hidden
            className="form-control"
            onChange={(e) => {
              setLocFiles({ photos: e.target.files[0], locateID: locateID });
              setSelectedLocFile(e.target.files[0]);
            }}
          ></input>
        </label>
      </div>
      {selectedLocFile ? <ShowSwiper /> : <ShowSwiper data={list} />}
    </>
  );
}
