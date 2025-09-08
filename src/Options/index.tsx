import {createRoot} from 'react-dom/client';
import {useState, useEffect} from 'react';

const Options = () => {
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
        chrome.storage.sync.set({ groupThreshold }, () => {
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        });
    };

    return (
        <div>
            <h1>扩展设置</h1>
            <div>
                <label>
                    标签分组阈值（当同一网站的标签数量达到此数值时自动分组）:
                    <input
                        type="number"
                        min="2"
                        max="50"
                        value={groupThreshold}
                        onChange={(e) => setGroupThreshold(Number(e.target.value))}
                    />
                </label>
            </div>
            <button onClick={handleSave}>
                保存设置
            </button>
            {saved && <span style={{ color: 'green', marginLeft: '10px' }}>设置已保存</span>}
        </div>
    );
};

const root = createRoot(document.body);
root.render(<Options />);
