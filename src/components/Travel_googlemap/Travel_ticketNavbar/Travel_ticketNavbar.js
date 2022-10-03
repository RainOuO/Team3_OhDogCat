import React from 'react';
import './Travel_ticketNavbar.scss';
import { IoStorefrontOutline } from 'react-icons/io5';
// import { API_URL } from '../../../utils/config';

const Travel_ticketNavbar = ({ travelTicket }) => {
  console.log('我的票卷', travelTicket);
  return (
    <>
      {travelTicket.map((data) => {
        return (
          <div
            key={data.id}
            className="Travel_ticketNavbar_main_card row card border-primary mt-2 "
          >
            <div className="row g-1">
              <div className="col-3">
                {data.main_photo === '' ? (
                  <img
                    src="https://picsum.photos/300/300?random31"
                    alt="#/"
                    className="Travel_ticketNavbar_card_img"
                  />
                ) : (
                  <img
                    src={
                      process.env.REACT_APP_BASE_API_URL +
                      '/' +
                      data.photo_path +
                      '/' +
                      data.main_photo
                    }
                    className="Travel_ticketNavbar_card_img"
                    alt="..."
                  />
                )}
              </div>
              <div className="col mt-3">
                <div className="card-body">
                  <div className=" Travel_ticketNavbar_card_titleDiv">
                    <h5 className="Travel_ticketNavbar_card-title">
                      {data.intro}
                    </h5>
                  </div>
                  <div className="Travel_ticketNavbar_cardText">
                    <p className="Travel_ticketNavbar_text">
                      {data.description}
                    </p>
                  </div>
                  <div className="d-flex bd-highlight ">
                    <div className="Travel_ticketNavbar_storeIconn bd-highlight">
                      <IoStorefrontOutline />
                    </div>
                    <p
                      className="bd-highlight
              Travel_ticketNavbar_card_placeName_text "
                    >
                      {data.name}
                    </p>

                    <p className="ms-auto  bd-highlight Travel_ticketNavbar_cardNT ">
                      NT$ {data.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Travel_ticketNavbar;
