// Fetch and populate country codes; cache-enabled
async function loadCountries() {
  const res = await fetch('CountryCodes.json');
  const countries = await res.json();
  const dd = document.getElementById('dropdown');
  countries.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.code;
    opt.text = `${c.country} (${c.code})`;
    dd.append(opt);
  });
}

// Paste button
document.getElementById('pasteBtn').addEventListener('click', async () => {
  const text = await navigator.clipboard.readText();
  document.getElementById('phoneno').value = text;
});

// 4. Service worker registration (so the PWA can cache assets)
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('service-worker.js')
        .then(() => console.log('Service Worker registered'))
        .catch(err => console.error('SW registration failed:', err));
    });
  }
}


// 5. (Placeholder) Existing link‑opening logic for WhatsApp/Telegram/Signal
//    Keep your original handlers here, e.g.:
function setupLinkButtons() {
  const textbox   = document.getElementById("phoneno");
  const dropdown  = document.getElementById("dropdown");
  const whtspp    = document.getElementById("whatsapp");
  const telgrm    = document.getElementById("telegram");
  const signal    = document.getElementById("signal");
  const errord    = document.getElementById("error");
  const errorh    = document.getElementById("error-h4");
  const errorp    = document.getElementById("error-body");
  const pasteBtn  = document.getElementById("pasteBtn");
  const regexp    = /android|iphone|kindle|ipad/i;

  // Try to match a phone‑code prefix back to the dropdown
  function extFinder(extNum) {
    const digits = extNum.match(/\d/g);
    if (!digits) return;
    const num = digits.join("");
    let selectIndex = 0;
    for (let i = num.length; i >= 1; i--) {
      const code = "+" + num.substring(0, i);
      const idx = Array.from(dropdown.options).findIndex(o => o.value === code);
      if (idx > -1) { selectIndex = idx; break; }
    }
    dropdown.selectedIndex = selectIndex;
  }

  // When user picks a country, update the textbox
  function dropdownSelect() {
    const value = dropdown.value;
    textbox.value = value ? value.slice(1) : "";
  }

  // Build the URL for w/t/s and open it
  function handleLink(svc) {
    errord.classList.add("hide");
    const raw = (textbox.value.match(/\d/g) || []).join("");
    const plusNum = "+" + raw;

    // Empty or too‑short checks
    if (!raw) {
      errorh.textContent = "EMPTY FIELD";
      errorp.textContent = "No phone number was entered.";
      return errord.classList.remove("hide");
    }
    if (raw.length < 8) {
      errorh.textContent = "INVALID PHONE NUMBER";
      errorp.textContent = "Phone number is less than 8 digits.";
      return errord.classList.remove("hide");
    }
    if (!dropdown.value) {
      errorh.textContent = "INVALID PHONE NUMBER";
      errorp.textContent = "No country code selected.";
      return errord.classList.remove("hide");
    }

    let url;
    if (svc === "w") {
      if (!window.confirm("Redirect to WhatsApp?")) return;
      url = regexp.test(navigator.userAgent)
        ? `https://api.whatsapp.com/send/?phone=${raw}`
        : `https://wa.me/${plusNum}`;
    }
    else if (svc === "t") {
      if (!window.confirm("Redirect to Telegram?")) return;
      url = regexp.test(navigator.userAgent)
        ? `tg:resolve?phone=${raw}`
        : `https://t.me/${plusNum}`;
    }
    else if (svc === "s") {
      if (!window.confirm("Redirect to Signal?")) return;
      url = regexp.test(navigator.userAgent)
        ? `sgnl://p/${raw}`
        : `https://signal.me/#p/${plusNum}`;
    }
    else {
      return;
    }

    window.open(url, "_blank", "noopener");
  }

  // Hook up paste into textbox
  textbox.addEventListener("paste", e => {
    e.preventDefault();
    errord.classList.add("hide");
    const txt = (e.clipboardData || window.clipboardData).getData("text");
    textbox.value = txt.match(/\d/g)?.join("") || "";
    extFinder(txt);
  });

  // Hook up 📋 button
  pasteBtn.addEventListener("click", async e => {
    e.preventDefault();
    errord.classList.add("hide");
    const txt = await navigator.clipboard.readText();
    textbox.value = txt.match(/\d/g)?.join("") || "";
    extFinder(txt);
  });

  // Live‑input country‑code detect
  textbox.addEventListener("input", e => {
    errord.classList.add("hide");
    const nums = textbox.value.match(/\d/g) || [];
    if (nums.length > 2 && nums.length < 15) {
      extFinder(textbox.value);
    } 
    else if (nums.length === 0) {
      dropdown.selectedIndex = 0;
    }
  });

  // Dropdown change
  dropdown.addEventListener("change", dropdownSelect);

  // Finally, wire up the three buttons
  whtspp.addEventListener("click",   () => setTimeout(handleLink, 1000, "w"), false);
  telgrm.addEventListener("click",   () => setTimeout(handleLink, 1000, "t"), false);
  signal.addEventListener("click",   () => setTimeout(handleLink, 1000, "s"), false);
}


// Initialize app
window.addEventListener('DOMContentLoaded', async () => {
  await loadCountries(); // Wait for country data to load
  setupLinkButtons(); // Set up button listeners
  
  // Get the loader element
  const loader = document.getElementById('loader');
  
  // Hide the loader by adding the 'hidden' class for the fade-out effect
  loader.classList.add('hidden');

  // Optionally, remove the loader from the DOM after the transition ends
  // This prevents it from taking up any layout space or being interactive after hiding
  loader.addEventListener('transitionend', () => {
    loader.style.display = 'none';
  }, { once: true }); // Use { once: true } to ensure the event listener is removed after it fires
});