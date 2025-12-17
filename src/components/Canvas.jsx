import ChartArtifact from './ChartArtifact';
import TableArtifact from './TableArtifact';

const Canvas = ({ artifact, onClose }) => {
  if (!artifact) return null;

  return (
    <div className="canvas">
      <div className="canvas__header">
        <h2 className="canvas__title">{artifact.title}</h2>
        <button className="canvas__close-btn" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            width="16"
            height="16"
          >
            <path
              fillRule="evenodd"
              d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
              clipRule="evenodd"
            />
          </svg>
          Collapse
        </button>
      </div>

      <div className="canvas__content">
        <div className="canvas__artifact">
          <div className="canvas__artifact-header">
            <h3 className="canvas__artifact-title">{artifact.title}</h3>
          </div>
          <div className="canvas__artifact-content">
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
      </div>
    </div>
  );
};

export default Canvas;

