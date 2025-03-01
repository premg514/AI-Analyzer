import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f3f4f6;
`;

const FormCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
  }
`;

const Button = styled.button`
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

const ErrorMessage = styled.div`
  padding: 0.75rem;
  background-color: #ef4444;
  color: white;
  border-radius: 6px;
  font-size: 0.875rem;
`;

const SuccessMessage = styled.div`
  padding: 0.75rem;
  background-color: #10b981;
  color: white;
  border-radius: 6px;
  font-size: 0.875rem;
`;

const LinkText = styled.p`
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 1rem;
`;

const StyledLink = styled.span`
  color: #3b82f6;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

// AI-themed decoration
const AiDecoration = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
`;

const AiCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
`;

const AiIcon = styled.div`
  color: white;
  font-size: 1.75rem;
`;

// Loading Spinner Component
const Spinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 2px solid white;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Login = () => {
    const [formData, setFormData] = useState({
        name: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:5001/login', formData,{
              'Content-Type':'application/json'
            });
            setSuccess(response.data.message);
            localStorage.setItem('userDetails',JSON.stringify( response.data.userDetails))
            Cookies.set("token", response.data.token, { expires: 1, secure: true, sameSite: "Strict" });
            setTimeout(() => {
                navigate('/'); // Assuming you have a dashboard route
            }, 1500);
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <FormCard>
                <Header>
                    <AiDecoration>
                        <AiCircle>
                            <AiIcon>🤖</AiIcon>
                        </AiCircle>
                    </AiDecoration>
                    <Title>Welcome Back</Title>
                    <Subtitle>Log in to your AI Assistant</Subtitle>
                </Header>

                {error && <ErrorMessage>{error}</ErrorMessage>}
                {success && <SuccessMessage>{success}</SuccessMessage>}

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="name">Username</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="Enter your username"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <Button type="submit" disabled={loading}>
                        {loading ? <><Spinner /> Logging in...</> : 'Login'}
                    </Button>
                </Form>

                <LinkText>
                    Don't have an account? <StyledLink onClick={() => navigate('/signup')}>Sign up</StyledLink>
                </LinkText>
            </FormCard>
        </Container>
    );
};

export default Login;