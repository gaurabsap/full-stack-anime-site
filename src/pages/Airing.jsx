import React from 'react'
import style from "../styles/airing.module.scss"
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
export async function getServerSideProps(context) {
  const res = await fetch('https://gogoanime.consumet.stream/top-airing')
  const data = await res.json()
  // console.log(data)
  return {
    props: {
      airing : data
    },
  }
}

const Airing = ({airing}) => {

  console.log(airing)
  // const main = [popular]
  return (
    <>
      <Head>
          <title>Top-airing anime</title>
      </Head>
     <div className={style.head}>
      <h1>Most Popular Anime</h1>
    </div>
<div className={style.main__container}>
    {airing.map((datas, index) => {
          const { animeId, animeImg, animeTitle, genres} = datas;
          return (
            <div className={style.container} key={index}>
                <div className={style.images}>
                    <Image src={animeImg} width={250} height={290} alt="Anime" />
                </div>
                <div className={style.inform}>
                <div className={style.title}>
                    <h1>{animeTitle}</h1>
                </div>
                <div className={style.info}>
                    <h2>genre : {genres[0]}, {genres[1]}</h2>
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

export default Airing