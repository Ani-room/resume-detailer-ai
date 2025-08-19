import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";

export const meta = () => ([
  { title: 'Resumind | Review' },
  { name: 'description', content: 'Detailed overview of your resume' },
]);

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);
    };

    loadResume();
  }, [id]);

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Top Nav */}
      <nav className="flex items-center p-6 border-b bg-white shadow-sm">
        <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-black transition">
          <img src="/icons/back.svg" alt="logo" className="w-3 h-3" />
          <span className="text-sm font-semibold">Back to Homepage</span>
        </Link>
      </nav>

      <div className="flex flex-row w-full max-lg:flex-col-reverse gap-6 p-6">
        {/* Feedback Section */}
        <section className="flex-1 flex flex-col gap-8">
          <h2 className="text-3xl font-bold text-gray-900">Resume Review</h2>
          {feedback ? (
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-2xl shadow p-6">
                <Summary feedback={feedback} />
              </div>
              <div className="bg-white rounded-2xl shadow p-6">
                <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
              </div>
              <div className="bg-white rounded-2xl shadow p-6">
                <Details feedback={feedback} />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <img src="/images/resume-scan-2.gif" className="w-48" />
            </div>
          )}
        </section>

        {/* Resume Preview */}
        <section className="flex-shrink-0 max-w-lg mx-auto">
          {imageUrl && resumeUrl && (
            <div className="bg-white rounded-2xl shadow-lg p-4 sticky top-6">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  className="w-full h-auto object-contain rounded-xl"
                  title="resume"
                />
              </a>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Resume;
