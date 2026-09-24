import { PORTFOLIO_CONFIG } from "../../data/constants.js";
import Logo from "../ui/Logo.jsx";

const TOOLKIT_GROUPS = [
  {
    key: "frontend",
    number: "01",
    title: "Frontend",
    kicker: "INTERFACE",
    description: "Interfaces, interaction and responsive product surfaces.",
    skills: [
      ["html5", "HTML5"], ["css3", "CSS3"], ["javascript", "JavaScript"],
      ["typescript", "TypeScript"], ["react", "React.js"], ["nextjs", "Next.js"],
      ["responsive", "Responsive Design"]
    ]
  },
  {
    key: "backend",
    number: "02",
    title: "Backend",
    kicker: "SYSTEMS",
    description: "APIs, data, authentication and production services.",
    skills: [
      ["nodedotjs", "Node.js"], ["express", "Express.js"], ["mongodb", "MongoDB"],
      ["postgresql", "PostgreSQL"], ["supabase", "Supabase"], ["prisma", "Prisma"],
      ["auth", "Authentication"], ["authorization", "Authorization"], ["ratelimit", "Rate Limiting"]
    ]
  },
  {
    key: "general",
    number: "03",
    title: "General",
    kicker: "ENGINEERING",
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

function ToolkitBurst({ group }) {
  const count = group.skills.length;

  return (
    <article className={`toolkit-burst toolkit-burst-${group.key}`}>
      <div className="toolkit-burst-field" aria-hidden="true" />

      <div className="toolkit-burst-core">
        <div className="toolkit-burst-core-ring" />
        <div className="toolkit-burst-core-ring toolkit-burst-core-ring-inner" />
        <div className="toolkit-burst-core-face">
          <span>{group.number}</span>
          <strong>{group.title}</strong>
        </div>
      </div>

      <div className="toolkit-burst-rays" aria-hidden="true">
        {group.skills.map((_, index) => {
          const angle = (index / count) * 360 - 90;
          return (
            <i
              key={index}
              style={{
                "--ray-angle": `${angle}deg`,
                "--ray-index": index,
                "--ray-count": count
              }}
            />
          );
        })}
      </div>

      <div className="toolkit-burst-skills">
        {group.skills.map(([name, label], index) => {
          const angle = (index / count) * 360 - 90;
          return (
            <div
              className="toolkit-burst-skill"
              key={name}
              style={{
                "--skill-angle": `${angle}deg`,
                "--skill-index": index,
                "--skill-count": count
              }}
            >
              <div className="toolkit-burst-node" />
              <div className="toolkit-burst-label">
                <Logo name={name} label={label} size={17} />
                <span>{label}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="toolkit-burst-caption">
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
              <span>Animated systems</span>
            </div>

            <h2 className="section-title">
              {stack.title} <em>{stack.titleEmphasis}</em>
            </h2>

            <p className="section-lede">{stack.lede}</p>

            <div className="toolkit-burst-grid">
              {TOOLKIT_GROUPS.map((group) => (
                <ToolkitBurst key={group.key} group={group} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
