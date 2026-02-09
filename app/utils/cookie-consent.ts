export type CookieConsent = {
    analytics: boolean
    marketing: boolean
    location: boolean
}

const COOKIE_CONSENT_KEY = 'cosmicCookieConsent'

export function getDefaultConsent(): CookieConsent {
    return {
        analytics: false,
        marketing: false,
        location: false,
    }
}

export function getStoredConsent(): CookieConsent | null {
    if (typeof window === 'undefined') {
        return null
    }

    const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!stored) {
        return null
    }

    try {
        const parsed = JSON.parse(stored) as Partial<CookieConsent>
        return {
            ...getDefaultConsent(),
            ...parsed,
        }
    } catch (_error) {
        return null
    }
}

function dispatchConsentChange(detail: CookieConsent | null) {
    if (typeof window === 'undefined') {
        return
    }

    window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail }))
}

export function setConsent(update: Partial<CookieConsent>): CookieConsent {
    const previous = getStoredConsent()
    const next = {
        ...getDefaultConsent(),
        ...previous,
        ...update,
    }

    if (typeof window !== 'undefined') {
        window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(next))
        dispatchConsentChange(next)
    }

    return next
}

export function shouldShowBanner() {
    if (typeof window === 'undefined') {
        return false
    }

    return getStoredConsent() === null
}

export function clearAllCookies() {
    if (typeof window === 'undefined') {
        return
    }

    window.localStorage.removeItem(COOKIE_CONSENT_KEY)
    dispatchConsentChange(null)

    document.cookie.split(';').forEach((cookie) => {
        const [name] = cookie.split('=')
        if (!name) return
        const trimmed = name.trim()
        if (!trimmed) return
        document.cookie = `${trimmed}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
        document.cookie = `${trimmed}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`
    })
}

export function getConsentSummary() {
    const stored = getStoredConsent()
    return {
        functional: true,
        analytics: stored?.analytics ?? false,
        marketing: stored?.marketing ?? false,
        hasChoice: stored !== null,
    }
}

export function isAnalyticsAllowed() {
    const stored = getStoredConsent()
    return stored?.analytics ?? false
}
