'use client';

import React, { useState } from 'react';
import { Download, Rotate3d, Share2, Check } from 'lucide-react';
import { PlayerCardData } from '@/lib/riot/types';

interface CardActionsProps {
  cardData: PlayerCardData;
  isFlipped: boolean;
  onToggleFlip: () => void;
  onOpenExportModal: () => void;
}

export const CardActions: React.FC<CardActionsProps> = ({
  cardData,
  isFlipped,
  onToggleFlip,
  onOpenExportModal,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyShareLink = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set('gameName', cardData.gameName);
    url.searchParams.set('tagLine', cardData.tagLine);
    url.searchParams.set('region', cardData.region);

    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      prompt('Copie o link abaixo:', url.toString());
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        flexWrap: 'wrap',
        margin: '18px auto 36px',
      }}
    >
      {/* Export Modal */}
      <button
        onClick={onOpenExportModal}
        className="btn-piltover"
        style={{ fontSize: '0.85rem', padding: '10px 20px' }}
      >
        <Download size={16} />
        <span>EXPORTAR FORMATOS (PNG)</span>
      </button>

      {/* 3D Flip */}
      <button
        onClick={onToggleFlip}
        className="btn-mechanical"
        style={{ fontSize: '0.85rem', padding: '10px 18px' }}
      >
        <Rotate3d size={16} color="var(--gold-primary)" />
        <span>{isFlipped ? 'Ver Frente' : 'Ver Estatísticas (Verso)'}</span>
      </button>

      {/* Copy Link */}
      <button
        onClick={handleCopyShareLink}
        className="btn-mechanical"
        style={{ fontSize: '0.85rem', padding: '10px 18px' }}
      >
        {copied ? (
          <>
            <Check size={16} color="#0ac8b9" />
            <span style={{ color: '#0ac8b9' }}>Link Copiado!</span>
          </>
        ) : (
          <>
            <Share2 size={16} />
            <span>Compartilhar</span>
          </>
        )}
      </button>
    </div>
  );
};
