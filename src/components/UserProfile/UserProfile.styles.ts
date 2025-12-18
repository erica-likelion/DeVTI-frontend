import styled from "styled-components";

interface UserNameProps {
  $showOnMobile?: boolean;
}

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

export const ProfileIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  flex-shrink: 0;
`;

export const ProfileImage = styled.img`
  border-radius: 50%;
  object-fit: cover;
  border: none;
  box-shadow: none;
`;

export const DefaultProfileIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: none;

  img {
    object-fit: contain;
  }
`;

export const UserName = styled.span<UserNameProps>`
  ${({ theme }) => theme.fonts.heading.h4};
  color: ${({ theme }) => theme.colors.grayScale.black};
  white-space: nowrap;
  overflow: hidden;

  ${({ theme }) => theme.media.mobile} {
    display: ${({ $showOnMobile = false }) =>
      $showOnMobile ? "block" : "none"};
  }
`;