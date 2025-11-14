import React, { useMemo, useState } from "react";

/**
 * TopicSearch.js (Final)
 * - Neon signature (B2) under the title (Blue Electric Neon)
 * - Rainbow animated background
 * - Neon search bar
 * - Dark/Light toggle
 * - Category filters
 * - Multi-color cards per category
 * - Highlight search text
 * - 3D card hover tilt + fade-in
 * - Responsive
 */

/* ----------------- Component ----------------- */
const TopicSearch = () => {
  // topics (stable across renders)
  const topics = useMemo(
    () => [
      { id: 1, name: "Thermodynamics", category: "Physics", icon: "🔥" },
      { id: 2, name: "Python Programming", category: "Programming", icon: "🐍" },
      { id: 3, name: "Java Development", category: "Programming", icon: "☕" },
      { id: 4, name: "HTML Basics", category: "Web Development", icon: "🌐" },
      { id: 5, name: "MySQL Database", category: "Database", icon: "🗄️" },

      { id: 6, name: "C Programming", category: "Programming", icon: "💻" },
      { id: 7, name: "C++ Programming", category: "Programming", icon: "⚙️" },
      { id: 8, name: "JavaScript", category: "Web Development", icon: "🟨" },
      { id: 9, name: "React.js", category: "Web Development", icon: "⚛️" },
      { id: 10, name: "Node.js", category: "Web Development", icon: "🟩" },
      { id: 11, name: "PHP Development", category: "Programming", icon: "🐘" },

      { id: 12, name: "PostgreSQL", category: "Database", icon: "🐘" },
      { id: 13, name: "MongoDB", category: "Database", icon: "🍃" },

      { id: 14, name: "Data Structures", category: "Computer Science", icon: "📚" },
      { id: 15, name: "Algorithms", category: "Computer Science", icon: "🧠" },

      { id: 16, name: "AWS Basics", category: "Cloud Computing", icon: "☁️" },
      { id: 17, name: "Azure Cloud", category: "Cloud Computing", icon: "🔵" },
      { id: 18, name: "Google Cloud", category: "Cloud Computing", icon: "🌤️" },

      { id: 19, name: "Docker", category: "DevOps", icon: "🐳" },

      { id: 20, name: "Machine Learning", category: "AI/ML", icon: "🤖" },
      { id: 21, name: "Deep Learning", category: "AI/ML", icon: "🧬" },

      { id: 22, name: "Git & GitHub", category: "Tools", icon: "🔧" },
      { id: 23, name: "VS Code", category: "Tools", icon: "🧩" },
      { id: 24, name: "LeetCode", category: "Computer Science", icon: "🏆" },
    ],
    []
  );

  // UI state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDark, setIsDark] = useState(false);

  // categories derived memoized
  const categories = useMemo(() => {
    const set = new Set(topics.map((t) => t.category));
    return ["All", ...Array.from(set)];
  }, [topics]);

  // category gradient map
  const categoryStyles = {
    Programming: "linear-gradient(135deg,#6dd3ff,#4ca6ff)",
    "Web Development": "linear-gradient(135deg,#a78bfa,#ff7acb)",
    Database: "linear-gradient(135deg,#7df7b6,#39d2a6)",
    Physics: "linear-gradient(135deg,#ffd36e,#ff7a7a)",
    "Computer Science": "linear-gradient(135deg,#ffd9a6,#ff9cee)",
    "Cloud Computing": "linear-gradient(135deg,#9ae6b4,#5dd1ff)",
    DevOps: "linear-gradient(135deg,#ffd68a,#ffb86f)",
    "AI/ML": "linear-gradient(135deg,#ff9a9e,#fad0c4)",
    Tools: "linear-gradient(135deg,#fdef9b,#ffd36e)",
    default: "linear-gradient(135deg,#42e695,#3bb2b8)",
  };

  // filter topics by search + category
  const filteredTopics = topics.filter((topic) => {
    const matchesCategory = selectedCategory === "All" || topic.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = q === "" || topic.name.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  // highlight matched substring
  const highlightMatch = (text, query) => {
    if (!query) return <span style={nameStyles.topicName}>{text}</span>;
    const q = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(q, "ig");
    const parts = [];
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      if (start > lastIndex) {
        parts.push(<span key={lastIndex}>{text.slice(lastIndex, start)}</span>);
      }
      parts.push(
        <mark
          key={start}
          style={{
            background: isDark ? "rgba(100,180,255,0.14)" : "rgba(255,250,160,0.85)",
            color: isDark ? "#051428" : "#111",
            padding: "2px 6px",
            borderRadius: 6,
            boxShadow: isDark ? "0 6px 18px rgba(80,160,255,0.04)" : "0 6px 18px rgba(255,210,80,0.12)",
          }}
        >
          {text.slice(start, end)}
        </mark>
      );
      lastIndex = end;
    }
    if (lastIndex < text.length) {
      parts.push(<span key={lastIndex + 1}>{text.slice(lastIndex)}</span>);
    }
    return <span style={nameStyles.topicName}>{parts}</span>;
  };

  // theme
  const theme = isDark
    ? {
        pageOverlay: "linear-gradient(135deg,#081221,#071124)",
        boxBg: "rgba(8,10,18,0.7)",
        textColor: "#e6eef8",
        inputBg: "linear-gradient(135deg,#0b1220,#071221)",
        inputShadow: "0 10px 30px rgba(0,0,0,0.7), 0 0 14px rgba(0,0,0,0.4)",
      }
    : {
        pageOverlay: "linear-gradient(135deg,#ff6a88,#ff99ac,#f5af19,#f12711)",
        boxBg: "rgba(255,255,255,0.22)",
        textColor: "#111827",
        inputBg: "linear-gradient(135deg,#ffe53b,#ff2525)",
        inputShadow: "0 8px 20px rgba(255,80,80,0.45), 0 0 12px rgba(255,210,0,0.35)",
      };

  const getCategoryGradient = (cat) => categoryStyles[cat] || categoryStyles.default;

  return (
    <div style={{ ...finalStyles.wrapper }}>
      {/* rainbow background overlay */}
      <div style={{ ...finalStyles.bgOverlay, backgroundImage: theme.pageOverlay }} />

      <div style={{ ...finalStyles.container }}>
        <div style={{ ...finalStyles.box, background: theme.boxBg, color: theme.textColor }}>
          <div style={finalStyles.headerRow}>
            <div>
              <h1 style={{ ...finalStyles.title, color: theme.textColor }}>
                <span style={{ marginRight: 10 }}>🔮</span> Explore Topics
              </h1>

              {/* B2: Neon signature under the title */}
              <div style={{ marginTop: 6 }}>
                <span style={{ ...finalStyles.neonSignature }}>
                  <span style={{ marginRight: 8 }}>⚡</span>
                  <span style={{ fontWeight: 800 }}>Diwakar Reddy</span>
                </span>
              </div>
            </div>

            <div style={finalStyles.rightControls}>
              <button
                onClick={() => setIsDark((s) => !s)}
                style={{
                  ...finalStyles.modeBtn,
                  background: isDark ? "linear-gradient(135deg,#2b3440,#101418)" : "linear-gradient(135deg,#ffffff,#f3f4f6)",
                  color: isDark ? "#fff" : "#0b1220",
                  boxShadow: isDark ? "0 8px 22px rgba(0,0,0,0.6)" : "0 8px 22px rgba(0,0,0,0.08)",
                }}
              >
                {isDark ? "🌙 Dark" : "🌞 Light"}
              </button>
            </div>
          </div>

          {/* Search */}
          <div style={finalStyles.searchRow}>
            <input
              type="text"
              placeholder="Search topics (e.g. python, react, sql)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                ...finalStyles.searchInput,
                background: theme.inputBg,
                boxShadow: theme.inputShadow,
                color: isDark ? "#fff" : "#111",
              }}
            />
          </div>

          {/* Filters */}
          <div style={finalStyles.filtersRow}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  ...finalStyles.filterBtn,
                  border: selectedCategory === cat ? "2px solid rgba(255,255,255,0.9)" : "2px solid rgba(255,255,255,0.08)",
                  background: selectedCategory === cat ? "rgba(255,255,255,0.04)" : "transparent",
                  color: theme.textColor,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <div style={finalStyles.grid}>
            {filteredTopics.length === 0 ? (
              <p style={{ ...finalStyles.noTopic, color: isDark ? "#ffd86b" : "#fff200" }}>❌ No topics found</p>
            ) : (
              filteredTopics.map((topic, idx) => (
                <article
                  key={topic.id}
                  style={{
                    ...finalStyles.card,
                    background: getCategoryGradient(topic.category),
                    boxShadow: isDark ? "0 20px 50px rgba(0,0,0,0.6)" : "0 18px 46px rgba(0,0,0,0.18)",
                    animationDelay: `${idx * 70}ms`,
                  }}
                  onMouseMove={(e) => {
                    const el = e.currentTarget;
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const cx = rect.width / 2;
                    const cy = rect.height / 2;
                    const dx = (x - cx) / cx;
                    const dy = (y - cy) / cy;
                    el.style.transform = `perspective(900px) rotateX(${dy * -6}deg) rotateY(${dx * 6}deg) translateZ(10px)`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
                  }}
                  tabIndex={0}
                >
                  <h3 style={finalStyles.cardTitle}>
                    <span style={{ marginRight: 10 }}>{topic.icon}</span>
                    <span style={nameStyles.container}>{highlightMatch(topic.name, searchQuery)}</span>
                  </h3>
                  <p style={finalStyles.cardCategory}>{topic.category}</p>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ----------------- topic name font & style variations ----------------- */
const nameStyles = {
  container: {
    display: "inline-block",
  },
  topicName: {
    fontWeight: 800,
    letterSpacing: 0.2,
    // color will be white on cards; text gradient handled by card background
  },
};

/* ----------------- final styles ----------------- */
const finalStyles = {
  wrapper: {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    overflowX: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 28,
    fontFamily: "'Segoe UI', Roboto, system-ui, -apple-system, 'Helvetica Neue', Arial",
  },

  bgOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 0,
    filter: "blur(20px) saturate(120%)",
    opacity: 0.96,
    backgroundSize: "400% 400%",
    animation: "gradientBG 14s ease infinite",
  },

  container: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: 1100,
    display: "flex",
    justifyContent: "center",
    padding: 20,
  },

  box: {
    width: "100%",
    borderRadius: 22,
    padding: 24,
    boxSizing: "border-box",
    border: "1px solid rgba(255,255,255,0.06)",
    backdropFilter: "blur(6px)",
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: 900,
    margin: 0,
    display: "flex",
    alignItems: "center",
  },

  neonSignature: {
    display: "inline-block",
    fontSize: 13,
    color: "#BEE6FF",
    letterSpacing: 0.6,
    padding: "6px 10px",
    borderRadius: 12,
    background: "linear-gradient(90deg,#DFF6FF, rgba(255,255,255,0.02))",
    boxShadow: "0 10px 30px rgba(59,142,255,0.16), 0 0 18px rgba(59,142,255,0.25)",
    textShadow: "0 6px 18px rgba(15,70,160,0.45)",
    transform: "translateY(0px)",
    fontWeight: 700,
    backdropFilter: "blur(6px)",
  },

  rightControls: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  modeBtn: {
    padding: "8px 12px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 14,
  },

  searchRow: {
    marginBottom: 14,
  },

  searchInput: {
    width: "100%",
    padding: "14px 18px",
    borderRadius: 40,
    border: "none",
    outline: "none",
    fontSize: 16,
    transition: "all 0.25s ease",
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
  },

  filtersRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 10,
    marginBottom: 20,
  },

  filterBtn: {
    padding: "8px 12px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 13,
    background: "transparent",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 18,
  },

  card: {
    padding: 18,
    borderRadius: 14,
    color: "#fff",
    transition: "transform 0.35s ease, box-shadow 0.35s ease",
    transformStyle: "preserve-3d",
    willChange: "transform",
    opacity: 0,
    animation: "fadeInUp 560ms forwards",
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  cardTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  cardCategory: {
    marginTop: 8,
    fontSize: 13,
    opacity: 0.95,
    fontWeight: 700,
  },

  noTopic: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 18,
  },
};

/* ----------------- injected CSS for animations & bg ----------------- */
const injectedStyle = document.createElement("style");
injectedStyle.innerHTML = `
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(18px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  25% { background-position: 50% 50%; }
  50% { background-position: 100% 50%; }
  75% { background-position: 50% 50%; }
  100% { background-position: 0% 50%; }
}

/* neon focus */
input:focus {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(255,255,255,0.08), 0 0 24px rgba(59,142,255,0.14), 0 0 40px rgba(59,142,255,0.06) inset;
  outline: none;
}

/* accessibility focus */
article:focus {
  outline: none;
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 30px 60px rgba(0,0,0,0.3);
}

/* responsive tweaks */
@media (max-width: 640px) {
  .hide-mobile { display: none !important; }
}
`;
document.head.appendChild(injectedStyle);

/* ----------------- rainbow gradient variable injected ----------------- */
const rainbowVar = document.createElement("style");
rainbowVar.innerHTML = `
:root {
  --rainbow: linear-gradient(120deg,
    #ff5f6d 0%,
    #ffc371 15%,
    #ffb199 30%,
    #a18cd1 45%,
    #8fd3f4 60%,
    #6ee7b7 75%,
    #ffd36e 90%
  );
}
/* apply this to bgOverlay for a stronger rainbow if you like */
`;
document.head.appendChild(rainbowVar);

export default TopicSearch;
