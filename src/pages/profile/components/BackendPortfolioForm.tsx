import { useState } from "react";
import BasePortfolioForm from "./BasePortfolioForm";
import type {
  DailyAvailabilityKey,
  WeeklyAvailabilityKey,
} from "./BasePortfolioForm";

export default function BackendPortfolioForm() {
  const [experienceSummary, setExperienceSummary] = useState("");
  const [strengths, setStrengths] = useState("");
  const [dailyAvailability, setDailyAvailability] =
    useState<DailyAvailabilityKey | null>(null);
  const [weeklyAvailability, setWeeklyAvailability] =
    useState<WeeklyAvailabilityKey | null>(null);

  const strengthsPlaceholder =
    "백엔드 개발자로서의 강점을 사례 중심으로 적어보세요.";

  const toggleDailyAvailability = (key: DailyAvailabilityKey) => {
    setDailyAvailability((prev) => (prev === key ? null : key));
  };

  const toggleWeeklyAvailability = (key: WeeklyAvailabilityKey) => {
    setWeeklyAvailability((prev) => (prev === key ? null : key));
  };

  return (
    <BasePortfolioForm
      title="백엔드 포트폴리오"
      experienceSummary={experienceSummary}
      strengths={strengths}
      dailyAvailability={dailyAvailability}
      weeklyAvailability={weeklyAvailability}
      strengthsPlaceholder={strengthsPlaceholder}
      isFormValid={true}
      onExperienceChange={setExperienceSummary}
      onStrengthsChange={setStrengths}
      onDailyAvailabilityChange={toggleDailyAvailability}
      onWeeklyAvailabilityChange={toggleWeeklyAvailability}
    />
  );
}

