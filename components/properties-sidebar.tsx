"use client"

import { type Node, type Edge, MarkerType } from '@xyflow/react';
import { COLORS, TEXT_COLORS } from '@/constants/colors';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import {
  BezierIcon, StraightIcon, StepIcon, SmoothIcon,
  SolidIcon, DashedIcon, DottedIcon,
  ArrowNoneIcon, ArrowOpenIcon, ArrowFilledIcon, ArrowBothIcon,
} from '@/components/sidebar-icons';
import {
  T,
  Sep, SwatchSection, OptionSection, Swatch, OptionButton,
} from '@/components/sidebar-components';

interface PropertiesSidebarProps {
  selectedNode: Node | null;
  selectedEdge: Edge | null;
  onNodeDataChange: (nodeId: string, updates: Record<string, unknown>) => void;
  onEdgeChange: (edgeId: string, updates: Partial<Edge>) => void;
  onClose: () => void;
}

const BG_COLOR_KEYS = Object.keys(COLORS);
const TEXT_COLOR_KEYS = Object.keys(TEXT_COLORS);

const LINE_TYPES = [
  { value: 'default',    label: 'Bezier',   icon: <BezierIcon /> },
  { value: 'straight',   label: 'Straight', icon: <StraightIcon /> },
  { value: 'step',       label: 'Step',     icon: <StepIcon /> },
  { value: 'smoothstep', label: 'Smooth',   icon: <SmoothIcon /> },
] as const;

const LINE_STYLES = [
  { value: 'solid',  label: 'Solid',  dasharray: undefined, icon: <SolidIcon /> },
  { value: 'dashed', label: 'Dashed', dasharray: '6 3',     icon: <DashedIcon /> },
  { value: 'dotted', label: 'Dotted', dasharray: '2 4',     icon: <DottedIcon /> },
] as const;

const ARROW_OPTIONS = [
  { value: 'none' as const,        label: 'None',   icon: <ArrowNoneIcon /> },
  { value: MarkerType.Arrow,       label: 'Open',   icon: <ArrowOpenIcon /> },
  { value: MarkerType.ArrowClosed, label: 'Filled', icon: <ArrowFilledIcon /> },
  { value: 'both' as const,        label: 'Both',   icon: <ArrowBothIcon /> },
];

export function PropertiesSidebar({
  selectedNode,
  selectedEdge,
  onNodeDataChange,
  onEdgeChange,
  onClose,
}: PropertiesSidebarProps) {
  const isOpen = selectedNode !== null || selectedEdge !== null;
  const isTextNode = selectedNode?.type === 'text';

  const edgeStyle = selectedEdge?.style as React.CSSProperties | undefined;
  const currentLineStyle = (() => {
    const da = edgeStyle?.strokeDasharray;
    if (!da) return 'solid';
    if (String(da).startsWith('6')) return 'dashed';
    if (String(da).startsWith('2')) return 'dotted';
    return 'solid';
  })();

  const currentArrow = (() => {
    const me = selectedEdge?.markerEnd;
    const ms = selectedEdge?.markerStart;
    if (me && ms) return 'both';
    if (!me) return 'none';
    if (typeof me === 'string') return me;
    return (me as { type: string }).type ?? 'none';
  })();

  const currentBg = selectedNode?.data?.background as string | undefined;
  const currentTextKey = isTextNode
    ? (selectedNode?.data?.color as string | undefined)
    : (selectedNode?.data?.textColor as string | undefined);

  const handleTextColorChange = (key: string | undefined) => {
    if (!selectedNode) return;
    onNodeDataChange(selectedNode.id, isTextNode ? { color: key } : { textColor: key });
  };

  return (
    <div
      aria-hidden={!isOpen}
      className={cn(
        'fixed left-4 top-1/2 z-20 w-[220px]',
        'rounded-xl overflow-hidden',
        'transition-[transform,opacity] duration-[200ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
        'motion-reduce:transition-none',
        isOpen
          ? 'opacity-100 -translate-y-1/2 translate-x-0 pointer-events-auto'
          : 'opacity-0 -translate-y-1/2 -translate-x-2 pointer-events-none',
      )}
      style={{
        backgroundColor: T.bg,
        boxShadow: T.shadow,
        color: T.text,
        maxHeight: '85vh',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-2.5"
        style={{ borderBottom: `1px solid ${T.sep}` }}
      >
        <div className="flex items-center gap-2">
          <span
            className="text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded-md"
            style={{ backgroundColor: T.accentBg, color: T.accentText }}
          >
            {selectedNode ? (isTextNode ? 'text' : 'node') : 'edge'}
          </span>
          <span className="text-[11px] font-medium" style={{ color: T.muted }}>
            properties
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close panel"
          className={cn(
            'w-6 h-6 flex items-center justify-center rounded-md',
            'transition-colors duration-100',
          )}
          style={{ color: T.muted }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = T.hover)}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <X size={12} strokeWidth={2.5} />
        </button>
      </div>

      {/* Body */}
      <div className="overflow-y-auto" style={{ maxHeight: 'calc(85vh - 42px)' }}>

        {selectedNode && (
          <>
            {!isTextNode && (
              <>
                <SwatchSection label="Background">
                  <Swatch label="Default" isSelected={!currentBg}
                    onClick={() => onNodeDataChange(selectedNode.id, { background: undefined })} />
                  {BG_COLOR_KEYS.map(key => (
                    <Swatch key={key} color={COLORS[key]} label={key}
                      isSelected={currentBg === key}
                      onClick={() => onNodeDataChange(selectedNode.id, { background: key })} />
                  ))}
                </SwatchSection>
                <Sep />
              </>
            )}

            <SwatchSection label="Text color">
              <Swatch label="Default" isSelected={!currentTextKey}
                onClick={() => handleTextColorChange(undefined)} />
              {TEXT_COLOR_KEYS.map(key => (
                <Swatch key={key} color={TEXT_COLORS[key]} label={key}
                  isSelected={currentTextKey === key}
                  onClick={() => handleTextColorChange(key)} />
              ))}
            </SwatchSection>
          </>
        )}

        {selectedEdge && (
          <>
            <OptionSection label="Line type">
              {LINE_TYPES.map(({ value, label, icon }) => (
                <OptionButton key={value} icon={icon} label={label}
                  isSelected={selectedEdge.type === value || (!selectedEdge.type && value === 'default')}
                  onClick={() => onEdgeChange(selectedEdge.id, { type: value })} />
              ))}
            </OptionSection>

            <Sep />

            <OptionSection label="Line style">
              {LINE_STYLES.map(({ value, label, dasharray, icon }) => (
                <OptionButton key={value} icon={icon} label={label}
                  isSelected={currentLineStyle === value}
                  onClick={() => onEdgeChange(selectedEdge.id, {
                    style: { ...(selectedEdge.style as React.CSSProperties), strokeDasharray: dasharray },
                  })} />
              ))}
            </OptionSection>

            <Sep />

            <OptionSection label="Arrow">
              {ARROW_OPTIONS.map(({ value, label, icon }) => (
                <OptionButton key={value} icon={icon} label={label}
                  isSelected={currentArrow === value}
                  onClick={() => onEdgeChange(selectedEdge.id,
                    value === 'none'
                      ? { markerEnd: undefined, markerStart: undefined }
                      : value === 'both'
                        ? { markerEnd: { type: MarkerType.ArrowClosed }, markerStart: { type: MarkerType.ArrowClosed } }
                        : { markerEnd: { type: value as MarkerType }, markerStart: undefined },
                  )} />
              ))}
            </OptionSection>

            <Sep />

            <div className="px-3 pt-3 pb-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold select-none tracking-wide" style={{ color: T.muted }}>
                  Animated
                </span>
                <Switch
                  checked={selectedEdge.animated ?? false}
                  onCheckedChange={v => onEdgeChange(selectedEdge.id, { animated: v })}
                  size="sm"
                  className="data-checked:bg-[oklch(0.52_0.21_265)]"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
