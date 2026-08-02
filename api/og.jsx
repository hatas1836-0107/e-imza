import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0b0e1a 0%, #1a1f35 50%, #0b0e1a 100%)',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Mesh Background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 30%, rgba(79, 70, 229, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(124, 58, 237, 0.15) 0%, transparent 50%)',
            filter: 'blur(60px)',
          }}
        />
        
        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            zIndex: 10,
            padding: '60px',
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 16 c3-6 5 -2 7 -7 c1.5 3 2 5 3.5 2" />
              </svg>
            </div>
            <div
              style={{
                fontSize: '52px',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.02em',
              }}
            >
              Zirve E-İmza
            </div>
          </div>
          
          {/* Main Title */}
          <div
            style={{
              fontSize: '68px',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.2,
              marginBottom: '24px',
              letterSpacing: '-0.03em',
              textAlign: 'center',
            }}
          >
            E-İmza Başvurusu
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Aynı Gün Teslimat
            </span>
          </div>
          
          {/* Description */}
          <div
            style={{
              fontSize: '32px',
              color: '#b6bad0',
              lineHeight: 1.5,
              marginBottom: '40px',
              maxWidth: '800px',
              textAlign: 'center',
            }}
          >
            İstanbul'un 39 ilçesinde kurye ile e-imza teslimatı.
            <br />
            Nitelikli elektronik imza, bilgisayara anında kurulum.
          </div>
          
          {/* Features */}
          <div
            style={{
              display: 'flex',
              gap: '30px',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 28px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
              }}
            >
              <span
                style={{
                  fontSize: '22px',
                  color: '#ffffff',
                  fontWeight: 600,
                }}
              >
                ✓ 5070 Sayılı Kanuna Uygun
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 28px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
              }}
            >
              <span
                style={{
                  fontSize: '22px',
                  color: '#ffffff',
                  fontWeight: 600,
                }}
              >
                ⚡ Aynı Gün Kurye
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 28px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
              }}
            >
              <span
                style={{
                  fontSize: '22px',
                  color: '#ffffff',
                  fontWeight: 600,
                }}
              >
                📍 İstanbul 39 İlçe
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
