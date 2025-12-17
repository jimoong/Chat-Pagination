import { useState } from 'react';
import ChatPanel from './components/ChatPanel';
import Canvas from './components/Canvas';
import { mockConversation } from './data/mockConversation';

function App() {
  const [conversation, setConversation] = useState(mockConversation);
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedArtifact, setExpandedArtifact] = useState(null);
  const [expandedFromPage, setExpandedFromPage] = useState(null);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleExpandArtifact = (artifact) => {
    setExpandedArtifact(artifact);
    setExpandedFromPage(currentPage);
  };

  const handleCloseCanvas = () => {
    setExpandedArtifact(null);
    setExpandedFromPage(null);
  };

  const handleNewMessage = (message) => {
    // For the prototype, we'll just add a simple response
    // In a real app, this would call an AI API
    const newTurn = {
      id: conversation.length + 1,
      user: {
        message: message,
      },
      ai: {
        message: "I understand you're asking about: \"" + message + "\". In a production environment, I would query your data warehouse and generate insights. For this prototype, the conversation is pre-populated with sample data.",
        artifact: null,
      },
    };

    setConversation([...conversation, newTurn]);
    setCurrentPage(conversation.length); // Navigate to the new page
  };

  return (
    <div className={`app ${expandedArtifact ? 'app--canvas-open' : ''}`}>
      <ChatPanel
        conversation={conversation}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onExpandArtifact={handleExpandArtifact}
        onNewMessage={handleNewMessage}
        expandedFromPage={expandedFromPage}
      />
      <Canvas artifact={expandedArtifact} onClose={handleCloseCanvas} />
    </div>
  );
}

export default App;
