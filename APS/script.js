document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = {
    "menu-toggle": "menu-dropdown",
    "login-btn": "login-dropdown",
    "settings-btn": "settings-dropdown"
  };

  const observers = {};

  function hideAllDropdowns() {
    Object.values(dropdowns).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add("hidden");
    });
  }

  function positionDropdown(button, dropdown) {
    const rect = button.getBoundingClientRect();
    const dropdownWidth = dropdown.offsetWidth;
    const dropdownHeight = dropdown.offsetHeight;

    let top = rect.bottom + window.scrollY + 8;
    let left = rect.left + window.scrollX;

    // Se exceder largura da tela
    if (left + dropdownWidth > window.innerWidth) {
      left = window.innerWidth - dropdownWidth - 8;
    }

    // Se exceder altura da tela
    if (top + dropdownHeight > window.innerHeight + window.scrollY) {
      const upTop = rect.top + window.scrollY - dropdownHeight - 8;
      top = upTop > 0 ? upTop : top;
    }

    dropdown.style.position = "absolute";
    dropdown.style.top = `${top}px`;
    dropdown.style.left = `${left}px`;
  }

  function toggleDropdown(buttonClass) {
    const button = document.querySelector(`.${buttonClass}`);
    const dropdownId = dropdowns[buttonClass];
    const dropdown = document.getElementById(dropdownId);
    if (!button || !dropdown) return;

    const isHidden = dropdown.classList.contains("hidden");
    hideAllDropdowns();

    if (isHidden) {
      dropdown.classList.remove("hidden");
      positionDropdown(button, dropdown);

      // Se ainda não houver observer para este botão
      if (!observers[buttonClass]) {
        const resizeObserver = new ResizeObserver(() => {
          positionDropdown(button, dropdown);
        });
        resizeObserver.observe(button);
        observers[buttonClass] = resizeObserver;
      }
    }
  }

  Object.keys(dropdowns).forEach(buttonClass => {
    const button = document.querySelector(`.${buttonClass}`);
    if (button) {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleDropdown(buttonClass);
      });
    }
  });

  document.addEventListener("click", () => hideAllDropdowns());
});
