import {useState, useEffect} from 'react';
import {InputNumber, Button, Alert} from 'antd';

export const Options = () => {
    const [groupThreshold, setGroupThreshold] = useState(5);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        // 加载保存的配置
        chrome.storage.sync.get(['groupThreshold'], (result) => {
            if (result.groupThreshold) {
                setGroupThreshold(result.groupThreshold);
            }
        });
    }, []);

    const handleSave = () => {
        chrome.storage.sync.set({groupThreshold}, () => {
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        });
    };

    return (
        <div>
            <h1>扩展设置</h1>
            <div>
                快捷键请统一前往：
                <a
                    target="_blank"
                    rel="noreferrer"
                    href="chrome://extensions/shortcuts"
                >
                    chrome://extensions/shortcuts
                </a>
                ，由于 chrome 插件的限制，请手动复制前往。
            </div>
            <div>
                <label>
                    标签分组阈值（当同一网站的标签数量达到此数值时自动分组）:
                    <InputNumber
                        min={2}
                        max={50}
                        value={groupThreshold}
                        onChange={setGroupThreshold}
                    />
                </label>
            </div>
            <Button onClick={handleSave}>
                保存设置
            </Button>
            {saved && <Alert type="success" message="设置已保存" />}
        </div>
    );
};
