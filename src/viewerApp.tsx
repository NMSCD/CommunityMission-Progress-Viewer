import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { BasicImage } from './components/core/image';
import { ChartSection } from './components/section/chartSection';
import { DataSection } from './components/section/dataSection';
import { Header } from './components/common/header';
import { Navbar } from './components/common/navbar';
import { Footer } from './components/common/footer';
import { TimeLoopParallax } from './components/common/parallax';

import './sass/main.scss';
import './sass/custom.scss';
import 'react-toastify/dist/ReactToastify.css';

export const ViewerApp: React.FC = () => {

  useEffect(() => {
    setTimeout(() => {
      window.skrollr.init();
    }, 500);
  }, [])

  return (
    <div id="wrapper">
      <Header />
      <Navbar />

      <div id="main">
        <section id="intro" className="main">
          <div className="spotlight">
            <div className="content">
              <header className="major">
                <h2>Why keep track?</h2>
              </header>
              <p>
                The NMS community has long suspected that completing the missions offerred at <a href="https://nomanssky.fandom.com/wiki/The_Nexus" title="Nexus">The Nexus</a> within the <a href="https://nomanssky.fandom.com/wiki/Space_Anomaly" title="Space Anomaly">Space Anomaly</a> have an inconsistent impact on the overall progress of the Community Mission. In order to gather more data on this, many people started recording the progress of the Community Missions.
              </p>
              {/* <ul className="actions">
                <li><a href="generic.html" className="button">Learn More</a></li>
              </ul> */}
            </div>
            <span className="image">
              <BasicImage imageUrl="./assets/img/data.svg" alt="data" />
            </span>
          </div>
        </section>

        <ChartSection />

        <DataSection />
      </div>

      <Footer />

      <TimeLoopParallax />

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

