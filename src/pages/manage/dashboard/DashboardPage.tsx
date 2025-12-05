import BlackMTextButton from "@/components/ButtonStatic/BkMTextButton";
import SegmentControlTransparent from "@/components/SegmentControl/SegmentControlTransparent";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ReferenceLine } from 'recharts';
import { RechartsGlobalStyle } from '@/styles/RechartsGlobalStyle';
import { CHART_CONFIG } from '@/styles/chartConfig';
import * as S from "./DashboardPage.styles";
import { DEFAULT_TOTAL_MEMBERS, DEFAULT_TOTAL_TEAMS, PART_DATA, TEAM_DATA, PM_UNDERSTANDING_DATA, TEAM_SKILL_DATA } from './DummyDashBoardConstant';

// 역량 평균 아이콘 컴포넌트 (피그마 링크 그대로 사용)
const AverageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="2" viewBox="0 0 20 2" fill="none">
    <path d="M0 1H20" stroke="#19181D" strokeWidth="2"/>
  </svg>
);

// 색상을 추가한 파트 데이터
const partData = PART_DATA.map(item => ({
  ...item,
  color: CHART_CONFIG.colors[item.name as keyof typeof CHART_CONFIG.colors]
}));

// 각 항목별 평균값 계산
const avgPMDesign = PM_UNDERSTANDING_DATA.reduce((sum, item) => sum + item['PM-디자인 이해도'], 0) / PM_UNDERSTANDING_DATA.length;
const avgPMDev = PM_UNDERSTANDING_DATA.reduce((sum, item) => sum + item['PM-개발 이해도'], 0) / PM_UNDERSTANDING_DATA.length;
const avgDesign = PM_UNDERSTANDING_DATA.reduce((sum, item) => sum + item.디자인, 0) / PM_UNDERSTANDING_DATA.length;

interface DashboardPageProps {
  totalMembers?: number;
  totalTeams?: number;
}

export default function DashboardPage({ totalMembers = DEFAULT_TOTAL_MEMBERS, totalTeams = DEFAULT_TOTAL_TEAMS }: DashboardPageProps) {
  return (
    <>
      <RechartsGlobalStyle />
      <S.Container>
      <S.TextButtonFrame>
        <S.TextFrame>
        <S.Title>매칭이 완료되었습니다</S.Title>
        <S.Subtitle>전체 {totalMembers}명 / {totalTeams} 팀</S.Subtitle>
        </S.TextFrame>
        <S.StyledButton as={BlackMTextButton}>매칭 확정</S.StyledButton>
      </S.TextButtonFrame>
      <S.ControlButton>
        <SegmentControlTransparent options={["매칭팀","대시보드","리매칭"]} value="대시보드"/>
      </S.ControlButton>
      
      <S.DashBoardSection>
        <S.PartGrid>
          <S.TeamPartGraphFrame>
            <S.GraphTitle>전체 파트 분포</S.GraphTitle>
            <S.ChartContainer>
              <S.PieChartWrapper>
                <ResponsiveContainer width="100%" height={200} debounce={0}>
                    <PieChart>
                      <Pie
                        data={partData}
                        cx="50%"
                        cy="50%"
                        innerRadius={CHART_CONFIG.pie.innerRadius}
                        outerRadius="100%"
                        paddingAngle={CHART_CONFIG.pie.paddingAngle}
                        dataKey="value"
                      >
                        {partData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </S.PieChartWrapper>
                <S.CustomLegend>
                  {partData.map((entry, index) => (
                    <S.LegendItem key={index}>
                      <S.LegendIcon color={entry.color} />
                      <S.LegendText>{entry.name}</S.LegendText>
                    </S.LegendItem>
                  ))}
                </S.CustomLegend>
            </S.ChartContainer>
          </S.TeamPartGraphFrame>
          
          <S.TeamPartGraphFrame>
            <S.GraphTitle>팀별 파트 분포</S.GraphTitle>
            <S.ChartContainer>
            <ResponsiveContainer width="100%" height={244}>
                  <BarChart data={TEAM_DATA} margin={{top: 20, bottom: 16}} barGap={0} barCategoryGap="30%">
                    <CartesianGrid strokeDasharray="6 5" horizontal={true} vertical={false} stroke="#BB85ED" />
                    <XAxis dataKey="name" stroke="#BB85ED" tick={{ fill: "#19181D", fontSize: 14, fontWeight: 600, dy: 16}} tickLine={false} />
                    <YAxis tick={{ fontSize: 0}} tickLine={false} stroke="#BB85ED" domain={[0, 'dataMax+1']} ticks={[0, 1, 2, 3, 4, 5]} width={2} />
                    <Bar dataKey="PM" fill={CHART_CONFIG.colors.PM} maxBarSize={CHART_CONFIG.bar.maxBarSize} />
                    <Bar dataKey="디자인" fill={CHART_CONFIG.colors.디자인} maxBarSize={CHART_CONFIG.bar.maxBarSize} />
                    <Bar dataKey="프론트엔드" fill={CHART_CONFIG.colors.프론트엔드} maxBarSize={CHART_CONFIG.bar.maxBarSize} />
                    <Bar dataKey="백엔드" fill={CHART_CONFIG.colors.백엔드} maxBarSize={CHART_CONFIG.bar.maxBarSize} />
                  </BarChart>
                </ResponsiveContainer>
            </S.ChartContainer>
          </S.TeamPartGraphFrame>
        </S.PartGrid>
        <S.TeamLanGraphFrame>
            <S.GraphTitle>팀 별 언어/프레임워크 역량 분포</S.GraphTitle>
            <S.RadarLegend>
               <S.RadarLegendItem>
                    <S.LegendIcon color="#973EE9" />
                    <S.LegendText>언어</S.LegendText>
               </S.RadarLegendItem>
               <S.RadarLegendItem>
                    <S.LegendIcon color="#66D7BC" />
                    <S.LegendText>프레임워크</S.LegendText>
               </S.RadarLegendItem>
            </S.RadarLegend>
            <S.RadarGridFrame>
              <S.RadarGrid>
                {Object.entries(TEAM_SKILL_DATA).map(([teamName, data], index) => (
                  <S.RadarItem key={teamName}>
                    <ResponsiveContainer width="100%" height={200} debounce={50}>
                      <RadarChart data={data}>
                        <defs>
                          <linearGradient id={`radarGradient-${index}`} x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="10.2%" stopColor="#973EE9" />
                            <stop offset="90.24%" stopColor="#6CC8C2" />
                          </linearGradient>
                        </defs>
                        <PolarGrid stroke="transparent" />
                        <PolarAngleAxis dataKey="skill" />
                        <PolarRadiusAxis angle={90} domain={[0, 5]} tick={false} axisLine={false} />
                        <Radar 
                          dataKey="value"
                          fill={`url(#radarGradient-${index})`}
                          fillOpacity={1}
                          isAnimationActive={false}
                          dot={false}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                    <S.TeamLabel>{teamName}</S.TeamLabel>
                  </S.RadarItem>
                ))}
              </S.RadarGrid>
            </S.RadarGridFrame>
          </S.TeamLanGraphFrame>
          
          <S.PMDesignGraphFrame>
            <S.GraphTitle>팀 별 PM, 디자인 역량 분포</S.GraphTitle>
            <S.RadarLegend>
               <S.RadarLegendItem>
                    <S.LegendIcon color="#973EE9" />
                    <S.LegendText>PM-디자인 이해도</S.LegendText>
               </S.RadarLegendItem>
               <S.RadarLegendItem>
                    <S.LegendIcon color="#C886E9" />
                    <S.LegendText>PM-개발 이해도</S.LegendText>
               </S.RadarLegendItem>
               <S.RadarLegendItem>
                    <S.LegendIcon color="#66D7BC" />
                    <S.LegendText>디자인</S.LegendText>
               </S.RadarLegendItem>
               <S.RadarLegendItem>
                    <AverageIcon/>
                    <S.LegendText>역량 평균</S.LegendText>
               </S.RadarLegendItem>
            </S.RadarLegend>
            <S.ChartContainer>
              <ResponsiveContainer width="100%" height={344}>
                  <BarChart data={PM_UNDERSTANDING_DATA} barGap={0}>
                    <CartesianGrid strokeDasharray="6 5" horizontal={true} vertical={false} stroke="#7FDAD4" />
                    <XAxis dataKey="name" stroke="#7FDAD4" tick={{ fill: "#19181D", fontSize: 14, fontWeight: 600, dy: 16}} tickLine={false} />
                    <YAxis tick={{ fontSize: 0}} tickLine={false} stroke="#7FDAD4" domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} width={2} />
                    /* 역량 그래프 평균선 구현 */
                    <ReferenceLine y={avgPMDesign} stroke="#973EE9" strokeWidth={2} />
                    <ReferenceLine y={avgPMDev} stroke="#C886E9" strokeWidth={2} />
                    <ReferenceLine y={avgDesign} stroke="#66D7BC" strokeWidth={2} />
                    <Bar dataKey="PM-디자인 이해도" fill="#973EE9" maxBarSize={CHART_CONFIG.bar.maxBarSize} />
                    <Bar dataKey="PM-개발 이해도" fill="#C886E9" maxBarSize={CHART_CONFIG.bar.maxBarSize} />
                    <Bar dataKey="디자인" fill="#66D7BC" maxBarSize={CHART_CONFIG.bar.maxBarSize} />
                  </BarChart>
                </ResponsiveContainer>
            </S.ChartContainer>
          </S.PMDesignGraphFrame>
      </S.DashBoardSection>
    </S.Container>
    </>
  );
}