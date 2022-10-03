import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../utils/config';
import mapicon from '../../../images/Travel_input_location.svg';
import {
  handleSuccess,
  handleInfoComfirm,
} from '../../../utils/handler/handleStatusCard';

import './Traveldrag.scss';
import { HiOutlineTrash } from 'react-icons/hi';
import { TiLocation } from 'react-icons/ti';
const TravelDrag = ({
  planning,
  indexs,
  dayLength,
  setDeviceDetial,
  editdetail,
  setGetDays,
  gettravelid,
  editPlanning,
  setEditPlanning,
  setIfDelete,
  ifDelete,
}) => {
  //子傳父
  useEffect(() => {
    setDeviceDetial(items);
  });
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    height: 132,
    width: 650,
    // padding: `10px 0 10px 10px`,
    margin: `5px 0px`,
    // background: isDragging ? 'dakren(#E7E7E9,10%)' : '#E7E7E9',
    ...draggableStyle,
  });
  const getListStyle = (isDraggingOver) => ({
    // background: isDraggingOver ? 'white' : 'white',
    // height: 850,
    // width: 725,
    // border: 'none',
  });
  const [getlocateid, setGetlocateid] = useState('');

  const [items, setItems] = useState([]);
  const [itemsAry, setItemsAry] = useState([]);
  const [getsort, setGetsort] = useState({
    getsort: {},
  });
  // const [getDays, setGetDays] = useState([]);
  useEffect(() => {
    setGetDays(indexs + 1);
  }, []);
  // console.log('planning=======', planning);

  useEffect(() => {
    setItems(planning); // 預覽畫面用
    let tmpItemAry = [];
    const days = dayLength;

    for (let i = 0; i < days; i++) {
      const tmpAry = [...editPlanning].filter((item) => {
        return item.days === i + 1;
      });
      tmpItemAry.push(tmpAry);
    }
    setItemsAry(tmpItemAry); // 編輯畫面用的
  }, []);

  // 刪除景點後重新render改變狀態
  useEffect(() => {
    async function GetAPIdeleteClick(e) {
      try {
        let response = await axios.post(`${API_URL}/delete/locateName`, {
          getlocateid,
        });
        setItems(planning); // 預覽畫面用
        setIfDelete(true);
      } catch (e) {
        console.log('錯誤', e);
      }
    }
    GetAPIdeleteClick();
  }, [ifDelete]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const newItemAry = [].concat(itemsAry);
    const reorderedItems = reorder(
      newItemAry[indexs],
      result.source.index,
      result.destination.index
    );
    newItemAry[indexs] = [].concat(reorderedItems);
    setItems(reorderedItems);
    setItemsAry(newItemAry);
    let updatePlanning = [];
    for (const [index, item] of newItemAry.entries()) {
      const newSortItem = JSON.parse(JSON.stringify(item));
      for (const [i, data] of item.entries()) {
        newSortItem[i]['sort'] = i + 1;
      }
      updatePlanning = updatePlanning.concat(newSortItem);
    }
    console.log('updatePlanning=========', updatePlanning);
    setEditPlanning(updatePlanning);
    setGetsort(result.destination.index);
  };
  //取景點id來更改sort順序
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let response = await axios.post(
        `${API_URL}/post/locationSort?travelid=${gettravelid}`,
        editPlanning
      );
      let responseA = await axios.post(
        `${API_URL}/post/addlocationSort?travelid=${gettravelid}`,
        { editPlanning }
      );
      setIfDelete(true);
      handleSuccess('成功變更順序!');
    } catch (e) {
      console.log('錯誤', e);
    }
  }

  //刪除景點
  async function deleteClick(e) {
    e.preventDefault();
    console.log('delete ID', getlocateid);
    try {
      let response = await axios.post(`${API_URL}/delete/locateName`, {
        getlocateid,
      });
      setIfDelete(true);
      handleSuccess('刪除成功');
    } catch (e) {
      console.log('錯誤', e);
    }
  }

  return (
    <>
      {editdetail === 0 ? (
        <div className="traveldrage_change">
          {items.map((item, index) => {
            return indexs + 1 === item.days ? (
              <div className="travelDrag_container" key={item.daysort}>
                <div
                  className="travel_drag_main_card row card border-primary "
                  onClick={() => {
                    setGetlocateid(item.id);
                  }}
                >
                  <div className="row g-1" style={{ height: '120px' }}>
                    <div className="col-3">
                      {items.length === 0 ? (
                        <img
                          src="https://picsum.photos/300/300?random31"
                          alt="#/"
                          className="Travel_Drag_card_img "
                        />
                      ) : (
                        <img
                          //TODO:要Demo再放照片 每次渲染都號一次google maps api
                          src={item.google_photo}
                          // src="https://picsum.photos/1300/1300?random31"
                          className="Travel_Drag_card_img "
                          alt="1..."
                        />
                      )}
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <div className="Travel_Drag_cardText d-flex me-2">
                          <img
                            src={mapicon}
                            className="travel_Dragmapicon"
                            alt="#123"
                          />
                          <p className="Travel_DragNavbar_text ms-1">
                            {item.locate_name}
                          </p>
                        </div>
                        <div className="d-flex bd-highlight justify-content-end ">
                          <div
                            className="Travel_Drag_trashIconn  d-flex "
                            onClick={(e) => {
                              handleInfoComfirm(
                                '確認要刪除?',

                                () => {
                                  deleteClick(e);
                                },
                                '刪除後將無法恢復'
                              );
                            }}
                          >
                            <HiOutlineTrash className="ms-2 me-1" />
                            <p className=" Travel_Drag_cardNT ">刪除</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ''
            );
          })}
        </div>
      ) : itemsAry.length === 0 ? (
        ''
      ) : (
        <div className="travleDrag_Main ">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  className="travelDrag_container   d-flex flex-column"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {itemsAry[indexs].map((item, index) => {
                    return (
                      <Draggable
                        key={item.daysort}
                        draggableId={item.latitude}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            className="travelDrag_Options card border-primary "
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <div
                              className="travelDrag_tittle "
                              onClick={() => {
                                setGetlocateid(item.id);
                              }}
                            >
                              <div className="">
                                <div className="col-md-3 me-3 travel_dragcard_photo">
                                  {items.length === 0 ? (
                                    <img
                                      src="https://picsum.photos/300/300?random31"
                                      alt="#/"
                                      className="Travel_Drag_card_exit "
                                    />
                                  ) : (
                                    <img
                                      //要Demo再放照片 每次炫覽都號一次google maps api
                                      src={item.google_photo}
                                      // src="https://picsum.photos/300/1300?random31"
                                      className="Travel_Drag_card_exit "
                                      alt="..."
                                    />
                                  )}
                                </div>
                              </div>
                              <img
                                src={mapicon}
                                className="travel_Dragmapicon ms-5"
                                alt="#123"
                              />
                              <div className="travel_Dragmaptitle ms-2">
                                {item.locate_name}
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                  <div className="d-flex justify-content-center">
                    <button
                      onClick={handleSubmit}
                      className="btn border-primary edit_save_btn"
                    >
                      {items.daysort === '' ? '' : '完成'}
                    </button>
                  </div>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
    </>
  );
};

export default TravelDrag;
