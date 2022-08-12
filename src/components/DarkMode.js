import React, {useState} from "react";

const DarkMode = () => {
    const setDark = () => {
        localStorage.setItem("theme", "dark");
        document.documentElement.setAttribute("data-theme", "dark");
    };

    const setLight = () => {
        // console.log("set light mode ----------jaffa");
        localStorage.setItem("theme", "light");
        document.documentElement.setAttribute("data-theme", "light");
    };

    const storedTheme = localStorage.getItem("theme");

    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    const defaultDark = storedTheme === "dark" || (storedTheme === null && prefersDark);

    if (defaultDark) {
        // console.log("default is dark theme ------jaffa");
        setDark();
    }

    const toggleTheme = (e) => {
        // console.log("clicking the toggle screen-----jaffa");
        if (e.target.checked) {
            setDark();
        } else {
            setLight();
        }
    };

    return (
        <div className="toggle-theme-wrapper">
            <span>☀️</span>
            <label className="toggle-theme" htmlFor="toggleTheme">
                <input
                    type="checkbox"
                    id="toggleTheme"
                    onChange={toggleTheme}
                    defaultChecked={defaultDark}
                />
                <div className="slider round"></div>
            </label>
            <span>🌒</span>
        </div>
    );
};

export default DarkMode;