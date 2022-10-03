import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../../../../components/SearchBar/SearchBar_search';
import EcHomePageSlider from '../../../../components/EC/EC_homePage/EC_HomePageSlider';
import EcHomePageCategory from '../../../../components/EC/EC_homePage/EC_HomePageCategory';
import EcHomePageCard from '../../../../components/EC/EC_homePage/EC_HomePageCard';

import { restaurantSlider } from '../../../../components/EC/EC_homePage/EC_data/Slider/RestaurantSlider';
import { restaurantCategory } from '../../../../components/EC/EC_homePage/EC_data/Category/RestaurantCategory';
import { API_URL } from '../../../../utils/config';

function EcRestaurantHomepage() {
  // 推薦標題
  const cardTitle = [
    {
      name: '咖啡廳推薦',
      img: 'https://img.freepik.com/free-photo/cocker-spaniel-eating-birthday-cake-home_1303-27275.jpg?w=740&t=st=1663238986~exp=1663239586~hmac=5e8361aa3b9c9c56ce72b1379ca5f4f164eb18805bc7bfed3defb487090b5fb6',
    },
    {
      name: '寵物甜點推薦',
      img: 'https://img.freepik.com/premium-photo/gray-scottish-cat-with-big-cheeks-yellow-eyes_107760-260.jpg',
    },
  ];
  // 推薦區域商品
  const [coffeeCard, setCoffeeCard] = useState([]);
  const [cakeCard, setCakeCard] = useState([]);
  // const [healthCard, setHealthCard] = useState([]);

  // 搜尋==========
  const [search, setSearch] = useState('');
  const [titleSearch, setTitleSearch] = useState('');

  useEffect(() => {
    const fetchFishProducts = async () => {
      const arrStr = [
        { id: '3', keyword: '下午茶', setState: setCoffeeCard },
        { id: '3', keyword: '甜點', setState: setCakeCard },
        // { text: '益生菌', setState: setHealthCard },
      ];

      for (let index = 0; index < arrStr.length; index++) {
        const result = await axios.get(
          `${API_URL}/product/recommendProduct?typeId=${arrStr[index].id}&keyword=${arrStr[index].keyword}`
        );
        const data = result.data;
        arrStr[index].setState(data);
      }
    };
    fetchFishProducts();
    // console.log(cakeCard);
  }, []);
  return (
    <div className="ecHomePage">
      <div className="EcRestaurantHomepage_main">
        <div className="EcEnjoyHomepage_main_bg md-2">
          <SearchBar
            searchBar_title="哪裡有好吃的餐廳？"
            searchBar_placeholder="尚好吃的攏底家"
            search={search}
            setSearch={setSearch}
            titleSearch={titleSearch}
            setTitleSearch={setTitleSearch}
            setTypeId={3}
            typeId={3}
          />
          <div className="BGCircle1"></div>
          <div className="BGCircle2"></div>
          <div className="BGCircle3"></div>
          <div className="BGCircle4"></div>
          <EcHomePageSlider ecTypeSlider={restaurantSlider} />
        </div>
        <EcHomePageCategory ecTypeCategory={restaurantCategory} />
        <EcHomePageCard
          ecTypeCardTitle={cardTitle[0]}
          ecTypeCard={coffeeCard}
        />
        <EcHomePageCard ecTypeCardTitle={cardTitle[1]} ecTypeCard={cakeCard} />
        {/* <EcHomePageCard
          ecTypeCardTitle={cardTitle[2]}
          ecTypeCard={healthCard}
        /> */}
      </div>
    </div>
  );
}

export default EcRestaurantHomepage;
