import styled, { keyframes, css } from "styled-components";
import spidersleep from '../assets/spidersleep.jpg'
import spider from '../assets/spider.jpg'
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const successGlow = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(0, 255, 128, 0.1), 0 0 10px rgba(0, 255, 128, 0.1);
  }
  50% {
    box-shadow: 0 0 15px rgba(0, 255, 128, 0.5), 0 0 30px rgba(0, 255, 128, 0.3);
  }
  100% {
    box-shadow: 0 0 5px rgba(0, 255, 128, 0.1), 0 0 10px rgba(0, 255, 128, 0.1);
  }
`;


export const Container = styled.div`
  height: 100vh;
  display: flex;
  color: white;
  margin: 0;
  font-family: 'Inter', 'Roboto', sans-serif;
  position: relative;
  overflow-x: hidden;
  background: #0f0f13;
`;

export const GradientBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #121212 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #121212 100%);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  opacity: 0.8;
  z-index: -1;
`;

export const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? "0" : "-320px")};
  width: 280px;
  height: 100vh;
  background: rgba(18, 18, 24, 0.95);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content:space-around;
  gap: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ isOpen }) => (isOpen ? "0 0 25px rgba(138, 43, 226, 0.2)" : "none")};
  z-index: 100;
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  
  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #f0f0f0;
    margin: 0;
  }
`;

export const MenuTabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

export const MenuTabs1 = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 50px;
  display:fixed;
  bottom:50px;
  margin-bottom:20px;
 
`;


export const MenuTab = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  border-radius: 10px;
  background: ${({ active }) => (active ? "linear-gradient(135deg, #4a00e0, #8e44ad)" : "#1a1a2e")};
  transition: all 0.2s ease;
  flex: 1;
  justify-content: center;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background: ${({ active }) => (active ? "linear-gradient(135deg, #4a00e0, #8e44ad)" : "#252542")};
    transform: translateY(-2px);
  }
    
`;

export const LogoutButton = styled.button`
  height:100%;
  padding: 0;
  border: none;
  background: none;
  color:#ffffff;
  cursor:pointer;
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #f0f0f0;
  font-size: 22px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  
  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.1);
    transform: rotate(90deg);
  }
`;

export const ToggleButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  background: rgba(20, 20, 30, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 22px;
  cursor: pointer;
  z-index: 1000;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  
  &:hover {
    background: rgba(138, 43, 226, 0.7);
    transform: scale(1.1);
  }
`;

export const MainContent = styled.div`
  margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? "280px" : "0")};
  padding: 30px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? "calc(100% - 280px)" : "100%")};
  position: relative;
  max-height:100vh;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    padding: 20px;
  }
`;

export const ResultsHeader = styled.div`
  margin-bottom: 20px;
  text-align: center;
  
  h2 {
    font-size: 24px;
    font-weight: 600;
    background: linear-gradient(135deg, #9c27b0, #3498db);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
  }
    @media(max-width:480px){
      margin-top:40px;
    }
`;


export const ResultsContainer = styled.div`
  width: 80%;
  height: calc(100vh - 300px);
  background: rgba(20, 20, 30, 0.7);
  border-radius: 16px;
  color: #f0f0f0;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  margin: 0 auto 30px;
  font-size: 16px;
  line-height: 1.6;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  animation: ${fadeIn} 0.5s ease;

  ${({ showSuccessGlow }) =>
    showSuccessGlow &&
    css`
      animation: ${successGlow} 1.5s ease-in-out;
    `}

  .markdown-container {
    height: 100%;
    overflow-y: auto;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(26, 26, 46, 0.5);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #8e44ad, #3498db);
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: calc(100vh - 200px);
    margin-bottom:80px;
  }
`;


export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 200px);
  gap: 20px;
  animation: ${fadeIn} 0.3s ease;
  
  p {
    font-size: 16px;
    color: #a0a0a0;
  }
`;

export const EmptyStateContainer = styled.div`
  background-image: url(${props => props.isLogin ? spider : spidersleep});
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: 20px;
  gap: 15px;
  color: #ffffff;
  
  h3 {
    font-size: 24px;
    font-weight: 600;
    color:#ffffff;
    -webkit-background-clip: text;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5);
    margin: 0;
  }
  
  p {
    margin: 0;
    font-size: 16px;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
    color:#ffffff;
    font-weight:bold;
    font-style:italic;
  }
  
  small {
    font-size: 14px;
    opacity: 0.7;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  }
`;

export const InputBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(25, 25, 35, 0.85);
  width: 70%;
  padding: 15px 25px;
  border-radius: 20px;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? "140px" : "0")};
  transition: all 0.3s ease-in-out;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  
  @media (max-width: 768px) {
    width: 90%;
    margin-left: 0 !important;
  }
    @media (max-width: 480px) {
    width: 80%;
  }
`;

export const BottomInput = styled.input`
  background: transparent;
  width: 90%;
  color: white;
  border: none;
  font-size: 16px;
  padding: 10px 0;
  font-family: 'Inter', 'Roboto', sans-serif;
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: #888;
  }
`;

export const SubmitButton = styled.button`
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  background: linear-gradient(135deg, #8e44ad, #3498db);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.disabled ? 0.5 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(138, 43, 226, 0.5);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;
export const Profile = styled.div`
  .user-name{
      display:none;
    }
    @media (max-width:480px){
      &:hover{
        .user-name{
          display:block;
        }
      }

`

export const ProfileButton = styled.button`
  background: rgba(25, 25, 35, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 10px 20px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  transition: all 0.2s ease;
  font-weight: 500;
  backdrop-filter: blur(10px);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  span{
    display:block
  }
  &:hover {
    background: linear-gradient(135deg, rgba(138, 43, 226, 0.7), rgba(52, 152, 219, 0.7));
    transform: translateY(-2px);
  }
  
    @media (max-width:480px){
      span{
        display:none
      }
      &:hover{
        .user-name{
          display:block;
        }
      }
    }
`;

export const ListContainer = styled.div`
  height:50vh;
  overflow-y: auto;
  flex: 1;
  padding-right: 5px;
  background:#000000;
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(26, 26, 46, 0.5);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(138, 43, 226, 0.5);
    border-radius: 10px;
  }
`;

export const RecentItem = styled.div`
  margin-bottom: 10px;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;
  display:flex;
  justify-content:space-between;
  
  &:hover {
    transform: translateX(5px);
  }
`;

export const Li = styled.div`
  padding: 12px;
  background: rgba(30, 30, 50, 0.5);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.4;
  color: #d0d0d0;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(138, 43, 226, 0.2);
    border-color: rgba(138, 43, 226, 0.3);
  }
`;

export const Button = styled.button`
  outline: none;
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  width: 100%;
  text-align: left;
  padding: 0;
   border-radius: 10px;
  background: ${({ active }) => (active ? "linear-gradient(135deg, #4a00e0, #8e44ad)" : "#1a1a2e")};
  transition: all 0.2s ease;
`;