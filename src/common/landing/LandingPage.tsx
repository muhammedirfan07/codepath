import { useEffect } from "react";
import Hero from "./Hero";
import ScrollingHeader from "./ScrollingHeader";
import Sponsers from "./Sponsers";
import ExperienceSection from "./ExperienceSection";
import Features from "./Features";
import Steps from "./Steps";
import Testimonials from "./Testimonials";
import Prices from "./Prices";
import Footer from "../Footer";

function LandingPage() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ScrollingHeader />
      <Hero />
      <Sponsers />
      <ExperienceSection />
      <Features />
      <Steps />
      <Testimonials />
      <Prices/>
      <Footer/> 
    </>
  );
}

export default LandingPage;