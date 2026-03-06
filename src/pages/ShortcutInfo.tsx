import {Anchor, Group, Stack, Text, ThemeIcon} from '@mantine/core';
import {ExternalLink} from 'lucide-react';
import styles from './ShortcutInfo.module.css';

export const ShortCutInfo = () => {
    return (
        <Stack gap="xs">
            <Group align="flex-start" gap="sm" wrap="nowrap">
                <ThemeIcon variant="light" color="blue" radius="xl" size="md">
                    <ExternalLink size={16} />
                </ThemeIcon>
                <Stack gap={4}>
                    <Text fw={600} size="sm" c="blue.9">快捷键提示</Text>
                    <Text size="sm" c="dimmed">
                        快捷键请统一前往：
                        <Anchor
                            href="chrome://extensions/shortcuts"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                        >
                            chrome://extensions/shortcuts
                        </Anchor>
                    </Text>
                    <Text size="xs" c="dimmed">由于 Chrome 插件的限制，请手动前往设置。</Text>
                </Stack>
            </Group>
        </Stack>
    );
};
