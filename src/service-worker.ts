/* --- group / ungroup --- */
const getTabName = (hostname: string) => {
    const segment = hostname.split('.');
    for (let i = segment.length - 1; i >= 0; i--) {
        if (segment[i].length > 3) {
            return segment[i];
        }
    }
    return hostname;
};

const group = async () => {
    const tabs = await chrome.tabs.query({});
    const group: Record<string, number[]> = {};
    tabs.forEach((tab) => {
        const tabName = getTabName(new URL(tab.url).hostname);
        group[tabName] = group[tabName] ?? [];
        group[tabName].push(tab.id);
    });
    let other: number[] = [];
    for (const name in group) {
        if (group[name].length >= 5) {
            const groupId = await chrome.tabs.group({
                tabIds: group[name],
            });
            chrome.tabGroups.update(groupId, {
                collapsed: true,
                title: name,
            });
        }
        else {
            other = other.concat(group[name]);
        }
    }

    const groupId = await chrome.tabs.group({
        tabIds: other,
    });
    chrome.tabGroups.update(groupId, {
        collapsed: false,
        title: '其他',
    });
    chrome.tabGroups.move(groupId, {
        index: -1,
    });
};

const ungroup = async () => {
    const tabs = await chrome.tabs.query({});
    chrome.tabs.ungroup(tabs.map(tab => tab.id));
};

/* --- editable --- */
let editableMode = false;

const toggleEditableMode = async () => {
    chrome.tabs.query({active: true, currentWindow: true}, async (tabs) => {
        const tab = tabs[0];
        if (tab) {
            editableMode = !editableMode;
            await chrome.scripting.executeScript({
                target: {tabId: tab.id},
                func: (active: boolean) => {
                    document.body.setAttribute('contenteditable', active.toString());

                    const indicatorId = 'chrome-extension-editable-indicator';
                    let indicatorElement = document.getElementById(indicatorId) as HTMLDivElement;

                    if (active) {
                        // 创建提示元素
                        if (!indicatorElement) {
                            indicatorElement = document.createElement('div');
                            indicatorElement.id = indicatorId;

                            // 设置样式
                            Object.assign(indicatorElement.style, {
                                position: 'fixed',
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0,
                                borderRadius: '8px',
                                zIndex: '2147483647',
                                pointerEvents: 'none',
                                border: '8px dashed red',
                            });

                            document.body.appendChild(indicatorElement);
                        }
                    }
                    else {
                        if (indicatorElement) {
                            indicatorElement.remove();
                        }
                    }
                },
                args: [editableMode],
            });
        }
    });
};

chrome.commands.onCommand.addListener((command) => {
    if (command === 'group') {
        group();
    }
    if (command === 'ungroup') {
        ungroup();
    }
    if (command === 'toggleEditableMode') {
        toggleEditableMode();
    }
});
