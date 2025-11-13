import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem 0.5rem 0.75rem;
  border-radius: ${({ theme }) => theme.borders.sharp};
  
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
  background-image: url('/DefaultIMG_Profile.webp');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

interface UserNameProps {
  $showOnMobile?: boolean;
}

export const UserName = styled.span<UserNameProps>`
  ${({ theme }) => theme.fonts.heading.h4};
  color: ${({ theme }) => theme.colors.grayScale.black};
  white-space: nowrap;
  
  ${({ theme }) => theme.media.mobile} {
    display: ${({ $showOnMobile = false }) => ($showOnMobile ? 'block' : 'none')};
  }
`;