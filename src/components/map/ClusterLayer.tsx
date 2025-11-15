interface ClusterLayerProps {
  count: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export function ClusterLayer({ count, isSelected = false, onClick }: ClusterLayerProps) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 'var(--bb-cluster-size)',
        height: 'var(--bb-cluster-size)',
        borderRadius: '50%',
        backgroundColor: isSelected ? 'var(--bb-brook)' : 'var(--bb-moss)',
        color: 'var(--bb-text-on-brand)',
        border: `2px solid ${isSelected ? 'var(--bb-ridge)' : 'var(--bb-border)'}`,
        fontFamily: 'var(--bb-font-body)',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 160ms cubic-bezier(0.2,0.8,0.2,1)',
        boxShadow: isSelected ? 
          '0 4px 12px rgba(0,0,0,0.2)' : 
          '0 2px 8px rgba(0,0,0,0.1)',
        transform: isSelected ? 'scale(1.1)' : 'scale(1)',
      }}
      aria-label={`${count} yards in this area${isSelected ? ' (selected)' : ''}`}
      type="button"
    >
      {count > 99 ? '99+' : count}
    </button>
  );
}