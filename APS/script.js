document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = {
    "menu-toggle": "menu-dropdown",
    "login-btn": "login-dropdown",
    "settings-btn": "settings-dropdown"
  };

  function hideAllDropdowns() {
    Object.values(dropdowns).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add("hidden");
    });
  }

    function toggleDropdown(buttonClass) {
        const button = document.querySelector(`.${buttonClass}`);
        const dropdownId = dropdowns[buttonClass];
        const dropdown = document.getElementById(dropdownId);
        if (!button || !dropdown) return;

        const isHidden = dropdown.classList.contains("hidden");
        hideAllDropdowns();

        if (isHidden) {
            dropdown.classList.remove("hidden"); // Mostrar temporariamente para medir

            const rect = button.getBoundingClientRect();
            const dropdownWidth = dropdown.offsetWidth;
            const dropdownHeight = dropdown.offsetHeight;

            let top = rect.bottom + window.scrollY + 8;
            let left = rect.left + window.scrollX;

            // Detecta overflow horizontal
            if (left + dropdownWidth > window.innerWidth) {
            left = rect.right - dropdownWidth + window.scrollX;
            if (left < 0) left = 8; // mínimo à esquerda
            }

            // Detecta overflow vertical
            if (top + dropdownHeight > window.innerHeight + window.scrollY) {
            const upTop = rect.top + window.scrollY - dropdownHeight - 8;
            top = upTop > 0 ? upTop : top; // só move se houver espaço acima
            }

            dropdown.style.position = "absolute";
            dropdown.style.top = `${top}px`;
            dropdown.style.left = `${left}px`;
            dropdown.classList.remove("hidden");
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
