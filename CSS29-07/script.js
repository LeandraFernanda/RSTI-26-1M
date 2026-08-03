 const status = document.getElementById("demo-status");
    const form = document.getElementById("access-form");

    function showDemoMessage() {
      status.textContent = "Esta é uma demonstração visual. Nenhuma conta é criada e nenhum dado é enviado.";
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      showDemoMessage();
    });

    document.querySelectorAll("[data-demo-action]").forEach(function (button) {
      button.addEventListener("click", showDemoMessage);
    });

  const menu=document.querySelector(".menu");
const toggle=document.querySelector(".toggle");
toggle.addEventListener("click",()=>{
  menu.classList.toggle("active");
})  