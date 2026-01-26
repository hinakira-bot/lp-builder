import React from 'react';
import clsx from 'clsx';

export const InputGroup = ({ label, children, className = "" }) => (
    <div className={`mb-5 ${className}`}>
        <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold flex items-center gap-2">
            {label}
        </label>
        {children}
    </div>
);

export const TextInput = ({ value, onChange, placeholder, type = "text", className = "" }) => (
    <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
            "w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm text-gray-200 placeholder-gray-600",
            "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all",
            className
        )}
        placeholder={placeholder}
    />
);

export const TextArea = ({ value, onChange, placeholder, rows = 3, className = "" }) => (
    <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
            "w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm text-gray-200 placeholder-gray-600",
            "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none",
            className
        )}
        placeholder={placeholder}
        rows={rows}
    />
);

export const RichTextArea = ({ value, onChange, placeholder, rows = 5, className = "" }) => {
    const textareaRef = React.useRef(null);

    const applyDecoration = (prefix, suffix) => {
        const el = textareaRef.current;
        if (!el) return;

        const start = el.selectionStart;
        const end = el.selectionEnd;
        const text = el.value;
        const selectedText = text.substring(start, end);
        const before = text.substring(0, start);
        const after = text.substring(end);

        const newText = before + prefix + selectedText + suffix + after;
        onChange(newText);

        // Restore focus and selection
        setTimeout(() => {
            el.focus();
            el.setSelectionRange(start + prefix.length, end + prefix.length);
        }, 0);
    };

    return (
        <div className="flex flex-col gap-1">
            <div className="flex gap-1 mb-1">
                <button
                    onClick={() => applyDecoration('**', '**')}
                    className="px-2 py-1 text-[10px] bg-gray-800 hover:bg-gray-700 text-gray-300 rounded border border-gray-700 transition-colors font-bold"
                    title="太字"
                >
                    B
                </button>
                <button
                    onClick={() => applyDecoration('[[', ']]')}
                    className="px-2 py-1 text-[10px] bg-gray-800 hover:bg-gray-700 text-yellow-400 rounded border border-gray-700 transition-colors"
                    title="マーカー"
                >
                    M
                </button>
                <button
                    onClick={() => applyDecoration('###', '###')}
                    className="px-2 py-1 text-[10px] bg-gray-800 hover:bg-gray-700 text-blue-400 rounded border border-gray-700 transition-colors font-bold"
                    title="小見出し"
                >
                    H
                </button>
                <button
                    onClick={() => applyDecoration('!!', '!!')}
                    className="px-2 py-1 text-[10px] bg-gray-800 hover:bg-gray-700 text-red-500 rounded border border-gray-700 transition-colors font-bold"
                    title="赤字"
                >
                    R
                </button>
                <button
                    onClick={() => applyDecoration('[', '](url)')}
                    className="px-2 py-1 text-[10px] bg-gray-800 hover:bg-gray-700 text-blue-300 rounded border border-gray-700 transition-colors underline"
                    title="リンク"
                >
                    L
                </button>
            </div>
            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={clsx(
                    "w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm text-gray-200 placeholder-gray-600",
                    "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none",
                    className
                )}
                placeholder={placeholder}
                rows={rows}
            />
        </div>
    );
};

export const ColorPicker = ({ value, onChange }) => (
    <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-lg p-1">
        <div className="relative w-8 h-8 rounded cursor-pointer overflow-hidden border border-gray-600 flex-shrink-0">
            <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="absolute -top-1 -left-1 w-10 h-10 p-0 m-0 border-0 cursor-pointer"
            />
        </div>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-transparent text-xs text-gray-200 focus:outline-none w-full font-mono uppercase"
            maxLength={7}
        />
    </div>
);

export const Slider = ({ value, min, max, step = 1, onChange, unit = '', className = '', showValue = true }) => (
    <div className={clsx("flex items-center gap-3", className)}>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 px-0.5"
        />
        {showValue && <span className="text-xs text-gray-400 min-w-[3rem] text-right font-mono">{value}{unit}</span>}
    </div>
);
