'use client' // use client side page

import {MainLeadingPage, LoadingPage} from "@/Components/laedingPage";
import { useEffect, useState } from "react";

export default function Home() {

  const [preloadingState, setPreloadingState] = useState(false);
  useEffect(()=>{
      // setTimeout(()=>{
      //   setPreloadingState(false);
      // },5000)
  },[])

  return (
    <section className="AppContainer">
      { preloadingState?
        <LoadingPage/>:
        <MainLeadingPage/>
      }
    </section>
  )
}
