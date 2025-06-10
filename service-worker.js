const getTabName = (hostname) => {
    const segment = hostname.split('.');
    for (let i = segment.length - 1; i >= 0; i--) {
        if (segment[i].length > 3) {
            return segment[i];
        }
    }
    return hostname;
};

const split = async () => {
    const tabs = await chrome.tabs.query({});
    const group = {};
    tabs.forEach((tab) => {
        const hostname = new URL(tab.url).hostname;
        const tabName = getTabName(hostname);
        group[tabName] = group[tabName] ?? [];
        group[tabName].push(tab.id);
    });
    let maxTabName = Object.keys(group)[0];
    Object.keys(group).forEach((name) => {
        if (group[name].length > group[maxTabName].length) {
            maxTabName = name;
        }
    });
    const groupId = await chrome.tabs.group({
        tabIds: group[maxTabName],
    });
    chrome.tabGroups.update(groupId, {
        collapsed: true,
        title: maxTabName,
    });
    chrome.tabGroups.move(groupId, {
        index: 0,
    });
};

chrome.commands.onCommand.addListener((command) => {
    if (command === 'split') {
        split();
    }
});
