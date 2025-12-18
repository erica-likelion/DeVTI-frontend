// pages/Room.tsx (또는 적절한 위치)
import { useState, useEffect } from 'react';
import * as S from './SideSheet.styles';
import * as D from '@/components/profile/DesignPortfolioView.styles';

import InputFieldL from '@/components/Input/InputFieldL';
import { Keyword } from '@/components/keywords/Keyword';
import StarDisplay from '@/components/StarDisplay/StarDisplay';
import { InputField } from '@/components/Input';
import VT700LButton from '@/components/ButtonDynamic/VT700LButton'
import { WtLCloseButton } from '@/components/ButtonDynamic';


import DefaultIMG_Profile from '/public/DefaultIMG_Profile.webp';
import Close from '@/assets/icons/Close.svg';
import CopyBlackGray from "@/assets/icons/CopyBlackGray.svg"
import DownloadIcon from "@/assets/icons/Download.svg";


type Props = {
  participantId: string | number | null;
  onClose: () => void;
};

type Score = [string, number];

type Pr = {
  id: number;
	username: string;
	part: string;
	team_vibe: string;
  active_hours: string;
  meeting_preference: string;
};

type Profile = {
  id: number;
	part: string;
  devti: string;
	comment: string;
  strength: string;
	github_url: string;
	experienced: string;
  daily_time_capacity: number;
  weekly_time_capacity: number;
  design_understanding: number;
	development_understanding: number;
	portfolio_url: string;
	development_score: Score[];
	design_score: number;
};



const SideSheet = ({ participantId, onClose }: Props) => {
  const [profile, setProfile] = useState<Profile | null>(null);
	const [pr, setPr] = useState<Pr | null>(null);
  const [loading, setLoading] = useState(false);


	const [Wagging, setWagging] = useState(false);
	
	const handleWagging = async (waggeeId: number) => {
		setWagging(true);
		

		try {
			await fetch('https://devti.site/api/matching/wagging', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ wagger: 1, waggee: waggeeId }),
			});
		} catch (e) {
			console.error(e);
		}

	};

	const handleGithubCopy = async () => {
    if (profile?.github_url) {
      try {
        await navigator.clipboard.writeText(profile?.github_url);
        
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

	const handleFileDownload = () => {
  const url = profile?.portfolio_url;
  if (!url) return;

  window.open(url, '_blank', 'noopener,noreferrer');
};


  useEffect(() => {
    if (!participantId) return;

    const fetchProfile = async () => {
      setLoading(true);
      try {
        // 예시: GET /api/users/{id}
        const res = await fetch(`https://devti.site/api/profile/${participantId}`);
        const data = await res.json();
        setProfile(data.data.profile);
				setPr(data.data.pr);
				console.log(data);
				console.log(profile);
				console.log(pr);
      } catch (e) {
        console.error(e);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [participantId]);

  if (!participantId) return null;

  if (loading) return <div>로딩중...</div>;
  if (!profile || !pr) return <div>프로필을 불러오지 못했어요</div>;
  
	const isPM = profile.part === "PM";
	const isDesigner= profile.part === "DE" ;
	const isDeveloper = profile.part === "BE" || profile.part === "FE";

	const keywords: string[][] = [
  [pr.part],
  [pr.team_vibe],
  [pr.active_hours, pr.meeting_preference],
	];


  return (
		<S.SideSheet onClick={(e) => e.stopPropagation()}>
			<S.Nav>
				<S.icon onClick={onClose}>
					<img src={Close} />
				</S.icon>
			</S.Nav>
			<S.Container>
				<S.ProfileImg src={DefaultIMG_Profile} />
				<S.ProfileSection>
					<S.Title>{pr.username}</S.Title>
					<S.SubTitle>{profile.comment}</S.SubTitle>
					<S.Devti>
						<S.SmallIcon src={DefaultIMG_Profile} alt="devti icon" />
						<S.SubTitle>{profile.devti}</S.SubTitle>
					</S.Devti>
				</S.ProfileSection>

				<S.PRSection>
					<S.Title>PR</S.Title>
					<S.KeywordArea>
						{keywords.map((group, idx) => (
						<Keyword key={idx} items={group} />
					))}
					</S.KeywordArea>
				</S.PRSection>
				
					

				<S.ContentSection>
					<S.InputfieldArea>
						<S.Title>경력</S.Title>
						<InputFieldL text={profile.experienced} /> 
					</S.InputfieldArea>

					<S.InputfieldArea>
						<S.Title>강점</S.Title>
						<InputFieldL text={profile.strength} /> 
					</S.InputfieldArea>

					{isPM ? 
					<>
					<S.InputfieldArea>
						<S.Title>할애할 수 있는 시간</S.Title>
						<S.TimeRowContainer>
							<S.TimeFrame>
								<S.Timelabel>1일 기준</S.Timelabel>
									<Keyword items={[`${profile.daily_time_capacity}시간`]} color="green" size="m" />
							</S.TimeFrame>
							<S.TimeFrame>
								<S.Timelabel>1주 기준</S.Timelabel>
									<Keyword items={[`${profile.weekly_time_capacity}시간`]} color="green" size="m" />
							</S.TimeFrame>
						</S.TimeRowContainer>
					</S.InputfieldArea>

					<S.ScoreArea>
						<S.Title>디자인에 대한 이해도 자가평가</S.Title>
						<StarDisplay value={profile.design_understanding} />
					</S.ScoreArea>
					

					<S.ScoreArea>
						<S.Title>개발에 대한 이해도 자가평가</S.Title>
						<StarDisplay value={profile.development_understanding} />
					</S.ScoreArea>
					</>
					: ""}

					
					{isDesigner ? 
					<>
					<S.InputfieldArea>
						<S.Title>디자인 작업물</S.Title>
						{profile.portfolio_url ? (
							<D.FileButtonWrapper>
								<WtLCloseButton onClick={handleFileDownload} icon={DownloadIcon}/>			
							</D.FileButtonWrapper>
						) : (
							<S.EmptyText>-</S.EmptyText>
						)}
					</S.InputfieldArea>

					<S.ScoreArea>
						<S.Title>협업 툴 (Figma) 자가평가</S.Title>
						<StarDisplay value={profile.design_score} />
					</S.ScoreArea>
					</>
						: ""}

					{isDeveloper ? 
					<>
						<S.InputfieldArea>
							<S.Title>깃허브</S.Title>
							{profile.github_url? (
								<InputField
									value={profile.github_url}
									variant="output"
									disabled={true}
									icon={<img src={CopyBlackGray} alt="Copy" />}
									hasIcon={true}
									onIconClick={handleGithubCopy}
								/>
							) : (
								<S.EmptyText>-</S.EmptyText>
							)}
						</S.InputfieldArea>

						<S.DevelopArea>
							<S.Title>언어, 프레임워크 숙련도 자가평가</S.Title>

							{profile.development_score.map(([name, score]) => (
								<S.LanguageFrame key={name}>
									<S.SubTitle>{name}</S.SubTitle>
									<StarDisplay value={score} />
								</S.LanguageFrame>
							))}
						</S.DevelopArea>
					</>
					: ""}

				</S.ContentSection>

				<VT700LButton children="꼬리 흔들기" onClick={() => void handleWagging(profile.id)}/>

				<S.BlankFrame/>
			</S.Container>
		</S.SideSheet>
  );
};

export default SideSheet;
