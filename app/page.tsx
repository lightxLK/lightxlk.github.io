'use client';

import CanvasLoader from "./components/common/CanvasLoader";
import ErrorBoundary from "./components/common/ErrorBoundary";
import ScrollWrapper from "./components/common/ScrollWrapper";
import Experience from "./components/experience";
import Footer from "./components/footer";
import Hero from "./components/hero";

const Home = () => {
  return (
    <ErrorBoundary>
      <CanvasLoader>
        <ScrollWrapper>
          <Hero/>
          <Experience/>
          <Footer/>
        </ScrollWrapper>
      </CanvasLoader>
    </ErrorBoundary>
  );
};
export default Home;
