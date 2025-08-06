import { useEffect } from 'react';

export const usePWA = () => {
  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Add to home screen prompt
    let deferredPrompt: any;
    
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e;
      
      // Show install button after a delay for better UX
      setTimeout(() => {
        if (deferredPrompt && !window.matchMedia('(display-mode: standalone)').matches) {
          showInstallPrompt();
        }
      }, 5000);
    };

    const showInstallPrompt = () => {
      const installBanner = document.createElement('div');
      installBanner.innerHTML = `
        <div style="
          position: fixed; 
          bottom: 20px; 
          left: 20px; 
          right: 20px; 
          background: rgba(0,0,0,0.9); 
          color: white; 
          padding: 16px; 
          border-radius: 12px; 
          z-index: 9999;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          animation: slideUp 0.3s ease-out;
        ">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div>
              <div style="font-weight: 600; margin-bottom: 4px;">Add to Home Screen</div>
              <div style="font-size: 14px; opacity: 0.8;">Install World Of Nile for quick access</div>
            </div>
            <div>
              <button id="install-btn" style="
                background: white; 
                color: black; 
                border: none; 
                padding: 8px 16px; 
                border-radius: 8px; 
                font-weight: 600;
                margin-right: 8px;
              ">Install</button>
              <button id="dismiss-btn" style="
                background: transparent; 
                color: white; 
                border: 1px solid rgba(255,255,255,0.3); 
                padding: 8px 12px; 
                border-radius: 8px;
              ">×</button>
            </div>
          </div>
        </div>
        <style>
          @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        </style>
      `;

      document.body.appendChild(installBanner);

      const installBtn = document.getElementById('install-btn');
      const dismissBtn = document.getElementById('dismiss-btn');

      installBtn?.addEventListener('click', async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          console.log(`User response to the install prompt: ${outcome}`);
          deferredPrompt = null;
        }
        installBanner.remove();
      });

      dismissBtn?.addEventListener('click', () => {
        installBanner.remove();
      });

      // Auto dismiss after 10 seconds
      setTimeout(() => {
        if (document.body.contains(installBanner)) {
          installBanner.remove();
        }
      }, 10000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);
};