/* Daily Deal Bazar — country selector + currency conversion.
   All countries, auto-detect by IP, prices shown in local currency.
   Default focus right now: Russia (RU). Rates from a free public API; falls back to USD. */
const COUNTRIES = [
["AF","Afghanistan","AFN"],["AL","Albania","ALL"],["DZ","Algeria","DZD"],["AD","Andorra","EUR"],["AO","Angola","AOA"],["AG","Antigua and Barbuda","XCD"],["AR","Argentina","ARS"],["AM","Armenia","AMD"],["AU","Australia","AUD"],["AT","Austria","EUR"],["AZ","Azerbaijan","AZN"],["BS","Bahamas","BSD"],["BH","Bahrain","BHD"],["BD","Bangladesh","BDT"],["BB","Barbados","BBD"],["BY","Belarus","BYN"],["BE","Belgium","EUR"],["BZ","Belize","BZD"],["BJ","Benin","XOF"],["BT","Bhutan","BTN"],["BO","Bolivia","BOB"],["BA","Bosnia and Herzegovina","BAM"],["BW","Botswana","BWP"],["BR","Brazil","BRL"],["BN","Brunei","BND"],["BG","Bulgaria","BGN"],["BF","Burkina Faso","XOF"],["BI","Burundi","BIF"],["KH","Cambodia","KHR"],["CM","Cameroon","XAF"],["CA","Canada","CAD"],["CV","Cape Verde","CVE"],["CF","Central African Republic","XAF"],["TD","Chad","XAF"],["CL","Chile","CLP"],["CN","China","CNY"],["CO","Colombia","COP"],["KM","Comoros","KMF"],["CG","Congo","XAF"],["CD","DR Congo","CDF"],["CR","Costa Rica","CRC"],["HR","Croatia","EUR"],["CU","Cuba","CUP"],["CY","Cyprus","EUR"],["CZ","Czech Republic","CZK"],["DK","Denmark","DKK"],["DJ","Djibouti","DJF"],["DM","Dominica","XCD"],["DO","Dominican Republic","DOP"],["EC","Ecuador","USD"],["EG","Egypt","EGP"],["SV","El Salvador","USD"],["GQ","Equatorial Guinea","XAF"],["ER","Eritrea","ERN"],["EE","Estonia","EUR"],["SZ","Eswatini","SZL"],["ET","Ethiopia","ETB"],["FJ","Fiji","FJD"],["FI","Finland","EUR"],["FR","France","EUR"],["GA","Gabon","XAF"],["GM","Gambia","GMD"],["GE","Georgia","GEL"],["DE","Germany","EUR"],["GH","Ghana","GHS"],["GR","Greece","EUR"],["GD","Grenada","XCD"],["GT","Guatemala","GTQ"],["GN","Guinea","GNF"],["GW","Guinea-Bissau","XOF"],["GY","Guyana","GYD"],["HT","Haiti","HTG"],["HN","Honduras","HNL"],["HU","Hungary","HUF"],["IS","Iceland","ISK"],["IN","India","INR"],["ID","Indonesia","IDR"],["IR","Iran","IRR"],["IQ","Iraq","IQD"],["IE","Ireland","EUR"],["IL","Israel","ILS"],["IT","Italy","EUR"],["CI","Ivory Coast","XOF"],["JM","Jamaica","JMD"],["JP","Japan","JPY"],["JO","Jordan","JOD"],["KZ","Kazakhstan","KZT"],["KE","Kenya","KES"],["KI","Kiribati","AUD"],["KW","Kuwait","KWD"],["KG","Kyrgyzstan","KGS"],["LA","Laos","LAK"],["LV","Latvia","EUR"],["LB","Lebanon","LBP"],["LS","Lesotho","LSL"],["LR","Liberia","LRD"],["LY","Libya","LYD"],["LI","Liechtenstein","CHF"],["LT","Lithuania","EUR"],["LU","Luxembourg","EUR"],["MG","Madagascar","MGA"],["MW","Malawi","MWK"],["MY","Malaysia","MYR"],["MV","Maldives","MVR"],["ML","Mali","XOF"],["MT","Malta","EUR"],["MH","Marshall Islands","USD"],["MR","Mauritania","MRU"],["MU","Mauritius","MUR"],["MX","Mexico","MXN"],["FM","Micronesia","USD"],["MD","Moldova","MDL"],["MC","Monaco","EUR"],["MN","Mongolia","MNT"],["ME","Montenegro","EUR"],["MA","Morocco","MAD"],["MZ","Mozambique","MZN"],["MM","Myanmar","MMK"],["NA","Namibia","NAD"],["NR","Nauru","AUD"],["NP","Nepal","NPR"],["NL","Netherlands","EUR"],["NZ","New Zealand","NZD"],["NI","Nicaragua","NIO"],["NE","Niger","XOF"],["NG","Nigeria","NGN"],["MK","North Macedonia","MKD"],["NO","Norway","NOK"],["OM","Oman","OMR"],["PK","Pakistan","PKR"],["PW","Palau","USD"],["PA","Panama","PAB"],["PG","Papua New Guinea","PGK"],["PY","Paraguay","PYG"],["PE","Peru","PEN"],["PH","Philippines","PHP"],["PL","Poland","PLN"],["PT","Portugal","EUR"],["QA","Qatar","QAR"],["RO","Romania","RON"],["RU","Russia","RUB"],["RW","Rwanda","RWF"],["KN","Saint Kitts and Nevis","XCD"],["LC","Saint Lucia","XCD"],["VC","Saint Vincent and the Grenadines","XCD"],["WS","Samoa","WST"],["SM","San Marino","EUR"],["ST","Sao Tome and Principe","STN"],["SA","Saudi Arabia","SAR"],["SN","Senegal","XOF"],["RS","Serbia","RSD"],["SC","Seychelles","SCR"],["SL","Sierra Leone","SLE"],["SG","Singapore","SGD"],["SK","Slovakia","EUR"],["SI","Slovenia","EUR"],["SB","Solomon Islands","SBD"],["SO","Somalia","SOS"],["ZA","South Africa","ZAR"],["KR","South Korea","KRW"],["SS","South Sudan","SSP"],["ES","Spain","EUR"],["LK","Sri Lanka","LKR"],["SD","Sudan","SDG"],["SR","Suriname","SRD"],["SE","Sweden","SEK"],["CH","Switzerland","CHF"],["SY","Syria","SYP"],["TW","Taiwan","TWD"],["TJ","Tajikistan","TJS"],["TZ","Tanzania","TZS"],["TH","Thailand","THB"],["TL","Timor-Leste","USD"],["TG","Togo","XOF"],["TO","Tonga","TOP"],["TT","Trinidad and Tobago","TTD"],["TN","Tunisia","TND"],["TR","Turkey","TRY"],["TM","Turkmenistan","TMT"],["TV","Tuvalu","AUD"],["UG","Uganda","UGX"],["UA","Ukraine","UAH"],["AE","United Arab Emirates","AED"],["GB","United Kingdom","GBP"],["US","United States","USD"],["UY","Uruguay","UYU"],["UZ","Uzbekistan","UZS"],["VU","Vanuatu","VUV"],["VA","Vatican City","EUR"],["VE","Venezuela","VES"],["VN","Vietnam","VND"],["YE","Yemen","YER"],["ZM","Zambia","ZMW"],["ZW","Zimbabwe","USD"]
];

const DDB = {
  storeKey: "ddb_country",
  defaultCountry: "RU",
  rates: null,
  ratesBase: "USD",
  getCountry() {
    try { return localStorage.getItem(this.storeKey) || null; } catch (e) { return null; }
  },
  setCountry(code) {
    try { localStorage.setItem(this.storeKey, code); } catch (e) {}
    document.dispatchEvent(new CustomEvent("ddb:country", { detail: code }));
  },
  currencyFor(code) {
    const c = COUNTRIES.find(x => x[0] === code);
    return c ? c[2] : "USD";
  },
  async loadRates() {
    if (this.rates) return this.rates;
    try {
      const cached = JSON.parse(localStorage.getItem("ddb_rates") || "null");
      if (cached && Date.now() - cached.at < 12 * 3600 * 1000) { this.rates = cached.rates; return this.rates; }
    } catch (e) {}
    try {
      const r = await fetch("https://api.exchangerate-api.com/v4/latest/USD").then(x => x.json());
      this.rates = r.rates || null;
      try { localStorage.setItem("ddb_rates", JSON.stringify({ at: Date.now(), rates: this.rates })); } catch (e) {}
    } catch (e) { this.rates = null; }
    return this.rates;
  },
  // PKR equivalent of a USD price, from the same live cached rates as
  // formatPrice. Returns null when no live PKR rate is available, so the
  // caller omits the line instead of showing a guessed rate.
  formatPKR(usd) {
    if (!this.rates || !this.rates.PKR) return null;
    return "\u2248 Rs. " + Math.round(usd * this.rates.PKR).toLocaleString("en-US");
  },
  formatPrice(usd, code) {
    const cur = this.currencyFor(code || this.getCountry() || this.defaultCountry);
    let amount = usd, ccy = "USD";
    if (cur !== "USD" && this.rates && this.rates[cur]) { amount = usd * this.rates[cur]; ccy = cur; }
    try { return new Intl.NumberFormat(undefined, { style: "currency", currency: ccy, maximumFractionDigits: ccy === "JPY" || ccy === "KRW" ? 0 : 2 }).format(amount); }
    catch (e) { return "USD " + usd.toFixed(2); }
  },
  async detectCountry() {
    const saved = this.getCountry();
    if (saved) return saved;
    let code = null;
    try {
      const d = await fetch("https://ipapi.co/json/").then(x => x.json());
      if (d && d.country_code) code = d.country_code;
    } catch (e) {}
    if (!code) {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
        if (/Moscow|Europe\/Moscow/.test(tz)) code = "RU";
        else if (/Karachi|Asia\/Karachi/.test(tz)) code = "PK";
        else if (/London|Europe\/London/.test(tz)) code = "GB";
        else if (/New_York|Chicago|Los_Angeles|America\//.test(tz)) code = "US";
      } catch (e) {}
    }
    code = code || this.defaultCountry;
    try { localStorage.setItem(this.storeKey, code); } catch (e) {}
    return code;
  },
  async initSelect() {
    const sel = document.getElementById("countrySelect");
    if (!sel) return;
    const TOP = ["RU", "UA", "KZ", "BY", "UZ", "DE"];
    const topOpts = TOP.map(code => { const c = COUNTRIES.find(x => x[0] === code); return `<option value="${c[0]}">${c[1]} ★</option>`; }).join("");
    const restOpts = COUNTRIES.filter(c => !TOP.includes(c[0])).map(c => `<option value="${c[0]}">${c[1]}</option>`).join("");
    sel.innerHTML = `<optgroup label="Top audience countries">${topOpts}</optgroup><optgroup label="All countries">${restOpts}</optgroup>`;
    const code = await this.detectCountry();
    sel.value = code;
    await this.loadRates();
    document.dispatchEvent(new CustomEvent("ddb:country", { detail: code }));
    sel.addEventListener("change", () => { this.setCountry(sel.value); });
    document.addEventListener("ddb:country", e => { if (sel.value !== e.detail) sel.value = e.detail; });
  }
};
document.addEventListener("DOMContentLoaded", () => { DDB.initSelect(); });
