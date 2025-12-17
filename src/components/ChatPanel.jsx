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
  const currentTurn = conversation[currentPage];

  return (
    <div className="chat-panel">
      {/* <div className="chat-panel__header">
        <h1 className="chat-panel__title">Data Agent</h1>
        <p className="chat-panel__subtitle">Ask questions about your business data</p>
      </div> */}

      <ChatThread
        turn={currentTurn}
        onExpandArtifact={onExpandArtifact}
        onPageChange={onPageChange}
        currentPage={currentPage}
        totalPages={conversation.length}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={conversation.length}
        onPageChange={onPageChange}
        expandedFromPage={expandedFromPage}
      />

      <ChatInput onSubmit={onNewMessage} />
    </div>
  );
};

export default ChatPanel;
