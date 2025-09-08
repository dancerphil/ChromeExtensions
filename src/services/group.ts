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

export const group = async () => {
    const tabs = await chrome.tabs.query({});
    const group: Record<string, number[]> = {};
    tabs.forEach((tab) => {
        if (!tab.url) {
            return;
        }
        const tabName = getTabName(new URL(tab.url).hostname);
        group[tabName] = group[tabName] ?? [];
        group[tabName].push(tab.id);
    });

    // 从存储中获取分组阈值，默认为 5
    const {groupThreshold = 5} = await chrome.storage.sync.get(['groupThreshold']);

    let other: number[] = [];
    for (const name in group) {
        if (group[name].length >= groupThreshold) {
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

export const ungroup = async () => {
    const tabs = await chrome.tabs.query({});
    chrome.tabs.ungroup(tabs.map(tab => tab.id));
};
