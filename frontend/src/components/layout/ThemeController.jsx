import { useEffect } from 'react';
import { useStore } from '../../store/useStore';

const ThemeController = () => {
    const theme = useStore((state) => state.theme);
    const setTheme = useStore((state) => state.setTheme); // Now this will work

    useEffect(() => {
        // Apply theme with smooth transition
        const root = document.documentElement;
        const body = document.body;
        
        // Add transition class for smooth color changes
        root.style.setProperty('transition', 'background-color 0.3s ease, color 0.3s ease');
        
        // Set theme attribute
        body.setAttribute('data-theme', theme);
        root.setAttribute('data-theme', theme);
        
        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute(
                'content', 
                theme === 'dark' ? '#0f0f1a' : '#fafafa'
            );
        } else {
            const meta = document.createElement('meta');
            meta.name = 'theme-color';
            meta.content = theme === 'dark' ? '#0f0f1a' : '#fafafa';
            document.head.appendChild(meta);
        }

        body.classList.remove('theme-dark', 'theme-light');
        body.classList.add(`theme-${theme}`);

        const timer = setTimeout(() => {
            root.style.removeProperty('transition');
        }, 300);

        return () => clearTimeout(timer);
    }, [theme]);

    // Detect system preference on mount (only once)
    useEffect(() => {
        // Check if user has manually set a theme preference
        const storage = localStorage.getItem('yaksh-storage');
        if (!storage) {
            // No saved preference, check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark ? 'dark' : 'light');
        }

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            // Only auto-switch if user hasn't manually changed the theme
            const storage = localStorage.getItem('yaksh-storage');
            if (storage) {
                const parsed = JSON.parse(storage);
                // If the stored theme is already set, don't override
                if (parsed.state?.theme) return;
            }
            setTheme(e.matches ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [setTheme]);

    return null;
};

export default ThemeController;
