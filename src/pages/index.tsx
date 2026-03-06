import {createRoot} from 'react-dom/client';
import {MantineProvider} from '@mantine/core';
import {SettingsPage} from './SettingsPage';
import './index.css';

const root = createRoot(document.body);
root.render(
    <MantineProvider defaultColorScheme="light">
        <SettingsPage />
    </MantineProvider>,
);
