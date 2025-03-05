import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f3f4f6;
`;

export const FormCard = styled.div`
  width: 100%;
  max-width: 450px;
  padding: 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  background:red;
  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
  }
`;

export const DropzoneContainer = styled.div`
  border: 2px dashed ${(props) => (props.isDragActive ? "#3b82f6" : "#d1d5db")};
  border-radius: 6px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) => (props.isDragActive ? "rgba(59, 130, 246, 0.1)" : "#f9fafb")};

  &:hover {
    border-color: #3b82f6;
    background-color: rgba(59, 130, 246, 0.05);
  }
`;

export const DropzoneText = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
`;

export const UploadIcon = styled.div`
  font-size: 2rem;
  color: #9ca3af;
  margin-bottom: 0.5rem;
`;

export const ImagePreviewContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;

export const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 150px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
`;

export const Button = styled.button`
  padding: 0.75rem;
  background-color: #3b82f6;
  color: white;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  padding: 0.75rem;
  background-color: #ef4444;
  color: white;
  border-radius: 6px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

export const SuccessMessage = styled.div`
  padding: 0.75rem;
  background-color: #10b981;
  color: white;
  border-radius: 6px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

export const LinkText = styled.p`
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 1rem;
`;

export const StyledLink = styled.span`
  color: #3b82f6;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export const ValidationError = styled.p`
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.375rem;
`;

// Loading Spinner Component
export const Spinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 2px solid white;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
