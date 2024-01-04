const fs = require('fs');

function checkFileType(filePath) {
    const buffer = Buffer.alloc(4);
    try {
        fs.readSync(fs.openSync(filePath, 'r'), buffer, 0, 4, 0); // lê os primeiros 4 bytes do arquivo de forma síncrona.
        const hex = buffer.toString('hex'); // obtém os primeiros bytes do arquivo como uma sequência hexadecimal.

        switch (hex) {
            case "89504e47":
                return "image/png";
            case "47494638":
                return "image/gif";
            case "ffd8ffe0":
            case "ffd8ffe1":
            case "ffd8ffe2":
                return "image/jpeg";
            case "25504446":
                return "application/pdf";
            default:
                return "desconhecido";
        }

    } catch (error) {
        console.error("Erro ao ler o arquivo:", error);
    }
}

module.exports = checkFileType;
