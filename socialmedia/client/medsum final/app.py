import streamlit as st
import google.generativeai as genai
import pdfplumber
import docx
import pytesseract 
import io
import os
from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()

# Now, you can fetch the API key from the environment
api_key = os.getenv("GENAI_API_KEY")
if not api_key:
    st.error("API Key not set. Please set the environment variable 'GENAI_API_KEY'.")
else:
    genai.configure(api_key=api_key)




# Initialize model properly
model = genai.GenerativeModel(model_name="gemini-1.5-pro")

# Function to extract text from PDF
def extract_text_from_pdf(file):
    text = ""
    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            text += page.extract_text()
    return text

# Function to extract text from Word Doc
def extract_text_from_docx(file):
    doc = docx.Document(file)
    text = "\n".join([para.text for para in doc.paragraphs])
    return text

# Function to extract text from image
def extract_text_from_image(file):
    image = Image.open(file)
    text = pytesseract.image_to_string(image)
    return text

# Analyze the extracted medical report
def analyze_medical_report(report_text):
    prompt = f"""
    You are an expert medical report analyzer.
    Analyze the following report:
    
    "{report_text}"
    
    Extract and answer:
    1. Main Diagnosis:
    2. Key Symptoms:
    3. Recommended Treatment:
    4. Any Critical Alerts:
    5. Summary in Simple Language:
    
    Be detailed but clear.
    """
    # Generate content using Gemini AI model
    response = model.generate_content(prompt)
    return response.text

# Streamlit App
def main():
    st.title("🏥 Medical Report Analyzer ")
    st.write("Upload a PDF, Word Doc, or Image of a medical report and get instant analysis!")

    uploaded_file = st.file_uploader("Upload a Medical Report (PDF, DOCX, Image)", type=["pdf", "docx", "png", "jpg", "jpeg"])

    if uploaded_file is not None:
        file_type = uploaded_file.name.split('.')[-1].lower()
        
        with st.spinner('Extracting text...'):
            if file_type == "pdf":
                report_text = extract_text_from_pdf(uploaded_file)
            elif file_type == "docx":
                report_text = extract_text_from_docx(uploaded_file)
            elif file_type in ["png", "jpg", "jpeg"]:
                report_text = extract_text_from_image(uploaded_file)
            else:
                st.error("Unsupported file format!")
                return

        if report_text.strip() == "":
            st.error("No readable text found in the uploaded file!")
            return

        st.subheader("📄 Extracted Report Text")
        st.text_area("Extracted Text", report_text, height=300)

        if st.button("🔍 Analyze Medical Report"):
            with st.spinner('Analyzing...'):
                analysis_result = analyze_medical_report(report_text)
                st.subheader("🧠 Medical Report Analysis")
                st.markdown(analysis_result)


if __name__ == "__main__":
    main()