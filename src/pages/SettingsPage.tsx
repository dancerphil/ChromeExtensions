import {useEffect, useState} from 'react';
import {
    Alert,
    Badge,
    Button,
    Card,
    Group,
    NumberInput,
    Stack,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import {CheckCircle2, Save, Settings, Tags} from 'lucide-react';
import {ShortCutInfo} from '@/pages/ShortcutInfo';
import styles from './SettingsPage.module.css';

export const SettingsPage = () => {
    const [groupThreshold, setGroupThreshold] = useState(5);
    const [fixedRegex, setFixedRegex] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        chrome.storage.sync.get(['groupThreshold', 'fixedRegex'], (result) => {
            if (result.groupThreshold) {
                setGroupThreshold(result.groupThreshold);
            }
            if (result.fixedRegex) {
                setFixedRegex(result.fixedRegex);
            }
        });
    }, []);

    const handleSave = () => {
        chrome.storage.sync.set({groupThreshold, fixedRegex}, () => {
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        });
    };

    return (
        <div className={styles.page}>
            <Stack className={styles.container} gap="lg">
                <Group gap="sm">
                    <Settings size={26} className={styles.headerIcon} />
                    <Stack gap={2}>
                        <Title order={2}>扩展设置</Title>
                        <Text c="dimmed" size="sm">配置您的浏览器扩展偏好设置</Text>
                    </Stack>
                </Group>

                <Card radius="md" p="lg" className={styles.card}>
                    <Stack gap="lg">
                        <Group justify="space-between" align="center">
                            <Group gap={8}>
                                <Tags size={18} />
                                <Title order={4}>标签页管理</Title>
                            </Group>
                            <Text size="sm" c="dimmed">自定义标签页的分组和固定行为</Text>
                        </Group>

                        <ShortCutInfo />

                        <Stack gap="xs">
                            <Group justify="space-between" align="center">
                                <Text fw={600}>标签分组阈值</Text>
                                <Badge variant="light" color="indigo">自动分组</Badge>
                            </Group>
                            <Text size="sm" c="dimmed">当同一网站的标签数量达到此数值时自动分组</Text>
                            <Group>
                                <NumberInput
                                    value={groupThreshold}
                                    onChange={value => setGroupThreshold(Number(value) || 2)}
                                    min={2}
                                    max={20}
                                    allowDecimal={false}
                                    className={styles.input}
                                />
                                <Text className={styles.inlineLabel}>个标签页</Text>
                            </Group>
                        </Stack>

                        <Stack gap="xs">
                            <Group justify="space-between" align="center">
                                <Text fw={600}>固定标签</Text>
                                <Badge variant="outline" color="gray">高级设置</Badge>
                            </Group>
                            <Text size="sm" c="dimmed">匹配的标签将始终被分到"fixed"分组中，支持正则</Text>
                            <TextInput
                                value={fixedRegex}
                                placeholder="例如：github\\.com|stackoverflow\\.com"
                                onChange={e => setFixedRegex(e.currentTarget.value)}
                            />
                            <Text size="xs" c="dimmed">使用正则表达式匹配网站域名，多个规则用 | 分隔</Text>
                        </Stack>
                    </Stack>
                </Card>

                {saved && (
                    <Alert
                        className={styles.successAlert}
                        variant="light"
                        color="green"
                        icon={<CheckCircle2 size={16} />}
                    >
                        设置保存成功！
                    </Alert>
                )}

                <Group justify="center">
                    <Button leftSection={<Save size={16} />} onClick={handleSave} className={styles.saveButton}>
                        保存设置
                    </Button>
                </Group>
            </Stack>
        </div>
    );
};
