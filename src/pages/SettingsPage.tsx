import {useEffect, useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Settings, Save, Tags as Tabs, CheckCircle} from 'lucide-react';
import {Separator} from '@/components/ui/separator';
import {ShortCutInfo} from '@/pages/ShortcutInfo';

export const SettingsPage = () => {
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <div className="container mx-auto px-4 py-8 max-w-2xl">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Settings className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">扩展设置</h1>
                        <p className="text-muted-foreground mt-1">配置您的浏览器扩展偏好设置</p>
                    </div>
                </div>

                {/* Main Settings Card */}
                <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Tabs className="h-5 w-5 text-primary" />
                            标签页管理
                        </CardTitle>
                        <CardDescription>自定义标签页的分组和固定行为</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <ShortCutInfo />
                        <Separator />

                        {/* Tab Group Threshold Setting */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="tab-threshold" className="text-base font-medium">
                                    标签分组阈值
                                </Label>
                                <Badge variant="secondary" className="text-xs">
                                    自动分组
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">当同一网站的标签数量达到此数值时自动分组</p>
                            <div className="flex items-center gap-3">
                                <Input
                                    id="tab-threshold"
                                    type="number"
                                    min="2"
                                    max="20"
                                    value={groupThreshold}
                                    onChange={e => setGroupThreshold(Number(e.target.value))}
                                    className="w-24 text-center font-mono"
                                />
                                <span className="text-sm text-muted-foreground">个标签页</span>
                            </div>
                        </div>

                        <Separator />

                        {/* Fixed Tabs Setting */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="fixed-tabs" className="text-base font-medium">
                                    固定标签
                                </Label>
                                <Badge variant="outline" className="text-xs">
                                    高级设置
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                匹配的标签将始终被分到"fixed"分组中，支持正则
                            </p>
                            <Input
                                id="fixed-tabs"
                                placeholder="例如：github\\.com|stackoverflow\\.com"
                                value={fixedRegex}
                                onChange={e => setFixedRegex(e.target.value)}
                                className="font-mono text-sm"
                            />
                            <p className="text-xs text-muted-foreground">使用正则表达式匹配网站域名，多个规则用 | 分隔</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Success Notification */}
                {saved && (
                    <div className="mt-8 mb-6 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg animate-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                            <p className="text-sm font-medium text-green-900 dark:text-green-100">设置保存成功！</p>
                        </div>
                    </div>
                )}

                {/* Save Button */}
                <div className="mt-8 flex justify-center">
                    <Button
                        onClick={handleSave}
                        size="lg"
                        className="min-w-32 shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        保存设置
                    </Button>
                </div>
            </div>
        </div>
    );
};
