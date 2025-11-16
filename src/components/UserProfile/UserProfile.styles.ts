import styled from "styled-components";

export const Container = styled.button`
  display: inline-flex;
  padding: 0.5rem 0.75rem 0.5rem 0.62rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.grayScale.black};
  border-radius: ${({ theme }) => theme.borders.sharp};
  ${({ theme }) => theme.fonts.heading.h4};
  background: none;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.transparents.BL100};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.transparents.BL200};
  }
`;

export const ProfileImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  object-fit: cover;
  border: none;
  box-shadow: none;
`;

export const DefaultProfileIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("/Image.svg");
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
  padding: 0.5rem 0.75rem 0.5rem 0.62rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.grayScale.black};
  border-radius: ${({ theme }) => theme.borders.sharp};
  ${({ theme }) => theme.fonts.heading.h4};
  background: none;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.transparents.BL100};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.transparents.BL200};
  }
`;

export const ProfileIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  flex-shrink: 0;
`;

export const ProfileIconImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  object-fit: cover;
  border: none;
  box-shadow: none;
`;

export const ProfileDefaultIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: none;

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
