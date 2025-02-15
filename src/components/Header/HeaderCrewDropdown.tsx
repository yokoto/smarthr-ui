import React, { VFC } from 'react'
import styled, { css } from 'styled-components'

import { Theme, useTheme } from '../../hooks/useTheme'
import { useClassNames } from './useClassNames'

import { Dropdown, DropdownContent, DropdownTrigger } from '../Dropdown'
import {
  FaCaretDownIcon,
  FaEditIcon,
  FaPaperPlaneIcon,
  FaPlusSquareIcon,
  FaSyncAltIcon,
  FaUsersIcon,
} from '../Icon'

type Props = {
  onClickNew?: () => void
  onClickBulkInsert?: () => void
  onClickBulkUpdate?: () => void
  onClickInvite?: () => void
}

export const HeaderCrewDropdown: VFC<Props> = ({
  onClickNew,
  onClickBulkInsert,
  onClickBulkUpdate,
  onClickInvite,
}) => {
  const theme = useTheme()
  const classNames = useClassNames()

  return (
    <Dropdown>
      <DropdownTrigger>
        <TriggerButton themes={theme} type="button" className={classNames.crewDropdownTrigger}>
          <TriggerIcon themes={theme} role="presentation">
            <FaUsersIcon />
          </TriggerIcon>
          従業員管理
          <CaretIcon themes={theme} role="presentation">
            <FaCaretDownIcon color="#fff" />
          </CaretIcon>
        </TriggerButton>
      </DropdownTrigger>

      <DropdownContent className={classNames.crewDropdown}>
        <MenuList themes={theme} role="menu">
          <MenuListItem role="menuitem">
            <MenuListItemButton
              themes={theme}
              onClick={onClickNew}
              className={classNames.newCrewButton}
            >
              <MenuListItemIcon themes={theme}>
                <FaEditIcon />
              </MenuListItemIcon>
              新規登録する（手入力）
            </MenuListItemButton>
          </MenuListItem>

          <MenuListItem role="menuitem">
            <MenuListItemButton
              themes={theme}
              onClick={onClickBulkInsert}
              className={classNames.bulkInsertCrewsButton}
            >
              <MenuListItemIcon themes={theme}>
                <FaPlusSquareIcon />
              </MenuListItemIcon>
              新規登録する（ファイル）
            </MenuListItemButton>
          </MenuListItem>

          <MenuListItem role="menuitem">
            <MenuListItemButton
              themes={theme}
              onClick={onClickBulkUpdate}
              className={classNames.bulkUpdateCrewsButton}
            >
              <MenuListItemIcon themes={theme}>
                <FaSyncAltIcon />
              </MenuListItemIcon>
              更新する（ファイル）
            </MenuListItemButton>
          </MenuListItem>

          <MenuListItem role="menuitem">
            <MenuListItemDivider themes={theme} role="separator" />
          </MenuListItem>

          <MenuListItem role="menuitem">
            <MenuListItemButton
              themes={theme}
              onClick={onClickInvite}
              className={classNames.inviteCrewButton}
            >
              <MenuListItemIcon themes={theme}>
                <FaPaperPlaneIcon />
              </MenuListItemIcon>
              SmartHR に招待
            </MenuListItemButton>
          </MenuListItem>
        </MenuList>
      </DropdownContent>
    </Dropdown>
  )
}

const TriggerButton = styled.button<{ themes: Theme }>`
  ${({ themes }) => {
    const { size, fontSize, interaction } = themes

    return css`
      display: flex;
      align-items: center;
      height: 50px;
      margin: 0;
      padding: 0 ${size.pxToRem(10)};
      border: none;
      background: none;
      color: #fff;
      font-size: ${fontSize.M};
      transition: background-color ${interaction.hover.animation};
      cursor: pointer;

      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
    `
  }}
`
const TriggerIcon = styled.figure<{ themes: Theme }>`
  ${({ themes: { spacingByChar } }) => {
    return css`
      display: inline-block;
      height: 14px;
      padding: 0;
      margin: 0 ${spacingByChar(0.5)} 0 0;
      vertical-align: middle;
    `
  }}
`
const CaretIcon = styled.figure<{ themes: Theme }>`
  ${({ themes: { spacingByChar } }) => {
    return css`
      display: inline-block;
      padding: 0;
      margin: 0 0 0 ${spacingByChar(0.5)};
      vertical-align: middle;
    `
  }}
`
const MenuList = styled.div<{ themes: Theme }>`
  ${({ themes }) => {
    const { size, frame, shadow } = themes

    return css`
      border: ${frame.border.default};
      border-radius: ${frame.border.radius.s};
      background-color: #fff;
      box-shadow: ${shadow.LAYER3};
      padding: ${size.pxToRem(5)} 0;
    `
  }}
`
const MenuListItem = styled.div`
  margin: 0;
  padding: 0;
`
const MenuListItemIcon = styled.figure<{ themes: Theme }>`
  ${({ themes: { spacingByChar } }) => {
    return css`
      display: flex;
      align-items: center;
      padding: 0;
      margin: 0 ${spacingByChar(0.5)} 0 0;
    `
  }}
`
const MenuListItemButton = styled.button<{ themes: Theme }>`
  ${({ themes }) => {
    const { size, fontSize, palette, interaction } = themes

    return css`
      display: flex;
      align-items: center;
      width: 100%;
      padding: ${size.pxToRem(3)} ${size.pxToRem(20)};
      border: none;
      background: none;
      color: ${palette.TEXT_BLACK};
      font-size: ${fontSize.M};
      line-height: 1.5;
      white-space: nowrap;
      box-sizing: border-box;
      transition: background-color ${interaction.hover.animation};
      cursor: pointer;

      &:hover {
        background-color: ${palette.OVERLAY};
      }
    `
  }}
`
const MenuListItemDivider = styled.div<{ themes: Theme }>`
  ${({ themes }) => {
    const { size, frame } = themes

    return css`
      padding: 0;
      margin: ${size.pxToRem(10)} 0;
      border-top: ${frame.border.default};
    `
  }}
`
