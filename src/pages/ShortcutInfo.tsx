import {ExternalLink} from 'lucide-react';

export const ShortCutInfo = () => {
    return (
        <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
                <ExternalLink className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">快捷键提示</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                        快捷键请统一前往：
                        <a
                            href="chrome://extensions/shortcuts"
                            className="inline-flex items-center gap-1 ml-1 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            chrome://extensions/shortcuts
                            <ExternalLink className="h-3 w-3" />
                        </a>
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">由于 Chrome 插件的限制，请手动前往设置。</p>
                </div>
            </div>
        </div>
    );
};
