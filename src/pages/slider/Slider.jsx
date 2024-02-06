import { useState, useEffect } from 'react';
import "./Silder.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import { MdOutlineDescription } from "react-icons/md";
import { FaPencil  } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';


function Slider() {
    const [data, setData]=useState([])
    const getData = async (api) => {
        try {
          const req = await fetch(api);
          const jsonData = await req.json();
          setData(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
          toast.error("Error 404")
        }
      };
      useEffect(() => {
        getData("http://localhost:3000/people");
      }, []);
      
  return (
    <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {data.map((item)=>{
            return(
              <SwiperSlide>
            <div className="box" key={item.id}>
            <div className="trash" 
            >
              <i><FaPencil /></i>
            </div>
            <p className="name">
              <i className="fa-solid fa-address-card"></i> - {item.name}
            </p>
            <p>
              <i className="fa-solid fa-cake-candles"></i> - {item.age}
            </p>
            <p>
              <i className="fa-solid fa-location-dot"></i> - {item.location}
            </p>
            <p>
              <i><MdOutlineDescription /></i> - {item.desc}
            </p>
            <NavLink to={`/cart-info/${item.id}`}><h3>Read More...</h3></NavLink>
          </div>
          </SwiperSlide>       
            )
        })}
        
      </Swiper>
  )
}

export default Slider