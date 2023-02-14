import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import style from "../../styles/anime.module.scss"
import Image from 'next/image'
import Link from 'next/link'

const Anime = ({data}) => {
    const router = useRouter()
    const {anime} = router.query
  return (
    <>
    <Head>
        <title>{anime}</title>
    </Head>
    
    <div className={style.head}>
      <h1>Search result for :  {anime}</h1>
    </div>
<div className={style.main__container}>
    {data && data.length > 0 ? data.map((datas, index) => {
          const { animeId, animeImg, animeTitle, status} = datas;
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
                    <h2>status : {status}</h2>
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
        }):<h1>No Result found</h1>} 
    </div>
    </>
  )
}

export async function getServerSideProps({query}) {
    const anime = query.anime
    const res = await fetch(`https://gogoanime.consumet.stream/search?keyw=${anime}`)
    const data = await res.json()
    return {
      props: {
        data
      }
    }
}

export default Anime
