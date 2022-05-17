import './index.css'
import { TodoInputProvider } from './context/TodoInputContext'
import useLocalStorage from 'use-local-storage'
import HeaderBg from './components/HeaderBg'
import Header from './components/Header'
import TodoList from './components/TodoList'
import Footer from './components/Footer'

function App() {
  // Checks for users light/dark mode, stores in LS
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = useLocalStorage(
    'themeMode',
    defaultDark ? 'dark' : 'light'
  )

  // Dark/Light Mode Switch
  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return (
    <TodoInputProvider>
      <div
        data-theme={theme}
        style={{
          backgroundColor: 'var(--bg-color)',
          height: '100%',
          minHeight: '100vh',
        }}
      >
        <HeaderBg theme={theme} />
        <Header theme={theme} switchTheme={switchTheme} />
        <TodoList />
        <Footer />
      </div>
    </TodoInputProvider>
  )
}

export default App
