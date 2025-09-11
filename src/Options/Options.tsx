import {useState, useEffect} from 'react';
import {InputNumber, Button, Alert, Input} from 'antd';

export const Options = () => {
    const [groupThreshold, setGroupThreshold] = useState(5);
    const [fixedRegex, setFixedRegex] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        // 加载保存的配置
        chrome.storage.sync.get(
            ['groupThreshold', 'fixedRegex'],
            (result) => {
                if (result.groupThreshold) {
                    setGroupThreshold(result.groupThreshold);
                }
                if (result.fixedRegex) {
                    setFixedRegex(result.fixedRegex);
                }
            },
        );
    }, []);

    const handleSave = () => {
        chrome.storage.sync.set({groupThreshold, fixedRegex}, () => {
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
            <div>
                <label>
                    固定标签（匹配的标签将始终被分组到“fixed”分组中，支持正则）:
                    <Input
                        onChange={e => setFixedRegex(e.target.value)}
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
