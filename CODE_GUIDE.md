# Portfolio code and editing guide

This guide accompanies the comments in the source. Comments explain operations, markup, configuration fields, and CSS declarations beside the relevant code. A comment on a multiline expression covers that expression; closing braces and closing tags do not need separate explanations.

JavaScript uses block comments and JSX uses comment expressions inside markup. CSS uses block comments, HTML uses HTML comments, and PowerShell/environment examples use `#`. JSON does **not** allow comments: its fields are explained below instead of making npm configuration invalid. Generated lockfiles, bitmap assets, generated favicon SVG, and original vendor SVGs/licenses are intentionally left intact. Do not edit installed `node_modules` or built `dist` files.

## Read the application in this order

1. `client/index.html` declares metadata and the `root` mount element.
2. `client/src/main.jsx` mounts React, wraps it in `AppProvider`, and imports the stylesheet.
3. `client/src/App.jsx` renders Header, Hero, Projects, Experience, Stack, Contact, Footer, and Toast.
4. `client/src/data/constants.js` contains public profile content, section headings, project records, toolkit categories, and general logo URLs.
5. `client/src/context/AppContext.jsx` exposes local project records, optional analytics, and notification actions.
6. `client/src/api/client.js` sends JSON requests to the configured API origin.
7. `server/server.js` installs middleware and mounts API routers; routers call database middleware and controllers/models.

All data imported into the frontend is public, even if not visibly rendered. Keep credentials in server environment configuration only.

## Common changes and the files to edit

| Change | Start here | Keep aligned |
| --- | --- | --- |
| Name, role, summary, email, phone, social links | `client/src/data/constants.js`, `PROFILE` | Literal portrait alt text/header branding/signature if changing identity |
| Portrait | `client/public/assets/profile.jpg` | URL in `client/src/data/profilePhoto.js`; crop/size in `.profile-*` CSS |
| Headings, availability, navigation | `PORTFOLIO_CONFIG` in `constants.js` | Section IDs and anchors; numbering if reordered |
| Section order | `client/src/App.jsx` | Navigation order and editorial numbering |
| Current role in hero | First `PROFILE.experience` entry | The hero uses list position, not a date-based job-status calculation |
| Experience, education, training | Corresponding `PROFILE` arrays | Stable company/degree/issuer keys; first education year supplies heading start year |
| Visible projects | `PROJECTS` in `constants.js` | Display follows array order, not the `order` number |
| Project screenshots | `preview` or `previews` in `PROJECTS` | Local assets use `/assets/...`; external thumbnail service availability is outside this app |
| Toolkit categories/tools | `STACK_GROUPS` in `constants.js` | Category descriptions in `Stack.jsx`, keys in `toolkitIcons.js` |
| Original toolkit logos | `toolkitIcons.js` and `public/assets/toolkit` | Keep original SVG proportions/colors and source/license records |
| General project/company/contact logos | `LOGOS` in `constants.js` | `Logo.jsx` supplies initials if an image fails |
| Global colors/typefaces | `tailwind.config.js` and `src/index.css` | CSS contains explicit values in addition to Tailwind tokens; Google Fonts import loads families |
| Spacing/mobile layout | Corresponding selectors in `src/index.css` | Later overrides, media conditions, specificity, and `!important` |
| Contact fields/limits | `Contact.jsx` | `messageController.js`, `Message.js`, API tests |
| Notification text/duration | Caller text / `AppContext.jsx` | Toast expiry is 3800ms; `Toast.jsx` provides live-region semantics |
| Artist signature | `Footer.jsx` and `.artist-*` CSS | `COPYRIGHT.txt`, `public/authorship.txt`, HTML author metadata |
| Favicon artwork | `public/assets/portfolio-logo.png` | Run `client/scripts/generate-icons.ps1`, inspect generated icons, run favicon tests |

## Data versus database

The visible gallery uses `PROJECTS` imported into `AppContext`. It does not call `api.getProjects()` and does not automatically reflect MongoDB changes. `loading` is currently false because those records are bundled with the frontend.

`server/utils/seed.js` populates the separate database project API. Running the seed can update existing records with matching slugs; it does not delete unrelated projects and does not change frontend constants. It initializes the views counter only when missing. Run it only against a database you intend to modify.

Some fields (`pattern`, `thumbLabel`, `thumbSub`, and `order`) are retained for earlier templates/database compatibility. The current gallery uses screenshot URLs and array order. Do not assume every stored property is visible on the page.

## Motion and performance

`DeferredScene.jsx` dynamically imports the particle/career scenes. `useVisible` supplies a wrapper ref and an activity boolean using an IntersectionObserver with a 100px margin and tab visibility. Near-viewport foreground scenes mount; offscreen/background scenes unmount, releasing their resources. Re-entering starts a new scene rather than resuming an old animation clock. Project carousel timers use the same visibility gate.

`useReducedMotion` subscribes to the browser preference. Active Three.js scenes use a demand frame loop for static rendering when reduced motion is enabled. CSS has its own reduced-motion rules; preserve both when editing animation.

- Shared particles: `AuraParticleCanvas.jsx`. Density is `PARTICLE_COUNT`; `speedMultiplier` and `spreadMultiplier` are per-caller controls. Material size/opacity tune visibility.
- Career rings: `ExperienceThreeScene.jsx`. Geometry dimensions define the drawing; `.experience-3d-layer` defines its position beside the heading.
- Project tilt: `Projects.jsx` writes `--project-mx`, `--project-my`, `--project-rx`, and `--project-ry`. Matching CSS uses these values for light/rotation.
- Toolkit tilt: `Stack.jsx` writes `--tilt-x`, `--tilt-y`, `--glow-x`, and `--glow-y`; CSS supplies perspective and entrance animation. Descriptions are a separate array aligned by category index.
- Carousel: 4500ms interval, gated by image count, pause state, visibility, and reduced motion. Keep interval cleanup when changing timing.

`SafeCanvas` protects the Canvas rendering subtree; `DecorationBoundary` additionally surrounds lazy imports. They handle errors delivered through React boundaries, not every possible asynchronous error. Optional decoration must never become a prerequisite for reading content or using the form.

`HeroThreeScene.jsx`, `ToolkitThreeScene.jsx`, and the standalone components in `components/logos/` are currently unused by the page. Editing them alone will not change the live UI. Reconnecting a legacy scene can restore eager loading if it bypasses DeferredScene.

## Reading the stylesheet

The stylesheet contains accumulated design revisions. Its order is preserved intentionally in this documentation pass. Rule comments identify repeated exact selectors; that count is not proof that a later rule always wins. Media conditions, specificity, inline styles, inheritance, and `!important` all matter.

When a style change appears to do nothing:

1. Inspect the rendered element's classes.
2. Search `index.css` for every matching selector, including hover/focus/pseudo-element variants.
3. Find the applicable desktop/mobile rules and any later overrides.
4. Check inline CSS variables supplied by the component.
5. Change the effective declaration and test both sides of the relevant breakpoint.

`position`, `z-index`, `isolation`, transforms, and blending affect how particle layers sit behind content. Keep decorative overlays at `pointer-events: none`. Keep visible focus treatment on links/buttons and readable contrast on muted text. Retain `object-fit: contain` and unmodified artwork for toolkit logos.

## Contact request flow

1. React controls name, email, and message values.
2. Browser required/type/length rules run alongside the submit handler's checks.
3. The handler sets `sending` and calls `api.sendMessage`.
4. The API wrapper serializes JSON, sets a timeout (unless the caller supplied a signal), and rejects invalid JSON or `success !== true`.
5. Express parses JSON with a 100kb limit. The message router rate-limits before connecting to MongoDB.
6. The controller requires strings, trims input, normalizes email, checks lengths, and saves only the three permitted fields.
7. Mongoose independently enforces schema constraints and defaults `read` to false.
8. A 201 response confirms storage; React clears the form and shows feedback. On failure, it keeps the draft and enables retry.

There is no email delivery integration or public inbox endpoint. Adding a notification email service would be a separate server-side change; do not put mail-provider secrets into React.

## Backend routes and configuration

| Method and path | Behavior |
| --- | --- |
| `GET /` | Informational API envelope and endpoint map |
| `GET /api/health` | Process health without database connection |
| `GET /api/projects` | Database records sorted by order then creation time |
| `GET /api/projects/:slug` | One database project by slug; 404 if missing |
| `POST /api/messages` | Validate/store contact message; default limit 3 per 10 minutes per IP/process |
| `GET /api/stats` | Read views counter |
| `POST /api/stats/view` | Atomic views increment; default limit 30 per hour per IP/process |

The default rate-limit store is in memory and does not coordinate independent server instances. `TRUST_PROXY_HOPS` must describe the verified proxy topology because it affects client IP extraction. CORS controls browser access, not authentication.

The project create/update/delete functions are **not mounted**. They are not an authenticated admin API. Any future write route needs authorization and an allowed-field design before exposure.

Database middleware is attached only to real database routes. Keep health and missing-route responses independent of MongoDB. `connectDB` shares an in-flight promise, reuses open connections, and clears the promise after settlement for later retries.

## Files that cannot contain inline comments

### `client/package.json`

- `name`: npm package identity for this frontend workspace.
- `version`: package metadata, not the Vite/React version.
- `private`: prevents accidental npm publication; it does not make GitHub private.
- `type: module`: interpret `.js` as ES modules.
- `scripts.dev`: start the Vite development server.
- `scripts.build`: produce deployment files in `client/dist`.
- `scripts.preview`: serve a built frontend locally; not a production API host.
- `scripts.test`: run Node's built-in test runner.
- `dependencies.react`: component/hook runtime.
- `dependencies.react-dom`: browser renderer.
- `dependencies.@react-three/fiber`: React integration for Three.js scenes.
- `dependencies.three`: WebGL geometry/material/math engine.
- `devDependencies.@vitejs/plugin-react`: Vite React transformation/development integration.
- `devDependencies.vite`: development server and production bundler.
- `devDependencies.tailwindcss`: utility CSS generation.
- `devDependencies.postcss`: CSS transformation pipeline.
- `devDependencies.autoprefixer`: browser-specific CSS prefixes.

### `server/package.json`

- `name`, `author`, `version`: backend package/author metadata.
- `private`: blocks accidental npm publication, not HTTP access.
- `type: module`: enables import/export and top-level await in server scripts.
- `scripts.dev`: Node watch mode for local development.
- `scripts.start`: start the Express entry point.
- `scripts.seed`: run database upserts described above.
- `scripts.test`: run Node tests with mocked database dependencies.
- `dependencies.express`: HTTP routing/middleware.
- `dependencies.cors`: configured browser cross-origin policy.
- `dependencies.dotenv`: load local server environment.
- `dependencies.express-rate-limit`: request quotas.
- `dependencies.mongoose`: MongoDB schemas, queries, and connections.

The two `package-lock.json` files record resolved dependency versions, package URLs, integrity values, and dependency graphs. Update them through npm, not manual comments. `public/assets/toolkit/sources.json` records vendor asset origins; maintain it and bundled licenses when changing icon sources. Original SVG files and generated favicon data remain assets, not tutorial code.

## Verification after edits

Run from the repository root in PowerShell:

```powershell
npm.cmd test --prefix client
npm.cmd test --prefix server
npm.cmd run build --prefix client
git diff --check
```

For layout/interaction changes, also check desktop and mobile widths, keyboard navigation, reduced motion, and browser errors. API unit tests mock services; passing them does not verify production MongoDB, email delivery, or a Vercel deployment.

For local development, run the server and client dev scripts in separate terminals. The Vite proxy expects Express on localhost:5000 by default. Missing backend errors for `/api/stats` do not mean the static portfolio failed. Production requires an actual backend/routing arrangement or `VITE_API_URL` pointing to the separately deployed API.
