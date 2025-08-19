import { useEffect, useState } from "react";
import ScoreBadge from "~/components/ScoreBadge";
// your resume score with rectangle bar
const ProgressBar = ({ score }: { score: number }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // trigger animation after mount
    const timer = setTimeout(() => setWidth(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const barColor =
    score > 70 ? "bg-green-500" : score > 49 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="w-full bg-gray-200 rounded-xl h-6 overflow-hidden shadow-inner">
      <div
        className={`${barColor} h-6 transition-all duration-1000 ease-out`}
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 70 ? "text-green-600" : score > 49 ? "text-yellow-600" : "text-red-600";

  return (
    <div className="resume-summary border-t border-gray-200 px-4 py-3">
      <div className="flex flex-row gap-3 items-center justify-between">
        <div className="flex flex-row gap-2 items-center">
          <p className="text-lg font-semibold">{title}</p>
          <ScoreBadge score={score} />
        </div>
        <p className={`text-lg font-bold ${textColor}`}>{score}/100</p>
      </div>
      <div className="mt-2">
        <ProgressBar score={score} />
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg w-full p-6">
      <div className="flex flex-col items-start gap-4 mb-4">
        <h2 className="text-2xl font-bold">Your Resume Score</h2>
        <p className="text-sm text-gray-500">
          This score is calculated based on the variables listed below.
        </p>
        <ProgressBar score={feedback.overallScore} />
        <p className="text-lg font-semibold mt-1">{feedback.overallScore}/100</p>
      </div>

      <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
      <Category title="Content" score={feedback.content.score} />
      <Category title="Structure" score={feedback.structure.score} />
      <Category title="Skills" score={feedback.skills.score} />
    </div>
  );
};

export default Summary;
