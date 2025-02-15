import React, { VFC } from 'react'
import styled, { css } from 'styled-components'

import { Theme, useTheme } from '../../hooks/useTheme'
import { useClassNames } from './useClassNames'

import { Dropdown, DropdownContent, DropdownTrigger } from '../Dropdown'
import {
  FaBuildingIcon,
  FaCaretDownIcon,
  FaCogIcon,
  FaGraduationCapIcon,
  FaPowerOffIcon,
  FaUserAltIcon,
} from '../Icon'

type Props = {
  isAdmin: boolean
  isCrew: boolean
  displayName: string
  currentTenantName: string
  avatar: string
  onClickAccount: () => void
  onClickLogout: () => void
  onClickProfile?: () => void
  onClickCompany?: () => void
  onClickSchool?: () => void
}

export const HeaderUserDropdown: VFC<Props> = ({
  isAdmin,
  isCrew,
  displayName,
  currentTenantName,
  avatar,
  onClickAccount,
  onClickLogout,
  onClickProfile,
  onClickCompany,
  onClickSchool,
}) => {
  const theme = useTheme()
  const classNames = useClassNames()

  return (
    <Dropdown>
      <DropdownTrigger>
        <TriggerButton themes={theme} type="button" className={classNames.userDropdownTrigger}>
          {avatar && (
            <Avatar
              src={avatar}
              width={20}
              height={20}
              alt={displayName + 'の写真'}
              themes={theme}
            />
          )}
          {displayName}
          <CaretIcon themes={theme} role="presentation">
            <FaCaretDownIcon color="#fff" />
          </CaretIcon>
        </TriggerButton>
      </DropdownTrigger>

      <DropdownContent className={classNames.userDropdown}>
        <MenuList themes={theme} role="menu">
          <MenuListItem role="menuitem">
            <MenuListItemHeader themes={theme} className={classNames.userDropdownDisplayName}>
              {displayName}
            </MenuListItemHeader>
          </MenuListItem>

          {isCrew && (
            <MenuListItem role="menuitem">
              <MenuListItemButton
                onClick={onClickProfile}
                themes={theme}
                className={classNames.profileButton}
              >
                <MenuListItemIcon themes={theme}>
                  <FaUserAltIcon />
                </MenuListItemIcon>
                プロフィールの確認
              </MenuListItemButton>
            </MenuListItem>
          )}

          <MenuListItem role="menuitem">
            <MenuListItemButton
              onClick={onClickAccount}
              themes={theme}
              className={classNames.accountButton}
            >
              <MenuListItemIcon themes={theme}>
                <FaCogIcon />
              </MenuListItemIcon>
              個人設定
            </MenuListItemButton>
          </MenuListItem>

          {isAdmin && (
            <>
              <MenuListItem role="menuitem">
                <MenuListItemDivider themes={theme} role="separator" />
              </MenuListItem>

              <MenuListItem role="menuitem">
                <MenuListItemHeader themes={theme} className={classNames.userDropdownTenantName}>
                  {currentTenantName}
                </MenuListItemHeader>
              </MenuListItem>

              <MenuListItem role="menuitem">
                <MenuListItemButton
                  onClick={onClickCompany}
                  themes={theme}
                  className={classNames.companyButton}
                >
                  <MenuListItemIcon themes={theme}>
                    <FaBuildingIcon />
                  </MenuListItemIcon>
                  共通設定
                </MenuListItemButton>
              </MenuListItem>
            </>
          )}

          <MenuListItem role="menuitem">
            <MenuListItemDivider themes={theme} role="separator" />
          </MenuListItem>

          {isAdmin && (
            <MenuListItem role="menuitem">
              <MenuListItemButton
                onClick={onClickSchool}
                themes={theme}
                className={classNames.schoolButton}
              >
                <MenuListItemIcon themes={theme}>
                  <FaGraduationCapIcon />
                </MenuListItemIcon>
                SmartHR スクール
              </MenuListItemButton>
            </MenuListItem>
          )}

          <MenuListItem role="menuitem">
            <MenuListItemButton
              onClick={onClickLogout}
              themes={theme}
              className={classNames.logoutButton}
            >
              <MenuListItemIcon themes={theme}>
                <FaPowerOffIcon />
              </MenuListItemIcon>
              ログアウト
            </MenuListItemButton>
          </MenuListItem>
        </MenuList>
      </DropdownContent>
    </Dropdown>
  )
}

const TriggerButton = styled.button<{ themes: Theme }>`
  ${({ themes }) => {
    const { fontSize, size, interaction } = themes

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
const Avatar = styled.img<{ themes: Theme }>`
  ${({ themes: { spacingByChar } }) => {
    return css`
      border-radius: 4px;
      margin-right: ${spacingByChar(0.5)};
    `
  }};
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
    const { fontSize, size, palette, interaction } = themes

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
const MenuListItemHeader = styled.div<{ themes: Theme }>`
  ${({ themes }) => {
    const { fontSize, size, palette } = themes

    return css`
      padding: ${size.pxToRem(3)} ${size.pxToRem(20)};
      color: ${palette.TEXT_GREY};
      font-size: ${fontSize.S};
      line-height: 1.6;
      white-space: nowrap;
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
