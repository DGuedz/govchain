const markdownpdf = require("markdown-pdf");
const fs = require("fs");
const path = require("path");

const sourcePath = path.join(__dirname, "../docs/ATA_MARCO_ZERO.md");
const destPath = path.join(__dirname, "../docs/ATA_MARCO_ZERO.pdf");

// CSS para estilizar o PDF
const cssPath = path.join(__dirname, "pdf-style.css");
const cssContent = `
  body {
    font-family: 'Times New Roman', serif;
    line-height: 1.5;
    padding: 40px;
    font-size: 12pt;
  }
  h1 {
    text-align: center;
    font-size: 18pt;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  h2 {
    text-align: center;
    font-size: 14pt;
    font-weight: normal;
    margin-bottom: 30px;
  }
  h3 {
    font-size: 14pt;
    margin-top: 20px;
    border-bottom: 1px solid #000;
    padding-bottom: 5px;
  }
  h4 {
    font-size: 12pt;
    margin-top: 15px;
  }
  p {
    text-align: justify;
    margin-bottom: 10px;
  }
  ul {
    margin-left: 20px;
  }
  blockquote {
    border-left: 4px solid #50C878;
    padding-left: 15px;
    margin: 20px 0;
    font-style: italic;
    background-color: #f9f9f9;
  }
  .signatures {
    margin-top: 50px;
  }
`;

// Criar arquivo CSS temporário
fs.writeFileSync(cssPath, cssContent);

console.log("Gerando PDF da Ata Marco Zero...");

markdownpdf({
  cssPath: cssPath,
  paperFormat: "A4",
  paperOrientation: "portrait",
  paperBorder: "2cm"
})
  .from(sourcePath)
  .to(destPath, function () {
    console.log("PDF criado com sucesso em:", destPath);
    // Limpar CSS temporário
    fs.unlinkSync(cssPath);
  });
