import React, { useState, useRef, useEffect } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import LoadingIcons from 'react-loading-icons';
import { TbNoteOff } from "react-icons/tb";
import MDEditor from '@uiw/react-md-editor';
import { FiUser, FiSend, FiClock, FiTrash2 } from "react-icons/fi";
import { SiGnuprivacyguard } from "react-icons/si";
import { IoExitOutline } from "react-icons/io5";
import { HiOutlineLogin } from "react-icons/hi";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import {
  Container,
  Sidebar,
  MenuTab,
  MainContent,
  ResultsContainer,
  BottomInput,
  Profile,
  ProfileButton,
  LogoutButton,
  SubmitButton,
  ToggleButton,
  InputBar,
  CloseButton,
  ListContainer,
  Li,
  Button,
  RecentItem,
  SidebarHeader,
  ResultsHeader,
  LoadingContainer,
  GradientBackground,
  EmptyStateContainer,
  MenuTabs,
  MenuTabs1
} from "./homeStyles";

const Home = () => {
  const usergetting = localStorage.getItem('userDetails')
  let user = {
    name: "user"
  };
  if (usergetting) {
    user = JSON.parse(usergetting)
  }

  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [resultData, setResultData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recentData, setRecentData] = useState([]);
  const [showSuccessGlow, setShowSuccessGlow] = useState(false);
  const sidebarRef = useRef(null);

  // Load history data from localStorage when component mounts
  useEffect(() => {
    const savedHistory = localStorage.getItem('queryHistory');
    if (savedHistory) {
      try {
        setRecentData(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Error parsing saved history:", error);
        setRecentData([]);
      }
    }
  }, []);

  // Save history data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('queryHistory', JSON.stringify(recentData));
  }, [recentData]);

  const handleSubmit = async () => {
    if (!inputValue.trim()) return;

    setIsLoading(true);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ prompt: inputValue })
    };

    try {
      if (token) {
        const response = await fetch(`${import.meta.env.REACT_BASE_BACKEND_URL}/generate`, options);
        const data = await response.json();

        if (data) {
          setResultData(data.data);

          // Add timestamp to history item
          const newHistoryItem = {
            query: inputValue,
            timestamp: new Date().toISOString(),
            id: Date.now().toString() // Unique ID for each history item
          };

          setRecentData(prevData => [newHistoryItem, ...(prevData || []).slice(0, 9)]); // Keep last 10 items
          setInputValue(""); // Clear input field

          // Show success glow effect
          setShowSuccessGlow(true);
          setTimeout(() => {
            setShowSuccessGlow(false);
          }, 1500); // Duration matches the animation duration
        }
      } else {
        alert("You don't have access, please login with your credentials.")
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem('userDetails')
    if (token) {
      alert("Logout Successful!")
    } else {
      alert("You need to login :)")
    }
  };

  // Function to delete a history item
  const deleteHistoryItem = (id, e) => {
    e.stopPropagation(); // Prevent clicking the parent item
    setRecentData(prevData => prevData.filter(item => item.id !== id));
  };

  // Function to clear all history
  const clearAllHistory = () => {
    if (window.confirm("Are you sure you want to clear all history?")) {
      setRecentData([]);
    }
  };

  // Function to use a history item
  const useHistoryItem = (query) => {
    setInputValue(query);
    setIsSidebarOpen(false); // Close sidebar after selecting
  };

  return (
    <Container>
      <GradientBackground />

      {/* Menu Toggle Button */}
      {!isSidebarOpen && (
        <ToggleButton onClick={() => setIsSidebarOpen(true)}>
          <IoMenu />
        </ToggleButton>
      )}

      {/* Sidebar */}
      <Sidebar ref={sidebarRef} isOpen={isSidebarOpen}>
        <SidebarHeader>
          <h3>Recent Queries</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            {recentData.length > 0 && (
              <button
                onClick={clearAllHistory}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ff6b6b',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '14px'
                }}
              >
                <FiTrash2 style={{ marginRight: '5px' }} /> Clear
              </button>
            )}
            <CloseButton onClick={() => setIsSidebarOpen(false)}>
              <IoClose />
            </CloseButton>
          </div>
        </SidebarHeader>

        <MenuTabs>
          <MenuTab active={true}>
            <FiClock /> History
          </MenuTab>
          <MenuTab>
            <HiOutlineLogin /><LogoutButton onClick={handleLogout} >  Logout</LogoutButton>
          </MenuTab>
        </MenuTabs>

        <ListContainer>
          {recentData.length > 0 ? (
            recentData.map((item) => (
              <RecentItem key={item.id}>
                <Button onClick={() => useHistoryItem(item.query)}>
                  <Li>
                    {item.query.length > 30 ? item.query.substring(0, 30) + "..." : item.query}
                  </Li>
                </Button>
                <button
                  onClick={(e) => deleteHistoryItem(item.id, e)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#999',
                    cursor: 'pointer',
                    marginLeft: '8px',
                    padding: '4px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Delete"
                >
                  <FiTrash2 size={14} />
                </button>
              </RecentItem>
            ))
          ) : (
            <EmptyStateContainer>
              <TbNoteOff size={24} />
              <p>No history yet</p>
              <small>Your recent queries will appear here</small>
            </EmptyStateContainer>
          )}
        </ListContainer>
        <MenuTabs1>
          <MenuTab >
            <SiGnuprivacyguard /> <LogoutButton onClick={() => navigate('/signup')} >Signup </LogoutButton>
          </MenuTab>
          <MenuTab>
            <IoExitOutline />  <LogoutButton onClick={() => navigate('/login')} >  Login</LogoutButton>
          </MenuTab>
        </MenuTabs1>
      </Sidebar>

      {/* Main Content */}
      <MainContent isSidebarOpen={isSidebarOpen}>
        <Profile>
          <ProfileButton>
            <FiUser size={18} />
            <span>{user.name}</span>
          </ProfileButton>
          <div className="user-name" >
            <h4>{user.name}</h4>
          </div>
        </Profile>

        <ResultsHeader>
          <h2>AI Assistant</h2>
        </ResultsHeader>

        {isLoading ? (
          <LoadingContainer>
            <LoadingIcons.Oval stroke="#8e44ad" strokeWidth={3} speed={1.5} />
            <p>Generating response...</p>
          </LoadingContainer>
        ) : (
          <ResultsContainer showSuccessGlow={showSuccessGlow}>
            {resultData ? (
              <div className="markdown-container">
                <MDEditor.Markdown
                  source={resultData}
                  style={{
                    whiteSpace: 'pre-wrap',
                    padding: "30px",
                    color: "#f0f0f0"
                  }}
                />
              </div>
            ) : (
              <EmptyStateContainer>
                <TbNoteOff size={48} />
                <h3>No results yet</h3>
                <p>Type a query and hit enter to get started</p>
              </EmptyStateContainer>
            )}
          </ResultsContainer>
        )}

        <InputBar isSidebarOpen={isSidebarOpen}>
          <BottomInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
          />
          <SubmitButton
            onClick={handleSubmit}
            disabled={!inputValue.trim() || isLoading}
          >
            <FiSend size={18} />
          </SubmitButton>
        </InputBar>
      </MainContent>
    </Container>
  );
};

export default Home;