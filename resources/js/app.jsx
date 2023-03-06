import './bootstrap';
import '../css/app.css';
//modal para vista pdf
import '../css/modal-alert.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';


const appName =  'UPLA';

createInertiaApp({
    title: (title) => `${title} | ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
});

//InertiaProgress.init({ color: '#4B5563' });

InertiaProgress.init({
    color: '#4B5563',
    //showSpinner: true,
   });

/*
InertiaProgress.init({
  // The color of the progress bar.
  color: '#29d',
  // Whether to include the default NProgress styles.
  includeCSS: true,
  // Whether the NProgress spinner will be shown.
  showSpinner: true,
})
*/