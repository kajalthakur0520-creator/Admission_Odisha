import { useState } from "react";
import { Link } from "react-router-dom";

// Slugs match FIELD_CONFIG in FieldDetail.jsx exactly
const streams = [
  {
    id: 1, emoji: "⚙️",
    title: "Engineering & Technology",
    desc: "Build the future with innovation and technology. Shape tomorrow's world with cutting-edge skills.",
    courses: "120+ Courses", tags: ["engineering", "technology"],
    accent: "indigo", slug: "engineering",
  },
  {
    id: 2, emoji: "💚",
    title: "Medical & Health",
    desc: "Serve society and improve lives through healthcare. Pursue a rewarding career in medicine.",
    courses: "80+ Courses", tags: ["medical", "health"],
    accent: "teal", slug: "medical",
  },
  {
    id: 3, emoji: "💼",
    title: "Commerce & Management",
    desc: "Lead businesses and drive economic growth. Master strategy, finance, and entrepreneurship.",
    courses: "60+ Courses", tags: ["management", "commerce"],
    accent: "amber", slug: "commerce",
  },
  {
    id: 4, emoji: "🎨",
    title: "Arts & Humanities",
    desc: "Explore creativity, culture and human expression. Discover literature, philosophy, and fine arts.",
    courses: "45+ Courses", tags: ["arts", "humanities"],
    accent: "rose", slug: "arts",
  },
  {
    id: 5, emoji: "🔬",
    title: "Science",
    desc: "Discover, learn and expand the boundaries of knowledge. Dive into physics, chemistry, and biology.",
    courses: "55+ Courses", tags: ["science"],
    accent: "blue", slug: "science",
  },
  {
    id: 6, emoji: "⚖️",
    title: "Law",
    desc: "Uphold justice and build a career in the legal profession. Advocate for rights in society.",
    courses: "20+ Courses", tags: ["law"],
    accent: "violet", slug: "law",
  },
  {
    id: 7, emoji: "✏️",
    title: "Design",
    desc: "Turn ideas into reality with creativity and imagination. Build a portfolio that speaks visually.",
    courses: "30+ Courses", tags: ["design", "arts"],
    accent: "pink", slug: "design",
  },
  {
    id: 8, emoji: "🏨",
    title: "Hospitality",
    desc: "Create memorable experiences and build a global career in travel, tourism, and hotel management.",
    courses: "25+ Courses", tags: ["hospitality"],
    accent: "orange", slug: "hospitality",
  },
  {
    id: 9, emoji: "💻",
    title: "IT & Computer",
    desc: "Shape the digital world with skills and technology. Code, innovate, and power the future.",
    courses: "90+ Courses", tags: ["it", "technology"],
    accent: "green", slug: "it-computer", // matches FIELD_CONFIG exactly
  },
  {
    id: 10, emoji: "📚",
    title: "Education",
    desc: "Inspire minds and shape the future through teaching. Build a career that creates lasting impact.",
    courses: "35+ Courses", tags: ["education"],
    accent: "sky", slug: "education",
  },
];

const accentMap = {
  indigo: { bg: "bg-indigo-50", border: "border-indigo-200", hoverBorder: "hover:border-indigo-400", badge: "bg-indigo-100 text-indigo-600", bar: "bg-indigo-500", arrow: "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white" },
  teal:   { bg: "bg-teal-50",   border: "border-teal-200",   hoverBorder: "hover:border-teal-400",   badge: "bg-teal-100 text-teal-600",   bar: "bg-teal-500",   arrow: "bg-teal-100 text-teal-600 group-hover:bg-teal-500 group-hover:text-white" },
  amber:  { bg: "bg-amber-50",  border: "border-amber-200",  hoverBorder: "hover:border-amber-400",  badge: "bg-amber-100 text-amber-600",  bar: "bg-amber-500",  arrow: "bg-amber-100 text-amber-600 group-hover:bg-amber-500 group-hover:text-white" },
  rose:   { bg: "bg-rose-50",   border: "border-rose-200",   hoverBorder: "hover:border-rose-400",   badge: "bg-rose-100 text-rose-600",   bar: "bg-rose-500",   arrow: "bg-rose-100 text-rose-600 group-hover:bg-rose-500 group-hover:text-white" },
  blue:   { bg: "bg-blue-50",   border: "border-blue-200",   hoverBorder: "hover:border-blue-400",   badge: "bg-blue-100 text-blue-600",   bar: "bg-blue-500",   arrow: "bg-blue-100 text-blue-600 group-hover:bg-blue-500 group-hover:text-white" },
  violet: { bg: "bg-violet-50", border: "border-violet-200", hoverBorder: "hover:border-violet-400", badge: "bg-violet-100 text-violet-600", bar: "bg-violet-500", arrow: "bg-violet-100 text-violet-600 group-hover:bg-violet-500 group-hover:text-white" },
  pink:   { bg: "bg-pink-50",   border: "border-pink-200",   hoverBorder: "hover:border-pink-400",   badge: "bg-pink-100 text-pink-600",   bar: "bg-pink-500",   arrow: "bg-pink-100 text-pink-600 group-hover:bg-pink-500 group-hover:text-white" },
  orange: { bg: "bg-orange-50", border: "border-orange-200", hoverBorder: "hover:border-orange-400", badge: "bg-orange-100 text-orange-600", bar: "bg-orange-500", arrow: "bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white" },
  green:  { bg: "bg-green-50",  border: "border-green-200",  hoverBorder: "hover:border-green-400",  badge: "bg-green-100 text-green-600",  bar: "bg-green-500",  arrow: "bg-green-100 text-green-600 group-hover:bg-green-500 group-hover:text-white" },
  sky:    { bg: "bg-sky-50",    border: "border-sky-200",    hoverBorder: "hover:border-sky-400",    badge: "bg-sky-100 text-sky-600",    bar: "bg-sky-500",    arrow: "bg-sky-100 text-sky-600 group-hover:bg-sky-500 group-hover:text-white" },
};

const filterTags = [
  { label: "All", value: "" },
  { label: "Engineering", value: "engineering" },
  { label: "Medical", value: "medical" },
  { label: "Science", value: "science" },
  { label: "Management", value: "management" },
  { label: "Arts", value: "arts" },
  { label: "IT & Computer", value: "it" },
  { label: "Law", value: "law" },
];

// Card is a React Router <Link> → /field/:slug — matches FieldDetail's useParams({ fieldSlug })
function StreamCard({ stream, index }) {
  const a = accentMap[stream.accent];
  return (
    <Link
      to={`/field/${stream.slug}`}
      className={`group relative bg-white rounded-2xl border ${a.border} ${a.hoverBorder} p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl shadow-sm overflow-hidden`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Accent bar slides in on hover */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${a.bar} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full`} />

      {/* Icon */}
      <div className={`w-16 h-16 rounded-2xl ${a.bg} flex items-center justify-center text-3xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
        {stream.emoji}
      </div>

      <h3 className="text-sm font-bold text-slate-800 mb-2 leading-snug">{stream.title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed flex-1">{stream.desc}</p>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-slate-100 w-full flex items-center justify-between">
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${a.badge}`}>{stream.courses}</span>
        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-200 ${a.arrow}`}>→</span>
      </div>
    </Link>
  );
}

export default function ViewAllStreams() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [degree, setDegree] = useState("");

  const filtered = streams.filter((s) => {
    const matchTag = !activeTag || s.tags.includes(activeTag);
    const matchSearch = !search || s.title.toLowerCase().includes(search.toLowerCase()) || s.desc.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      <div className="max-w-7xl mx-auto px-6">

        {/* ── BREADCRUMB ── */}
        <div className="flex items-center gap-2 py-6 text-xs text-slate-500">
          <Link to="/" className="text-indigo-600 hover:underline font-medium">Home</Link>
          <span>›</span>
          <Link to="/course" className="text-indigo-600 hover:underline font-medium">Courses</Link>
          <span>›</span>
          <span className="text-slate-400">All Streams</span>
        </div>

        {/* ── HERO ── */}
        <div className="flex items-center justify-between gap-8 py-8">
          <div className="flex-1 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Courses After 12th
            </div>
            <h1 className="text-4xl font-black text-slate-900 leading-tight mb-2">
              Choose a <span className="text-indigo-600">Field</span>
            </h1>
            <div className="w-14 h-1 rounded-full bg-gradient-to-r from-indigo-600 to-amber-400 mb-4" />
            <p className="text-slate-500 text-base leading-relaxed max-w-md">
              Select a field to explore courses and career opportunities after 12th. Find your perfect stream.
            </p>
            <div className="flex gap-8 mt-6">
              {[["10+", "Streams"], ["500+", "Courses"], ["200+", "Colleges"]].map(([num, label]) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-black text-indigo-600">{num}</div>
                  <div className="text-xs text-slate-500 font-medium">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex w-56 h-56 rounded-full bg-gradient-to-br from-indigo-100 via-violet-100 to-purple-200 items-center justify-center relative flex-shrink-0">
            <span className="text-8xl drop-shadow-lg">🎓</span>
            <span className="absolute top-4 right-6 w-3 h-3 rounded-full bg-indigo-400 opacity-50" />
            <span className="absolute bottom-8 left-4 w-2 h-2 rounded-full bg-violet-400 opacity-40" />
          </div>
        </div>

        {/* ── SEARCH / FILTER BAR ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-5 flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-48 flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-200 focus-within:border-indigo-400 transition-colors">
            <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search streams or courses…" className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full" />
          </div>
          <select value={degree} onChange={(e) => setDegree(e.target.value)} className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-600 outline-none focus:border-indigo-400 transition-colors cursor-pointer">
            <option value="">All Degrees</option>
            {["B.Tech", "MBA", "B.Sc", "BCA", "B.Pharm", "Diploma", "M.Tech", "LLB"].map((d) => <option key={d}>{d}</option>)}
          </select>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            Search Courses
          </button>
        </div>

        {/* ── POPULAR TAGS ── */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-bold text-slate-500 mr-1">Popular:</span>
          {filterTags.map((t) => (
            <button key={t.value} onClick={() => setActiveTag(t.value)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200 ${activeTag === t.value ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── SECTION HEADER ── */}
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="text-lg font-black text-slate-800">
              All Streams <span className="text-indigo-600">({filtered.length})</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Explore all available fields and streams</p>
          </div>
          <p className="text-xs text-slate-400 font-medium">Showing {filtered.length} of {streams.length} streams</p>
        </div>

        {/* ── GRID ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-10">
            {filtered.map((s, i) => <StreamCard key={s.id} stream={s} index={i} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <span className="text-5xl mb-3">🔍</span>
            <p className="font-semibold text-base">No streams found</p>
            <p className="text-sm mt-1">Try a different search or clear filters</p>
          </div>
        )}

        {/* ── CTA BANNER ── */}
        <div className="relative bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 mb-12 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-white opacity-5" />
          <div className="absolute bottom-[-3rem] right-20 w-40 h-40 rounded-full bg-white opacity-[0.04]" />
          <div className="flex items-center gap-5 z-10">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-3xl flex-shrink-0">💡</div>
            <div>
              <h3 className="text-lg font-black text-white">Not sure which field is right for you?</h3>
              <p className="text-sm text-indigo-200 mt-1">Get expert guidance and discover the best options for your future.</p>
            </div>
          </div>
          <button className="z-10 flex items-center gap-2 px-7 py-3.5 bg-white text-indigo-700 font-black text-sm rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 flex-shrink-0 shadow-md">
            Explore Now <span className="text-base">→</span>
          </button>
        </div>

      </div>
    </div>
  );
}