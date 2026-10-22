'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { SearchHero } from '@/components/SearchHero';
import { ThemeSelector } from '@/components/ThemeSelector';
import { PlayerCard } from '@/components/PlayerCard';
import { CardActions } from '@/components/CardActions';
import { ExportModal } from '@/components/ExportModal';
import { DisclaimerFooter } from '@/components/DisclaimerFooter';
import { PlayerCardData, RegionPlatform, CardThemeId } from '@/lib/riot/types';
import { CARD_THEMES } from '@/lib/riot/themes';
import { AlertCircle, Shield } from 'lucide-react';

export default function Home() {
  const [cardData, setCardData] = useState<PlayerCardData | null>(null);
  const [currentThemeId, setCurrentThemeId] = useState<CardThemeId>('hextech');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const cardRef = useRef<HTMLDivElement | null>(null);

  const fetchCard = async (gameName: string, tagLine: string, region: RegionPlatform = 'br1') => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      setIsFlipped(false);

      const params = new URLSearchParams({
        gameName,
        tagLine,
        region,
      });

      const res = await fetch(`/api/card?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Falha ao buscar dados do invocador.');
      }

      setCardData(data);

      // ATUALIZA OS PARAMS DA URL
      const url = new URL(window.location.href);
      url.searchParams.set('gameName', gameName);
      url.searchParams.set('tagLine', tagLine);
      url.searchParams.set('region', region);
      window.history.replaceState({}, '', url.toString());
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const gameName = searchParams.get('gameName');
    const tagLine = searchParams.get('tagLine');
    const region = (searchParams.get('region') || 'br1') as RegionPlatform;

    if (gameName && tagLine) {
      fetchCard(gameName, tagLine, region);
    } else {
      
      fetchCard('brendonbsk01', 'BR1', 'br1');
    }
  }, []);

  const activeTheme = CARD_THEMES[currentThemeId] || CARD_THEMES.hextech;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, paddingBottom: '50px' }}>
        <SearchHero onSearch={fetchCard} isLoading={isLoading} />

        {/* Error */}
        {errorMessage && (
          <div
            style={{
              maxWidth: '650px',
              margin: '0 auto 24px',
              padding: '12px 16px',
              borderRadius: '4px',
              backgroundColor: '#1f0a0e',
              border: '1px solid #e04040',
              color: '#ff8a8a',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '0.88rem',
            }}
          >
            <AlertCircle size={18} color="#e04040" style={{ flexShrink: 0 }} />
            <div>
              <strong>Atenção:</strong> {errorMessage}
            </div>
          </div>
        )}

       
        {isLoading && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '30px 0',
            }}
          >
            <div
              className="client-skeleton"
              style={{
                width: '360px',
                height: '560px',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px',
                color: 'var(--gold-primary)',
              }}
            >
              <Shield size={36} color="var(--gold-primary)" />
              <div
                className="font-cinzel"
                style={{ fontSize: '1rem', letterSpacing: '0.1em', fontWeight: 700 }}
              >
                CONSULTANDO A RIOT GAMES...
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Compilando maestrias, telemetria de combate e elo oficial
              </div>
            </div>
          </div>
        )}

        
        {!isLoading && cardData && (
          <div>
            <ThemeSelector
              currentThemeId={currentThemeId}
              onSelectTheme={setCurrentThemeId}
            />

            <PlayerCard
              ref={cardRef}
              cardData={cardData}
              theme={activeTheme}
              isFlipped={isFlipped}
              onToggleFlip={() => setIsFlipped(!isFlipped)}
            />

            <CardActions
              cardData={cardData}
              isFlipped={isFlipped}
              onToggleFlip={() => setIsFlipped(!isFlipped)}
              onOpenExportModal={() => setIsExportModalOpen(true)}
            />

            <ExportModal
              isOpen={isExportModalOpen}
              onClose={() => setIsExportModalOpen(false)}
              cardData={cardData}
              theme={activeTheme}
              cardElement={cardRef.current}
            />
          </div>
        )}
      </main>

      <DisclaimerFooter />
    </div>
  );
}
