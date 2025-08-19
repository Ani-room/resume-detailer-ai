import React from 'react'

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // New gradient palette
  const gradientClass =
    score > 69
      ? 'from-emerald-50 via-emerald-100'
      : score > 49
      ? 'from-amber-50 via-amber-100'
      : 'from-rose-50 via-rose-100';

  // Updated icons (replace with your own if desired)
  const iconSrc =
    score > 69
      ? '/icons/ats-success.svg'
      : score > 49
      ? '/icons/ats-mid.svg'
      : '/icons/ats-low.svg';

  // Text tone colors
  const titleColor =
    score > 69
      ? 'text-emerald-700'
      : score > 49
      ? 'text-amber-700'
      : 'text-rose-700';

  const subtitle =
    score > 69
      ? 'Excellent Work!'
      : score > 49
      ? 'Decent Start'
      : 'Needs Some Work';

  return (
    <div className={`bg-gradient-to-b ${gradientClass} to-white rounded-xl shadow-lg border border-gray-100 w-full p-6 transition-all hover:shadow-xl`}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <div className="flex items-center justify-center w-14 h-14 bg-white rounded-lg shadow-sm">
          <img src={iconSrc} alt="ATS Score Icon" className="w-8 h-8" />
        </div>
        <div>
          <h2 className={`text-xl font-bold ${titleColor}`}>
            ATS Score — {score}/100
          </h2>
          <span className="text-sm text-gray-500">{subtitle}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-5 leading-relaxed">
        This score reflects how likely your resume is to pass through Applicant Tracking Systems used by employers.
      </p>

      {/* Suggestions */}
      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm border border-gray-100">
            <img
              src={suggestion.type === "good" ? "/icons/check-circle.svg" : "/icons/alert-circle.svg"}
              alt={suggestion.type === "good" ? "Positive" : "Needs Improvement"}
              className={`w-5 h-5 mt-0.5 ${suggestion.type === "good" ? "text-emerald-500" : "text-amber-500"}`}
            />
            <p className={suggestion.type === "good" ? "text-emerald-700" : "text-amber-700"}>
              {suggestion.tip}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="mt-6 text-gray-700 italic">
        Keep refining your resume — even small improvements can greatly increase your chances of getting noticed.
      </p>
    </div>
  )
}

export default ATS
