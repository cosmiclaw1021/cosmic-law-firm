'use client'

import { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import Link from '@/components/ui/Link'
import Button from '@/components/ui/Button'
import EnhancedAlertDialog from '@/components/ui/enhanced-alert-dialog'
import {
    clearAllCookies,
    type CookieConsent
} from '@/utils/cookie-consent'
import { useCookieConsent } from '@src/context/cookieConsent'
import { cn } from '@/lib/utils'
import { Shield, CheckCircle, BarChart3, Eye, Trash2, MapPin, FileText } from 'lucide-react'

interface CookieConsentBannerProps {
    className?: string
}

type MaterialSymbolProps = {
    name: string
    className?: string
}

const MaterialSymbol = ({ name, className }: MaterialSymbolProps) => (
    <span className={cn('material-symbols-outlined text-[14px] leading-none', className)} aria-hidden="true">
        {name}
    </span>
)

export function CookieConsentBanner({ className }: CookieConsentBannerProps) {
    const { t } = useTranslation()
    const {
        showBanner,
        preferences,
        acceptAll,
        rejectNonEssential,
        updatePreferences,
        closeBanner
    } = useCookieConsent()

    const [mounted, setMounted] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [deviceType, setDeviceType] = useState<string>('Detecting...')

    // Automatically expand if preferences already exist (means user clicked "Cookie Preferences" in footer)
    useEffect(() => {
        if (showBanner && preferences !== null) {
            setExpanded(true)
        }
    }, [showBanner, preferences])

    useEffect(() => {
        const handleOpenExpanded = () => setExpanded(true)
        window.addEventListener('cookie-consent-open-expanded', handleOpenExpanded)
        return () => window.removeEventListener('cookie-consent-open-expanded', handleOpenExpanded)
    }, [])

    useEffect(() => {
        setMounted(true)

        const checkMobileAndViewport = () => {
            const ua = navigator.userAgent
            const isMobileDevice = window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i.test(ua)
            setIsMobile(isMobileDevice)

            let platform = 'Desktop'
            if (/tablet|ipad|playbook|silk/i.test(ua)) {
                platform = 'Tablet'
            } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Opera Mini/i.test(ua)) {
                platform = 'Mobile'
            }

            let os = 'Unknown OS'
            if (ua.indexOf('Win') !== -1) os = 'Windows'
            if (ua.indexOf('Mac') !== -1) os = 'macOS'
            if (ua.indexOf('X11') !== -1) os = 'UNIX'
            if (ua.indexOf('Linux') !== -1) os = 'Linux'
            if (/Android/.test(ua)) os = 'Android'
            if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS'

            setDeviceType(`${os} ${platform}`)
        }

        checkMobileAndViewport()
        window.addEventListener('resize', checkMobileAndViewport)
        window.addEventListener('orientationchange', checkMobileAndViewport)
        return () => {
            window.removeEventListener('resize', checkMobileAndViewport)
            window.removeEventListener('orientationchange', checkMobileAndViewport)
        }
    }, [])

    const onAccept = useCallback(() => {
        // If they just click "Got it" without expanding/toggling, 
        // they are accepting the current state (which defaults to false for non-essential).
        // If they want to accept ALL, they should probably have an "Accept All" button,
        // but here "Got it" seems to mean "I accept my current choices".
        // To be safe and compliant, "Got it" should just close the banner if they've made choices,
        // or accept defaults if they haven't.
        if (preferences === null) {
            rejectNonEssential() // Default to strict privacy if they just dismiss
        } else {
            closeBanner()
        }
    }, [preferences, rejectNonEssential, closeBanner])

    const onToggleAnalytics = useCallback(() => {
        updatePreferences({ analytics: !(preferences?.analytics ?? false) })
    }, [preferences, updatePreferences])

    const onToggleMarketing = useCallback(() => {
        updatePreferences({ marketing: !(preferences?.marketing ?? false) })
    }, [preferences, updatePreferences])

    const onToggleLocation = useCallback(() => {
        updatePreferences({ location: !(preferences?.location ?? false) })
    }, [preferences, updatePreferences])

    const onDeleteAll = useCallback(() => {
        clearAllCookies()
        window.location.reload()
    }, [])

    if (!showBanner || !mounted) return null

    const banner = (
        <>
            <div
                className={cn(
                    'fixed inset-0 z-[2147483647] bg-black/40 backdrop-blur-sm transition-all duration-300',
                    expanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
                )}
                aria-hidden="true"
                onClick={() => setExpanded(false)}
            />

            <div
                className="cookie-consent-container fixed inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 bottom-4 sm:bottom-6 z-[2147483648] p-0 safe-area-inset-bottom"
                style={{
                    paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))'
                }}
            >
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-live="polite"
                    aria-label="Privacy notice"
                    className={cn(
                        'max-w-[min(90vw,900px)] mx-auto bg-white dark:bg-slate-950 border border-border rounded-2xl shadow-lg',
                        'pointer-events-auto',
                        'overflow-hidden',
                        'w-full sm:w-auto',
                        'mx-0 sm:mx-auto',
                        className
                    )}
                >
                    <div className="p-3 h-auto space-y-2">
                        <div className="flex items-center justify-between gap-2">
                            <div
                                className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer hover:opacity-80 transition-opacity select-none"
                                onClick={() => setExpanded(!expanded)}
                                role="button"
                                aria-expanded={expanded}
                                title={expanded ? 'Click to collapse' : 'Click to see what we track'}
                            >
                                <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                                <div className="min-w-0">
                                    <h3 className="font-semibold text-foreground text-sm">{t('footer.privacyProtected')}</h3>
                                    <p className="text-xs text-muted-foreground">
                                        {t('footer.privacyBannerDesc')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 flex-shrink-0 justify-end min-w-[150px]">
                                <div className="flex gap-2 items-center">
                                    {!expanded && (
                                        <Button
                                            onClick={() => setExpanded(true)}
                                            variant="ghost"
                                            size="sm"
                                            className="text-primary hover:bg-primary/5 px-2 py-2 text-[11px] font-bold uppercase tracking-wider"
                                        >
                                            {t('footer.managePreferences')}
                                        </Button>
                                    )}
                                    <Button
                                        onClick={acceptAll}
                                        size="sm"
                                        className="bg-primary hover:bg-primary/90 text-white px-3 py-2"
                                    >
                                        {t('footer.acceptAll')}
                                    </Button>
                                    <Button
                                        onClick={onAccept}
                                        variant="outline"
                                        size="sm"
                                        className="bg-green-600/10 border-green-600 text-green-700 hover:bg-green-600/20 px-3 py-2"
                                    >
                                        <CheckCircle className="h-4 w-4 mr-1" />
                                        {t('footer.confirm')}
                                    </Button>
                                    <Button
                                        onClick={rejectNonEssential}
                                        variant="outline"
                                        size="sm"
                                        className="text-red-500 border-red-500/60 hover:bg-red-50 px-3 py-2"
                                    >
                                        {t('footer.reject')}
                                    </Button>
                                </div>
                                {(!isMobile || !expanded) && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setExpanded(!expanded)}
                                        className="h-8 w-8 p-0 rounded-full text-slate-900 hover:text-slate-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                                        aria-label={expanded ? 'Collapse details' : 'Expand details'}
                                    >
                                        <MaterialSymbol
                                            name={expanded ? 'expand_less' : 'expand_more'}
                                            className="text-slate-900"
                                        />
                                    </Button>
                                )}
                            </div>
                        </div>

                        {expanded && (
                            <div className="mt-2 pt-2 border-t border-border">
                                <div className="space-y-3 text-sm max-h-[300px] sm:max-h-none overflow-y-auto">
                                    <div className="text-sm">
                                        <h4 className="font-medium mb-3 flex items-center gap-2 text-foreground">
                                            <BarChart3 className="h-4 w-4 text-blue-400" />
                                            {t('footer.whatWeTrack')}
                                        </h4>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="p-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-[11px] leading-tight">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Eye className="h-4 w-4 text-blue-400" />
                                                    <span className="font-medium text-sm text-foreground">{t('footer.pageViews')}</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    {t('footer.pageViewsDesc')}
                                                </p>
                                            </div>

                                            <div className="p-1.5 bg-purple-500/10 border border-purple-500/20 rounded-lg text-[11px] leading-tight">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <MapPin className="h-4 w-4 text-purple-400" />
                                                    <span className="font-medium text-sm text-foreground">{t('footer.generalLocation')}</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    {t('footer.generalLocationDesc')}
                                                </p>
                                            </div>

                                            <div className="p-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-[11px] leading-tight">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <BarChart3 className="h-4 w-4 text-blue-400" />
                                                    <span className="font-medium text-sm text-foreground">{t('footer.deviceType')}</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    {t('footer.deviceTypeDesc', { type: deviceType })}
                                                </p>
                                            </div>

                                            <div className="p-1.5 bg-green-500/10 border border-green-500/20 rounded-lg text-[11px] leading-tight">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Shield className="h-4 w-4 text-green-400" />
                                                    <span className="font-medium text-sm text-foreground">{t('footer.essentialCookies')}</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    {t('footer.essentialCookiesDesc')}
                                                </p>
                                            </div>

                                            <div className="p-1.5 bg-red-500/10 border border-red-500/20 rounded-lg sm:col-span-2 text-[11px] leading-tight">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <MaterialSymbol name="close" className="text-red-500 text-[14px]" />
                                                    <span className="font-medium text-sm text-red-600 dark:text-red-400">{t('footer.personalData')}</span>
                                                </div>
                                                <p className="text-xs text-red-600/80 dark:text-red-400/80">
                                                    {t('footer.personalDataDesc')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-2 bg-muted/80 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <BarChart3 className="h-4 w-4 text-blue-400" />
                                            <div>
                                                <p className="font-medium text-sm text-foreground">{t('footer.anonymousAnalytics')}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {t('footer.anonymousAnalyticsDesc')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={onToggleAnalytics}
                                                role="switch"
                                                aria-checked={preferences?.analytics ? 'true' : 'false'}
                                                className={cn(
                                                    'relative inline-flex h-7 w-14 items-center rounded-full transition-colors border shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
                                                    preferences?.analytics
                                                        ? 'bg-blue-500 border-blue-500'
                                                        : 'bg-slate-200 border-slate-300 dark:bg-slate-800 dark:border-slate-600'
                                                )}
                                            >
                                                <span
                                                    className={cn(
                                                        'inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow',
                                                        preferences?.analytics ? 'translate-x-6' : 'translate-x-1'
                                                    )}
                                                />
                                            </button>
                                            <span className="text-xs text-muted-foreground w-6">
                                                {preferences?.analytics ? 'On' : 'Off'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-2 bg-muted/80 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <MapPin className="h-4 w-4 text-purple-400" />
                                            <div>
                                                <p className="font-medium text-sm text-foreground">{t('footer.interactiveMaps')}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {t('footer.interactiveMapsDesc')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={onToggleMarketing}
                                                role="switch"
                                                aria-checked={preferences?.marketing ? 'true' : 'false'}
                                                className={cn(
                                                    'relative inline-flex h-7 w-14 items-center rounded-full transition-colors border shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
                                                    preferences?.marketing
                                                        ? 'bg-purple-500 border-purple-500'
                                                        : 'bg-slate-200 border-slate-300 dark:bg-slate-800 dark:border-slate-600'
                                                )}
                                            >
                                                <span
                                                    className={cn(
                                                        'inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow',
                                                        preferences?.marketing ? 'translate-x-6' : 'translate-x-1'
                                                    )}
                                                />
                                            </button>
                                            <span className="text-xs text-muted-foreground w-6">
                                                {preferences?.marketing ? 'On' : 'Off'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-2 bg-muted/80 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Shield className="h-4 w-4 text-green-400" />
                                            <div>
                                                <p className="font-medium text-sm text-foreground">{t('footer.generalLocation')}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {t('footer.regionalOptimization')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={onToggleLocation}
                                                role="switch"
                                                aria-checked={preferences?.location ? 'true' : 'false'}
                                                className={cn(
                                                    'relative inline-flex h-7 w-14 items-center rounded-full transition-colors border shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
                                                    preferences?.location
                                                        ? 'bg-green-500 border-green-500'
                                                        : 'bg-slate-200 border-slate-300 dark:bg-slate-800 dark:border-slate-600'
                                                )}
                                            >
                                                <span
                                                    className={cn(
                                                        'inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow',
                                                        preferences?.location ? 'translate-x-6' : 'translate-x-1'
                                                    )}
                                                />
                                            </button>
                                            <span className="text-xs text-muted-foreground w-6">
                                                {preferences?.location ? 'On' : 'Off'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-[11px] text-muted-foreground flex flex-col gap-2">
                                        <p>
                                            <strong>{t('footer.privacyPromise')}:</strong> {t('footer.privacyPromiseDesc')}
                                        </p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                            <Link
                                                to="/privacy"
                                                className="group block p-2 bg-primary/5 border border-primary/20 rounded-lg transition-all duration-200"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Shield className="h-4 w-4 text-primary" />
                                                        <span className="font-medium text-foreground">{t('footer.privacyPolicy')}</span>
                                                    </div>
                                                    <div className="text-primary group-hover:translate-x-1 transition-transform">→</div>
                                                </div>
                                                <p className="text-[10px] mt-1 text-muted-foreground leading-tight">
                                                    How we protect your data.
                                                </p>
                                            </Link>

                                            <Link
                                                to="/terms"
                                                className="group block p-2 bg-primary/5 border border-primary/20 rounded-lg transition-all duration-200"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="h-4 w-4 text-primary" />
                                                        <span className="font-medium text-foreground">{t('footer.termsOfService')}</span>
                                                    </div>
                                                    <div className="text-primary group-hover:translate-x-1 transition-transform">→</div>
                                                </div>
                                                <p className="text-[10px] mt-1 text-muted-foreground leading-tight">
                                                    Our rules and agreement.
                                                </p>
                                            </Link>

                                            <Link
                                                to="/cookie-policy"
                                                className="group block p-2 bg-primary/5 border border-primary/20 rounded-lg transition-all duration-200"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <BarChart3 className="h-4 w-4 text-primary" />
                                                        <span className="font-medium text-foreground">{t('footer.cookiePolicy')}</span>
                                                    </div>
                                                    <div className="text-primary group-hover:translate-x-1 transition-transform">→</div>
                                                </div>
                                                <p className="text-[10px] mt-1 text-muted-foreground leading-tight">
                                                    Detailed cookie usage.
                                                </p>
                                            </Link>
                                        </div>

                                        <div className="mt-1 pt-3 border-t border-border">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setConfirmDelete(true)}
                                                className="w-full border-red-500/50 text-red-500 hover:bg-red-500/10"
                                            >
                                                <Trash2 className="h-3 w-3 mr-2" />
                                                {t('footer.deleteAll')}
                                            </Button>

                                            <EnhancedAlertDialog
                                                open={confirmDelete}
                                                onOpenChange={setConfirmDelete}
                                                title={t('footer.resetTitle')}
                                                description={t('footer.resetDesc')}
                                                confirmText={t('footer.confirmDelete')}
                                                cancelText={t('footer.cancel')}
                                                onConfirm={onDeleteAll}
                                                variant="destructive"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )

    return typeof window !== 'undefined' ? createPortal(banner, document.body) : null
}

export default CookieConsentBanner
