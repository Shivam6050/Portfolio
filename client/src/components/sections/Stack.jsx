import { useEffect, useRef, useState } from "react";
import { PORTFOLIO_CONFIG } from "../../data/constants.js";
import Logo from "../ui/Logo.jsx";

const TOOLKIT_GROUPS = [
  {
    key: "frontend",
    title: "Frontend",
    eyebrow: "01 / interface",
    skills: [
      ["html5", "HTML5"], ["css3", "CSS3"], ["javascript", "JavaScript"],
      ["typescript", "TypeScript"], ["react", "React.js"], ["nextjs", "Next.js"],
      ["responsive", "Responsive design"]
    ]
  },
  {
    key: "backend",
    title: "Backend",
    eyebrow: "02 / systems",
    skills: [
      ["nodedotjs", "Node.js"], ["express", "Express.js"], ["mongodb", "MongoDB"],
      ["postgresql", "PostgreSQL"], ["supabase", "Supabase"], ["prisma", "Prisma"],
      ["auth", "Authentication"], ["authorization", "Authorization"], ["ratelimit", "Rate limiting"]
    ]
  },
  {
    key: "general",
    title: "General",
    eyebrow: "03 / engineering",
    skills: [
      ["cplusplus", "C++"], ["c", "C"], ["sql", "SQL"], ["git", "Git"],
      ["github", "GitHub"], ["githubactions", "GitHub Actions"], ["postman", "Postman"],
      ["vscode", "VS Code"], ["vercel", "Vercel"], ["system", "System design"],
      ["dsa", "DSA"], ["openai", "OpenAI"], ["googlegemini", "Gemini API"],
      ["rag", "RAG"], ["mcp", "MCP"], ["prompt", "Prompt engineering"], ["evaluation", "AI evaluation"]
    ]
  }
];

function SkillRay({ name, label, index, count }) {
  // A wide, upward-only fan like the reference video.
  const spread = count > 13 ? 132 : count > 8 ? 124 : 112;
  const angle = -90 + ((index / Math.max(count - 1, 1)) - 0.5) * spread;
  const radius = count > 13 ? 44 : 43;
  const x = 50 + Math.cos((angle * Math.PI) / 180) * radius;
  const y = 80 + Math.sin((angle * Math.PI) / 180) * radius;

  return (
    <div
      className="toolkit-ray"
      style={{
        "--ray-angle": `${angle}deg`,
        "--ray-index": index,
        "--ray-x": `${x}%`,
        "--ray-y": `${y}%`
      }}
    >
      <span className="toolkit-ray-line" />
      <span className="toolkit-ray-dot" />
      <span className="toolkit-ray-label">
        <Logo name={name} label={label} size={12} />
        <span>{label}</span>
      </span>
    </div>
  );
}

function ReferenceNode() {
  return (
    <div className="toolkit-reference-node" aria-hidden="true">
      <div className="toolkit-node-half toolkit-node-purple">
        <i />
      </div>
      <div className="toolkit-node-half toolkit-node-yellow">
        <i />
      </div>
    </div>
  );
}

function ToolkitPanel({ group, index }) {
  return (
    <article className={`toolkit-panel toolkit-panel-${group.key}`} style={{ "--panel-index": index }}>
      <div className="toolkit-panel-heading">
        <span>{group.eyebrow}</span>
        <h3>{group.title}</h3>
      </div>

      <div className="toolkit-rays">
        {group.skills.map(([name, label], skillIndex) => (
          <SkillRay
            key={name}
            name={name}
            label={label}
            index={skillIndex}
            count={group.skills.length}
          />
        ))}
      </div>

      <div className="toolkit-node-wrap">
        <ReferenceNode />
      </div>
    </article>
  );
}

export default function Stack() {
  const { stack } = PORTFOLIO_CONFIG;
  const stageRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stack" className="section-shell section-block stack-section">
      <div className="toolkit-content">
        <div className="section-heading">
          <p className="sec-num">{stack.sectionNumber}</p>
          <div>
            <div className="section-meta">
              <span>{stack.meta}</span>
              <span>Capabilities</span>
            </div>

            <h2 className="section-title">
              {stack.title} <em>{stack.titleEmphasis}</em>
            </h2>

            <p className="section-lede">{stack.lede}</p>

            <div ref={stageRef} className={`toolkit-reference-stage ${visible ? "is-visible" : ""}`}>
              {TOOLKIT_GROUPS.map((group, index) => (
                <ToolkitPanel key={group.key} group={group} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
