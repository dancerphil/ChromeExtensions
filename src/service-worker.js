const getTabName = (hostname) => {
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
    const group = {};
    const tabsWithName = tabs.map((tab) => {
        const tabName = getTabName(new URL(tab.url).hostname);
        group[tabName] = group[tabName] ?? [];
        group[tabName].push(tab.id);
        return ({
            tab,
            tabName,
        });
    });
    let other = [];
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

chrome.commands.onCommand.addListener((command) => {
    if (command === 'group') {
        group();
    }
    if (command === 'ungroup') {
        ungroup();
    }
});
