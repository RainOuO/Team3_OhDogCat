import './ProgressBar.scss';

function ProgressBar(props) {
  const { maxSteps, step, progressNames } = props;

  return (
    <>
      <div className="ProgressBar">
        <div className="display-in-mobile">
          <ul className="progressbar">
            {Array(maxSteps)
              .fill(1)
              .map((v, i) => {
                return (
                  <li key={i} className={i + 1 <= step ? 'active' : ''}>
                    {progressNames[i]}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProgressBar;
