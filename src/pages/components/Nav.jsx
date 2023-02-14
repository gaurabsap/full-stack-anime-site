import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import style from "/src/styles/nav.module.scss"
import {BsSearch} from "react-icons/bs"
import {RxHamburgerMenu, RxCross1} from "react-icons/rx"
import Head from 'next/head'
import { useRouter } from 'next/router';

const Nav = () => {
  const [istoogle, setIstoogle] = useState(false)
  const [animename, setAnimeName] = useState()
  const router = useRouter();
  const toogleMenu = () =>{
    setIstoogle(!istoogle)
  }
  useEffect(() => {
    setIstoogle(false);
  }, [router.pathname]);
  const SendName = (e) => {
    e.preventDefault()
    alert(animename)
  }
  return (
    <>
    <Head>
      <title>Animegb</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    </Head>
    <nav className={style.navbar}>

        <div className={style.logo}>
            <div className={style.menu} onClick={toogleMenu}>
              {istoogle ? <RxCross1 size={25}/> : <RxHamburgerMenu size={25}/>}
          </div>
            <Link href={"/"}>
              <h1>Anime<span>gb</span></h1>
            </Link>
        </div>
        <div className={istoogle ? style.toogmenu : style.links}>
            <Link href="/" className={router.pathname == "/" ? style.active : ""}>Home</Link>
            <Link href={"/Popular"} className={router.pathname == "/Popular" ? style.active : ""}>Popular</Link>
            <Link href={"/Airing"} className={router.pathname == "/Airing" ? style.active : ""}>Top-airing</Link>
            <Link href={"/Movies"} className={router.pathname == "/Movies" ? style.active : ""}>Movies</Link>
        </div>
        <form onSubmit={SendName} className={style.inputs}>
          <input type="search" placeholder='Search anime' onChange={(e) => setAnimeName(e.target.value)}/>
          <Link href={`/search/${animename}`}>
          <button type='submit'><BsSearch color='red' size={18}/></button>
          </Link>
        </form>
    </nav>
    </>
  )
}

export default Nav