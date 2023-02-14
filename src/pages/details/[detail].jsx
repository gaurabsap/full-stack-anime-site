import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import style from "../../styles/detail.module.scss"
const Detail = ({data}) => {
    const router  = useRouter()
    const {detail} = router.query
    const main = [data]
  return (
    <>
    <Head>
        <title>{detail}</title>
    </Head>
    {main.map((datas, index)=>{
        // console.log(datas)
        const {synopsis, animeTitle, animeImg, type, releasedDate, status, genres, otherNames, totalEpisodes, episodesList} = datas
        return(
            <div className={style.details} key={index}>
                <div className={style.detail}>
                <Image src={animeImg} width={300} height={300} alt="anime"/>
                <div className={style.header}>
                    <h1>Anime : {animeTitle}</h1>
                    <h2>{synopsis}</h2>
                    <div className={style.infor}>
                        <h2>Release date : {releasedDate}</h2> 
                        <h2>Status : {status}</h2>
                        <h2>Type : {type}</h2>
                        <h2>Total episodes : {totalEpisodes}</h2>
                        <h2>Genres : {genres[0]}, {genres[1]}, {genres[2]}</h2>
                        <h2>OtherNames : {otherNames}</h2>
                        <Link href={`/watch/${detail}`}>
                            <button>Watch</button>
                        </Link>
                    </div>
                </div>
                </div>
            </div>
        )
    })}
    </>
  )
}
export async function getServerSideProps({query}) {
    const detail = query.detail
    const res = await fetch(`https://gogoanime.consumet.stream/anime-details/${detail}`)
    const data = await res.json()
    // console.log(data)
    return {
      props: {
        data
      }
    }
}
export default Detail