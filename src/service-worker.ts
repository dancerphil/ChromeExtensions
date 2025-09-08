import {group, ungroup} from './services/group.js';
import {toggleEditableMode} from './services/editable.js';

chrome.commands.onCommand.addListener((command) => {
    if (command === '1_ungroup') {
        ungroup();
    }
    if (command === '2_group') {
        group();
    }
    if (command === '3_toggleEditableMode') {
        toggleEditableMode();
    }
});
