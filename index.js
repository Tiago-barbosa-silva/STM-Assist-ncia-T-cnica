const { jsPDF } = window.jspdf;



const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();





    const os = document.getElementById('os').value;
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const equipamento = document.getElementById('equipamento').value;
    const defeito = document.getElementById('defeito').value;
    const valor = document.getElementById('valor').value;
    const observacao = document.getElementById('observacao').value;
    const data = document.getElementById('data').value;

//      if (!nome || !telefone || !equipamento || !valor || !data || !defeito || !os) {
//   alert("Preencha todos os campos obrigatórios!");
//   return;
// }


  const pdf = new jsPDF();

  
// TÍTULO
pdf.setFontSize(18);
pdf.text("STM ASSISTENCIA TECNICA", 105, 15, { align: "center" });
pdf.line(10, 35, 200, 35);
pdf.setFontSize(14);
pdf.text("Rua Cel.Valfredo de Campos, 65 - Vila Nova Mazzei", 105, 20, { align: "center" });
pdf.text("CNPJ: 30.123.456/0001-78", 105, 25, { align: "center" });
pdf.text("Telefone: (11) 93457-4926", 105, 30, { align: "center" });
pdf.setFontSize(18);
pdf.text("Orçamento de Serviço", 105, 45, { align: "center" });
pdf.line(10, 52, 200, 52);
pdf.setLineWidth(0.7);
pdf.line(10, 118, 200, 118);

// DATA ATUAL

const dataAtual = new Date().toLocaleDateString("pt-BR");
const valorFormatado = parseFloat(valor).toFixed(2);
// CONTEÚDO
pdf.setFontSize(12);
let y = 50;

    pdf.text(`OS: ${os}`, 10, y);
    y += 10;
    pdf.text(`Cliente: ${nome}`, 10, y);
    y += 10;
    pdf.text(`Telefone: ${telefone}`, 10, y);
    y += 10;
    pdf.text(`Equipamento: ${equipamento}`, 10, y);
    y += 10;
    pdf.text(`Defeito: ${defeito}`, 10, y);
    y += 10;
    pdf.text(`Valor: R$ ${valorFormatado}`, 10, y);
    y += 10;
    pdf.text(`Observação: ${observacao}`, 10, y); y += 10;
    y += 10;
    pdf.text(`Data: ${dataAtual}`, 10, y);

   const logo = new Image();
logo.src = "file.jpg";

logo.onload = () => {
  pdf.addImage(logo, "PNG", 10, 10, 30, 30);

  // Só salva DEPOIS do logo carregar
  pdf.save("orcamento.pdf");
};
const numeroWhatsApp = '5511941320358';
    const mensagem = "📄 Olá, segue o orçamento em PDF.";
    const link = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(link, '_blank');


});

