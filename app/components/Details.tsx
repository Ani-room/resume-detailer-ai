import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

// Rectangle style score badge
const ScoreBadge = ({ score }: { score: number }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-1.5 rounded-md shadow-md border text-sm font-semibold transition-colors",
        score > 69
          ? "bg-green-200 border-green-400 text-green-900"
          : score > 39
          ? "bg-blue-200 border-blue-400 text-blue-900"
          : "bg-red-200 border-red-400 text-red-900"
      )}
    >
      <img
        src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
        alt="score"
        className="w-4 h-4"
      />
      {score}/100
    </div>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div className="flex items-center justify-between py-3 px-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
      <p className="text-lg font-bold tracking-wide">{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
    <div className="flex flex-col gap-5 items-center w-full">
      {/* Quick tips */}
      <div className="bg-gray-100 w-full rounded-lg p-5 shadow-sm grid sm:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div className="flex items-center gap-3" key={index}>
            {/* Circle icon background */}
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full",
                tip.type === "good" ? "bg-green-200" : "bg-blue-200"
              )}
            >
              <img
                src={tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                alt={tip.type}
                className="w-5 h-5"
              />
            </div>
            <p
              className={cn(
                "text-base font-medium",
                tip.type === "good" ? "text-green-700" : "text-blue-700"
              )}
            >
              {tip.tip}
            </p>
          </div>
        ))}
      </div>

      {/* Detailed tips */}
      <div className="flex flex-col gap-4 w-full">
        {tips.map((tip, index) => (
          <div
            key={index + tip.tip}
            className={cn(
              "flex flex-col gap-2 rounded-xl p-4 shadow-sm border-l-4",
              tip.type === "good"
                ? "bg-green-50 border-green-400 text-green-800"
                : "bg-blue-50 border-blue-400 text-blue-800"
            )}
          >
            <div className="flex items-center gap-3">
              <img
                src={tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                alt={tip.type}
                className="w-5 h-5"
              />
              <p className="text-lg font-semibold">{tip.tip}</p>
            </div>
            <p className="text-sm leading-relaxed">{tip.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <Accordion>
        {/* Changed order & renamed */}
        <AccordionItem id="skillset">
          <AccordionHeader itemId="skillset">
            <CategoryHeader
              title="Skillset"
              categoryScore={feedback.skills.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="skillset">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="communication">
          <AccordionHeader itemId="communication">
            <CategoryHeader
              title="Communication Clarity"
              categoryScore={feedback.toneAndStyle.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="communication">
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="content-quality">
          <AccordionHeader itemId="content-quality">
            <CategoryHeader
              title="Content Quality"
              categoryScore={feedback.content.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="content-quality">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="organization">
          <AccordionHeader itemId="organization">
            <CategoryHeader
              title="Organization & Flow"
              categoryScore={feedback.structure.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="organization">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;
