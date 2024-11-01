document.getElementById('certification-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const course = document.getElementById('course').value;

    console.log("Form submitted. Name:", name, "Course:", course); // Check values

    try {
        const response = await fetch('template.docx');
        const templateArrayBuffer = await response.arrayBuffer();

        const Docxtemplater = require('docxtemplater');
        const PizZip = require('pizzip');

        const zip = new PizZip(templateArrayBuffer);
        const doc = new Docxtemplater(zip);

        doc.setData({ name: name, course: course });
        doc.render();
        
        const buf = doc.getZip().generate({ type: 'blob' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(buf);
        link.download = 'certificate.docx';
        link.click();
    } catch (error) {
        console.error("Error generating certificate:", error);
    }
});
