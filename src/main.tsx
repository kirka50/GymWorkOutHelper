import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from "react-router";
import './index.css';

import {registerSW} from 'virtual:pwa-register';
import AppRoutes from "@/pages/AppRoutes.tsx";

registerSW({immediate: true});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter basename="/GymWorkOutHelper">
            <AppRoutes/>
        </BrowserRouter>
    </StrictMode>,
)
