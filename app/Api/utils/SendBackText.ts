const htmlparser2 = require("htmlparser2");

// Função para converter HTML para Markdown
function formatForWhatsApp(html: any) {
  let markdown = "";

  const parser = new htmlparser2.Parser(
    {
      onopentag(name: any, attribs: any) {
        switch (name) {
          case "strong":
          case "b":
            markdown += "*";
            break;
          case "em":
          case "i":
            markdown += "_";
            break;
          case "u":
            markdown += "~";
            break;
          case "p":
            markdown += "\n\n";
            break;
          case "ol":
          case "ul":
            // No action for lists, handled in ontext and onclosetag
            break;
          case "li":
            // Handles list items
            markdown += name === "ol" ? "1. " : "- ";
            break;
          case "br":
            markdown += "\n";
            break;
          default:
            // No action for other tags
            break;
        }
      },
      ontext(text: any) {
        markdown += text;
      },
      onclosetag(name: any) {
        switch (name) {
          case "strong":
          case "b":
            markdown += "*";
            break;
          case "em":
          case "i":
            markdown += "_";
            break;
          case "u":
            markdown += "~";
            break;
          case "ol":
          case "ul":
            // No action for lists
            break;
          case "li":
            markdown += "\n";
            break;
          default:
            // No action for other tags
            break;
        }
      },
    },
    { decodeEntities: true }
  );
  if (html) {
    parser.write(html);
    parser.end();
  }else{
    
  }

  return markdown;
}

function cleanText(text: any) {
  // Remove múltiplas linhas em branco
  let cleanedText = text.replace(/(\n\s*){2,}/g, "\n\n");
  // Remove linhas em branco no início e no fim
  cleanedText = cleanedText.trim();
  return cleanedText;
}

/**
 *
 * @param text Texto como html
 */
export function FormatText(text: string) {
  const formattedText = formatForWhatsApp(text);
  const cleanedText = cleanText(formattedText);
  return cleanedText;
}
