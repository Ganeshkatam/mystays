'use client';

import React, { useState, useRef, useEffect, useId } from 'react';
import './premium-dropdown.css';

export interface DropdownOption {
  value: string;
  label: string;
  description?: string;
  badge?: string;
  statusColor?: 'available' | 'occupied' | 'inactive';
}

export interface PremiumDropdownProps {
  name?: string;
  value?: string;
  defaultValue?: string;
  options: DropdownOption[];
  placeholder?: string;
  variant?: 'default' | 'search' | 'filter' | 'form' | 'status';
  className?: string;
  ariaLabel?: string;
  onChange?: (value: string) => void;
}

export function PremiumDropdown({
  name,
  value,
  defaultValue = '',
  options,
  placeholder = 'Select an option',
  variant = 'default',
  className = '',
  ariaLabel,
  onChange,
}: PremiumDropdownProps) {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<string>(defaultValue);
  const selectedValue = isControlled ? value : uncontrolledValue;
  const currentOption = options.find((opt) => opt.value === selectedValue);

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    if (!isControlled) {
      setUncontrolledValue(optionValue);
    }
    setIsOpen(false);
    if (onChange) {
      onChange(optionValue);
    }
    triggerRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
        const currentIndex = options.findIndex((opt) => opt.value === selectedValue);
        setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < options.length) {
          const opt = options[highlightedIndex];
          if (opt) {
            handleSelect(opt.value);
          }
        }
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`premium-dropdown premium-dropdown--${variant} ${isOpen ? 'premium-dropdown--open' : ''} ${className}`}
      onKeyDown={handleKeyDown}
    >
      {name && <input type="hidden" name={name} value={selectedValue} />}
      <button
        ref={triggerRef}
        type="button"
        className="premium-dropdown__trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={ariaLabel || placeholder}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="premium-dropdown__selected">
          {currentOption?.statusColor && (
            <span
              className={`premium-dropdown__status-dot premium-dropdown__status-dot--${currentOption.statusColor}`}
            />
          )}
          {currentOption ? (
            <span className="premium-dropdown__selected-label">{currentOption.label}</span>
          ) : (
            <span className="premium-dropdown__placeholder">{placeholder}</span>
          )}
        </span>
        <span className="premium-dropdown__chevron" aria-hidden="true">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      <ul
        id={menuId}
        className="premium-dropdown__menu"
        role="listbox"
        aria-label={ariaLabel || placeholder}
      >
        {options.map((option, index) => {
          const isSelected = option.value === selectedValue;
          const isHighlighted = index === highlightedIndex;

          return (
            <li
              key={option.value || `opt-${index}`}
              role="option"
              aria-selected={isSelected}
              className={`premium-dropdown__option ${
                isSelected ? 'premium-dropdown__option--selected' : ''
              } ${isHighlighted ? 'premium-dropdown__option--highlighted' : ''}`}
              onClick={() => handleSelect(option.value)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <div className="premium-dropdown__option-main">
                <div className="premium-dropdown__option-title-row">
                  {option.statusColor && (
                    <span
                      className={`premium-dropdown__status-dot premium-dropdown__status-dot--${option.statusColor}`}
                    />
                  )}
                  <span className="premium-dropdown__option-title">{option.label}</span>
                  {option.badge && (
                    <span className="premium-dropdown__option-badge">{option.badge}</span>
                  )}
                </div>
                {option.description && (
                  <span className="premium-dropdown__option-desc">{option.description}</span>
                )}
              </div>
              {isSelected && (
                <span className="premium-dropdown__checkmark" aria-hidden="true">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
