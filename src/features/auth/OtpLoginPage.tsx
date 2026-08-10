import React, { useEffect, useRef, useState } from 'react'

const OTP_LENGTH = 6
const RESEND_SECONDS = 30

function OtpLoginPage() {
  const [otp, setOtp] = useState<string[]>(
    Array(OTP_LENGTH).fill('')
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendTimer, setResendTimer] = useState(RESEND_SECONDS)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Resend countdown
  useEffect(() => {
    if (resendTimer <= 0) return

    const timer = setTimeout(() => {
      setResendTimer((seconds) => seconds - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [resendTimer])

 
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const code = otp.join('')

    if (code.length !== OTP_LENGTH) {
      setError('Enter the full 6-digit code')
      return
    }

    setLoading(true)

    try {
      

      await new Promise((resolve) => setTimeout(resolve, 700))

      console.log('OTP verified:', code)

      // Redirect / login here
    } catch {
      setError('Invalid or expired code')

      setOtp(Array(OTP_LENGTH).fill(''))

      inputRefs.current[0]?.focus()
    } finally {
      setLoading(false)
    }
  }

  async function handleResend() {
    if (resendTimer > 0) return

    setError('')

    try {
      // Replace with your real API
      // await api.post('/auth/otp/send')

      await new Promise((resolve) => setTimeout(resolve, 500))

      setResendTimer(RESEND_SECONDS)
      setOtp(Array(OTP_LENGTH).fill(''))

      inputRefs.current[0]?.focus()
    } catch {
      setError('Could not resend the code')
    }
  }

  function handleOtpChange(index: number, value: string) {
    // Only allow numbers
    if (!/^\d$/.test(value) && value !== '') return

    const digit = value.slice(-1)

    const next = [...otp]
    next[index] = digit

    setOtp(next)

    // Move to next input
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleOtpKeyDown(
    index: number,
    e: React.KeyboardEvent
  ) {
    if (
      e.key === 'Backspace' &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus()
    }

    // Move backwards with ArrowLeft
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    // Move forward with ArrowRight
    if (
      e.key === 'ArrowRight' &&
      index < OTP_LENGTH - 1
    ) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleOtpPaste(e: React.ClipboardEvent) {
    const pasted = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, OTP_LENGTH)

    if (!pasted) return

    e.preventDefault()

    const next = Array(OTP_LENGTH).fill('')

    pasted.split('').forEach((digit, index) => {
      next[index] = digit
    })

    setOtp(next)

    const focusIndex = Math.min(
      pasted.length,
      OTP_LENGTH - 1
    )

    inputRefs.current[focusIndex]?.focus()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm">

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-xl font-bold text-primary-foreground">
            CP
          </div>
        </div>

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Enter verification code
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Enter the 6-digit code sent to you
          </p>
        </div>

        <form
          onSubmit={handleVerifyOtp}
          className="space-y-6"
        >
          {/* OTP Inputs */}
          <div
            className="flex justify-center gap-2 sm:gap-3"
            onPaste={handleOtpPaste}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] = element
                }}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                value={digit}
                onChange={(e) =>
                  handleOtpChange(
                    index,
                    e.target.value
                  )
                }
                onKeyDown={(e) =>
                  handleOtpKeyDown(index, e)
                }
                className="h-14 w-12 rounded-xl border border-input bg-background text-center font-display text-xl font-semibold text-foreground outline-none transition-all focus:border-ring focus:ring-2 focus:ring-ring/30"
              />
            ))}
          </div>

          {/* Error */}
          {error && (
            <p className="text-center text-sm text-destructive">
              {error}
            </p>
          )}

          {/* Verify */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? 'Verifying…'
              : 'Verify & continue'}
          </button>

          {/* Resend */}
          <div className="flex justify-center text-sm">
            <button
              type="button"
              onClick={handleResend}
              disabled={resendTimer > 0}
              className="font-medium text-primary transition-opacity disabled:cursor-not-allowed disabled:text-muted-foreground disabled:opacity-70"
            >
              {resendTimer > 0
                ? `Resend code in ${resendTimer}s`
                : 'Resend code'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OtpLoginPage