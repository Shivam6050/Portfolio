import { useEffect, useRef, useState } from "react";
import { PORTFOLIO_CONFIG } from "../../data/constants.js";
import Logo from "../ui/Logo.jsx";

const TOOLKIT_GROUPS = [
  {
    key: "frontend",
    title: "Frontend",
    eyebrow: "01 / interface",
    color: "rust",
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
    color: "ink",
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
    color: "muted",
    skills: [
      ["cplusplus", "C++"], ["c", "C"], ["sql", "SQL"], ["git", "Git"],
      ["github", "GitHub"], ["githubactions", "GitHub Actions"], ["postman", "Postman"],
      ["vscode", "VS Code"], ["vercel", "Vercel"], ["system", "System design"],
      ["dsa", "DSA"], ["openai", "OpenAI"], ["googlegemini", "Gemini API"],
      ["rag", "RAG"], ["mcp", "MCP"], ["prompt", "Prompt engineering"], ["evaluation", "AI evaluation"]
    ]
  }
];

function ToolkitCharacter({ group, index }) {
  const count = group.skills.length;

  return (
    <article className={`toolkit-character toolkit-character-${group.key}`} style={{ "--group-index": index }}>
      <div className="toolkit-character-heading">
        <span>{group.eyebrow}</span>
        <h3>{group.title}</h3>
      </div>

      <div className="toolkit-rays" aria-hidden="true">
        {group.skills.map((_, skillIndex) => {
          // Keep the burst mostly upward, like the reference animation.
          const spread = count > 12 ? 112 : 104;
          const angle = -90 + ((skillIndex / Math.max(count - 1, 1)) - 0.5) * spread;
          return (
            <i
              key={skillIndex}
              style={{
                "--angle": `${angle}deg`,
                "--ray-index": skillIndex,
                "--ray-count": count
              }}
            />
          );
        })}
      </div>

      <div className="toolkit-skill-labels">
        {group.skills.map(([name, label], skillIndex) => {
          const spread = count > 12 ? 112 : 104;
          const angle = -90 + ((skillIndex / Math.max(count - 1, 1)) - 0.5) * spread;
          return (
            <div
              className="toolkit-skill-label"
              key={name}
              style={{
                "--angle": `${angle}deg`,
                "--skill-index": skillIndex,
                "--skill-count": count
              }}
            >
              <span className="toolkit-label-line" />
              <span className="toolkit-label-text">
                <Logo name={name} label={label} size={15} />
                <span>{label}</span>
              </span>
            </div>
          );
        })}
      </div>

      <div className="toolkit-character-face" aria-hidden="true">
        <div className="toolkit-eye toolkit-eye-left"><span /></div>
        <div className="toolkit-eye toolkit-eye-right"><span /></div>
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
      { threshold: 0.18 }
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

            <div ref={stageRef} className={`toolkit-stage toolkit-reference-animation ${visible ? "is-visible" : ""}`}>
              {TOOLKIT_GROUPS.map((group, index) => (
                <ToolkitCharacter key={group.key} group={group} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
