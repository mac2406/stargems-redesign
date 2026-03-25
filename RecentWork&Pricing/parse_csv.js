const fs = require('fs');

const csvPath = "Website list - Sheet1 (1).csv";

try {
    const data = fs.readFileSync(csvPath, 'utf8');
    const lines = data.split(/\r?\n/);

    // Skip first 2 lines
    const retailers = [];

    for (let i = 2; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Simple CSV parse handling quotes
        // But the current CSV seems simple. Let's start with simple split, 
        // watching out for "Ellington Jewelers, Inc" which has comma inside quotes.

        // Regex for CSV split allowing quotes
        const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        // This regex is tricky. 
        // Let's use a simpler approach: splitting by comma, BUT respecting quotes.

        // Better regex for standard CSV:
        const row = [];
        let cleanLine = line + ','; // append comma to ensure last field matches
        let inQuote = false;
        let field = '';

        for (let char of line) {
            if (char === '"') {
                inQuote = !inQuote;
            } else if (char === ',' && !inQuote) {
                row.push(field.trim().replace(/^"|"$/g, '')); // remove surrounding quotes
                field = '';
            } else {
                field += char;
            }
        }
        row.push(field.trim().replace(/^"|"$/g, ''));

        if (row.length < 5) continue;

        // Columns: 0:id, 1:name, 2:platform, 3:img, 4:url
        retailers.push({
            id: parseInt(row[0]),
            name: row[1],
            platform: row[2],
            image: row[3],
            url: row[4]
        });
    }

    retailers.sort((a, b) => a.id - b.id);

    let output = "const BASE_RETAILERS = [\n";
    retailers.forEach((item, index) => {
        const comma = index < retailers.length - 1 ? "," : "";
        output += `    { id: ${item.id}, name: "${item.name}", platform: "${item.platform}", image: "${item.image}", url: "${item.url}" }${comma}\n`;
    });
    output += "];\n";

    fs.writeFileSync('new_data.js', output);
    console.log("Written to new_data.js");

} catch (err) {
    console.error(err);
}
