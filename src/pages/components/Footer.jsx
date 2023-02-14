import React from 'react'
import style from "../../styles/footer.module.scss"
import Link from 'next/link'
const Footer = () => {
  return (
    <>
    <footer className={style.footer}>
        <div className={style.first}>
            <h1>Usefull links..</h1>
            <li>Learn</li>
            <li>about</li>
            <li>contact</li>
            <li>Anime</li>
        </div>
        <div className={style.second}>
            <h1>Categories</h1>
            <li><Link href={'/Popular'}>Popular</Link></li>
            <li><Link href={'/Airing'}>top-airing</Link></li>
            <li><Link href={'/Movies'}>Movies</Link></li>
            <li><Link href={'/'}>Others</Link></li>
        </div>
        <div className={style.logo}>
            <Link href={'/'}>Anime<span>gb</span></Link>
        </div>
    </footer>
    </>
  )
}

export default Footer