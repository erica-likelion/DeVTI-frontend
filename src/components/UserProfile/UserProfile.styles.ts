import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray300};
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
  
  &::before {
    content: '🐶';
    font-size: 1.5rem;
  }
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
    display: ${({ $showOnMobile = false }) => ($showOnMobile ? 'block' : 'none')};
  }
`;