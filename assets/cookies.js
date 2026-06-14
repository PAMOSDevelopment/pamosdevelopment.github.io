/* PAMOS – zgody na cookies + Google Consent Mode v2 + ładowanie GTM.
   Kontener GTM ustawiony poniżej. GTM ładuje się z domyślnymi zgodami „denied",
   które są aktualizowane po wyborze użytkownika w bannerze cookies. */
(function () {
  var GTM_ID = 'GTM-W63TSNLR'; // identyfikator kontenera Google Tag Manager
  var KEY = 'pamos_consent';

  // Język wg atrybutu <html lang> – teksty bannera PL/EN
  var EN = (document.documentElement.lang || 'pl').toLowerCase().indexOf('en') === 0;
  var T = EN ? {
    barLabel: 'Cookie consent',
    h4: 'We value your privacy',
    p: 'We use cookies to make the site work and – with your consent – for traffic analytics and marketing (Google Analytics, Google Ads, Meta Pixel). Details in our <a href="/en/privacy-policy/">Privacy Policy</a>.',
    settings: 'Settings', nec: 'Necessary only', all: 'Accept all',
    panelLabel: 'Cookie settings', panelH: 'Cookie settings',
    necT: 'Necessary', necD: 'Keep the site working and remember your choice. Always on.',
    anaT: 'Analytics', anaD: 'Google Analytics 4 – traffic statistics that help us improve the site.',
    mktT: 'Marketing', mktD: 'Google Ads and Meta Pixel – advertising, remarketing and conversion measurement.',
    save: 'Save choices', necAria: 'Necessary – always on', anaAria: 'Analytics', mktAria: 'Marketing'
  } : {
    barLabel: 'Zgoda na pliki cookies',
    h4: 'Dbamy o Twoją prywatność',
    p: 'Używamy plików cookies, aby zapewnić działanie strony oraz – za Twoją zgodą – do analizy ruchu i marketingu (Google Analytics, Google Ads, Meta Pixel). Szczegóły w <a href="/polityka-prywatnosci/">Polityce prywatności</a>.',
    settings: 'Ustawienia', nec: 'Tylko niezbędne', all: 'Akceptuję wszystkie',
    panelLabel: 'Ustawienia plików cookies', panelH: 'Ustawienia plików cookies',
    necT: 'Niezbędne', necD: 'Zapewniają działanie strony i zapamiętują Twój wybór. Zawsze aktywne.',
    anaT: 'Analityczne', anaD: 'Google Analytics 4 – statystyki ruchu, pomagają ulepszać stronę.',
    mktT: 'Marketingowe', mktD: 'Google Ads i Meta Pixel – reklama, remarketing i pomiar konwersji.',
    save: 'Zapisz wybór', necAria: 'Niezbędne – zawsze aktywne', anaAria: 'Analityczne', mktAria: 'Marketingowe'
  };

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  // Domyślnie wszystko zabronione (przed jakąkolwiek zgodą)
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });

  function read() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; } }

  function apply(c) {
    gtag('consent', 'update', {
      ad_storage: c.marketing ? 'granted' : 'denied',
      ad_user_data: c.marketing ? 'granted' : 'denied',
      ad_personalization: c.marketing ? 'granted' : 'denied',
      analytics_storage: c.analytics ? 'granted' : 'denied'
    });
    window.dataLayer.push({ event: 'cookie_consent_update', analytics: !!c.analytics, marketing: !!c.marketing });
  }

  function save(c) { c.ts = Date.now(); try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} apply(c); }

  // Zastosuj zapisaną zgodę (powracający użytkownik)
  var stored = read();
  if (stored) apply(stored);

  // Załaduj GTM tylko gdy ustawiono prawdziwe ID
  if (GTM_ID.indexOf('XXXX') < 0) {
    (function (w, d, s, l, i) {
      w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', GTM_ID);
  }

  var CSS = "#ckbar{position:fixed;left:16px;right:16px;bottom:16px;z-index:200;background:#fff;border:1px solid var(--line,#ececec);border-radius:14px;box-shadow:0 16px 44px rgba(47,59,57,.20);padding:18px 20px;display:none;gap:16px;align-items:center;flex-wrap:wrap;font-family:var(--sans,'Montserrat',sans-serif)}"
    + "#ckbar.show{display:flex}"
    + "#ckbar h4{font-family:var(--serif,'Gilda Display',serif);font-weight:400;font-size:19px;color:var(--graphite,#2f3b39);margin:0 0 4px}"
    + "#ckbar p{font-size:12.5px;color:var(--ink,#3a4744);line-height:1.5;margin:0;max-width:72ch}"
    + "#ckbar a{color:var(--sage-d,#5b9d8e);text-decoration:underline;font-weight:600}"
    + "#ckbar .ck-txt{flex:1;min-width:240px}"
    + "#ckbar .ck-btns{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-left:auto}"
    + ".ck-btn{font-family:var(--sans,'Montserrat',sans-serif);font-weight:600;font-size:13px;padding:11px 18px;border-radius:9px;border:1px solid var(--sage,#68af9f);cursor:pointer;white-space:nowrap;background:#fff;color:var(--graphite,#2f3b39);transition:.15s}"
    + ".ck-btn.solid{background:var(--sage,#68af9f);color:#fff}"
    + ".ck-btn.solid:hover{background:var(--sage-d,#5b9d8e)}"
    + ".ck-link{background:none;border:0;color:var(--graphite,#2f3b39);text-decoration:underline;font-weight:600;font-size:12.5px;cursor:pointer;padding:8px 4px}"
    + "#ckpanel{position:fixed;inset:0;z-index:210;background:rgba(20,28,26,.55);display:none;align-items:center;justify-content:center;padding:20px}"
    + "#ckpanel.show{display:flex}"
    + ".ck-card{background:#fff;border-radius:16px;max-width:520px;width:100%;padding:24px;max-height:90vh;overflow:auto;font-family:var(--sans,'Montserrat',sans-serif)}"
    + ".ck-card h4{font-family:var(--serif,'Gilda Display',serif);font-weight:400;font-size:22px;color:var(--graphite,#2f3b39);margin:0 0 14px}"
    + ".ck-row{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;padding:14px 0;border-top:1px solid #f0f0f0}"
    + ".ck-row:first-of-type{border-top:0}"
    + ".ck-row .t{font-weight:600;font-size:13.5px;color:var(--graphite,#2f3b39)}"
    + ".ck-row .d{font-size:12px;color:var(--muted,#90a39d);margin-top:3px}"
    + ".ck-sw{width:42px;height:24px;border-radius:14px;background:#cfd8d4;position:relative;flex-shrink:0;margin-top:2px;border:0;cursor:pointer;padding:0}"
    + ".ck-sw.on{background:var(--sage,#68af9f)}"
    + ".ck-sw.lock{background:#bcd3cc;cursor:not-allowed}"
    + ".ck-sw i{position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#fff;transition:.15s}"
    + ".ck-sw.on i{left:21px}"
    + ".ck-pbtns{display:flex;gap:10px;justify-content:flex-end;margin-top:18px;flex-wrap:wrap}"
    + "@media(max-width:640px){#ckbar .ck-btns{margin-left:0;width:100%}#ckbar .ck-btns .ck-btn{flex:1;text-align:center}}";

  function elFrom(html) { var d = document.createElement('div'); d.innerHTML = html; return d.firstElementChild; }

  function init() {
    var style = document.createElement('style'); style.textContent = CSS; document.head.appendChild(style);

    var bar = elFrom('<div id="ckbar" role="dialog" aria-label="' + T.barLabel + '">'
      + '<div class="ck-txt"><h4>' + T.h4 + '</h4>'
      + '<p>' + T.p + '</p></div>'
      + '<div class="ck-btns"><button class="ck-link" id="ckSettings" type="button">' + T.settings + '</button>'
      + '<button class="ck-btn" id="ckNec" type="button">' + T.nec + '</button>'
      + '<button class="ck-btn solid" id="ckAll" type="button">' + T.all + '</button></div></div>');

    var panel = elFrom('<div id="ckpanel"><div class="ck-card" role="dialog" aria-label="' + T.panelLabel + '">'
      + '<h4>' + T.panelH + '</h4>'
      + '<div class="ck-row"><div><div class="t">' + T.necT + '</div><div class="d">' + T.necD + '</div></div><button class="ck-sw on lock" disabled aria-label="' + T.necAria + '"><i></i></button></div>'
      + '<div class="ck-row"><div><div class="t">' + T.anaT + '</div><div class="d">' + T.anaD + '</div></div><button class="ck-sw" id="ckAnalytics" type="button" aria-pressed="false" aria-label="' + T.anaAria + '"><i></i></button></div>'
      + '<div class="ck-row"><div><div class="t">' + T.mktT + '</div><div class="d">' + T.mktD + '</div></div><button class="ck-sw" id="ckMarketing" type="button" aria-pressed="false" aria-label="' + T.mktAria + '"><i></i></button></div>'
      + '<div class="ck-pbtns"><button class="ck-btn" id="ckSave" type="button">' + T.save + '</button>'
      + '<button class="ck-btn solid" id="ckAll2" type="button">' + T.all + '</button></div></div></div>');

    document.body.appendChild(bar);
    document.body.appendChild(panel);

    function showBar() { bar.classList.add('show'); }
    function hideBar() { bar.classList.remove('show'); }
    function openPanel() {
      var c = read() || { analytics: false, marketing: false };
      setSw(document.getElementById('ckAnalytics'), c.analytics);
      setSw(document.getElementById('ckMarketing'), c.marketing);
      panel.classList.add('show');
    }
    function closePanel() { panel.classList.remove('show'); }
    function setSw(btn, on) { btn.classList.toggle('on', !!on); btn.setAttribute('aria-pressed', on ? 'true' : 'false'); }
    function toggleSw(btn) { setSw(btn, !btn.classList.contains('on')); }

    document.getElementById('ckAll').onclick = function () { save({ analytics: true, marketing: true }); hideBar(); closePanel(); };
    document.getElementById('ckAll2').onclick = function () { save({ analytics: true, marketing: true }); hideBar(); closePanel(); };
    document.getElementById('ckNec').onclick = function () { save({ analytics: false, marketing: false }); hideBar(); closePanel(); };
    document.getElementById('ckSettings').onclick = openPanel;
    document.getElementById('ckAnalytics').onclick = function () { toggleSw(this); };
    document.getElementById('ckMarketing').onclick = function () { toggleSw(this); };
    document.getElementById('ckSave').onclick = function () {
      save({ analytics: document.getElementById('ckAnalytics').classList.contains('on'), marketing: document.getElementById('ckMarketing').classList.contains('on') });
      hideBar(); closePanel();
    };
    panel.addEventListener('click', function (e) { if (e.target === panel) closePanel(); });

    window.openCookieSettings = function () { openPanel(); };

    if (!read()) showBar();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
