'use client'

import { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Link from '@/components/ui/Link'
import Button from '@/components/ui/Button'
import EnhancedAlertDialog from '@/components/ui/enhanced-alert-dialog'
import {
    shouldShowBanner,
    setConsent,
    getStoredConsent,
    getDefaultConsent,
    clearAllCookies,
    type CookieConsent
} from '@/utils/cookie-consent'
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
    const [open, setOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [consent, setLocalConsent] = useState<CookieConsent | null>(null)
    const [isMobile, setIsMobile] = useState(false)
    const [deviceType, setDeviceType] = useState<string>('Detecting...')

    useEffect(() => {
        setMounted(true)
        const shouldShow = shouldShowBanner()
        const stored = getStoredConsent()
        setLocalConsent(stored || getDefaultConsent())
        setOpen(shouldShow)

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
        setConsent({
            analytics: consent?.analytics ?? true,
            marketing: consent?.marketing ?? false,
            location: consent?.location ?? true
        })
        setOpen(false)
    }, [consent])

    const onReject = useCallback(() => {
        const next = setConsent({
            analytics: false,
            marketing: false,
            location: false
        })
        setLocalConsent(next)
        setOpen(false)
    }, [])

    const onToggleAnalytics = useCallback(() => {
        const next = setConsent({ analytics: !(consent?.analytics ?? true) })
        setLocalConsent(next)
    }, [consent])

    const onDeleteAll = useCallback(() => {
        clearAllCookies()
        window.location.reload()
    }, [])

    if (!open || !mounted) return null

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
                                    <h3 className="font-semibold text-foreground text-sm">Privacy Protected</h3>
                                    <p className="text-xs text-muted-foreground">
                                        Essential cookies + anonymous analytics & general location.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 flex-shrink-0 justify-end min-w-[150px]">
                                <div className="flex gap-1 items-center">
                                    <Button
                                        onClick={onAccept}
                                        size="sm"
                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2"
                                    >
                                        <CheckCircle className="h-4 w-4 mr-1 text-white" />
                                        Got it
                                    </Button>
                                    <Button
                                        onClick={onReject}
                                        variant="outline"
                                        size="sm"
                                        className="text-red-500 border-red-500/60 hover:bg-red-50 px-3 py-2"
                                    >
                                        Reject all
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
                                            What We Track Anonymously
                                        </h4>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="p-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-[11px] leading-tight">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Eye className="h-4 w-4 text-blue-400" />
                                                    <span className="font-medium text-sm text-foreground">Page Views</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    Which pages are visited (no personal info)
                                                </p>
                                            </div>

                                            <div className="p-1.5 bg-purple-500/10 border border-purple-500/20 rounded-lg text-[11px] leading-tight">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <MapPin className="h-4 w-4 text-purple-400" />
                                                    <span className="font-medium text-sm text-foreground">General Location</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    Anonymous City/Region for site optimization
                                                </p>
                                            </div>

                                            <div className="p-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-[11px] leading-tight">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <BarChart3 className="h-4 w-4 text-blue-400" />
                                                    <span className="font-medium text-sm text-foreground">Device Type</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    Current: <span className="text-blue-500 font-semibold">{deviceType}</span> (anonymized)
                                                </p>
                                            </div>

                                            <div className="p-1.5 bg-green-500/10 border border-green-500/20 rounded-lg text-[11px] leading-tight">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Shield className="h-4 w-4 text-green-400" />
                                                    <span className="font-medium text-sm text-foreground">Essential Cookies</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    Keep you signed in (required)
                                                </p>
                                            </div>

                                            <div className="p-1.5 bg-red-500/10 border border-red-500/20 rounded-lg sm:col-span-2 text-[11px] leading-tight">
                                                <div className="flex items-center gap-2 mb-1">
                                            <MaterialSymbol name="close" className="text-red-500 text-[14px]" />
                                                    <span className="font-medium text-sm text-red-600 dark:text-red-400">Personal Data</span>
                                                </div>
                                                <p className="text-xs text-red-600/80 dark:text-red-400/80">
                                                    Never collected or stored without your explicit permission. We never see your exact address or identity.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-2 bg-muted/80 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <BarChart3 className="h-4 w-4 text-blue-400" />
                                            <div>
                                                <p className="font-medium text-sm text-foreground">Anonymous Analytics</p>
                                                <p className="text-xs text-muted-foreground">
                                                    Help us improve the site (completely anonymous)
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={onToggleAnalytics}
                                                role="switch"
                                                aria-checked={consent?.analytics ? 'true' : 'false'}
                                                className={cn(
                                                    'relative inline-flex h-7 w-14 items-center rounded-full transition-colors border shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
                                                    consent?.analytics
                                                        ? 'bg-blue-500 border-blue-500'
                                                        : 'bg-slate-200 border-slate-300 dark:bg-slate-800 dark:border-slate-600'
                                                )}
                                            >
                                                <span
                                                    className={cn(
                                                        'inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow',
                                                        consent?.analytics ? 'translate-x-6' : 'translate-x-1'
                                                    )}
                                                />
                                            </button>
                                            <span className="text-xs text-muted-foreground">
                                                {consent?.analytics ? 'On' : 'Off'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-[11px] text-muted-foreground flex flex-col gap-2">
                                        <p>
                                            <strong>Privacy Promise:</strong> We only collect anonymous usage data to improve our service.
                                            No personal information, no tracking across other sites, no selling data to third parties.
                                        </p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            <Link
                                                to="/privacy-policy"
                                                className="group block p-2 bg-primary/5 border border-primary/20 rounded-lg transition-all duration-200"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Shield className="h-4 w-4 text-primary" />
                                                        <span className="font-medium text-foreground">Privacy Policy</span>
                                                    </div>
                                                    <div className="text-primary group-hover:translate-x-1 transition-transform">→</div>
                                                </div>
                                        <p className="text-[10px] mt-1 text-muted-foreground leading-tight">
                                                    How we protect your data.
                                                </p>
                                            </Link>

                                            <Link
                                                to="/terms-and-conditions"
                                                className="group block p-2 bg-primary/5 border border-primary/20 rounded-lg transition-all duration-200"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="h-4 w-4 text-primary" />
                                                        <span className="font-medium text-foreground">Terms of Service</span>
                                                    </div>
                                                    <div className="text-primary group-hover:translate-x-1 transition-transform">→</div>
                                                </div>
                                        <p className="text-[10px] mt-1 text-muted-foreground leading-tight">
                                                    Our rules and agreement.
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
                                                Delete All Cookies & Reset Consent
                                            </Button>

                                            <EnhancedAlertDialog
                                                open={confirmDelete}
                                                onOpenChange={setConfirmDelete}
                                                title="Reset All Privacy Settings?"
                                                description="This will sign you out, clear all site preferences, and delete all cookies. The privacy banner will reappear on your next visit."
                                                confirmText="Yes, Delete Everything"
                                                cancelText="Cancel"
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
