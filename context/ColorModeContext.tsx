import * as React from "react";

interface IColorModeContext {
    toggleColorMode: () => void;
    mode: "dark" | "light";
}

export const ColorModeContext = React.createContext<IColorModeContext>({
    toggleColorMode: () => {},
    mode: "dark",
});

interface ColorModeContextProviderProps {
    children: React.ReactNode
}

export const ColorModeContextProvider = ({ children }:ColorModeContextProviderProps) => {
    const [mode, setMode] = React.useState<"light" | "dark">("dark");

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    }

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode,
            mode,
        }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value = {colorMode}>
            {children}
        </ColorModeContext.Provider>
    );
};

export const useColorMode = () => React.useContext(ColorModeContext)