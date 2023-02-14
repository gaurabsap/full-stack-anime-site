import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import style from "../../styles/watch.module.scss"
const Watch = ({data}) => {

    const router = useRouter()
    const {watchid} = router.query
    const [episode, setEpisode] = useState(data.episodesList[0] ? data.episodesList[0].episodeId : '')
    const [selected, setSelected] = useState(data.episodesList[0] ? data.episodesList[0].episodeId : '')
    const [videourl, setVideoUrl] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    // console.log(videourl)

    useEffect(()=>{
        const Fetchvideo = async() =>{
            try{
                const resp = await fetch(`https://gogoanime.consumet.stream/vidcdn/watch/${episode}`)
                const dat = await resp.json()
                console.log(dat)
                setVideoUrl(dat)
            }catch(err){
                console.log(err)
            }

        }
        if (episode) {
            Fetchvideo()
        }else {
            setSelected(1);
            Watchanime(1);
        }
    },[episode])
    const main = [data]
    const Watchanime = (eps) =>{
        setEpisode(eps)
        setSelected(eps);
    }
      
      
  return (
    <>
    <Head>
        <title>Watching {episode ? episode : "Anime"}</title>
    </Head>
    {main.map((datas, index)=>{
        const {episodesList, animeTitle, animeImg} = datas
        return(
            <div className={style.container} key={index}>
                <div className={style.first}>
                <div className={style.title}>
                    <h2>Anime : {animeTitle}</h2>
                </div>
                <div className={style.episodes__lists}>
                    <h3>Episode Lists</h3>
                {episodesList && episodesList.length > 0 ?  episodesList.map((episode, index) => {
                return(
                    <button className={style.active}
                    style={selected === episode.episodeId ? {backgroundColor: "red"} : {}} 
                    key={index} onClick={() => Watchanime(episode.episodeId)}>Episode : {episode.episodeNum}</button>
                )
                }): <h1 className={style.error}>No eps availables</h1>}
                </div>
                </div>
                <div className={style.video}>
                    
                    {videourl.Referer ? <iframe src={videourl.Referer} allowFullScreen frameBorder={0} width="600px" height="600px"></iframe> : <h1 className={style.loading}>Loading...</h1>}
                </div>
            </div>
        )
    })}
    </>
  )
}
export async function getServerSideProps({query}) {
    const watchid = query.watchid
    const res = await fetch(`https://gogoanime.consumet.stream/anime-details/${watchid}`)
    const data = await res.json()
    // console.log(data)
    return {
      props: {
        data
      }
    }
}
export default Watch