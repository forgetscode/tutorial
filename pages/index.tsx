import Head from 'next/head'
import Image from 'next/image'
import SideBar from '../components/SideBar'

import ClearIcon from '@mui/icons-material/Clear';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useColorMode } from '../context/ColorModeContext';


export default function Home() {
  
  const { mode } = useColorMode()

  return (
      <div className="w-screen">
        <Head>
          <title>Tutorial</title>
          <link rel='icon' href="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Vsmart_logo.svg/402px-Vsmart_logo.svg.png?20200810165214"/>
        </Head>
        <SideBar title = "Michael Gergely" footer="Michael Gergely" props = 
          {
            [
              {id:"Home", icon:<HomeOutlinedIcon/>, title: "Home"},
              {id:"Mid", icon:<DensityMediumIcon/>, title: "Mid"},
              {id:"End", icon:<ClearIcon/>, title: "End"},
              {id:"bb", icon:<DensityMediumIcon/>, title: "hh"},
              {id:"ff", icon:<ClearIcon/>, title: "hh"},
            ]
          }
        />
        <div id ="Home" className='flex h-screen w-full bg-white justify-center items-center text-black text-2xl'>Help</div>
        <div id ="Mid" className='flex h-screen w-full bg-white justify-center items-center text-black text-2xl'>Help</div>
        <div id ="End" className='flex h-screen w-full bg-black justify-center items-center text-white text-2xl'>Help</div>
        <div id ="bb" className='flex h-screen w-full bg-white justify-center items-center text-black text-2xl'>Help</div>
        <div id ="ff" className='flex h-screen w-full bg-black justify-center items-center text-white text-2xl'>Help</div>
      </div>
  )
}
