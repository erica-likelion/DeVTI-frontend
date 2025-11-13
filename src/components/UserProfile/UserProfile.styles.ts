import styled from "styled-components";

export const Container = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borders.sharp};
  border: 0.0625rem solid ${({ theme }) => theme.colors.grayScale.gray300};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grayScale.gray50};
  }

  ${({ theme }) => theme.media.mobile} {
    gap: 0;
  }
`;

export const ProfileImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const DefaultProfileIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.grayScale.gray300};
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('/Logo.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

interface UserNameProps {
  $showOnMobile?: boolean;
}

export const UserName = styled.span<UserNameProps>`
  ${({ theme }) => theme.fonts.heading.h3};
  color: ${({ theme }) => theme.colors.grayScale.black};
  max-width: 7.4375rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ theme }) => theme.media.mobile} {
    display: ${({ $showOnMobile = false }) =>
      $showOnMobile ? "block" : "none"};
  }
`;

export const ProfileContainer = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  padding: 0.5rem 0.75rem 0.5rem 0.625rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grayScale.gray50};
  }
`;

export const ProfileIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: #e8f5e9;
  flex-shrink: 0;
`;

export const ProfileIconImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const ProfileDefaultIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 1.5rem;
    height: 1.5rem;
    object-fit: contain;
  }
`;

export const ProfileUserName = styled.span`
  ${({ theme }) => theme.fonts.heading.h4};
  color: ${({ theme }) => theme.colors.grayScale.black};
  white-space: nowrap;
`;
