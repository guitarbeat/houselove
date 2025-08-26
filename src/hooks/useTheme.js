import { useState, useEffect } from 'react';

const useTheme = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const mql = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
        const prefersDark = mql ? mql.matches : false;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDark(true);
        }
    }, []);

    useEffect(() => {
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(prev => !prev);

    return { isDark, toggleTheme };
};

export default useTheme;
