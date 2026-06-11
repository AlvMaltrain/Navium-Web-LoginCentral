export const login = async (email, password) => {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
    })
    if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error ?? `HTTP ${res.status}`)
    }
    return res.json() // { email, rol }
}

export const logout = async () => {
    await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    })
}
