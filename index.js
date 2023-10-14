const convertButton = document.querySelector("#convertButton");

convertButton.addEventListener('click', () => {
    
    const fileInput = document.getElementById('#fileInput');
    const downloadLink = document.getElementById('#downloadLink');

    const file = fileInput.files[0];
    const formatFile = file.type;

    if (formatFile === "image/jpeg" || formatFile === "image/png") {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // Converter para PDF usando pdfmake
        const docDefinition = {
          content: [
            { image: canvas.toDataURL('image/png'), width: 500 },
          ],
        };

        pdfMake.createPdf(docDefinition).getBlob((blob) => {
          const url = URL.createObjectURL(blob);
          downloadLink.href = url;
          downloadLink.style.display = 'flex';

          downloadLink.addEventListener('click', () =>{
            fileInput.value = "";
            downloadLink.style.display = 'none';
          })
        });
      };

      img.src = URL.createObjectURL(file);
    } else {
        alert("Escolha um arquivo .jpg ou .png");
        fileInput.value = "";
    }
  });