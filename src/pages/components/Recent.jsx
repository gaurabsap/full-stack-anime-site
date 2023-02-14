import React from 'react'
import { useEffect, useState } from 'react';
import style from "../../styles/recent.module.scss"
import Image from 'next/image';
import Link from 'next/link';
import {MdSlowMotionVideo} from "react-icons/md"
const Recent = () => {
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
  return (
    <>
    <div className={style.head}>
        <h1>Recent release Animes..</h1>
    </div>
    <div className={style.main__container}>
    {data.map((datas, index) => {
          const { animeId, animeImg, animeTitle, subOrDub } = datas;
          return (
            <div className={style.container} key={index}>
                <div className={style.images}>
                    <Image src={animeImg} width={250} height={290} alt="anime"/>
                </div>
                <div className={style.inform}>
                <div className={style.title}>
                    <h1>{animeTitle}</h1>
                </div>
                <div className={style.info}>
                    <h2>{subOrDub}</h2>
                    {/* <h3>{episodeNum}eps</h3> */}
                </div>
                <div className={style.buttons}>
                <Link href={`/watch/${animeId}`}>
                    <button>Watch</button>
                </Link>
                <Link href={`/details/${animeId}`}>
                    <button>Details</button>
                </Link>
                </div>
                </div>
               
            </div>
          );
        })}
    </div>

    </>
  )
}

export default Recent