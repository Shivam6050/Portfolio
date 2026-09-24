import { PORTFOLIO_CONFIG } from "../../data/constants.js";
import Logo from "../ui/Logo.jsx";

const TOOLKIT_GROUPS = [
  {
    key: "frontend",
    title: "Frontend",
    kicker: "INTERFACE SYSTEMS",
    description: "Interfaces, interaction and responsive product surfaces.",
    skills: [
      ["html5", "HTML5"], ["css3", "CSS3"], ["javascript", "JavaScript"],
      ["typescript", "TypeScript"], ["react", "React.js"], ["nextjs", "Next.js"],
      ["responsive", "Responsive Design"]
    ]
  },
  {
    key: "backend",
    title: "Backend",
    kicker: "APPLICATION SYSTEMS",
    description: "APIs, data, authentication and production services.",
    skills: [
      ["nodedotjs", "Node.js"], ["express", "Express.js"], ["mongodb", "MongoDB"],
      ["postgresql", "PostgreSQL"], ["supabase", "Supabase"], ["prisma", "Prisma"],
      ["auth", "Authentication"], ["authorization", "Authorization"], ["ratelimit", "Rate Limiting"]
    ]
  },
  {
    key: "general",
    title: "General",
    kicker: "ENGINEERING TOOLKIT",
    description: "AI systems, engineering foundations, tooling and delivery.",
    skills: [
      ["cplusplus", "C++"], ["c", "C"], ["git", "Git"], ["github", "GitHub"],
      ["githubactions", "GitHub Actions"], ["postman", "Postman"], ["vscode", "VS Code"],
      ["vercel", "Vercel"], ["system", "System Design"], ["dsa", "DSA"],
      ["openai", "OpenAI"], ["googlegemini", "Gemini API"], ["anthropic", "Anthropic"],
      ["rag", "RAG"], ["mcp", "MCP"], ["prompt", "Prompt Engineering"], ["evaluation", "AI Evaluation"]
    ]
  }
];

function SkillOrbit({ group, index }) {
  return (
    <article className={`toolkit-orbit toolkit-orbit-${group.key}`} style={{ "--orbit-index": index }}>
      <div className="toolkit-orbit-glow" aria-hidden="true" />

      <div className="toolkit-orbit-core">
        <div className="toolkit-orbit-core-ring" />
        <div className="toolkit-orbit-core-ring toolkit-orbit-core-ring-2" />
        <div className="toolkit-orbit-core-label">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{group.title}</strong>
        </div>
      </div>

      <div className="toolkit-skill-rays" aria-hidden="true">
        {group.skills.map((_, skillIndex) => (
          <i
            key={skillIndex}
            style={{
              "--ray-index": skillIndex,
              "--ray-count": group.skills.length
            }}
          />
        ))}
      </div>

      <div className="toolkit-skill-cloud">
        {group.skills.map(([name, label], skillIndex) => (
          <div
            className="toolkit-skill"
            key={name}
            style={{
              "--skill-index": skillIndex,
              "--skill-count": group.skills.length
            }}
          >
            <span className="toolkit-skill-dot" />
            <div className="toolkit-skill-card">
              <Logo name={name} label={label} size={20} />
              <span>{label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="toolkit-orbit-copy">
        <span>{group.kicker}</span>
        <p>{group.description}</p>
      </div>
    </article>
  );
}

export default function Stack() {
  const { stack } = PORTFOLIO_CONFIG;

  return (
    <section id="stack" className="section-shell section-block stack-section">
      <div className="toolkit-content">
        <div className="section-heading">
          <p className="sec-num">{stack.sectionNumber}</p>
          <div>
            <div className="section-meta">
              <span>{stack.meta}</span>
              <span>Hands-on</span>
            </div>

            <h2 className="section-title">
              {stack.title} <em>{stack.titleEmphasis}</em>
            </h2>

            <p className="section-lede">{stack.lede}</p>

            <div className="toolkit-stage">
              {TOOLKIT_GROUPS.map((group, index) => (
                <SkillOrbit key={group.key} group={group} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
