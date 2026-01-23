const { jsPDF } = window.jspdf;

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const os = document.getElementById("os").value;
  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;
  const equipamento = document.getElementById("equipamento").value;
  const defeito = document.getElementById("defeito").value;
  const valor = document.getElementById("valor").value;
  const observacao = document.getElementById("observacao").value || "—";

  // VALIDAÇÃO
  // if (!os || !nome || !telefone || !equipamento || !defeito || !valor) {
  //   alert("⚠️ Preencha todos os campos obrigatórios.");
  //   return;
  // }

  const pdf = new jsPDF("p", "mm", "a4");

  // =========================
  // LOGO
  // =========================
  const logo = new Image();
  logo.src = "./img/file.jpg";

  logo.onload = () => {
    pdf.addImage(logo, "JPEG", 10, 10, 30, 30);

    // =========================
    // CABEÇALHO
    // =========================
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("STM ASSISTÊNCIA TÉCNICA", 50, 18 );
   

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.text(
      "Rua Cel. Valfredo de Campos, 65 - Vila Nova Mazzei",
      50,
      24
    );

    pdf.text(
      "Tel: (11) 93457-4926 | CNPJ: 30.123.456/0001-78",
      50,
      29
    );

    pdf.line(10, 35, 200, 35);

    // =========================
    // TÍTULO
    // =========================
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.text("ORÇAMENTO DE SERVIÇO", 105, 45, { align: "center" });

    // =========================
    // CAIXA DE DADOS
    // =========================
    pdf.rect(10, 55, 190, 90);

    pdf.setFontSize(11);
    let y = 65;

    function campo(label, valor) {
      pdf.setFont("helvetica", "bold");
      pdf.text(label, 15, y);
      pdf.setFont("helvetica", "normal");
      pdf.text(valor, 45, y);
      y += 8;
    }

    campo("OS:", os);
    campo("Cliente:", nome);
    campo("Telefone:", telefone);
    campo("Equipamento:", equipamento);
    campo("Defeito:", defeito);

    // =========================
    // VALOR EM DESTAQUE
    // =========================
    y += 6;
    const valorFormatado = parseFloat(valor).toFixed(2);
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.rect(12, y - 6, 186, 12);
    pdf.text(`VALOR TOTAL: R$ ${valorFormatado}`, 15, y + 2);

    // =========================
    // OBSERVAÇÃO
    // =========================
    y += 20;
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    pdf.text(
      pdf.splitTextToSize(`Observações: ${observacao}`, 180),
      15,
      y
    );

    // =========================
    // RODAPÉ
    // =========================
    const dataAtual = new Date().toLocaleDateString("pt-BR");
    pdf.setFontSize(9);
    pdf.setTextColor(120);
    pdf.text(
      `Documento gerado em ${dataAtual} • STM Assistência Técnica`,
      105,
      285,
      { align: "center" }
    );

    // =========================
    // SALVAR PDF
    // =========================
    pdf.save("orcamento.pdf");

    // =========================
    // WHATSAPP
    // =========================
    const numeroWhatsApp = "5511941320358";
    const mensagem = "📄 Olá, segue o orçamento em PDF.";
    const link = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
      mensagem
    )}`;
    window.open(link, "_blank");
  };
});










 

