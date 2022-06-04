import React from 'react';
import { createRoot } from 'react-dom/client';
import { ViewerApp } from './viewerApp';

declare global {
  interface Window { config: any, skrollr: any }
}

const container = document.getElementById('nms-community-mission-viewer') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ViewerApp />
  </React.StrictMode>
);

