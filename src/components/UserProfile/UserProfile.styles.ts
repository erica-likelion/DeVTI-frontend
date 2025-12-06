import styled from "styled-components";
import ImageIcon from "@/assets/icons/Image.svg";

export const Container = styled.button`
  display: inline-flex;
  ${({ theme }) => theme.responsive.property.paddingComplex('XXS', 'XS', 'XXS', 'XXS')}
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.responsive.property.gap('XXS')}
  color: ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.responsive.property.borderRadius('sharp')}
  ${({ theme }) => theme.fonts.heading.h4};
  background: none;
  border: none;
  cursor: pointer;
  
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.transparents.BL100};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.transparents.BL200};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.grayScale.gray300};
    cursor: not-allowed;
  }
`;

export const ProfileImage = styled.img`
  ${({ theme }) => theme.responsive.property.sourceSize('R')}
  border-radius: 50%;
  object-fit: cover;
  border: none;
  box-shadow: none;
`;

export const DefaultProfileIcon = styled.div`
  ${({ theme }) => theme.responsive.property.sourceSize('R')}
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${ImageIcon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  box-shadow: none;
`;

interface UserNameProps {
  $showOnMobile?: boolean;
}

export const UserName = styled.span<UserNameProps>`
  ${({ theme }) => theme.fonts.heading.h4};
  color: ${({ theme }) => theme.colors.grayScale.black};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ theme }) => theme.media.mobile} {
    display: ${({ $showOnMobile = false }) =>
      $showOnMobile ? "block" : "none"};
  }
`;

export const ProfileContainer = styled.button`
  display: inline-flex;
  ${({ theme }) => theme.responsive.property.paddingComplex('XXS', 'XS', 'XXS', 'XXS')}
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.responsive.property.gap('XXS')}
  color: ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.responsive.property.borderRadius('sharp')}
  ${({ theme }) => theme.fonts.heading.h4};
  background: none;
  border: none;
  cursor: pointer;
  
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.transparents.BL100};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.transparents.BL200};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.grayScale.gray300};
    cursor: not-allowed;
  }
`;

export const ProfileIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.responsive.property.sourceSize('R')}
  border-radius: 50%;
  flex-shrink: 0;
`;

export const ProfileIconImage = styled.img`
  ${({ theme }) => theme.responsive.property.sourceSize('R')}
  border-radius: 50%;
  object-fit: cover;
  border: none;
  box-shadow: none;
`;

export const ProfileDefaultIcon = styled.div`
  ${({ theme }) => theme.responsive.property.sourceSize('R')}
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: none;

  img {
    ${({ theme }) => theme.responsive.property.sourceSize('R')}
    object-fit: contain;
  }
`;

export const ProfileUserName = styled.span`
  ${({ theme }) => theme.fonts.heading.h4};
  color: ${({ theme }) => theme.colors.grayScale.black};
  white-space: nowrap;
`;
