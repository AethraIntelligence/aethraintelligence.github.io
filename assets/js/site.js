// Header state and the mobile menu. Nothing on the page depends on this
// script to be read: without it the header is simply always solid.
(() => {
  // Opened straight from disk (file://), a link to "blog/" shows a folder
  // instead of the page, so point folder links at their index.html. On the
  // live site this does nothing.
  if (location.protocol === "file:") {
    document.querySelectorAll("a[href]").forEach((a) => {
      const url = new URL(a.getAttribute("href"), location.href);
      if (url.protocol === "file:" && url.pathname.endsWith("/")) {
        url.pathname += "index.html";
        a.href = url.href;
      }
    });
  }

  // Copy buttons next to terminal commands.
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = document.getElementById(btn.dataset.copy).textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const area = Object.assign(document.createElement("textarea"), { value: text });
        document.body.append(area);
        area.select();
        document.execCommand("copy");
        area.remove();
      }
      btn.textContent = "Copied";
      btn.classList.add("done");
      setTimeout(() => { btn.textContent = "Copy"; btn.classList.remove("done"); }, 1800);
    });
  });

  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  const header = document.querySelector(".top");
  const hero = document.querySelector(".hero");
  if (!header) return;

  const setHeader = () => {
    const open = menu && menu.classList.contains("open");
    const overHero = hero ? hero.getBoundingClientRect().bottom > 90 : false;
    header.classList.toggle("over", overHero && !open);
  };
  setHeader();
  addEventListener("scroll", setHeader, { passive: true });

  if (!burger || !menu) return;

  const setMenu = (open) => {
    burger.setAttribute("aria-expanded", String(open));
    burger.textContent = open ? "Close" : "Menu";
    menu.classList.toggle("open", open);
    menu.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("locked", open);
    setHeader();
  };
  burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  addEventListener("resize", () => { if (innerWidth >= 1000) setMenu(false); });
})();
