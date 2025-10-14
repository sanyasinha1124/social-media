function handleUpload() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
      alert('Please select a file first.');
      return;
    }

    async function handleUpload() {
        const fileInput = document.getElementById('fileInput');
        if (fileInput.files.length === 0) {
          alert('Please select a file first.');
          return;
        }
      
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
      
        try {
          const response = await fetch('/summarize', {
            method: 'POST',
            body: formData
          });
      
          if (!response.ok) {
            throw new Error('Upload failed');
          }
      
          const data = await response.json();
          localStorage.setItem('summary', data.summary);
      
          window.location.href = '/summary';
        } catch (error) {
          console.error('Error:', error);
          alert('Something went wrong. Please try again.');
        }
      }
      
      // When loading summary page
      window.onload = function() {
        const summaryBox = document.getElementById('summaryBox');
        if (summaryBox) {
          const summary = localStorage.getItem('summary');
          if (summary) {
            summaryBox.innerText = summary;
          } else {
            summaryBox.innerText = "No summary available. Please upload a report first.";
          }
        }
      };
      
  
    // Simulate upload and summarize
    localStorage.setItem('summary', 'Patient has shown improvement in vital signs. Recommend continuation of current medication with periodic reviews.');
  
    // Redirect to summary page
    window.location.href = 'summary.html';
  }
  
  // When loading summary page
  window.onload = function() {
    const summaryBox = document.getElementById('summaryBox');
    if (summaryBox) {
      const summary = localStorage.getItem('summary');
      if (summary) {
        summaryBox.innerText = summary;
      } else {
        summaryBox.innerText = "No summary available. Please upload a report first.";
      }
    }
  };
  