import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { TbTicket } from 'react-icons/tb';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoHeartOutline } from 'react-icons/io5';
import TravelTicketNavbar from '../Travel_ticketNavbar';
import TravelSearchBar from '../TravelSearchBar';

import './Travel_map_Navbar.scss';

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Travel_map_Navbar = ({
  setIfDelete,
  ifDelete,
  selected,
  setSelected,
  travelTicket,
  getDays,
  gettravelid,
}) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '98%' }} className="travel_map_Container">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="">
        <Tabs
          className="travel_map_Tab "
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label={
              <div className="travel_map_nav">
                <TbTicket className="travelmap_navBaricon " />
                收藏的票券
              </div>
            }
            {...a11yProps(0)}
            className="travel_map_Tab travel_map_tabTicketIcon"
          />
          <Tab
            label={
              <div>
                <IoHeartOutline className="travelmap_navBaricon " />
                我的票券
              </div>
            }
            {...a11yProps(1)}
            className="travel_map_Tab"
          />
          <Tab
            label={
              <div>
                <AiOutlineSearch className="travelmap_navBaricon " />
                搜尋
              </div>
            }
            {...a11yProps(2)}
            className="travel_map_Tab"
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="TravelTicketNavbarBody">
          {/* <TravelTicketNavbar travelTicket={travelTicket} /> */}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="TravelTicketNavbarBody">
          <TravelTicketNavbar travelTicket={travelTicket} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={2} component={'span'} variant={'body2'}>
        <div className=" ">
          <TravelSearchBar
            setSelected={setSelected}
            selected={selected}
            getDays={getDays}
            gettravelid={gettravelid}
            setIfDelete={setIfDelete} //重新render畫面用
            ifDelete={ifDelete} //重新render畫面用
          />
        </div>
      </TabPanel>
    </Box>
  );
};
export default Travel_map_Navbar;
