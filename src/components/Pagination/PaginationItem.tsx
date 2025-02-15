import React, { VFC } from 'react'
import styled, { css } from 'styled-components'

import { Theme, useTheme } from '../../hooks/useTheme'

import { SecondaryButton } from '../Button'

interface Props {
  page: number
  currentPage: number
  onClick: (pageNumber: number) => void
}

export const PaginationItem: VFC<Props> = ({ page, currentPage, onClick }) => {
  const theme = useTheme()

  if (page === currentPage) {
    return (
      <ItemButton
        className="active"
        themes={theme}
        aria-current="page"
        aria-label={`${page}ページ目、現在のページ`}
        disabled
      >
        {page}
      </ItemButton>
    )
  }

  return (
    <ItemButton onClick={() => onClick(page)} themes={theme} aria-label={`${page}ページ目`}>
      {page}
    </ItemButton>
  )
}

export const ItemButton = styled(SecondaryButton).attrs({
  square: true,
  size: 's',
})<{ themes: Theme }>`
  ${({ themes }) => {
    const { MAIN } = themes.palette

    return css`
      line-height: 25px;
      border-radius: 4px;
      &.active {
        color: #fff;
        background-color: ${MAIN};
        border: solid 1px ${MAIN};
        cursor: default;
        outline: none;
      }
    `
  }}
`
