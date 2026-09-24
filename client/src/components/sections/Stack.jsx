import { useEffect, useRef, useState } from "react";
import { PORTFOLIO_CONFIG } from "../../data/constants.js";
import Logo from "../ui/Logo.jsx";

const TOOLKIT_GROUPS = [
  {
    key: "frontend",
    title: "Frontend",
    eyebrow: "01 / interface",
    left: "#b8431a",
    right: "#e7e1d6",
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
    left: "#242321",
    right: "#b8431a",
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
    left: "#716d65",
    right: "#e7e1d6",
    skills: [
      ["cplusplus", "C++"], ["c", "C"], ["sql", "SQL"], ["git", "Git"],
      ["github", "GitHub"], ["githubactions", "GitHub Actions"], ["postman", "Postman"],
      ["vscode", "VS Code"], ["vercel", "Vercel"], ["system", "System design"],
      ["dsa", "DSA"], ["openai", "OpenAI"], ["googlegemini", "Gemini API"],
      ["rag", "RAG"], ["mcp", "MCP"], ["prompt", "Prompt engineering"], ["evaluation", "AI evaluation"]
    ]
  }
];

function CharacterNode({ group }) {
  return (
    <div className="toolkit-node" style={{ "--node-left": group.left, "--node-right": group.right }}>
      <div className="toolkit-node-half toolkit-node-left">
        <span className="toolkit-node-eye left" />
      </div>
      <div className="toolkit-node-half toolkit-node-right">
        <span className="toolkit-node-eye right" />
      </div>
    </div>
  );
}

function ToolkitPanel({ group, index }) {
  const count = group.skills.length;

  return (
    <article className={`toolkit-panel toolkit-panel-${group.key}`} style={{ "--panel-index": index }}>
      <div className="toolkit-panel-heading">
        <span>{group.eyebrow}</span>
        <h3>{group.title}</h3>
      </div>

      <div className="toolkit-network" aria-hidden="true">
        {group.skills.map((_, skillIndex) => {
          const spread = count > 12 ? 116 : 108;
          const angle = -90 + ((skillIndex / Math.max(count - 1, 1)) - 0.5) * spread;
          return (
            <div
              className="toolkit-branch"
              key={skillIndex}
              style={{ "--angle": `${angle}deg`, "--skill-index": skillIndex, "--skill-count": count }}
            >
              <span className="toolkit-branch-line" />
              <span className="toolkit-branch-dot" />
            </div>
          );
        })}
      </div>

      <div className="toolkit-labels">
        {group.skills.map(([name, label], skillIndex) => {
          const spread = count > 12 ? 116 : 108;
          const angle = -90 + ((skillIndex / Math.max(count - 1, 1)) - 0.5) * spread;
          return (
            <div
              className="toolkit-label"
              key={name}
              style={{ "--angle": `${angle}deg`, "--skill-index": skillIndex, "--skill-count": count }}
            >
              <span className="toolkit-label-connector" />
              <span className="toolkit-label-content">
                <Logo name={name} label={label} size={14} />
                <span>{label}</span>
              </span>
            </div>
          );
        })}
      </div>

      <div className="toolkit-node-anchor">
        <CharacterNode group={group} />
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
