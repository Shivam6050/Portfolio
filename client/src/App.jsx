import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import Hero from "./components/sections/Hero.jsx";
import Projects from "./components/sections/Projects.jsx";
import Experience from "./components/sections/Experience.jsx";
import Stack from "./components/sections/Stack.jsx";
import Contact from "./components/sections/Contact.jsx";
import Toast from "./components/ui/Toast.jsx";

export default function App() {
  return (
    <div className="min-h-screen overflow-hidden">
      <Header />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Stack />
        <Contact />
      </main>
      <Footer />
      <Toast />
    </div>
  );
}
