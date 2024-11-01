document.getElementById('certification-form').addEventListener('submit', async function(event) {
    console.log("Form submitted!"); // Log when the form is submitted
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const course = document.getElementById('course').value;

    // Load the template
    const response = await fetch('template.docx');
    console.log("Template response:", response); // Log the fetch response

    // Check if the response is OK (status 200)
    if (!response.ok) {
        console.error("Error fetching template:", response.statusText);
        return; // Exit if the template can't be fetched
    }

    const templateArrayBuffer = await response.arrayBuffer();
    console.log("Template loaded successfully."); // Log when template is loaded

    const PizZip = require('pizzip');
    const Docxtemplater = require('docxtemplater');

    const zip = new PizZip(templateArrayBuffer);
    const doc = new Docxtemplater(zip);

    // Set the template variables
    doc.setData({ name: name, course: course });

    try {
        // Render the document
        doc.render();
        console.log("Document rendered successfully."); // Log successful rendering
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
