document.getElementById('certification-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const course = document.getElementById('course').value;

    // Load the template
    const response = await fetch('template.docx');
    const templateArrayBuffer = await response.arrayBuffer();

    const Docxtemplater = require('docxtemplater');
    const PizZip = require('pizzip');

    const zip = new PizZip(templateArrayBuffer);
    const doc = new Docxtemplater(zip);

    // Set the template variables
    doc.setData({ name: name, course: course });

    try {
        // Render the document
        doc.render();
        const buf = doc.getZip().generate({ type: 'blob' });

        // Create a download link
        const downloadButton = document.getElementById('download-btn');
        downloadButton.style.display = 'block'; // Show the download button
        downloadButton.onclick = function() {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(buf);
            link.download = 'certificate.docx';
            link.click();
        };
    } catch (error) {
        console.error("Error generating certificate:", error);
    }
});
