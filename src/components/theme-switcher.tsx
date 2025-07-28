"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const ThemeSwitch = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const switchTheme = () =>{
        if(theme === "dark"){
            setTheme("light")
        }else{
            setTheme("dark")
        }
    }

    return (
        <>
            <p>My current theme is : {theme}</p>
            <button onClick={switchTheme}>Switch theme</button>
        </>
    );
};

export default ThemeSwitch;
