'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { PlayerCardData, CardTheme, Badge } from '@/lib/riot/types';
import { CardBack } from './CardBack';
import {
  RotateCw,
  Target,
  Sparkles,
  Shield,
  Award,
  Crown,
  Flame,
  Zap,
  Swords,
  HeartHandshake,
  ShieldAlert,
  Gem,
  Bookmark,
} from 'lucide-react';

interface PlayerCardProps {
  cardData: PlayerCardData;
  theme: CardTheme;
  isFlipped: boolean;
  onToggleFlip: () => void;
}

export const PlayerCard = React.forwardRef<HTMLDivElement, PlayerCardProps>(
  ({ cardData, theme, isFlipped, onToggleFlip }, ref) => {
    const cardContainerRef = useRef<HTMLDivElement | null>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardContainerRef.current) return;
      const rect = cardContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // CARD 3D
      const rX = -((y - centerY) / centerY) * 10;
      const rY = ((x - centerX) / centerX) * 10;

      setRotateX(rX);
      setRotateY(rY);
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
      setIsHovered(false);
    };

    const mainChampion = cardData.topChampions[0];

    const formatPoints = (pts: number) => {
      if (pts >= 1000000) return `${(pts / 1000000).toFixed(1)}M`;
      if (pts >= 1000) return `${Math.round(pts / 1000)}k`;
      return pts.toString();
    };

    const renderBadgeIcon = (iconName: string) => {
      switch (iconName) {
        case 'Crown':
          return <Crown size={14} color={theme.primaryColor} />;
        case 'Gem':
          return <Gem size={14} color={theme.primaryColor} />;
        case 'Flame':
          return <Flame size={14} color={theme.primaryColor} />;
        case 'Shield':
          return <Shield size={14} color={theme.primaryColor} />;
        case 'Award':
          return <Award size={14} color={theme.primaryColor} />;
        case 'Zap':
          return <Zap size={14} color={theme.primaryColor} />;
        case 'Swords':
          return <Swords size={14} color={theme.primaryColor} />;
        case 'HeartHandshake':
          return <HeartHandshake size={14} color={theme.primaryColor} />;
        case 'Target':
          return <Target size={14} color={theme.primaryColor} />;
        default:
          return <Sparkles size={14} color={theme.primaryColor} />;
      }
    };

    const displayTier =
      cardData.soloTier.tier !== 'UNRANKED'
        ? cardData.soloTier
        : cardData.flexTier && cardData.flexTier.tier !== 'UNRANKED'
        ? cardData.flexTier
        : cardData.soloTier;

    const queueLabel =
      cardData.soloTier.tier !== 'UNRANKED'
        ? 'Solo/Duo'
        : cardData.flexTier && cardData.flexTier.tier !== 'UNRANKED'
        ? 'Ranqueada Flex'
        : 'Ranqueada';

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        {/* 3D Tabs [ Frente | Verso ] */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: '#091428',
            border: '1px solid var(--gold-aged)',
            borderRadius: '4px',
            padding: '3px',
            marginBottom: '14px',
          }}
        >
          <button
            type="button"
            onClick={() => isFlipped && onToggleFlip()}
            style={{
              padding: '6px 16px',
              backgroundColor: !isFlipped ? theme.surfaceColor : 'transparent',
              border: !isFlipped ? `1px solid ${theme.primaryColor}` : '1px solid transparent',
              color: !isFlipped ? theme.primaryColor : 'var(--text-muted)',
              borderRadius: '2px',
              fontSize: '0.78rem',
              fontWeight: 700,
              fontFamily: 'var(--font-cinzel), serif',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            FRENTE
          </button>
          <button
            type="button"
            onClick={() => !isFlipped && onToggleFlip()}
            style={{
              padding: '6px 16px',
              backgroundColor: isFlipped ? theme.surfaceColor : 'transparent',
              border: isFlipped ? `1px solid ${theme.primaryColor}` : '1px solid transparent',
              color: isFlipped ? theme.primaryColor : 'var(--text-muted)',
              borderRadius: '2px',
              fontSize: '0.78rem',
              fontWeight: 700,
              fontFamily: 'var(--font-cinzel), serif',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            VERSO (ESTATÍSTICAS)
          </button>
        </div>

        {/* 3D */}
        <div className="card-scene">
          <div
            ref={(node) => {
              cardContainerRef.current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              position: 'relative',
              width: '360px',
              height: '560px',
              borderRadius: '16px',
              transformStyle: 'preserve-3d',
              transform: `rotateX(${rotateX}deg) rotateY(${isFlipped ? rotateY + 180 : rotateY}deg)`,
              transition: isHovered
                ? 'transform 0.08s ease-out'
                : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.4, 1)',
              cursor: 'pointer',
            }}
            onClick={onToggleFlip}
            title="Clique para virar a carta"
          >
            {/* ================= FACE FRONTAL ================= */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '16px',
                border: `2px solid ${theme.secondaryColor}`,
                boxShadow: `0 20px 40px rgba(0, 0, 0, 0.8), inset 0 0 0 1px ${theme.secondaryColor}`,
                backgroundColor: theme.backgroundColor,
                backfaceVisibility: 'hidden',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Splash Art */}
              {mainChampion && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    height: '62%',
                    zIndex: 1,
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={mainChampion.splashUrl}
                    alt={mainChampion.championName}
                    fill
                    priority
                    sizes="360px"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      transform: 'scale(1.02)',
                    }}
                  />
                  
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, rgba(1, 10, 19, 0.25) 0%, rgba(1, 10, 19, 0.7) 60%, #010a13 100%)',
                    }}
                  />
                </div>
              )}

             
              <div className="card-specular" style={{ opacity: isHovered ? 0.25 : 0.12 }} />

              
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  padding: '14px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {/* Region */}
                <div
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '2px',
                    backgroundColor: '#010a13',
                    border: '1px solid var(--gold-dark)',
                    color: '#ffffff',
                    letterSpacing: '0.05em',
                  }}
                >
                  {cardData.regionLabel}
                </div>

                
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.68rem',
                    padding: '3px 8px',
                    borderRadius: '2px',
                    backgroundColor: '#010a13',
                    border: `1px solid ${theme.primaryColor}`,
                    color: theme.primaryColor,
                    fontWeight: 700,
                  }}
                >
                  <RotateCw size={11} />
                  <span>VIRAR</span>
                </div>
              </div>

              {/* IDENTIFICA A MAIN ROLE */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  padding: '0 16px',
                  marginTop: '110px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', marginBottom: '6px' }}>
                  <div
                    style={{
                      position: 'relative',
                      width: '50px',
                      height: '50px',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      border: `2px solid ${theme.primaryColor}`,
                      backgroundColor: '#010a13',
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={cardData.profileIconUrl}
                      alt={cardData.gameName}
                      fill
                      sizes="50px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: theme.primaryColor,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      NÍVEL {cardData.summonerLevel}
                    </div>
                    <div
                      className="font-cinzel"
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: '#ffffff',
                        letterSpacing: '0.04em',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '230px',
                        textShadow: '0 2px 6px rgba(0,0,0,0.9)',
                      }}
                    >
                      {cardData.gameName}
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        #{cardData.tagLine}
                      </span>
                    </div>
                  </div>
                </div>

                {mainChampion && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.7rem',
                      color: theme.textColor,
                      backgroundColor: 'rgba(1, 10, 19, 0.85)',
                      padding: '3px 8px',
                      borderRadius: '2px',
                      border: `1px solid rgba(120, 90, 40, 0.5)`,
                    }}
                  >
                    <Bookmark size={11} color={theme.primaryColor} />
                    <span>
                      Main {mainChampion.championName} ({formatPoints(mainChampion.championPoints)} pts)
                    </span>
                  </div>
                )}
              </div>

              {/*  Ranked Tier, Badges, Top 3, Serial */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  backgroundColor: '#091428',
                  borderTop: `1px solid ${theme.secondaryColor}`,
                  padding: '14px 16px',
                  borderRadius: '0 0 14px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {/* Elo & Ranqueada */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#010a13',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: '1px solid rgba(120, 90, 40, 0.3)',
                  }}
                >
                  <div>
                    <div
                      className="font-cinzel"
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 800,
                        color: theme.primaryColor,
                      }}
                    >
                      {displayTier.tier} {displayTier.rank}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      {displayTier.leaguePoints} PDL • {queueLabel}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
                      {displayTier.winrate}% WR
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      {displayTier.wins}V - {displayTier.losses}D
                    </div>
                  </div>
                </div>

                {/* Insígnias de Estilo de Jogo ) */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  {cardData.badges.map((b: Badge) => (
                    <div
                      key={b.id}
                      title={`${b.title}: ${b.description}`}
                      style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '6px 4px',
                        borderRadius: '4px',
                        backgroundColor: '#010a13',
                        border: '1px solid rgba(120, 90, 40, 0.25)',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ marginBottom: '2px' }}>{renderBadgeIcon(b.icon)}</div>
                      <div
                        style={{
                          fontSize: '0.62rem',
                          fontWeight: 700,
                          color: '#ffffff',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '90px',
                        }}
                      >
                        {b.title}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Top 3 Maestrias */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '6px',
                    borderTop: '1px solid rgba(120, 90, 40, 0.2)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Maestrias:
                    </span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {cardData.topChampions.slice(0, 3).map((c) => (
                        <div
                          key={c.championId}
                          title={`${c.championName} (${formatPoints(c.championPoints)} pts)`}
                          style={{
                            position: 'relative',
                            width: '24px',
                            height: '24px',
                            borderRadius: '2px',
                            overflow: 'hidden',
                            border: `1px solid ${theme.primaryColor}`,
                          }}
                        >
                          <Image
                            src={c.iconUrl}
                            alt={c.championName}
                            fill
                            sizes="24px"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Selo de Colecionador */}
                  <div
                    style={{
                      fontSize: '0.65rem',
                      color: 'var(--gold-aged)',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {cardData.serialNumber}
                  </div>
                </div>
              </div>
            </div>

            {/* ================= FACE TRASEIRA ================= */}
            <CardBack cardData={cardData} theme={theme} />
          </div>
        </div>
      </div>
    );
  }
);

PlayerCard.displayName = 'PlayerCard';
