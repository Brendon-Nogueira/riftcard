import React from 'react';
import { GithubIcon } from './GithubIcon';

export const DisclaimerFooter: React.FC = () => {
  return (
    <footer
      style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--gold-aged)',
        backgroundColor: '#010a13',
        padding: '36px 20px',
        color: 'var(--text-muted)',
        fontSize: '0.8rem',
        lineHeight: 1.6,
      }}
    >
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div
          className="font-cinzel title-piltover"
          style={{
            fontSize: '0.92rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
          }}
        >
          RIFTCARDS • PROJETO FAN-MADE NÃO COMERCIAL
        </div>

        <p style={{ maxWidth: '820px', margin: '0 auto', fontSize: '0.78rem' }}>
          <strong>RiftCards</strong> é um projeto fan-made não comercial. RiftCards não é
          endossado pela Riot Games e não reflete as visões ou opiniões da Riot Games ou de qualquer
          pessoa oficialmente envolvida na produção ou gerenciamento das propriedades da Riot Games.
          Riot Games e League of Legends são marcas comerciais ou marcas registradas da Riot Games, Inc.
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            marginTop: '6px',
          }}
        >
          <span>Desenvolvido com Next.js & Riot Games API por</span>
          <a
            href="https://github.com/Brendon-Nogueira"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--gold-light)',
              fontWeight: 700,
              textDecoration: 'none',
              padding: '2px 8px',
              borderRadius: '2px',
              backgroundColor: '#091428',
              border: '1px solid var(--gold-aged)',
            }}
          >
            <GithubIcon size={13} color="var(--gold-primary)" />
            <span>Brendon Nogueira</span>
          </a>
          <span>•</span>
          <span>Diretrizes Legal Jibber Jabber</span>
        </div>
      </div>
    </footer>
  );
};
