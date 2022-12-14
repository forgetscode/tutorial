import { useEffect, useState, useContext, createContext } from "react";
var _ = require('lodash');

interface ActiveScroll{
    setActiveScroll: React.Dispatch<React.SetStateAction<number>>,
    isScrolled: Boolean,
    activeScroll: number,
}

export const ActiveScrollContext = createContext<ActiveScroll>({
    setActiveScroll: () => {},
    isScrolled: false,
    activeScroll: 0,
});

interface ActiveScrollContextProviderProps {
    children: React.ReactNode
}

export const ActiveScrollContextProvider = ({ children }:ActiveScrollContextProviderProps) => {
    const [activeScroll, setActiveScroll] = useState<number>(0);
    const [isScrolled, setIsScrolled]  = useState(false);

    useEffect(() => {
        const handleScroll = _.throttle(() => {
            if (window.scrollY > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
            setActiveScroll(window.scrollY)
        }, 500);
    
        window.addEventListener('scroll', handleScroll);
    
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

    return (
        <ActiveScrollContext.Provider value = {{ isScrolled, activeScroll, setActiveScroll }}>
            {children}
        </ActiveScrollContext.Provider>
    );
};

export const useScroll = () => useContext(ActiveScrollContext)