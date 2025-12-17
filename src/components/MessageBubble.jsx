import ChartArtifact from './ChartArtifact';
import TableArtifact from './TableArtifact';

const MessageBubble = ({ message, isUser, artifact, onExpandArtifact }) => {
  const renderArtifact = () => {
    if (!artifact) return null;

    return (
      <div className="artifact">
        <div className="artifact__header">
          <span className="artifact__title">{artifact.title}</span>
          <button
            className="artifact__expand-btn"
            onClick={() => onExpandArtifact(artifact)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3.28 2.22a.75.75 0 00-1.06 1.06L5.44 6.5H2.75a.75.75 0 000 1.5h4.5A.75.75 0 008 7.25v-4.5a.75.75 0 00-1.5 0v2.69L3.28 2.22zM16.72 2.22a.75.75 0 010 1.06L13.5 6.5h2.69a.75.75 0 010 1.5h-4.5A.75.75 0 0111 7.25v-4.5a.75.75 0 011.5 0v2.69l3.22-3.22a.75.75 0 011.06 0zM3.28 17.78a.75.75 0 001.06 0L7.56 14.5H4.87a.75.75 0 010-1.5h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-2.69l-3.22 3.22a.75.75 0 01-1.06-1.06zM16.72 17.78a.75.75 0 01-1.06 0L12.44 14.5h2.69a.75.75 0 000-1.5h-4.5a.75.75 0 00-.75.75v4.5a.75.75 0 001.5 0v-2.69l3.22 3.22a.75.75 0 001.06-1.06z" />
            </svg>
            Expand
          </button>
        </div>
        <div className="artifact__content">
          {artifact.type === 'chart' && (
            <ChartArtifact
              chartType={artifact.chartType}
              data={artifact.data}
              options={artifact.options}
            />
          )}
          {artifact.type === 'table' && (
            <TableArtifact headers={artifact.headers} rows={artifact.rows} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`message ${isUser ? 'message--user' : 'message--ai'}`}>
      {/* <span className="message__label">{isUser ? 'You' : 'AI Agent'}</span> */}
      <div className="message__bubble">{message}</div>
      {!isUser && renderArtifact()}
    </div>
  );
};

export default MessageBubble;

