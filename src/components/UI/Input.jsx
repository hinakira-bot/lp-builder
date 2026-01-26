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
