import { useEffect, useState, useContext, createContext } from "react";
var _ = require('lodash');

interface ActiveScroll{
    setActiveScroll: React.Dispatch<React.SetStateAction<number>>;
    activeScroll: number
}

export const ActiveScrollContext = createContext<ActiveScroll>({
    setActiveScroll: () => {},
    activeScroll: 0
});

interface ActiveScrollContextProviderProps {
    children: React.ReactNode
}

export const ActiveScrollContextProvider = ({ children }:ActiveScrollContextProviderProps) => {
    const [activeScroll, setActiveScroll] = useState<number>(0);

    useEffect(() => {
        
        const handleScroll = _.throttle(() => {
            setActiveScroll(window.scrollY)
        }, 500);
    
        window.addEventListener('scroll', handleScroll);
    
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

    return (
        <ActiveScrollContext.Provider value = {{ activeScroll, setActiveScroll }}>
            {children}
        </ActiveScrollContext.Provider>
    );
};

export const useScroll = () => useContext(ActiveScrollContext)