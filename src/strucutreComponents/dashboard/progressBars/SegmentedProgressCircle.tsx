interface Props {
  r: string;
  cx: string;
  cy: string;
  strokeWidth: string;
  progress: number;
  title: string;
}

const SegmentedProgressCircle = ({ r, cx, cy, strokeWidth, progress, title }: Props) => {
  const circumference = 2 * 3.14 * Number(r);
  const offset = circumference * ((100 - progress) / 100);

  return (
    <div className="segmented-progresscircle">
      <div className="segmented-progresscircle__text">
        <div className="segmented-progresscircle__text__primary">{progress}%</div>
        <div className="segmented-progresscircle__text__secondary">{title}</div>
      </div>
      <div className="segmented-progresscircle__circles">
        <svg>
          <circle
            r={r}
            cy={Number(cy)}
            cx={Number(cx)}
            strokeWidth={Number(strokeWidth)}
            className="segmented-progresscircle__circles__background-dashes"
          ></circle>
          <circle
            r={r}
            cy={cy}
            cx={cx}
            strokeWidth={strokeWidth}
            className={`segmented-progresscircle__circles__progress-dashes`}
            stroke-dasharray={circumference + "px"}
            stroke-dashoffset={offset + "px"}
          ></circle>
        </svg>
      </div>
    </div>
  );
};

export default SegmentedProgressCircle;
