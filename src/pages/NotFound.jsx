import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0e0d07] text-[#e8e0c8] flex flex-col items-center justify-center text-center px-6 font-serif">

      {/* Decorative top line */}
      <div className="w-px h-20 bg-linear-to-b from-transparent to-[#c9a84c] mb-10" />

      {/* 404 number */}
      <p className="text-[120px] leading-none tracking-widest text-[#1a1808] select-none m-0">
        404
      </p>

      {/* Gold divider */}
      <div className="w-7 h-0.5 bg-[#c9a84c] my-6 mx-auto" />

      {/* Label */}
      <p className="text-[10px] tracking-[4px] text-[#7a7055] uppercase font-sans mb-4">
        Page Not Found
      </p>

      {/* Heading */}
      <h1 className="text-3xl font-normal text-[#e8e0c8] tracking-wide mb-3">
        This Route Doesn't Exist
      </h1>

      {/* Description */}
      <p className="text-sm text-[#7a7055] font-sans max-w-sm leading-relaxed mb-10">
        The page you're looking for has either moved or never existed.
        Let us take you somewhere real.
      </p>

      {/* Buttons */}
      <div className="flex gap-3 flex-wrap justify-center">

        {/* Primary — Go Home */}
        <button
          onClick={() => navigate('/')}
          className="bg-[#c9a84c] text-[#0e0d07] px-7 py-3 text-[11px] font-bold tracking-widest uppercase font-sans hover:opacity-85 transition-opacity cursor-pointer"
        >
          Go Home
        </button>

        {/* Secondary — Go Back */}
        <button
          onClick={() => navigate(-1)}
          className="bg-transparent border border-[#2e2a10] text-[#7a7055] px-7 py-3 text-[11px] font-bold tracking-widest uppercase font-sans hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all cursor-pointer"
        >
          Go Back
        </button>

      </div>

      {/* Decorative bottom line */}
      <div className="w-px h-20 bg-linear-to-t from-transparent to-[#c9a84c] mt-10" />

    </div>
  );
}
