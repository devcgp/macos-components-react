import { createRoot } from 'react-dom/client'
import '@cgpdesktopui/ui/styles.css'
import '../styles/app.css'
import { isHomePath } from './document-urls'
const landing = isHomePath(location.pathname) && !location.hash.startsWith('#/')
const root = createRoot(document.getElementById('root')!)
void import('./App').then(({ default: App }) => root.render(<App landing={landing}/>))
