import React, { HTMLAttributes, ReactNode, VFC, useCallback, useRef } from 'react'
import styled, { css } from 'styled-components'
import { CSSTransition } from 'react-transition-group'

import { Theme, useTheme } from '../../hooks/useTheme'
import { useHandleEscape } from '../../hooks/useHandleEscape'
import { DialogPositionProvider } from './DialogPositionProvider'
import { FocusTrap } from './FocusTrap'
import { useClassNames } from './useClassNames'
import { BodyScrollSuppressor } from './BodyScrollSuppressor'

export type DialogContentInnerProps = {
  /**
   * Handler function when clicking on onverlay.
   */
  onClickOverlay?: () => void
  /**
   * Handler function when pressing escape key.
   */
  onPressEscape?: () => void
  /**
   * Whether to display a Dialog.
   */
  isOpen: boolean
  /**
   * Specifies the top position of the Dialog content.
   */
  top?: number
  /**
   * Specifies the right position of the Dialog content.
   */
  right?: number
  /**
   * Specifies the bottom position of the Dialog content.
   */
  bottom?: number
  /**
   * Specifies the left position of the Dialog content.
   */
  left?: number
  /**
   * `id` of the component.
   */
  id?: string
  /**
   * `aria-label` of the component.
   */
  ariaLabel?: string
  /**
   * `aria-labelledby` of the component.
   */
  ariaLabelledby?: string
  /**
   * `className` of the component.
   */
  className?: string
  /**
   * The content of the component.
   */
  children: ReactNode
}
type ElementProps = Omit<HTMLAttributes<HTMLDivElement>, keyof DialogContentInnerProps>

type StyleProps = {
  top?: number
  right?: number
  bottom?: number
  left?: number
}

function exist(value: any) {
  return value !== undefined && value !== null
}

export const DialogContentInner: VFC<DialogContentInnerProps & ElementProps> = ({
  onClickOverlay,
  onPressEscape = () => {
    /* noop */
  },
  isOpen,
  id,
  ariaLabel,
  ariaLabelledby,
  children,
  className = '',
  ...props
}) => {
  const classNames = useClassNames()
  const theme = useTheme()
  const domRef = useRef(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const focusTarget = useRef<HTMLDivElement>(null)
  useHandleEscape(
    useCallback(() => {
      if (!isOpen) {
        return
      }
      onPressEscape()
    }, [isOpen, onPressEscape]),
  )

  const handleClickOverlay = useCallback(() => {
    if (!isOpen) {
      return
    }
    onClickOverlay && onClickOverlay()
  }, [isOpen, onClickOverlay])

  return (
    <DialogPositionProvider top={props.top} bottom={props.bottom}>
      <CSSTransition
        nodeRef={domRef}
        className="wrapper"
        classNames="wrapper"
        in={isOpen}
        timeout={{
          appear: 500,
          enter: 300,
          exit: 300,
        }}
        appear
        unmountOnExit
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
      >
        <Wrapper ref={domRef} themes={theme} className={classNames.wrapper}>
          <Background
            onClick={handleClickOverlay}
            themes={theme}
            className={classNames.background}
          />
          <FocusTrap>
            <Inner
              ref={innerRef}
              themes={theme}
              role="dialog"
              aria-modal="true"
              className={`${className} ${classNames.dialog}`}
              {...props}
            >
              {/* dummy element for focus management. */}
              <div ref={focusTarget} tabIndex={-1} aria-label={ariaLabel}></div>
              {children}
            </Inner>
          </FocusTrap>
          {/* Suppresses scrolling of body while modal is displayed */}
          <BodyScrollSuppressor />
        </Wrapper>
      </CSSTransition>
    </DialogPositionProvider>
  )
}

const Wrapper = styled.div<{ themes: Theme }>(({ themes }) => {
  const { zIndex } = themes

  return css`
    z-index: ${zIndex.OVERLAP};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &.wrapper-appear {
      opacity: 0;
    }
    &.wrapper-appear-active {
      transition: opacity 500ms;
      opacity: 1;
    }
    &.wrapper-enter {
      opacity: 0;
    }
    &.wrapper-enter-active {
      transition: opacity 300ms;
      opacity: 1;
    }
    &.wrapper-exit {
      opacity: 1;
    }
    &.wrapper-exit-active {
      transition: opacity 300ms;
      opacity: 0;
    }
  `
})

const Inner = styled.div<StyleProps & { themes: Theme }>`
  ${({ themes, top, right, bottom, left }) => {
    const { zIndex, frame, shadow } = themes
    const positionRight = exist(right) ? `${right}px` : 'auto'
    const positionBottom = exist(bottom) ? `${bottom}px` : 'auto'
    let positionTop = exist(top) ? `${top}px` : 'auto'
    let positionLeft = exist(left) ? `${left}px` : 'auto'
    let translateX = '0'
    let translateY = '0'

    if (top === undefined && bottom === undefined) {
      positionTop = '50%'
      translateY = '-50%'
    }

    if (right === undefined && left === undefined) {
      positionLeft = '50%'
      translateX = '-50%'
    }

    return css`
      position: absolute;
      z-index: ${zIndex.OVERLAP};
      top: ${positionTop};
      right: ${positionRight};
      bottom: ${positionBottom};
      left: ${positionLeft};
      border-radius: ${frame.border.radius.m};
      background-color: #fff;
      box-shadow: ${shadow.LAYER3};
      transform: translate(${translateX}, ${translateY});
    `
  }}
`
const Background = styled.div<{ themes: Theme }>`
  ${({ themes }) => {
    return css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${themes.palette.SCRIM};
    `
  }}
`
