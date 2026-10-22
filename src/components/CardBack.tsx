'use client';

import React from 'react';
import Image from 'next/image';
import { PlayerCardData, CardTheme } from '@/lib/riot/types';
import {
  Compass,
  Award,
  BarChart3,
  Flame,
  Eye,
  Crosshair,
  ShieldAlert,
  Swords,
  Trophy,
  CheckCircle2,
} from 'lucide-react';

interface CardBackProps {
  cardData: PlayerCardData;
  theme: CardTheme;
}

export const CardBack: React.FC<CardBackProps> = ({ cardData, theme }) => {
  const { playstyle, combatMetrics, topChampions, serialNumber } = cardData;

  const formatPoints = (pts: number) => {
    return new Intl.NumberFormat('pt-BR').format(pts);
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '16px',
        backgroundColor: theme.backgroundColor,
        border: `2px solid ${theme.secondaryColor}`,
        boxShadow: `0 20px 40px rgba(0, 0, 0, 0.8), inset 0 0 0 1px ${theme.secondaryColor}`,
        padding: '20px 18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backfaceVisibility: 'hidden',
        transform: 'rotateY(180deg)',
        overflow: 'hidden',
        color: theme.textColor,
      }}
    >
      {/* Header */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${theme.secondaryColor}`,
            paddingBottom: '10px',
          }}
        >
          <div>
            <div
              className="font-cinzel"
              style={{
                fontSize: '0.95rem',
                fontWeight: 800,
                color: theme.primaryColor,
                letterSpacing: '0.08em',
              }}
            >
              RELATÓRIO TÁTICO
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
              Telemetria Oficial & Desempenho
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 8px',
              borderRadius: '2px',
              backgroundColor: theme.surfaceColor,
              border: `1px solid ${theme.primaryColor}`,
              color: theme.primaryColor,
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            <Compass size={13} />
            <span>{playstyle.primaryRole}</span>
          </div>
        </div>

       
        <div style={{ marginTop: '12px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            <BarChart3 size={13} color={theme.primaryColor} />
            <span>Desempenho por Campeão</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {topChampions.slice(0, 3).map((champ, idx) => (
              <div
                key={champ.championId}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: theme.surfaceColor,
                  padding: '6px 8px',
                  borderRadius: '4px',
                  border: `1px solid rgba(120, 90, 40, 0.3)`,
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '26px',
                    height: '26px',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    border: `1px solid ${theme.primaryColor}`,
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={champ.iconUrl}
                    alt={champ.championName}
                    fill
                    sizes="26px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                    }}
                  >
                    <span style={{ color: idx === 0 ? theme.primaryColor : '#ffffff' }}>
                      {champ.championName}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: theme.badgeColor }}>
                      {champ.winrate}% WR
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.65rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    <span>{formatPoints(champ.championPoints)} pts</span>
                    <span>{champ.games} jogos • KDA {champ.kda}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{ marginTop: '14px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            <Crosshair size={13} color={theme.primaryColor} />
            <span>Métricas de Combate & Macro</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '6px',
            }}
          >
            {/* DPM */}
            <div
              style={{
                backgroundColor: theme.surfaceColor,
                padding: '6px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(120, 90, 40, 0.25)',
              }}
            >
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Dano por Minuto</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>
                {combatMetrics.dpm} DPM{' '}
                <span style={{ fontSize: '0.65rem', color: theme.primaryColor }}>
                  (Top {combatMetrics.dpmTopPercent}%)
                </span>
              </div>
            </div>

            {/* VISAO */}
            <div
              style={{
                backgroundColor: theme.surfaceColor,
                padding: '6px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(120, 90, 40, 0.25)',
              }}
            >
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Visão & Warding</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>
                {combatMetrics.visionScore}{' '}
                <span style={{ fontSize: '0.65rem', color: theme.primaryColor }}>
                  (Top {combatMetrics.visionTopPercent}%)
                </span>
              </div>
            </div>

            {/* KP*/}
            <div
              style={{
                backgroundColor: theme.surfaceColor,
                padding: '6px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(120, 90, 40, 0.25)',
              }}
            >
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Participação em Kills</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>
                {combatMetrics.killParticipation}%
              </div>
            </div>

            {/* CS */}
            <div
              style={{
                backgroundColor: theme.surfaceColor,
                padding: '6px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(120, 90, 40, 0.25)',
              }}
            >
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Farm Médio</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>
                {combatMetrics.csPerMin} CS/min
              </div>
            </div>
          </div>
        </div>

        {/* Season*/}
        <div
          style={{
            marginTop: '12px',
            backgroundColor: theme.surfaceColor,
            border: `1px solid rgba(120, 90, 40, 0.3)`,
            borderRadius: '4px',
            padding: '8px 10px',
          }}
        >
          <div
            style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              color: theme.primaryColor,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Trophy size={13} />
            <span>Façanhas da Temporada</span>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
            }}
          >
            <div>
              Maior Dano: <strong style={{ color: '#ffffff' }}>{combatMetrics.seasonFeats.highestDamage}</strong>
            </div>
            <div>
              Sequência: <strong style={{ color: '#ffffff' }}>{combatMetrics.seasonFeats.longestWinStreak} Vits</strong>
            </div>
            <div>
              Pentas: <strong style={{ color: theme.badgeColor }}>{combatMetrics.seasonFeats.pentakills}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Autenticidade & Riot API Verified */}
      <div
        style={{
          borderTop: `1px solid ${theme.secondaryColor}`,
          paddingTop: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.68rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: theme.badgeColor }}>
          <CheckCircle2 size={13} />
          <span style={{ fontWeight: 700, letterSpacing: '0.04em' }}>RIOT API VERIFIED</span>
        </div>
        <div style={{ color: 'var(--text-muted)' }}>{serialNumber}</div>
      </div>
    </div>
  );
};
