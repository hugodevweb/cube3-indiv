'use client'

import { signIn } from 'next-auth/react'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError('Email ou mot de passe incorrect.')
    } else {
      router.push(callbackUrl)
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-[420px]">
        {/* Logo */}
        <a
          href="/"
          className="block text-center text-2xl font-bold text-accent tracking-tight no-underline mb-8"
        >
          collector<span className="text-text font-normal">.shop</span>
        </a>

        <div className="bg-surface border border-border rounded-lg p-8 shadow-sm">
          <h1 className="text-xl font-bold text-text mb-1">Se connecter</h1>
          <p className="text-sm text-text-secondary mb-6">
            Connectez-vous pour mettre des articles en vente.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold text-text-secondary mb-1.5">
                Adresse e-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                required
                autoFocus
                className="w-full font-sans text-[0.9rem] text-text bg-background border-[1.5px] border-border
                          rounded-sm px-3.5 py-2.5 outline-none transition-all duration-150
                          focus:border-accent focus:bg-surface focus:shadow-[0_0_0_3px_rgba(9,177,186,0.12)]"
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <label htmlFor="password" className="block text-sm font-semibold text-text-secondary mb-1.5">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full font-sans text-[0.9rem] text-text bg-background border-[1.5px] border-border
                          rounded-sm px-3.5 py-2.5 outline-none transition-all duration-150
                          focus:border-accent focus:bg-surface focus:shadow-[0_0_0_3px_rgba(9,177,186,0.12)]"
              />
            </div>

            {/* Error */}
            {error && (
              <div
                className="p-2.5 px-3.5 rounded-sm text-sm font-medium mb-4
                           bg-[#fef2f2] border border-[#fca5a5] text-error"
                role="alert"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-accent text-white font-sans text-base font-semibold
                        border-none rounded-pill cursor-pointer shadow-[0_2px_8px_rgba(9,177,186,0.3)]
                        transition-all duration-150
                        hover:bg-accent-dark hover:shadow-[0_4px_14px_rgba(9,177,186,0.4)]
                        active:scale-[0.98]
                        disabled:opacity-55 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Connexion…' : 'Se connecter'}
            </button>
          </form>

          <p className="text-xs text-center text-text-muted mt-5">
            Compte démo : <span className="font-medium text-text-secondary">seller@demo.com</span> / <span className="font-medium text-text-secondary">demo123</span>
          </p>
        </div>

        <p className="text-center mt-5">
          <a href="/" className="text-sm text-accent no-underline hover:underline">
            ← Retour au catalogue
          </a>
        </p>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  )
}
