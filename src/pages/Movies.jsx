import React from 'react'
import style from "../styles/movie.module.scss"
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
export async function getServerSideProps(context) {
  const res = await fetch('https://gogoanime.consumet.stream/anime-movies')
  const data = await res.json()
  // console.log(data)
  return {
    props: {
      movies : data
    },
  }
}

const Movies = ({movies}) => {

  console.log(movies)
  // const main = [popular]
  return (
    <>
    <Head>
      <title>Movies</title>
    </Head>
     <div className={style.head}>
      <h1>Movies</h1>
    </div>
<div className={style.main__container}>
    {movies.map((datas, index) => {
          const { animeId, animeImg, animeTitle, releasedDate} = datas;
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
                    <h2>Release date : {releasedDate}</h2>
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

export default Movies