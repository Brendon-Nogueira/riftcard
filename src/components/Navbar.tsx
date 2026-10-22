import { ShieldCheck, MessageSquare, BookOpen, Compass } from 'lucide-react';
import { GithubIcon } from './GithubIcon';

export const Navbar: React.FC = () => {
  return (
    <header
      style={{
        width: '100%',
        borderBottom: '1px solid var(--gold-aged)',
        backgroundColor: '#010a13',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.7)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo RiftCards */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '4px',
              backgroundColor: '#091428',
              border: '1px solid var(--gold-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 0 8px rgba(200, 170, 110, 0.25)',
            }}
          >
            <Compass size={20} color="var(--gold-primary)" />
          </div>
          <div>
            <div
              className="font-cinzel"
              style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                color: 'var(--gold-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              RIFT<span style={{ color: 'var(--gold-light)' }}>CARDS</span>
            </div>
            <div
              style={{
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              League of Legends Collectible Cards
            </div>
          </div>
        </div>

       
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Riot API Verified */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.72rem',
              color: 'var(--gold-primary)',
              backgroundColor: '#091428',
              padding: '6px 12px',
              borderRadius: '4px',
              border: '1px solid var(--gold-aged)',
            }}
          >
            <ShieldCheck size={14} color="#0ac8b9" />
            <span style={{ fontWeight: 600 }}>Riot Games API Verified</span>
          </div>

          {/* GitHub Profile */}
          <a
            href="https://github.com/Brendon-Nogueira"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-mechanical"
            style={{ fontSize: '0.75rem', padding: '6px 12px' }}
          >
            <GithubIcon size={14} color="var(--gold-primary)" />
            <span>GitHub</span>
          </a>

          
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-mechanical"
            style={{ fontSize: '0.75rem', padding: '6px 12px' }}
          >
            <MessageSquare size={14} color="#5865F2" />
            <span>Discord</span>
          </a>
        </div>
      </div>
    </header>
  );
};
