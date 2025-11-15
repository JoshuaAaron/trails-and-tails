interface PinProps {
  isSelected?: boolean;
  size?: 'default' | 'large';
  acres?: number;
  className?: string;
  tabIndex?: number;
  role?: string;
  'aria-label'?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function Pin({ 
  isSelected = false, 
  size = 'default', 
  acres,
  className = '',
  tabIndex,
  role = 'img',
  'aria-label': ariaLabel,
  onKeyDown,
  onClick,
  onMouseEnter,
  onMouseLeave
}: PinProps) {
  const actualSize = size === 'large' || isSelected ? 40 : 32;
  
  return (
    <svg
      width={actualSize}
      height={actualSize}
      viewBox="0 0 32 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ 
        filter: isSelected ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
        transition: 'all 160ms cubic-bezier(0.2,0.8,0.2,1)',
        cursor: onClick ? 'pointer' : undefined,
      }}
      role={role}
      aria-label={ariaLabel || (isSelected ? "Selected yard location" : "Yard location")}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Pin background circle */}
      <circle
        cx="16"
        cy="16"
        r="14"
        fill={isSelected ? 'var(--bb-brook)' : 'var(--bb-bone)'}
        stroke={isSelected ? 'var(--bb-ridge)' : 'var(--bb-border)'}
        strokeWidth="2"
      />
      
      {/* Property size text */}
      {acres && (
        <text
          x="16"
          y="19"
          textAnchor="middle"
          fill={isSelected ? 'var(--bb-bone)' : 'var(--bb-ridge)'}
          fontSize="10"
          fontWeight="600"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          {acres < 1 ? '0.5' : Math.round(acres)}
        </text>
      )}
      
      {/* Pin pointer at bottom */}
      <path
        d="M16 28 L12 36 L20 36 Z"
        fill={isSelected ? 'var(--bb-brook)' : 'var(--bb-bone)'}
        stroke={isSelected ? 'var(--bb-ridge)' : 'var(--bb-border)'}
        strokeWidth="1"
      />
    </svg>
  );
}