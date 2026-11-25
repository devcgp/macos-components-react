import { createRoot } from 'react-dom/client'
import '@cgpdesktopui/ui/styles.css'
import '../styles/app.css'
import { isHomePath } from './document-urls'
import LandingPage from '../components/LandingPage'

const landing = isHomePath(location.pathname) && !location.hash.startsWith('#/')
const locale = location.pathname.startsWith('/en') ? 'en' : 'zh-CN'

const root = createRoot(document.getElementById('root')!)
if (landing) {
  root.render(<LandingPage locale={locale} initialDark={document.documentElement.classList.contains('dark')}/>)
} else {
  void import('./App').then(({ default: App }) => root.render(<App/>))
}
