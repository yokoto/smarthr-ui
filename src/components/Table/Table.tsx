import React, { ReactNode, VFC, createContext } from 'react'
import styled, { css } from 'styled-components'

import { Theme, useTheme } from '../../hooks/useTheme'

export const TableGroupContext = createContext<{
  group: 'head' | 'body'
}>({
  group: 'body',
})

type Props = {
  children?: ReactNode
  className?: string
}

export const Table: VFC<Props> = ({ children, className = '' }) => {
  const theme = useTheme()

  return (
    <Wrapper themes={theme} className={className}>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.table<{ themes: Theme }>`
  ${({ themes }) => {
    const { COLUMN, HEAD } = themes.palette

    return css`
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      background-color: ${COLUMN};

      th {
        background-color: ${HEAD};
      }
    `
  }}
`
