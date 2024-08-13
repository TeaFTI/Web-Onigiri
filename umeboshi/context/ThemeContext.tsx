/**
 * Theme Context
 */

'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  themeState: Theme
  setThemeState: (themeState: Theme) => void
};

// Context
const ThemeContext = createContext<ThemeContextType>({
  themeState: 'system',
  setThemeState: () => { },
});

// Provider
export function ThemeProvider({
  children,
}: {
  children: ReactNode,
}) {
  // State
  const [themeState, setThemeState] = useState<Theme>('system');

  const initializeTheme = () => {
    const getStoredTheme = () => localStorage.getItem('theme');

    const getPreferredTheme = () => {
      const storedTheme = getStoredTheme()
      if (storedTheme) { return storedTheme; }

      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const setTheme = (theme: string) => {
      if (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
      } else {
        document.documentElement.setAttribute('data-bs-theme', theme)
      }
    }

    setTheme(getPreferredTheme())
  }

  const setStoredTheme = (theme: string) => localStorage.setItem('theme', theme)

  const setTheme = (theme: string) => {
    if (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  const showTheme = (
    theme: Theme,
    focus: boolean = false
  ) => {
    const switcher = document.querySelector('#bd-theme') as HTMLInputElement;
    if (!switcher) { return; }

    const switcherText = document.querySelector('#bd-theme-text')
    const activeColorModeIcon = document.querySelector('.theme-icon-active')
    // console.debug('Active Color Mode Icon:', activeColorModeIcon);
    const buttonToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
    // console.debug('Button to Active:', buttonToActive);
    const svgActiveButton = buttonToActive?.querySelector('path');
    // console.debug('SVG Active Button:', svgActiveButton);

    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active')
      element.setAttribute('aria-pressed', 'false')
    })

    buttonToActive?.classList.add('active');
    buttonToActive?.setAttribute('aria-pressed', 'true')
    if (!activeColorModeIcon) { return; }
    activeColorModeIcon.innerHTML = svgActiveButton?.outerHTML ?? '';

    if (focus) { switcher.focus(); }
  };

  // Effect
  useEffect(() => {
    setStoredTheme(themeState);
    setTheme(themeState);
    showTheme(themeState, true);
  }, [themeState]);

  return (
    <ThemeContext.Provider value={{ themeState, setThemeState }}>
      <script dangerouslySetInnerHTML={{ __html: `(${initializeTheme})()` }} />
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context;
};
