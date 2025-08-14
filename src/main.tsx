import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 생산 환경에서는 콘솔 로그를 비활성화하여 사용자 콘솔 노이즈를 제거
if (import.meta.env.PROD) {
  const noop = () => {}
  console.log = noop
  console.debug = noop
  console.info = noop
  console.warn = noop
  console.error = noop
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
