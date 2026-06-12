import { useState } from 'react'
import { Button } from 'navium-ui-lib'
import { login } from '../services/authService'
import logo from '/src/assets/navium-v1.png'

const URLS_POR_ROL = {
  ROL_SUCURSAL:     import.meta.env.VITE_URL_SUCURSAL,
  ROL_OPERADOR:     import.meta.env.VITE_URL_OPERARIO,
  ROL_CENTRO_MANDO: import.meta.env.VITE_URL_CMANDO,
}

function LoginForm() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [cargando, setCargando] = useState(false)

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) { setError('Completa todos los campos'); return }
    setCargando(true); setError('')
    try {
      const data = await login(email.trim(), password)
      const url  = URLS_POR_ROL[data.rol]
      if (!url) { setError(`Rol no reconocido: ${data.rol}`); return }
      window.location.href = url
    } catch (e) {
      setError(e.message ?? 'Error al iniciar sesión')
    } finally {
      setCargando(false)
    }
  }

  const handleKey = (e) => { if (e.key === 'Enter') handleLogin() }

  return (
    <div className="login-screen">
      <div className="login-card">

        {/* ── Panel izquierdo · branding ── */}
        <aside className="login-aside">
          <div className="login-aside__content">
            <img src={logo} alt="Navium logo" className="login-aside__logo" />
            <h1 className="login-aside__title">
              Tu Puerto Conectado
            </h1>
            <p className="login-aside__text">
              Coordina agendamientos, andenes y operaciones de Navium
              desde una sola plataforma integral de gestión portuaria.
            </p>
          </div>
          <span className="login-aside__footer">© 2026 Navium · Gestión portuaria</span>
        </aside>

        {/* ── Panel derecho · formulario ── */}
        <div className="login-panel">
          <h2 className="login-panel__title">Bienvenido</h2>
          <p className="login-sub">Ingresa a tu cuenta para continuar</p>

          {error && <div className="alert alert--error">{error}</div>}

          <div className="login-field">
            <label className="field-label">Correo electrónico</label>
            <input
              className="field-input"
              type="email"
              placeholder="usuario@navium.cl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKey}
              autoFocus
            />
          </div>

          <div className="login-field">
            <label className="field-label">Contraseña</label>
            <input
              className="field-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKey}
            />
          </div>

          <a href="#" className="login-forgot" onClick={(e) => e.preventDefault()}>
            ¿Olvidaste tu contraseña?
          </a>

          <Button
            variant="primary"
            size="md"
            onClick={handleLogin}
            disabled={cargando}
            className="login-submit"
          >
            {cargando ? 'Ingresando...' : 'Iniciar sesión'}
          </Button>
        </div>

      </div>
    </div>
  )
}

export default LoginForm
