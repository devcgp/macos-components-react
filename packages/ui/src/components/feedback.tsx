import { Dialog as HeadlessDialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useId, type ComponentProps, type ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { Button } from './button'
export { ProgressIndicator as Progress } from './AdditionalControls'

export function Badge({ className = '', ...props }: ComponentProps<'span'>) {
  return <span {...props} className={`desktop-badge ${className}`}/>
}

export function Alert({ title, children, variant = 'info' }: { title: string; children?: ReactNode; variant?: 'info' | 'error' }) {
  return <div className="desktop-alert" role={variant === 'error' ? 'alert' : 'status'} data-variant={variant}>
    <strong>{title}</strong>{children && <div>{children}</div>}
  </div>
}

export function Spinner({ label = '正在加载' }: { label?: string }) {
  return <span className="desktop-spinner" role="status" aria-label={label}><FontAwesomeIcon icon={faCircleNotch} aria-hidden="true"/></span>
}

export function Tooltip({ text, children }: { text: string; children: ReactNode }) {
  const id = useId()
  return <span className="desktop-tooltip">
    <Button aria-describedby={id}>{children}</Button>
    <span role="tooltip" id={id}>{text}</span>
  </span>
}

type ModalProps = { open: boolean; onClose: () => void; title: string; children: ReactNode; closeLabel?: string }

export function Dialog(props: ModalProps) {
  return <Modal {...props} variant="dialog"/>
}

export function Sheet(props: ModalProps) {
  return <Modal {...props} variant="sheet"/>
}

function Modal({ open, onClose, title, children, variant, closeLabel = '关闭' }: ModalProps & { variant: 'dialog' | 'sheet' }) {
  return <HeadlessDialog open={open} onClose={onClose} className="desktop-overlay">
    <DialogBackdrop className="desktop-modal-backdrop"/>
    <div className="desktop-modal-position" data-variant={variant}>
      <DialogPanel className="desktop-modal-panel">
        <DialogTitle>{title}</DialogTitle>
        {children}
        <Button onClick={onClose}>{closeLabel}</Button>
      </DialogPanel>
    </div>
  </HeadlessDialog>
}
