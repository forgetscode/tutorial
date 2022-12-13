import { Tooltip } from '@mui/material';
import React, { ReactElement, useEffect, useRef, useState } from 'react';

import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import ClearIcon from '@mui/icons-material/Clear';

import { useScroll } from '../context/ScrollHeight';

type Section = {
    id: string,
    icon: ReactElement<any, any>,
    title: string,
} 

interface pageProps {
    title: string,
    props: Section[],
    footer: string,
}

const getOffSet = (id:string) => {
    const offset = document.getElementById(id)?.offsetTop
    if (offset){
      return offset
    }
    return 0
  }

const calculateOffSets = (idList:string[]) => {
    let offSets = []
    for (let i=0; i < idList.length; i++){
        let obj:any = {}
        obj['id'] = idList[i]
        obj['offset'] = getOffSet(idList[i])
        offSets.push(obj)
    }
    return offSets
}

const SideBar: React.FC<pageProps> = ({title, footer, props}) => {
    const [ showSideBar, setShowSideBar ] = useState<Boolean>(true);
    const [ active, setActive ] = useState<string>("Home")
    const { activeScroll } = useScroll()
    const [ selected, setSelected ] = useState<string>("Home")
    const offSets = useRef<any>()

    const updateMedia = () => {
        const slicedArr = props.map(obj => obj.id);
        const offSetValues = calculateOffSets(slicedArr);
        offSets.current = offSetValues;
    };
  
    useEffect(() => {    
        updateMedia();
    });

    useEffect(()=> {
      const element = document.getElementById(selected)
      element?.scrollIntoView({behavior: "smooth" , block: "start"})
    }, [selected]);
    
    useEffect(() => {
        setShowSideBar(!showSideBar);
        if (window.innerWidth >= 1024) {
          setShowSideBar(true);
        } else {
          setShowSideBar(false);
        };
    
        const updateMedia = () => {
          if (window.innerWidth >= 1024) {
            setShowSideBar(true);
          } else {
            setShowSideBar(false);
          }
        };

        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    }, []);

    useEffect(() => {
        const scroll = activeScroll;
        for(let i=0; i< offSets.current.length; i++){
            let temp = "Home"
            if (offSets.current[i].offset < scroll + 200){
                temp = offSets.current[i].id
                setActive(temp)
            }
        }
      }, [activeScroll])

    
    useEffect(() => {
        updateMedia()
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    }, []);
    
    
    return (
        <div>
            <div className={`fixed z-20 h-full w-72 light-theme dark:dark-theme origin-left transition-all duration-500 ${showSideBar ?"ml-0" : "-ml-72 "}`}>
                <section className='w-full h-full flex flex-col justify-between'>
                    <div className='flex flex-col overflow-y-auto'>
                        <header className='flex text-center text-3xl font-bold w-full justify-center py-8'>
                            {title}
                        </header>
                        <section className='flex flex-col w-full space-y-8 !scrollbar-thin !scrollbar-thumb-black'>
                        {
                            props?.map((section:Section) => (
                                
                                <button type='button' key={section.id} onClick ={ ()=> {setSelected(section.id), setActive(section.id)}}>
                                    <div className="flex w-full group justify-center">                                   
                                        {
                                            active == section.id ?
                                            <li className='flex flex-row group w-4/6 bg-gray-900 rounded-lg p-3 bg-opacity-50 space-x-2 cursor-pointer transition-all delay-150'>
                                                <p className='flex text-sky-600 transition-all'>{section.icon}</p>
                                                <p className='flex text-white transition-all font-medium '>{section.title}</p>
                                            </li>
                                            :
                                            <li className='flex flex-row group w-4/6 rounded-lg p-3 space-x-2 cursor-pointer transition-all delay-150'>
                                                <p className='side-icon dark:side-icon-dark'>{section.icon}</p>
                                                <p className='side-text dark:side-text-dark'>{section.title}</p>
                                            </li>
                                        }
                                    </div>
                                </button>
                            ))
                        }
                        </section>
                    </div>
                    <footer className='flex flex-col'>
                        <p className='flex text-center text-xl w-full justify-center py-8'>
                            {footer}
                        </p>
                    </footer>
                </section>
            </div>
            
            <button
                type="button"
                onClick={() => setShowSideBar(!showSideBar)}
                className="fixed z-10 light-theme dark:dark-theme rounded-full right-6 top-6 w-10 h-10 lg:scale-0 text-center"
                >
                {showSideBar ? (
                    <Tooltip title="Close">
                    <ClearIcon className="text-white"/>
                    </Tooltip>
                ) : (
                    <Tooltip title="Open">
                    <DensityMediumIcon className="text-white"/>
                    </Tooltip>
                )}
            </button>
        </div>
    );
};

export default SideBar;