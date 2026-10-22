'use client';

import React, { useState } from 'react';
import { Search, Loader2, Globe, Shield } from 'lucide-react';
import { REGIONS_LIST } from '@/lib/riot/constants';
import { RegionPlatform } from '@/lib/riot/types';

interface SearchHeroProps {
  onSearch: (gameName: string, tagLine: string, region: RegionPlatform) => void;
  isLoading: boolean;
}

export const SearchHero: React.FC<SearchHeroProps> = ({ onSearch, isLoading }) => {
  const [gameName, setGameName] = useState('');
  const [tagLine, setTagLine] = useState('');
  const [region, setRegion] = useState<RegionPlatform>('br1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameName.trim() || !tagLine.trim()) return;
    onSearch(gameName.trim(), tagLine.trim().replace(/^#/, ''), region);
  };

  const handleQuickSelect = (name: string, tag: string, reg: RegionPlatform) => {
    setGameName(name);
    setTagLine(tag);
    setRegion(reg);
    onSearch(name, tag, reg);
  };

  return (
    <section
      style={{
        textAlign: 'center',
        padding: '36px 20px 20px',
        maxWidth: '850px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '2px',
          backgroundColor: '#091428',
          border: '1px solid var(--gold-aged)',
          color: 'var(--gold-primary)',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}
      >
        <Shield size={14} color="var(--gold-primary)" />
        <span>Sistema de Colecionáveis de Summoners Rift</span>
      </div>

      <h1
        className="font-cinzel title-piltover"
        style={{
          fontSize: 'clamp(2rem, 4.5vw, 2.9rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          marginBottom: '14px',
        }}
      >
        FORJE O SEU RIFTCARD
      </h1>

      <p
        style={{
          color: 'var(--text-muted)',
          fontSize: '1rem',
          maxWidth: '640px',
          margin: '0 auto 30px',
          lineHeight: 1.6,
        }}
      >
        Insira seu <strong>Riot ID</strong> e gere uma carta colecionável física em 3D com
        suas principais maestrias, elo oficial, métricas táticas e insígnias.
      </p>

      {/* Riot ID Search Bar */}
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#091428',
          border: '1px solid var(--gold-aged)',
          borderRadius: '4px',
          padding: '10px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          alignItems: 'center',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.7)',
        }}
      >
        {/* Region Selector */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#010a13',
            padding: '10px 14px',
            borderRadius: '2px',
            border: '1px solid var(--gold-dark)',
          }}
        >
          <Globe size={15} color="var(--gold-primary)" />
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value as RegionPlatform)}
            aria-label="Selecionar Região do Servidor"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--gold-light)',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {REGIONS_LIST.map((r) => (
              <option key={r.id} value={r.id} style={{ background: '#091428', color: '#f0e6d2' }}>
                {r.flag} {r.id.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Game Name */}
        <div style={{ flex: '2 1 180px', minWidth: '150px' }}>
          <input
            type="text"
            placeholder="Game Name (ex: Brendonbsk01)"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            required
            aria-label="Nome de Invocador"
            style={{
              width: '100%',
              padding: '11px 14px',
              backgroundColor: '#010a13',
              border: '1px solid var(--gold-dark)',
              borderRadius: '2px',
              color: '#ffffff',
              fontSize: '0.92rem',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--gold-primary)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--gold-dark)')}
          />
        </div>

        {/* Tag Line */}
        <div style={{ flex: '1 1 110px', minWidth: '100px', position: 'relative' }}>
          <span
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--gold-primary)',
              fontWeight: 700,
              fontSize: '0.9rem',
              pointerEvents: 'none',
            }}
          >
            #
          </span>
          <input
            type="text"
            placeholder="TAG (ex: BR1)"
            value={tagLine}
            onChange={(e) => setTagLine(e.target.value.replace(/^#/, ''))}
            required
            aria-label="Tagline do Riot ID"
            style={{
              width: '100%',
              padding: '11px 14px 11px 28px',
              backgroundColor: '#010a13',
              border: '1px solid var(--gold-dark)',
              borderRadius: '2px',
              color: '#ffffff',
              fontSize: '0.92rem',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--gold-primary)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--gold-dark)')}
          />
        </div>

        {/* Direct Action Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn-piltover"
          style={{ flex: '1 1 150px', minWidth: '140px' }}
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
              <span>FORJANDO...</span>
            </>
          ) : (
            <>
              <Search size={16} />
              <span>GERAR CARD</span>
            </>
          )}
        </button>
      </form>

      {/* Pro-Player & Creator Quick Shortcuts */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          marginTop: '16px',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
        }}
      >
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Atalhos de Pro-Players:
        </span>
        <button
          type="button"
          onClick={() => handleQuickSelect('Kami', 'BR1', 'br1')}
          className="btn-mechanical"
          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
        >
          🇧🇷 Kami#BR1
        </button>
        <button
          type="button"
          onClick={() => handleQuickSelect('Faker', 'T1', 'kr')}
          className="btn-mechanical"
          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
        >
          🇰🇷 Faker#T1
        </button>
        <button
          type="button"
          onClick={() => handleQuickSelect('Yoda', 'BR1', 'br1')}
          className="btn-mechanical"
          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
        >
          🇧🇷 Yoda#BR1
        </button>
        <button
          type="button"
          onClick={() => handleQuickSelect('rîòt', 'NA1', 'na1')}
          className="btn-mechanical"
          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
        >
          🇺🇸 rîòt#NA1
        </button>
      </div>
    </section>
  );
};
