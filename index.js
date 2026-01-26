

const { jsPDF } = window.jspdf;

function primeiraLetraMaiuscula (string) {
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

  const nome = primeiraLetraMaiuscula(
    document.getElementById("nome").value
);
  const telefone =  
  document.getElementById("telefone").value.trim();
  const equipamento = primeiraLetraMaiuscula( document.getElementById("equipamento").value)
  const defeito = primeiraLetraMaiuscula( document.getElementById("defeito").value);
  const observacao = primeiraLetraMaiuscula( document.getElementById("observacao").value || "—");
  if (!nome || !telefone || !equipamento || !defeito) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  const numeroOS = "OS-" + Date.now().toString().slice(10);
  const dataAtual = new Date().toLocaleDateString("pt-BR");

  gerarPDF("VIA DO CLIENTE");
  gerarPDF("VIA DA EMPRESA");

  function gerarPDF(via) {
    const pdf = new jsPDF("p", "mm", "a5");

    // =========================
    // CABEÇALHO
    // =========================
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text("STM ASSISTÊNCIA TÉCNICA", 74, 15, { align: "center" });

    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    pdf.text("Tel: (11) 93457-4926", 74, 25, { align: "center" });

    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    pdf.text(
      "Rua Cel. Valfredo de Campos, 65 - Vila Nova Mazzei",
      35,
      20
    );
    pdf.line(10, 28, 138, 28);

   

    // =========================
    // TÍTULO
    // =========================
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("ORÇAMENTO DE SERVIÇO", 74, 36, { align: "center" });

    pdf.setFontSize(9);
    pdf.text(via, 74, 41, { align: "center" });

    // =========================
    // DADOS
    // =========================
    let y = 48;
    pdf.setFontSize(10);

    function campo(label, valor) {
      pdf.setFont("helvetica", "bold");
      pdf.text(label, 10, y);
      pdf.setFont("helvetica", "normal" , );
      pdf.text(valor, 40, y);
      y += 7;
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
    y += 5;
    pdf.setFont("helvetica", "normal");
    pdf.text(
      pdf.splitTextToSize(`Observações: ${observacao}`, 120),
      10,
      y
    );

    // =========================
    // ASSINATURA
    // =========================
    y += 35;
    pdf.line(30, y, 110, y);
    pdf.setFontSize(9);
    pdf.text("Assinatura do Cliente", 74, y + 5, { align: "center" });

    // =========================
    // RODAPÉ
    // =========================
    pdf.setFontSize(8);
    pdf.setTextColor(120);
    pdf.text(
      `Gerado em ${dataAtual} • ${via}`,
      74,
      200,
      { align: "center" }
    );

    pdf.save(`orcamento_${via.replaceAll(" ", "_")}.pdf`);
  }
});