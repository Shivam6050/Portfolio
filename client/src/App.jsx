/**
 * Page composition: sections appear in the order below. Move component calls to reorder the page and update navigation anchors in constants.js. Header/footer surround one main landmark.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Import Header from ./components/layout/Header.jsx; edit that module for the shared implementation. */
import Header from "./components/layout/Header.jsx";
/* Import Footer from ./components/layout/Footer.jsx; edit that module for the shared implementation. */
import Footer from "./components/layout/Footer.jsx";
/* Import Hero from ./components/sections/Hero.jsx; edit that module for the shared implementation. */
import Hero from "./components/sections/Hero.jsx";
/* Import Projects from ./components/sections/Projects.jsx; edit that module for the shared implementation. */
import Projects from "./components/sections/Projects.jsx";
/* Import Experience from ./components/sections/Experience.jsx; edit that module for the shared implementation. */
import Experience from "./components/sections/Experience.jsx";
/* Import Stack from ./components/sections/Stack.jsx; edit that module for the shared implementation. */
import Stack from "./components/sections/Stack.jsx";
/* Import Contact from ./components/sections/Contact.jsx; edit that module for the shared implementation. */
import Contact from "./components/sections/Contact.jsx";
/* Import Toast from ./components/ui/Toast.jsx; edit that module for the shared implementation. */
import Toast from "./components/ui/Toast.jsx";

/* Page composition: sections appear in the order below. Move component calls to reorder the page and update navigation anchors in constants.js. Header/footer surround one main landmark. */
export default function App() {
  return (
    /* Render div with styling hook min-h-screen overflow-hidden. Change its content binding for copy, classes/CSS for layout. */
    <div className="min-h-screen overflow-hidden">
      {/* Render Header; edit its imported component for behavior instead of duplicating it here. */}<Header />
      {/* Single main-content landmark containing the page sections. */}<main>
        {/* Render Hero; edit its imported component for behavior instead of duplicating it here. */}<Hero />
        {/* Render Projects; edit its imported component for behavior instead of duplicating it here. */}<Projects />
        {/* Render Experience; edit its imported component for behavior instead of duplicating it here. */}<Experience />
        {/* Render Stack; edit its imported component for behavior instead of duplicating it here. */}<Stack />
        {/* Render Contact; edit its imported component for behavior instead of duplicating it here. */}<Contact />
      </main>
      {/* Render Footer; edit its imported component for behavior instead of duplicating it here. */}<Footer />
      {/* Render Toast; edit its imported component for behavior instead of duplicating it here. */}<Toast />
    </div>
  );
}
