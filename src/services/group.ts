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
    // 从存储中获取分组阈值，默认为 5
    const {groupThreshold = 5, fixedRegex} = await chrome.storage.sync.get(['groupThreshold', 'fixedRegex']);
    const tabs = await chrome.tabs.query({});
    const fixed: number[] = [];
    const group: Record<string, number[]> = {};
    const other: number[] = [];
    tabs.forEach((tab) => {
        if (!tab.url) {
            return;
        }
        if (fixedRegex && new RegExp(fixedRegex).test(tab.url)) {
            fixed.push(tab.id);
            return;
        }
        const tabName = getTabName(new URL(tab.url).hostname);
        group[tabName] = group[tabName] ?? [];
        group[tabName].push(tab.id);
    });

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
            other.push(...group[name]);
        }
    }

    if (fixed.length > 0) {
        const fixedGroupId = await chrome.tabs.group({
            tabIds: fixed,
        });
        chrome.tabGroups.update(fixedGroupId, {
            collapsed: false,
            title: 'fixed',
            color: 'red',
        });
        chrome.tabGroups.move(fixedGroupId, {
            index: 1,
        });
    }

    const otherGroupId = await chrome.tabs.group({
        tabIds: other,
    });
    chrome.tabGroups.update(otherGroupId, {
        collapsed: false,
        title: '其他',
    });
    chrome.tabGroups.move(otherGroupId, {
        index: -1,
    });
};

export const ungroup = async () => {
    const tabs = await chrome.tabs.query({});
    chrome.tabs.ungroup(tabs.map(tab => tab.id));
};
