'use client';

import React from 'react';
import { CardThemeId } from '@/lib/riot/types';
import { THEMES_LIST } from '@/lib/riot/themes';
import { Palette } from 'lucide-react';

interface ThemeSelectorProps {
  currentThemeId: CardThemeId;
  onSelectTheme: (themeId: CardThemeId) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentThemeId,
  onSelectTheme,
}) => {
  return (
    <div
      style={{
        maxWidth: '780px',
        margin: '0 auto 28px',
        padding: '12px 18px',
        backgroundColor: '#091428',
        border: '1px solid #785a28',
        borderRadius: '8px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Palette size={16} color="var(--gold-primary)" />
          <span
            className="font-cinzel"
            style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'var(--gold-light)',
              letterSpacing: '0.08em',
            }}
          >
            MOLDURA TEMÁTICA DE RUNETERRA
          </span>
        </div>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          Altera os tokens e acabamentos do card
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '8px',
        }}
      >
        {THEMES_LIST.map((t) => {
          const isSelected = t.id === currentThemeId;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelectTheme(t.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 10px',
                backgroundColor: isSelected ? t.surfaceColor : '#0a1428',
                border: isSelected
                  ? `2px solid ${t.primaryColor}`
                  : '1px solid rgba(120, 90, 40, 0.4)',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
            >
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: t.primaryColor,
                  boxShadow: isSelected ? `0 0 8px ${t.primaryColor}` : 'none',
                  flexShrink: 0,
                }}
              />
              <div style={{ overflow: 'hidden' }}>
                <div
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: isSelected ? t.textColor : 'var(--text-muted)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    fontSize: '0.65rem',
                    color: isSelected ? t.primaryColor : '#5b5a56',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {t.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
