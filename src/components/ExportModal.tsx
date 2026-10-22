'use client';

import React, { useState, useRef } from 'react';
import { PlayerCardData, CardTheme } from '@/lib/riot/types';
import { toPng } from 'html-to-image';
import {
  X,
  Download,
  Smartphone,
  Square,
  Layers,
  Loader2,
  Check,
  ShieldCheck,
} from 'lucide-react';
import Image from 'next/image';

export type ExportPreset = 'story' | 'feed' | 'pure';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardData: PlayerCardData;
  theme: CardTheme;
  cardElement: HTMLElement | null;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  cardData,
  theme,
  cardElement,
}) => {
  const [preset, setPreset] = useState<ExportPreset>('story');
  const [renderFace, setRenderFace] = useState<'front' | 'back'>('front');
  const [includeSeal, setIncludeSeal] = useState(true);
  const [ultraHd, setUltraHd] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const exportCanvasRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  const handleExecuteExport = async () => {
    if (!exportCanvasRef.current) return;
    try {
      setIsExporting(true);

      const pixelRatio = ultraHd ? 3 : 2;
      const dataUrl = await toPng(exportCanvasRef.current, {
        cacheBust: true,
        pixelRatio,
        quality: 0.98,
      });

      const link = document.createElement('a');
      link.download = `RiftCard_${cardData.gameName}_${cardData.tagLine}_${preset}_${renderFace}.png`;
      link.href = dataUrl;
      link.click();

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err) {
      console.error('Falha ao exportar o card:', err);
      alert('Não foi possível gerar o arquivo. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  const mainChampion = cardData.topChampions[0];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(1, 10, 19, 0.88)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '750px',
          maxHeight: '92vh',
          backgroundColor: '#091428',
          border: '1px solid var(--gold-primary)',
          borderRadius: '8px',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid var(--gold-aged)',
            backgroundColor: '#010a13',
          }}
        >
          <div>
            <div
              className="font-cinzel"
              style={{
                fontSize: '1.05rem',
                fontWeight: 800,
                color: 'var(--gold-primary)',
                letterSpacing: '0.08em',
              }}
            >
              CENTRAL DE EXPORTAÇÃO • FORMATOS SOCIAIS
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Selecione o formato ideal para Instagram Story, Feed, Discord ou TCG
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div
          style={{
            padding: '20px',
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            alignItems: 'start',
          }}
        >
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--gold-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '8px',
                }}
              >
                1. Formato de Destino
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setPreset('story')}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '10px 6px',
                    backgroundColor: preset === 'story' ? '#1e2328' : '#010a13',
                    border: preset === 'story' ? '2px solid var(--gold-primary)' : '1px solid var(--gold-dark)',
                    borderRadius: '4px',
                    color: preset === 'story' ? '#ffffff' : 'var(--text-muted)',
                    cursor: 'pointer',
                  }}
                >
                  <Smartphone size={18} color={preset === 'story' ? 'var(--gold-primary)' : undefined} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Story / TikTok</span>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>9:16 Vertical</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreset('feed')}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '10px 6px',
                    backgroundColor: preset === 'feed' ? '#1e2328' : '#010a13',
                    border: preset === 'feed' ? '2px solid var(--gold-primary)' : '1px solid var(--gold-dark)',
                    borderRadius: '4px',
                    color: preset === 'feed' ? '#ffffff' : 'var(--text-muted)',
                    cursor: 'pointer',
                  }}
                >
                  <Square size={18} color={preset === 'feed' ? 'var(--gold-primary)' : undefined} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Feed / Post</span>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>1:1 Quadrado</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreset('pure')}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '10px 6px',
                    backgroundColor: preset === 'pure' ? '#1e2328' : '#010a13',
                    border: preset === 'pure' ? '2px solid var(--gold-primary)' : '1px solid var(--gold-dark)',
                    borderRadius: '4px',
                    color: preset === 'pure' ? '#ffffff' : 'var(--text-muted)',
                    cursor: 'pointer',
                  }}
                >
                  <Layers size={18} color={preset === 'pure' ? 'var(--gold-primary)' : undefined} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Card Puro</span>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>TCG / Sticker</span>
                </button>
              </div>
            </div>

            {/* Toggle */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--gold-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '8px',
                }}
              >
                2. Lado do Card
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setRenderFace('front')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    backgroundColor: renderFace === 'front' ? '#1e2328' : '#010a13',
                    border: renderFace === 'front' ? '1px solid var(--gold-primary)' : '1px solid var(--gold-dark)',
                    color: renderFace === 'front' ? 'var(--gold-light)' : 'var(--text-muted)',
                    borderRadius: '2px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Frente (Arte & Elo)
                </button>
                <button
                  type="button"
                  onClick={() => setRenderFace('back')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    backgroundColor: renderFace === 'back' ? '#1e2328' : '#010a13',
                    border: renderFace === 'back' ? '1px solid var(--gold-primary)' : '1px solid var(--gold-dark)',
                    color: renderFace === 'back' ? 'var(--gold-light)' : 'var(--text-muted)',
                    borderRadius: '2px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Verso (Estatísticas & Tático)
                </button>
              </div>
            </div>

            {/* Options */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--gold-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '8px',
                }}
              >
                3. Detalhes de Renderização
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={includeSeal}
                    onChange={(e) => setIncludeSeal(e.target.checked)}
                    style={{ accentColor: 'var(--gold-primary)' }}
                  />
                  <span>Incluir Selo de Autenticidade & Hash Oficial</span>
                </label>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={ultraHd}
                    onChange={(e) => setUltraHd(e.target.checked)}
                    style={{ accentColor: 'var(--gold-primary)' }}
                  />
                  <span>Renderização Ultra HD (3x Pixel Ratio / 4K Crisp)</span>
                </label>
              </div>
            </div>

            {/* Download */}
            <button
              type="button"
              onClick={handleExecuteExport}
              disabled={isExporting}
              className="btn-piltover"
              style={{ width: '100%', marginTop: '6px' }}
            >
              {isExporting ? (
                <>
                  <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                  <span>PROCESSANDO PIXELS...</span>
                </>
              ) : isSuccess ? (
                <>
                  <Check size={16} color="#0ac8b9" />
                  <span>DOWNLOAD CONCLUÍDO!</span>
                </>
              ) : (
                <>
                  <Download size={16} />
                  <span>BAIXAR ARQUIVO PNG</span>
                </>
              )}
            </button>
          </div>

          
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#010a13',
              border: '1px solid var(--gold-dark)',
              borderRadius: '4px',
              padding: '16px',
              minHeight: '380px',
            }}
          >
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              PRÉ-VISUALIZAÇÃO DE EXPORTAÇÃO
            </div>

            
            <div
              ref={exportCanvasRef}
              style={{
                width: preset === 'story' ? '240px' : preset === 'feed' ? '280px' : '230px',
                height: preset === 'story' ? '426px' : preset === 'feed' ? '280px' : '358px',
                backgroundColor: preset === 'pure' ? 'transparent' : '#010a13',
                backgroundImage:
                  preset === 'story'
                    ? `radial-gradient(circle at 50% 20%, rgba(9, 20, 40, 0.95) 0%, #010a13 85%)`
                    : preset === 'feed'
                    ? `radial-gradient(circle at 50% 50%, rgba(9, 20, 40, 0.9) 0%, #010a13 90%)`
                    : 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: preset === 'pure' ? '12px' : '4px',
                border: preset !== 'pure' ? '1px solid var(--gold-dark)' : 'none',
              }}
            >
              
              <div
                style={{
                  width: '210px',
                  height: '326px',
                  backgroundColor: theme.backgroundColor,
                  border: `2px solid ${theme.secondaryColor}`,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '10px',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.8)',
                  position: 'relative',
                }}
              >
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div
                    style={{
                      fontSize: '0.55rem',
                      fontWeight: 700,
                      padding: '2px 5px',
                      backgroundColor: '#010a13',
                      border: '1px solid var(--gold-dark)',
                      color: '#ffffff',
                    }}
                  >
                    {cardData.region.toUpperCase()}
                  </div>
                  <div style={{ fontSize: '0.55rem', color: theme.primaryColor, fontWeight: 700 }}>
                    {renderFace === 'front' ? 'FRENTE' : 'VERSO'}
                  </div>
                </div>

                
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <div
                    className="font-cinzel"
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                    }}
                  >
                    {cardData.gameName}
                  </div>
                  <div style={{ fontSize: '0.62rem', color: theme.primaryColor, fontWeight: 700 }}>
                    {cardData.soloTier.tier} {cardData.soloTier.rank}
                  </div>
                  {mainChampion && (
                    <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Main {mainChampion.championName}
                    </div>
                  )}
                </div>

               
                <div
                  style={{
                    borderTop: `1px solid ${theme.secondaryColor}`,
                    paddingTop: '6px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.52rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  <span>{cardData.soloTier.winrate}% WR</span>
                  <span>{cardData.serialNumber.split('•')[2] || '#0892'}</span>
                </div>
              </div>

              {includeSeal && preset !== 'pure' && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.55rem',
                    color: 'var(--gold-aged)',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                  }}
                >
                  <ShieldCheck size={10} color="#0ac8b9" />
                  <span>RIFTCARDS VERIFIED</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
