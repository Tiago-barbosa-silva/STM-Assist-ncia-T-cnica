
const { jsPDF } = window.jspdf;

function formatarTelefone(telefone) {
  return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

function primeiraLetraMaiuscula(string) {
  return string
    .toLowerCase()
    .trim()
    .split(" ")
    .filter(p => p !== "")
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = primeiraLetraMaiuscula(document.getElementById("nome").value);
  const telefone = formatarTelefone(document.getElementById("telefone").value);
  const equipamento = primeiraLetraMaiuscula(document.getElementById("equipamento").value);
  const defeito = primeiraLetraMaiuscula(document.getElementById("defeito").value);
  const observacao = primeiraLetraMaiuscula(document.getElementById("observacao").value || "—");

  if (!nome || !telefone || !equipamento || !defeito) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  const numeroOS = "OS-" + Date.now().toString().slice(10);
  const dataAtual = new Date().toLocaleDateString("pt-BR");

  gerarPDF("VIA DO CLIENTE");
  gerarPDF("VIA DA EMPRESA");

  function gerarPDF(via) {
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: [76, 180]
    });

    const centro = 38;
    const margemX = 4;
    const larguraUtil = 68;

    // =========================
    // CABEÇALHO
    // =========================
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.text("STM ASSISTÊNCIA TÉCNICA", centro, 10, { align: "center" }, );

    pdf.setFontSize(7.5);
    pdf.text("Tel: (11) 93457-4926", centro, 15, { align: "center" });

    pdf.setFont("helvetica", "normal");
    pdf.text(
      "Rua Cel. Valfredo de Campos, 65 - Vila Nova Mazzei",
      centro,
      20,
      {align: "center"},
      { maxWidth: larguraUtil }
    );

    pdf.line(margemX, 25, 72, 25);

    // =========================
    // TÍTULO
    // =========================
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    pdf.text("ORÇAMENTO DE SERVIÇO", centro, 32, { align: "center" });

    pdf.setFontSize(7);
    pdf.text(`${via} ${via === "VIA DO CLIENTE" ? nome : "STM"}`, centro, 39, { align: "center" });

    // =========================
    // DADOS
    // =========================
    let y = 42;
    pdf.setFontSize(9);

    function campo(label, valor) {
      pdf.setFont("helvetica", "bold"); // Define a fonte para negrito
      pdf.text(label, margemX, y + 5); // Define a largura máxima para o label
      pdf.setFont("helvetica", "normal"); // Define a fonte para normal
      pdf.text(valor, 28, y + 5, { maxWidth: 44 }); // Define a largura máxima para o valor
      y += 8.5; // Incrementa a posição vertical
    }

    campo("OS:", numeroOS);
    campo("Cliente:", nome);
    campo("Telefone:", telefone);
    campo("Equipamento:", equipamento);
    campo("Defeito:", defeito);
    campo("Data:", dataAtual);

    // =========================
    // OBSERVAÇÕES
    // =========================
    y += 4;
    pdf.setFont("helvetica", "bold");
    pdf.text("Observações:", margemX, y + 5 );

    y += 4;
    pdf.setFont("helvetica", "normal");
    pdf.text(
      pdf.splitTextToSize(observacao, larguraUtil),
      margemX,
      y + 7
    );

    // =========================
    // RODAPÉ
    // =========================
    pdf.setFontSize(7);
    pdf.setTextColor(120);
    pdf.text(
      `Gerado em ${dataAtual} • ${via}`,
      centro,
      130,
      { align: "center" }
    );

    pdf.save(`orcamento_${via}_${via === "VIA DO CLIENTE" ? nome : "STM"}_${numeroOS}.pdf`);
  }
});





