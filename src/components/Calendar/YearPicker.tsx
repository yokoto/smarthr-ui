import React, { HTMLAttributes, VFC, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'

import { Theme, useTheme } from '../../hooks/useTheme'
import { useClassNames } from './useClassNames'
import { UnstyledButton } from '../Button'

type Props = {
  selectedYear?: number
  fromYear: number
  toYear: number
  onSelectYear: (year: number) => void
  isDisplayed: boolean
  id: string
}
type ElementProps = Omit<HTMLAttributes<HTMLDivElement>, keyof Props>

export const YearPicker: VFC<Props & ElementProps> = ({
  selectedYear,
  fromYear,
  toYear,
  onSelectYear,
  isDisplayed,
  id,
  ...props
}) => {
  const themes = useTheme()
  const classNames = useClassNames()
  const focusingRef = useRef<HTMLButtonElement>(null)

  const thisYear = new Date().getFullYear()
  const numOfYear = Math.max(Math.min(toYear, 9999) - fromYear + 1, 0)
  const yearArray = Array(numOfYear)
    .fill(null)
    .map((_, i) => fromYear + i)

  useEffect(() => {
    if (focusingRef.current && isDisplayed) {
      focusingRef.current.focus()
      focusingRef.current.blur()
    }
  }, [isDisplayed])

  return (
    <Overlay
      {...props}
      isDisplayed={isDisplayed}
      id={id}
      className={`${props.className} ${classNames.yearPicker.wrapper}`}
    >
      <Container>
        {yearArray.map((year) => {
          const isThisYear = thisYear === year
          const isSelectedYear = selectedYear === year
          return (
            <YearButton
              key={year}
              themes={themes}
              onClick={() => onSelectYear(year)}
              aria-pressed={isSelectedYear}
              ref={isThisYear ? focusingRef : null}
              className={classNames.yearPicker.selectYear}
            >
              <YearWrapper themes={themes} isThisYear={isThisYear} isSelected={isSelectedYear}>
                {year}
              </YearWrapper>
            </YearButton>
          )
        })}
      </Container>
    </Overlay>
  )
}

const Overlay = styled.div<{ isDisplayed: boolean }>`
  ${({ isDisplayed }) =>
    !isDisplayed &&
    css`
      display: none;
    `}
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  padding: 8px 3px;
  box-sizing: border-box;
  overflow-y: scroll;
`
const YearWrapper = styled.span<{ themes: Theme; isThisYear?: boolean; isSelected?: boolean }>(
  ({ themes, isThisYear, isSelected }) => {
    const { palette, fontSize } = themes
    return css`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 51px;
      height: 27px;
      border-radius: 14px;
      font-size: ${fontSize.M};
      box-sizing: border-box;
      line-height: 0;
      ${isThisYear &&
      css`
        border: solid 1px ${palette.BORDER};
      `};
      ${isSelected &&
      css`
        color: #fff !important;
        background-color: ${palette.MAIN} !important;
      `}
    `
  },
)
const YearButton = styled(UnstyledButton)<{ themes: Theme }>`
  width: 25%;
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    ${YearWrapper} {
      ${({ themes }) => css`
        color: ${themes.palette.TEXT_BLACK};
        background-color: ${themes.palette.BASE_GREY};
      `}
    }
  }
`
