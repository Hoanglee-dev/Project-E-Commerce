import React from 'react'
import { useRef, useState } from 'react'
import {
  arrow,
  FloatingArrow,
  FloatingPortal,
  Placement,
  safePolygon,
  useFloating,
  useHover,
  useInteractions
} from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  className?: string
  renderPopover: React.ReactNode
  placement?: Placement
}
export default function Poppover({
  children,
  renderPopover,
  className,
  placement = 'bottom-end'
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef(null)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [arrow({ element: arrowRef })],
    placement: placement
  })

  const hover = useHover(context, { handleClose: safePolygon() })
  const { getReferenceProps, getFloatingProps } = useInteractions([hover])
  return (
    <div className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}

      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className='bg-white'>
                <FloatingArrow ref={arrowRef} context={context} fill='white' />
              </span>
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  )
}
