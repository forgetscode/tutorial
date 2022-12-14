import { Tooltip } from '@mui/material';
import * as React from 'react';
import Image from 'next/image'

import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';

import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { FormControlLabel } from '@mui/material';
import Switch from '@mui/material/Switch';

import portait from '../public/profile.jpg';
import IconLink from './IconLink';
import { useColorMode } from '../context/ColorModeContext';

interface pageProps {
    title: string,
}

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const SideHeader: React.FC<pageProps> = ({title}) => {
    const { mode, toggleColorMode } = useColorMode()
    
    return (
        <div className={`${mode === "dark" ? 'dark' : ''}`}>
            
            <Tooltip title="Theme" placement="right">
                <div className="absolute z-10 right-2">
                    <FormControlLabel
                        control ={<Switch {...label} defaultChecked onChange={() => toggleColorMode()} />}
                        label = {mode ==="dark" ? <DarkModeIcon className='text-white'/> : <WbSunnyIcon className='text-black'/>}
                    />
                </div>
            </Tooltip>

            <div className='space-y-8 pt-8'>
                <div className="w-full flex flex-col justify-center items-center space-y-6 pt-3 transition-all">
                    <div className="relative w-32 h-32 rounded-full border-4 border-sky-200 dark:border-gray-700">
                            { 
                                <Image
                                    className="rounded-full transition-all"
                                    src={portait}
                                    alt=""
                                    fill
                                    priority
                                />
                            }
                    </div>
                    <p className="secondary-header dark:secondary-header-dark">
                        Michael Gergely
                    </p>
                </div>

                <span className="flex z-10 flex-row space-x-3 justify-center pb-1">
                    <IconLink 
                        link={"https://www.youtube.com/channel/UCrKtXjuk-JANccPjEu4cxwQ"}
                        icon={<YouTubeIcon className="h-5 w-5"/>}
                        title={"Youtube"}
                    />

                    <IconLink 
                        link={"https://github.com/forgetscode/your_site"}
                        icon={<GitHubIcon className="h-5 w-5"/>}
                        title={"GitHub"}
                    />

                    <IconLink 
                        link={"https://www.facebook.com/mike.gergely/"}
                        icon={<FacebookIcon className="h-5 w-5"/>}
                        title={"Facebook"}
                    />

                    <IconLink 
                        link={"https://www.linkedin.com/in/michael-gergely-2407ba250/?originalSubdomain=ca"}
                        icon={<LinkedInIcon className="h-5 w-5"/>}
                        title={"LinkedIn"}
                    />
                </span>
            </div>
        </div>
    );
};

export default SideHeader;