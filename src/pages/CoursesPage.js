import { useEffect, useState } from 'react';
import { ScrollReveal } from '../components/ScrollReveal';
import { Link } from 'react-router-dom';
import { Star, Check, X, ArrowRight, GraduationCap, Users, Clock } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Course logo SVG components
function CourseLogo({ name, color, size = 40 }) {
  const logos = {
    PrepLadder: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill={color} />
        <path d="M12 28V12h6c4 0 6 2 6 5s-2 5-6 5h-3v6h-3z" fill="white" />
        <path d="M15 14.5v5h3c2 0 3-1 3-2.5s-1-2.5-3-2.5h-3z" fill={color} />
        <rect x="22" y="24" width="8" height="3" rx="1.5" fill="#FFD700" opacity="0.9" />
      </svg>
    ),
    Marrow: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill={color} />
        <path d="M9 28V12h4l5 10 5-10h4v16h-3V17l-4.5 9h-3L12 17v11H9z" fill="white" />
      </svg>
    ),
    'PW Med': (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill={color} />
        <text x="20" y="26" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="sans-serif">PW</text>
      </svg>
    ),
    DAMS: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill={color} />
        <text x="20" y="26" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="sans-serif">DAMS</text>
      </svg>
    ),
    Bhatia: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill={color} />
        <path d="M12 28V12h6c3.5 0 5.5 1.5 5.5 4 0 1.8-1 3-2.5 3.5 2 .5 3 2 3 3.8 0 2.8-2.2 4.7-6 4.7H12z" fill="white" />
        <path d="M15 14.5v4h2.5c1.8 0 2.8-.8 2.8-2s-1-2-2.8-2H15zm0 6.5v4.5h3c2 0 3-.9 3-2.3 0-1.3-1-2.2-3-2.2h-3z" fill={color} />
      </svg>
    ),
    'E-Gurukul': (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill={color} />
        <text x="20" y="25" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="sans-serif">eG</text>
      </svg>
    ),
  };
  return logos[name] || (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="10" fill={color} />
      <text x="20" y="26" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">{name?.charAt(0)}</text>
    </svg>
  );
}

const featureLabels = {
  video_lectures: 'Video Lectures',
  qbank: 'Question Bank',
  notes: 'Study Notes',
  test_series: 'Test Series',
  live_classes: 'Live Classes',
  grand_tests: 'Grand Tests',
  doubt_clearing: 'Doubt Clearing',
  revision_notes: 'Revision Notes',
  mobile_app: 'Mobile App',
  offline_access: 'Offline Access',
};

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/courses`).then(res => { setCourses(res.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <main className="min-h-screen pt-24 flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-2 border-[#1A362D] border-t-transparent rounded-full" />
    </main>
  );

  return (
    <main className="min-h-screen pt-16" data-testid="courses-page">
      {/* Hero */}
      <section className="bg-[#141025]/50 py-16 sm:py-20" data-testid="courses-hero">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#9F67FF]/30 bg-[#9F67FF]/10 px-4 py-1.5 text-xs font-semibold text-[#B28AFF] tracking-wide uppercase mb-6">
                <GraduationCap size={14} /> NEET PG 2026
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-4" style={{ fontFamily: 'Cabinet Grotesk' }} data-testid="courses-title">
                Compare All NEET PG <span className="text-[#B28AFF]">Courses</span>
              </h1>
              <p className="text-base text-slate-400 leading-relaxed">
                Side-by-side comparison of PrepLadder, Marrow, PW Med, DAMS, Bhatia & more. Find the perfect course for your budget and learning style.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Course Cards Grid */}
      <section className="py-12 sm:py-16" data-testid="courses-grid">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {courses.map((course, i) => (
              <ScrollReveal key={i}>
                <div className="bg-[#141025] border border-[#2A2540] rounded-lg overflow-hidden product-card" data-testid={`course-detail-card-${course.id}`}>
                  <div className="p-1.5">
                    <div className="h-2 rounded-full" style={{ backgroundColor: course.color }} />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <CourseLogo name={course.name} color={course.color} size={48} />
                      <div>
                        <h3 className="text-lg font-semibold text-white" style={{ fontFamily: 'Cabinet Grotesk' }}>{course.name}</h3>
                        <p className="text-xs text-slate-500">{course.tagline}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, si) => (
                          <Star key={si} size={14} className={si < Math.floor(course.rating) ? 'star-filled fill-current' : 'star-empty'} />
                        ))}
                      </div>
                      <span className="text-xs text-slate-500">{course.rating} ({course.reviews_count?.toLocaleString()} reviews)</span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                      <span className="flex items-center gap-1"><Users size={12} /> {course.students_enrolled?.toLocaleString()}+</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
                    </div>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold text-white" style={{ fontFamily: 'Cabinet Grotesk' }}>&#8377;{course.price?.toLocaleString()}</span>
                      <span className="text-sm text-slate-600 line-through">&#8377;{course.original_price?.toLocaleString()}</span>
                      <span className="badge-discount">{Math.round(((course.original_price - course.price) / course.original_price) * 100)}% OFF</span>
                    </div>

                    <p className="text-sm text-slate-400 mb-4 leading-relaxed">{course.best_for}</p>

                    <ul className="space-y-2 mb-6">
                      {course.highlights?.slice(0, 3).map((h, hi) => (
                        <li key={hi} className="flex items-start gap-2 text-sm text-slate-300">
                          <Check size={16} className="text-[#9F67FF] mt-0.5 flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <button className="w-full btn-accent py-3 rounded-lg text-sm font-semibold" data-testid={`buy-course-${course.id}`}>
                      Buy Now &#8377;{course.price?.toLocaleString()}
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Comparison Table */}
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-8" style={{ fontFamily: 'Cabinet Grotesk' }} data-testid="comparison-table-title">
              Feature Comparison
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="overflow-x-auto bg-[#141025] border border-[#2A2540] rounded-lg" data-testid="comparison-table">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-[#2A2540]">
                    <th className="text-left p-4 text-sm font-semibold text-white" style={{ fontFamily: 'Cabinet Grotesk' }}>Feature</th>
                    {courses.map((c) => (
                      <th key={c.id} className="text-center p-4 text-sm font-semibold text-white" style={{ fontFamily: 'Cabinet Grotesk' }}>
                        {c.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="table-row-alt border-b border-[#1A1530]">
                    <td className="p-4 text-sm font-medium text-white">Price</td>
                    {courses.map((c) => (
                      <td key={c.id} className="text-center p-4 text-sm font-bold text-white">
                        &#8377;{c.price?.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr className="table-row-alt border-b border-[#1A1530]">
                    <td className="p-4 text-sm font-medium text-white">Rating</td>
                    {courses.map((c) => (
                      <td key={c.id} className="text-center p-4 text-sm text-slate-400">
                        <span className="inline-flex items-center gap-1">
                          <Star size={14} className="star-filled fill-current" /> {c.rating}
                        </span>
                      </td>
                    ))}
                  </tr>
                  {Object.entries(featureLabels).map(([key, label]) => (
                    <tr key={key} className="table-row-alt border-b border-[#1A1530]">
                      <td className="p-4 text-sm text-slate-400">{label}</td>
                      {courses.map((c) => (
                        <td key={c.id} className="text-center p-4">
                          {c.features?.[key] ? (
                            <Check size={18} className="check-yes mx-auto" />
                          ) : (
                            <X size={18} className="check-no mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-[#141025]/30" data-testid="courses-bottom-cta">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-4" style={{ fontFamily: 'Cabinet Grotesk' }}>
              Need Help Choosing?
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto mb-8">
              Get personalized recommendations based on your budget, learning style, and preparation timeline.
            </p>
            <Link to="/contact" className="inline-flex items-center bg-[#9F67FF] text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-[#B28AFF] transition-colors" data-testid="courses-contact-cta">
              Get Advice <ArrowRight size={16} className="ml-2" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
