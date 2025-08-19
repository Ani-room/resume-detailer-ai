const ScoreBox = ({ score = 75 }: { score: number }) => {
    return (
        <div className="relative w-[150px] h-[40px] bg-gray-200 rounded-xl overflow-hidden shadow-md">
            {/* Progress Fill */}
            <div
                className="h-full transition-all duration-500 ease-out"
                style={{
                    width: `${score}%`,
                    background: "linear-gradient(90deg, #FF97AD, #5171FF)",
                }}
            />

            {/* Text on top */}
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-bold text-sm text-gray-900">
                    {score}/100
                </span>
            </div>
        </div>
    );
};

export default ScoreBox;
