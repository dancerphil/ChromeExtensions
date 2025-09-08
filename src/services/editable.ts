/* --- editable --- */
let editableMode = false;

export const toggleEditableMode = async () => {
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
