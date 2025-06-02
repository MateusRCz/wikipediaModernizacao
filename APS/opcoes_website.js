function aplicarTema(tema) {
  const root = document.documentElement;
  localStorage.setItem("tema", tema);

  if (tema === "automatico") {
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    tema = dark ? "escuro" : "claro";
  }

  if (tema === "claro") {
    root.style.setProperty("--primary-color", "#f8f9fa");
    root.style.setProperty("--secondary-color", "#e9ecef");
    root.style.setProperty("--third-color", "#dee2e6");
    root.style.setProperty("--fourth-color", "#ced4da");
    root.style.setProperty("--fifth-color", "#adb5bd");
    root.style.setProperty("--text-color", "#000000");
  } else if (tema === "escuro") {
    root.style.setProperty("--primary-color", "#343a40");
    root.style.setProperty("--secondary-color", "#212529");
    root.style.setProperty("--third-color", "#495057");
    root.style.setProperty("--fourth-color", "#6c757d");
    root.style.setProperty("--fifth-color", "#adb5bd");
    root.style.setProperty("--text-color", "#ffffff");
  }
}

function aplicarTamanhoFonte(tamanho) {
  const root = document.documentElement;
  localStorage.setItem("tamanhoFonte", tamanho);

  const size = tamanho === "pequeno" ? "0.5em"
             : tamanho === "grande" ? "1.5em"
             : "1em";

  root.style.setProperty("font-size", size);
}

document.addEventListener("DOMContentLoaded", () => {
  aplicarTema(localStorage.getItem("tema") || "automatico");
  aplicarTamanhoFonte(localStorage.getItem("tamanhoFonte") || "medio");

  document.getElementById("tema-automatico")?.addEventListener("click", () => aplicarTema("automatico"));
  document.getElementById("tema-claro")?.addEventListener("click", () => aplicarTema("claro"));
  document.getElementById("tema-escuro")?.addEventListener("click", () => aplicarTema("escuro"));

  document.getElementById("fonte-pequena")?.addEventListener("click", () => aplicarTamanhoFonte("pequeno"));
  document.getElementById("fonte-media")?.addEventListener("click", () => aplicarTamanhoFonte("medio"));
  document.getElementById("fonte-grande")?.addEventListener("click", () => aplicarTamanhoFonte("grande"));
});
