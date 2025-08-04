import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeColor = 'white' | 'blue' | 'purple' | 'green' | 'orange';

interface ThemeContextType {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const themeColors = {
  white: {
    primary: '0 0% 100%',
    primaryGlow: '0 0% 90%',
    gradientPrimary: 'linear-gradient(135deg, hsl(0, 0%, 100%), hsl(0, 0%, 85%))',
  },
  blue: {
    primary: '217 91% 60%',
    primaryGlow: '217 91% 70%',
    gradientPrimary: 'linear-gradient(135deg, hsl(217, 91%, 60%), hsl(217, 91%, 70%))',
  },
  purple: {
    primary: '271 91% 65%',
    primaryGlow: '271 91% 75%',
    gradientPrimary: 'linear-gradient(135deg, hsl(271, 91%, 65%), hsl(271, 91%, 75%))',
  },
  green: {
    primary: '142 76% 36%',
    primaryGlow: '142 76% 46%',
    gradientPrimary: 'linear-gradient(135deg, hsl(142, 76%, 36%), hsl(142, 76%, 46%))',
  },
  orange: {
    primary: '25 95% 53%',
    primaryGlow: '25 95% 63%',
    gradientPrimary: 'linear-gradient(135deg, hsl(25, 95%, 53%), hsl(25, 95%, 63%))',
  },
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeColor, setThemeColor] = useState<ThemeColor>('blue');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-color') as ThemeColor;
    if (savedTheme && themeColors[savedTheme]) {
      setThemeColor(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const theme = themeColors[themeColor];
    
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--primary-glow', theme.primaryGlow);
    root.style.setProperty('--gradient-primary', theme.gradientPrimary);
    
    localStorage.setItem('theme-color', themeColor);
  }, [themeColor]);

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};