const imageUpload = document.getElementById('image-upload');
const uploadedImage = document.getElementById('uploaded-image');
const imagePreview = document.getElementById('image-preview');
const predictionText = document.getElementById('prediction-text');
const resultArea = document.getElementById('result-area');
const messageArea = document.getElementById('message-area');

imageUpload.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file) {
        messageArea.textContent = '';
        resultArea.style.display = 'none';
        
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImage.src = e.target.result;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);

        // Send the image to the server
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();
            predictionText.textContent = data.prediction;
            resultArea.style.display = 'block';
            

        } catch (error) {
            messageArea.textContent = `Error: ${error.message}`;
            imagePreview.style.display = 'none';
        }
    }
});
