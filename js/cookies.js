/**
 * Línea Urbana — Cookie Consent
 * Autocontenido: inyecta CSS + HTML, guarda en localStorage.
 * Compatiblee con Google Consent Mode v2.
 */
(function () {
    'use strict';

    var CONSENT_KEY = 'lu_cookie_consent';

    /* ── Leer preferencia guardada ── */
    function getConsent() {
        return localStorage.getItem(CONSENT_KEY);
    }

    /* ── Guardar preferencia ── */
    function setConsent(value) {
        localStorage.setItem(CONSENT_KEY, value);
    }

    /* ── Inicializar Google Consent Mode (placeholder) ──
       Sustituir el ID de medición cuando lo tengas. */
    function initGoogleConsent(granted) {
        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        gtag('consent', 'default', {
            ad_storage:              granted ? 'granted' : 'denied',
            analytics_storage:       granted ? 'granted' : 'denied',
            functionality_storage:   'granted',
            security_storage:        'granted',
            wait_for_update:         500
        });
        // Una vez tengamos el GA ID:
        // gtag('js', new Date());
        // gtag('config', 'G-XXXXXXXXXX');
    }

    /* ── Ocultar el banner con animación ── */
    function hideBanner() {
        var banner = document.getElementById('lu-cookie-banner');
        if (!banner) return;
        banner.style.transform = 'translateY(120%)';
        banner.style.opacity   = '0';
        setTimeout(function () { banner && banner.remove(); }, 420);
    }

    /* ── Inyectar CSS ── */
    function injectCSS() {
        var style = document.createElement('style');
        style.textContent = [
            '#lu-cookie-banner {',
            '  position: fixed;',
            '  bottom: 28px;',
            '  left: 50%;',
            '  transform: translateX(-50%) translateY(0);',
            '  width: calc(100% - 48px);',
            '  max-width: 900px;',
            '  background: #FFFFFF;',
            '  border: 1px solid rgba(0,45,42,0.12);',
            '  border-bottom: 3px solid #C4871C;',
            '  border-radius: 12px;',
            '  box-shadow: 0 8px 40px rgba(0,0,0,0.13);',
            '  padding: 24px 28px;',
            '  display: flex;',
            '  align-items: center;',
            '  gap: 24px;',
            '  flex-wrap: wrap;',
            '  z-index: 9999;',
            '  transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.4s ease;',
            '  font-family: "Montserrat", sans-serif;',
            '}',
            '#lu-cookie-banner .lu-cb-text {',
            '  flex: 1;',
            '  min-width: 220px;',
            '}',
            '#lu-cookie-banner .lu-cb-title {',
            '  font-size: 0.78rem;',
            '  font-weight: 700;',
            '  letter-spacing: 1.5px;',
            '  color: #002D2A;',
            '  text-transform: uppercase;',
            '  margin-bottom: 6px;',
            '}',
            '#lu-cookie-banner .lu-cb-body {',
            '  font-size: 0.78rem;',
            '  color: #171715;',
            '  opacity: 0.7;',
            '  line-height: 1.6;',
            '}',
            '#lu-cookie-banner .lu-cb-body a {',
            '  color: #C4871C;',
            '  text-decoration: underline;',
            '  text-underline-offset: 3px;',
            '}',
            '#lu-cookie-banner .lu-cb-actions {',
            '  display: flex;',
            '  gap: 10px;',
            '  flex-shrink: 0;',
            '  flex-wrap: wrap;',
            '}',
            '#lu-cookie-banner .lu-cb-accept {',
            '  background: #002D2A;',
            '  color: #F5F1EA;',
            '  border: none;',
            '  border-radius: 6px;',
            '  padding: 10px 22px;',
            '  font-family: "Montserrat", sans-serif;',
            '  font-size: 0.75rem;',
            '  font-weight: 600;',
            '  letter-spacing: 1px;',
            '  cursor: pointer;',
            '  transition: background 0.3s ease, transform 0.2s ease;',
            '  white-space: nowrap;',
            '}',
            '#lu-cookie-banner .lu-cb-accept:hover {',
            '  background: #C4871C;',
            '  transform: translateY(-1px);',
            '}',
            '#lu-cookie-banner .lu-cb-reject {',
            '  background: transparent;',
            '  color: #171715;',
            '  border: 1px solid rgba(0,0,0,0.18);',
            '  border-radius: 6px;',
            '  padding: 10px 18px;',
            '  font-family: "Montserrat", sans-serif;',
            '  font-size: 0.75rem;',
            '  font-weight: 600;',
            '  letter-spacing: 1px;',
            '  cursor: pointer;',
            '  transition: border-color 0.3s ease, color 0.3s ease;',
            '  white-space: nowrap;',
            '}',
            '#lu-cookie-banner .lu-cb-reject:hover {',
            '  border-color: #C4871C;',
            '  color: #C4871C;',
            '}',
            '@media (max-width: 600px) {',
            '  #lu-cookie-banner { bottom: 16px; padding: 20px; }',
            '  #lu-cookie-banner .lu-cb-actions { width: 100%; justify-content: flex-end; }',
            '}'
        ].join('\n');
        document.head.appendChild(style);
    }

    /* ── Inyectar HTML del banner ── */
    function renderBanner() {
        injectCSS();

        var banner = document.createElement('div');
        banner.id = 'lu-cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Aviso de cookies');
        banner.innerHTML =
            '<div class="lu-cb-text">' +
                '<div class="lu-cb-title">Uso de cookies</div>' +
                '<p class="lu-cb-body">' +
                    'Este sitio utiliza cookies técnicas propias y, con tu consentimiento, de análisis. ' +
                    'Puedes aceptarlas todas o continuar solo con las esenciales. ' +
                    '<a href="/cookies">Política de cookies</a>.' +
                '</p>' +
            '</div>' +
            '<div class="lu-cb-actions">' +
                '<button class="lu-cb-reject" id="lu-cb-reject">Solo esenciales</button>' +
                '<button class="lu-cb-accept" id="lu-cb-accept">Aceptar todas</button>' +
            '</div>';

        document.body.appendChild(banner);

        document.getElementById('lu-cb-accept').addEventListener('click', function () {
            setConsent('all');
            initGoogleConsent(true);
            hideBanner();
        });

        document.getElementById('lu-cb-reject').addEventListener('click', function () {
            setConsent('essential');
            initGoogleConsent(false);
            hideBanner();
        });
    }

    /* ── Arranque ── */
    var saved = getConsent();

    if (saved === 'all') {
        initGoogleConsent(true);
    } else if (saved === 'essential') {
        initGoogleConsent(false);
    } else {
        /* No hay preferencia guardada: mostrar banner */
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', renderBanner);
        } else {
            renderBanner();
        }
    }

})();
