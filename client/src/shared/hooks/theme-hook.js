import { useState, useEffect } from 'react'

export const useTheme = () => {
  const [theme, setTheme] = useState(getDefaultTheme())

  useEffect(() => {
    localStorage.setItem('dark', JSON.stringify(theme))
  }, [theme])

  function getDefaultTheme() {
    const selectedTheme = JSON.parse(localStorage.getItem('dark'))
    return selectedTheme || false
  }

  const themeHandler = () => setTheme((prevtheme) => !prevtheme)

  return { theme, themeHandler }
}
