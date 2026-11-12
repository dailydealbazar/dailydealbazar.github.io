/* Daily Deal Bazar — live tracker (Firebase Realtime Database).
   Counts pageviews, sessions, countries, top pages, live presence and Buy Now clicks.
   Never breaks the page: every step is guarded. No personal data is collected. */
(function () {
  try {
    if (location.hostname !== "dailydealbazar.github.io" && location.hostname !== "dailydealbazar.work.gd") return;
    /* Bot filter — AI crawlers, search bots aur headless agents ko visitor count nahi karna.
       Sirf asli insaan gine jayenge; robots ki alag pehchan ddb/bots mein likhi jati hai. */
    function isBot(ua) {
      try {
        if (navigator.webdriver) return true;
      } catch (e) {}
      var s = (ua || (navigator.userAgent || "")).toLowerCase();
      return /bot|crawl|spider|slurp|scraper|headless|phantom|googlebot|bingbot|duckduckbot|baiduspider|yandexbot|sogou|exabot|facebot|ia_archiver|applebot|facebookexternalhit|twitterbot|linkedinbot|msnbot|ahrefsbot|semrushbot|dotbot|mj12bot|rogerbot|amazonbot|gptbot|chatgpt-user|oai-searchbot|claudebot|anthropic-ai|cohere-ai|perplexitybot|bytespider|ccbot|meta-externalagent|adsbot|mediapartners-google|pingdom|uptimerobot|monitor|validator|preview|embedly|whatsapp|telegrambot|discordbot|slackbot/.test(s);
    }
    var BOT = isBot();
    if (!window.firebase || !firebase.database) return;
    var CFG = {
      apiKey: "AIzaSyBHPNawUwdK-0DcagTm1IpbDKZwQvZTNQc",
      authDomain: "daily-deal-bazar.firebaseapp.com",
      databaseURL: "https://daily-deal-bazar-default-rtdb.firebaseio.com",
      projectId: "daily-deal-bazar",
      storageBucket: "daily-deal-bazar.firebasestorage.app",
      messagingSenderId: "803305199726",
      appId: "1:803305199726:web:7cb905feaaf78bec932e7f"
    };
    if (!firebase.apps.length) firebase.initializeApp(CFG);
    var db = firebase.database();
    var INC = firebase.database.ServerValue.increment(1);
    var now = new Date();
    var dstr = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0") + "-" + String(now.getDate()).padStart(2, "0");
    var path = location.pathname.replace(/^\//, "") || "index.html";
    var slug = path.replace(/\.html$/, "").replace(/[^A-Za-z0-9_-]/g, "_") || "home";
    if (slug === "index") slug = "home";
    var sid = null;
    try {
      sid = sessionStorage.getItem("ddb_sid");
      if (!sid) { sid = "s" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8); sessionStorage.setItem("ddb_sid", sid); }
    } catch (e) { sid = "s" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
    var isNewSession = false;
    try {
      if (!sessionStorage.getItem("ddb_sess")) { sessionStorage.setItem("ddb_sess", "1"); isNewSession = true; }
    } catch (e) { isNewSession = true; }

    /* Robot — sirf alag se note karo (ddb/bots), visitor count mein bilkul nahi. */
    if (BOT) {
      try {
        fetch("https://ipapi.co/json/").then(function (r) { return r.json(); }).then(function (j) {
          var ip = (j && j.ip) ? String(j.ip) : "";
          if (!ip) return;
          var h = iphash(ip);
          var up = {};
          up["ddb/bots/all/" + h] = true;
          up["ddb/bots/days/" + dstr + "/" + h] = true;
          db.ref().update(up).catch(function () {});
        }).catch(function () {});
      } catch (e) {}
      return;
    }

    function sourceName() {
      try {
        var q = new URLSearchParams(location.search);
        var u = q.get("utm_source") || "";
        if (u) {
          u = u.replace(/[^A-Za-z0-9 _-]/g, "").trim();
          if (u) return u.charAt(0).toUpperCase() + u.slice(1);
        }
        var r = document.referrer || "";
        if (!r) return "Direct";
        var h = "";
        try { h = new URL(r).hostname.toLowerCase(); } catch (e) { return "Other"; }
        if (h.indexOf("youtu") !== -1) return "YouTube";
        if (h.indexOf("google.") !== -1) return "Google";
        if (h.indexOf("facebook.") !== -1 || h.indexOf("fb.com") !== -1) return "Facebook";
        if (h.indexOf("instagram.") !== -1) return "Instagram";
        if (h.indexOf("tiktok.") !== -1) return "TikTok";
        if (h === "x.com" || h.indexOf("twitter.") !== -1) return "X";
        if (h.indexOf("bing.") !== -1) return "Bing";
        if (h.indexOf("duckduckgo.") !== -1) return "DuckDuckGo";
        if (h.indexOf("dailydealbazar.") !== -1) return "Internal";
        return h.replace(/^www\./, "").replace(/[^A-Za-z0-9_-]/g, "_") || "Other";
      } catch (e) { return "Other"; }
    }

    function bump(country) {
      var up = {};
      up["ddb/stats/total/pageviews"] = INC;
      up["ddb/stats/days/" + dstr + "/pageviews"] = INC;
      up["ddb/stats/pages/" + slug + "/pageviews"] = INC;
      if (country) up["ddb/stats/countries/" + country + "/pageviews"] = INC;
      if (isNewSession) {
        up["ddb/stats/total/sessions"] = INC;
        up["ddb/stats/days/" + dstr + "/sessions"] = INC;
        up["ddb/stats/sources/" + sourceName() + "/sessions"] = INC;
      }
      db.ref().update(up).catch(function () {});
    }
    bump(null);

    /* Unique visitors by IP — one count per IP ever + one per IP per day.
       Raw IPs are never stored; only a hash of the IP is written. */
    function iphash(s) {
      var h1 = 0xdeadbeef, h2 = 0x41c6ce57, i, ch;
      for (i = 0; i < s.length; i++) {
        ch = s.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
      }
      h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
      h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
      return (h2 >>> 0).toString(16) + (h1 >>> 0).toString(16);
    }

    /* Country — ipapi, same source the site already uses for its country selector. */
    try {
      var ctrl = new AbortController();
      var to = setTimeout(function () { try { ctrl.abort(); } catch (e) {} }, 2500);
      fetch("https://ipapi.co/json/", { signal: ctrl.signal }).then(function (r) { return r.json(); }).then(function (j) {
        clearTimeout(to);
        var cc = (j && j.country_code) ? String(j.country_code).toUpperCase().replace(/[^A-Z]/g, "") : "";
        if (cc) {
          var up2 = {};
          up2["ddb/stats/countries/" + cc + "/pageviews"] = INC;
          db.ref().update(up2).catch(function () {});
        }
        var ip = (j && j.ip) ? String(j.ip) : "";
        if (ip) {
          var h = iphash(ip);
          var up3 = {};
          up3["ddb/uniq/all/" + h] = true;
          up3["ddb/uniq/days/" + dstr + "/" + h] = true;
          db.ref().update(up3).catch(function () {});
        }
      }).catch(function () { clearTimeout(to); });
    } catch (e) {}

    /* Live presence — removed automatically when the tab closes. */
    try {
      var pres = db.ref("ddb/presence/" + sid);
      pres.onDisconnect().remove().catch(function () {});
      pres.set({ ts: firebase.database.ServerValue.TIMESTAMP, page: slug }).catch(function () {});
      setInterval(function () {
        pres.update({ ts: firebase.database.ServerValue.TIMESTAMP, page: location.pathname.replace(/^\//, "") || "index.html" }).catch(function () {});
      }, 20000);
      window.addEventListener("beforeunload", function () { try { pres.remove(); } catch (e) {} });
      window.addEventListener("pagehide", function () { try { pres.remove(); } catch (e) {} });
    } catch (e) {}

    /* Buy Now clicks (affiliate links). */
    document.addEventListener("click", function (ev) {
      try {
        var a = ev.target && ev.target.closest ? ev.target.closest("a") : null;
        if (!a) return;
        var href = a.getAttribute("href") || "";
        var isBuy = (a.className || "").indexOf("p-buy") !== -1 || href.indexOf("aliexpress") !== -1 || href.indexOf("s.click") !== -1;
        if (!isBuy) return;
        var up3 = {};
        up3["ddb/stats/total/buyClicks"] = INC;
        up3["ddb/stats/days/" + dstr + "/buyClicks"] = INC;
        db.ref().update(up3).catch(function () {});
      } catch (e) {}
    });
  } catch (e) {}
})();
