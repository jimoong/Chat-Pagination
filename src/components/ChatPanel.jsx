import { useState } from 'react';
import ChatThread from './ChatThread';
import Pagination from './Pagination';
import ChatInput from './ChatInput';

const ChatPanel = ({
  conversation,
  currentPage,
  onPageChange,
  onExpandArtifact,
  onNewMessage,
  expandedFromPage,
}) => {
  const [previewPage, setPreviewPage] = useState(null);
  
  // Show preview page if hovering, otherwise show current page
  const displayPage = previewPage !== null ? previewPage : currentPage;
  const currentTurn = conversation[displayPage];
  const isPreview = previewPage !== null && previewPage !== currentPage;

  return (
    <div className="chat-panel">
      <div className="chat-room">
        <ChatThread
          turn={currentTurn}
          onExpandArtifact={onExpandArtifact}
          onPageChange={onPageChange}
          currentPage={currentPage}
          totalPages={conversation.length}
          isPreview={isPreview}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={conversation.length}
          onPageChange={onPageChange}
          expandedFromPage={expandedFromPage}
          onPreview={setPreviewPage}
        />
      </div>

      <ChatInput onSubmit={onNewMessage} />
    </div>
  );
};

export default ChatPanel;
