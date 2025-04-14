import { useAppTheme } from '@oxygen/hooks';

interface IProps {
  active?: any;
  payload?: any;
  label?: string;
}
const CustomTooltip = (props: IProps) => {
  const theme = useAppTheme();
  // console.log('rev pay',payload.reverse());
  const { payload, active, label } = props;
  const reversedPayload = [...payload].reverse();
  if (active && payload && payload.length) {
    return (
      <div
        className='custom-tooltip'
        style={{
          borderRadius: '12px',
          border: '1px solid transparent',
          backgroundColor: theme.secondary._50,
          boxShadow: '0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026',
          direction: 'rtl',
          padding: '1.2rem',
        }}
      >
        {label}
        {reversedPayload.map((entry: any, index: number) => (
          <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {/* Add a circle with the same color as the line */}
            <svg width='12' height='12'>
              <circle cx='5' cy='5' r='5' fill={entry.color} />
            </svg>
            <span style={{ color: entry.color, marginLeft: '0.5rem' }}>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};
export default CustomTooltip;
