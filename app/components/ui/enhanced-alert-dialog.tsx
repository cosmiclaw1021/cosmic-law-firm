'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Button from './Button'

interface EnhancedAlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  confirmText: string
  cancelText?: string
  onConfirm: () => void
  variant?: 'default' | 'destructive'
}

export function EnhancedAlertDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText,
  cancelText = 'Cancel',
  onConfirm,
  variant = 'default',
}: EnhancedAlertDialogProps) {
  useEffect(() => {
    if (!open) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onOpenChange])

  if (!open) {
    return null
  }

  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[2147483646] flex items-center justify-center bg-black/40 backdrop-blur"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onOpenChange(false)
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="enhanced-alert-title"
        aria-describedby={description ? 'enhanced-alert-description' : undefined}
        className="w-full max-w-sm rounded-2xl bg-background border border-border p-6 shadow-2xl"
      >
        <h3 id="enhanced-alert-title" className="text-base font-semibold text-foreground">
          {title}
        </h3>
        {description && (
          <p
            id="enhanced-alert-description"
            className="mt-2 text-sm text-muted-foreground"
          >
            {description}
          </p>
        )}
        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
          <Button
            variant="ghost"
            tone="light"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            {cancelText}
          </Button>
          <Button
            variant="primary"
            tone="dark"
            size="sm"
            onClick={handleConfirm}
            className={variant === 'destructive' ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : ''}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default EnhancedAlertDialog
