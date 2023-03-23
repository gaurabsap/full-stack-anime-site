import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperCore, {Autoplay} from 'swiper'
import Image from "next/image";
import style from "../../styles/Home.module.scss"
import Link from "next/link";
const Home = () => {
  SwiperCore.use([Autoplay])
  const [data, setData] = useState([]);
  useEffect(() => {
    const FetchData = async () => {
      try{
        const res = await fetch("https://gogoanime.consumet.stream/recent-release");
        const data = await res.json();
        // console.log(data);
        setData(data);
      }catch(err){
        console.log(err)
      }

    };
    FetchData();
  }, []);
  // console.log(data)
  return (
    <>
      <Swiper
        // spaceBetween={50}
        modules={[Navigation, Pagination, A11y]}
        loop={true}
        slidesPerView={1}
        autoplay={{ delay: 2500 }}
        navigation
        pagination={{ 
          clickable: false,
          bulletClass: `swiper-pagination-bullet`
         }}
        scrollbar={{ draggable: true }}
        >
        {data.map((datas, index) => {
          const { animeId, animeImg, animeTitle, episodeId,episodeNum, subOrDub } = datas;
          return (
            <SwiperSlide key={index}>
              <div className={style.container}>
                <div className={style.header}>
                  <div className={style.heading}>
                    <h1>{animeTitle}</h1>
                    <h2>Total episodes : {episodeNum}</h2>
                    <h3>Lang : {subOrDub}</h3>
                    <Link href={`/watch/${episodeId}`}>
                      <button>Watch</button>
                    </Link>
                  </div>
                </div>
                <Image src={animeImg} width={320} height={240} alt="anime"/>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );

};

export default Home;
