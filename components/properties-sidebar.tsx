"use client"

import { type Node, type Edge, MarkerType } from '@xyflow/react';
import { BACKGROUND_COLORS, TEXT_COLORS, CONTAINER_COLORS } from '@/constants/colors';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import {
  BezierIcon, StraightIcon, StepIcon, SmoothIcon, ArcIcon,
  SolidIcon, DashedIcon, DottedIcon,
  ArrowNoneIcon, ArrowOpenIcon, ArrowFilledIcon, ArrowBothIcon,
} from '@/components/sidebar-icons';
import {
  T,
  Sep, SwatchSection, OptionSection, Swatch, OptionButton, FieldLabel,
} from '@/components/sidebar-components';

interface PropertiesSidebarProps {
  selectedNode: Node | null;
  selectedEdge: Edge | null;
  onNodeDataChange: (nodeId: string, updates: Record<string, unknown>) => void;
  onEdgeChange: (edgeId: string, updates: Partial<Edge>) => void;
  onClose: () => void;
}

const BG_COLOR_KEYS = Object.keys(BACKGROUND_COLORS);
const TEXT_COLOR_KEYS = Object.keys(TEXT_COLORS);

const FONT_SIZES = [
  { label: 'XS', value: '10px' },
  { label: 'S',  value: '12px' },
  { label: 'M',  value: '16px' },
  { label: 'L',  value: '24px' },
  { label: 'XL', value: '40px' },
];

const LINE_TYPES = [
  { value: 'default',    label: 'Bezier',   icon: <BezierIcon /> },
  { value: 'straight',   label: 'Straight', icon: <StraightIcon /> },
  { value: 'step',       label: 'Step',     icon: <StepIcon /> },
  { value: 'smoothstep', label: 'Smooth',   icon: <SmoothIcon /> },
  { value: 'arc',        label: 'Arc',      icon: <ArcIcon /> },
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
        backgroundColor: 'var(--background)',
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
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = T.surface)}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <X size={12} strokeWidth={2.5} />
        </button>
      </div>

      {/* Body */}
      <div className="overflow-y-auto" style={{ maxHeight: 'calc(85vh - 42px)' }}>

        {selectedNode && (
          <>
            <div className="px-3 pt-3 pb-3">
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                {[
                  { label: 'ID',   value: selectedNode.id },
                  { label: 'Type', value: selectedNode.type ?? '—' },
                  { label: 'X',    value: Math.round(selectedNode.position.x) },
                  { label: 'Y',    value: Math.round(selectedNode.position.y) },
                  { label: 'W',    value: selectedNode.measured?.width  ?? '—' },
                  { label: 'H',    value: selectedNode.measured?.height ?? '—' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-baseline gap-1.5 min-w-0">
                    <span className="text-[9px] font-bold tracking-wider uppercase shrink-0" style={{ color: T.muted }}>{label}</span>
                    <span className="text-[10px] font-mono truncate" style={{ color: T.text }} title={String(value)}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <Sep />

            {selectedNode.type === 'card' ? (
              <div className="px-3 pt-3 pb-3 flex flex-col gap-3">
                <div>
                  <FieldLabel>Title</FieldLabel>
                  <input
                    type="text"
                    value={(selectedNode.data.title as string) ?? ''}
                    placeholder="Card title…"
                    onChange={e => onNodeDataChange(selectedNode.id, { title: e.target.value })}
                    className="w-full text-[11px] px-2 py-1 rounded-md outline-none"
                    style={{ backgroundColor: T.surface, border: `1px solid ${T.border}`, color: T.text }}
                  />
                </div>
                <div>
                  <FieldLabel>Content</FieldLabel>
                  <textarea
                    value={(selectedNode.data.content as string) ?? ''}
                    placeholder="Card content…"
                    rows={4}
                    onChange={e => onNodeDataChange(selectedNode.id, { content: e.target.value })}
                    className="w-full text-[11px] px-2 py-1.5 rounded-md outline-none resize-none"
                    style={{ backgroundColor: T.surface, border: `1px solid ${T.border}`, color: T.text }}
                  />
                </div>
              </div>
            ) : (
              <div className="px-3 pt-3 pb-3">
                <FieldLabel>Label</FieldLabel>
                <textarea
                  value={(selectedNode.data.label as string) ?? ''}
                  placeholder="Node label…"
                  rows={3}
                  onChange={e => onNodeDataChange(selectedNode.id, { label: e.target.value })}
                  className="w-full text-[11px] px-2 py-1.5 rounded-md outline-none resize-none"
                  style={{ backgroundColor: T.surface, border: `1px solid ${T.border}`, color: T.text }}
                />
              </div>
            )}
            <Sep />
            {selectedNode.type === 'container' && (
              <>
                <SwatchSection label="Background color">
                  <Swatch label="Default" isSelected={!(selectedNode.data?.color as string)}
                    onClick={() => onNodeDataChange(selectedNode.id, { color: undefined })} />
                  {Object.entries(CONTAINER_COLORS).filter(([key]) => key !== 'default').map(([key, val]) => (
                    <Swatch key={key} color={val.border.replace(' / 0.55)', ')')} label={key}
                      isSelected={(selectedNode.data?.color as string) === key}
                      onClick={() => onNodeDataChange(selectedNode.id, { color: key })} />
                  ))}
                </SwatchSection>
                <Sep />
              </>
            )}
            {!isTextNode && selectedNode.type !== 'container' && (
              <>
                <SwatchSection label="Background">
                  <Swatch label="Default" isSelected={!currentBg}
                    onClick={() => onNodeDataChange(selectedNode.id, { background: undefined })} />
                  {BG_COLOR_KEYS.map(key => (
                    <Swatch key={key} color={BACKGROUND_COLORS[key]} label={key}
                      isSelected={currentBg === key}
                      onClick={() => onNodeDataChange(selectedNode.id, { background: key })} />
                  ))}
                </SwatchSection>
                <Sep />
              </>
            )}

            {selectedNode.type !== 'container' && (
              <>
                <SwatchSection label="Text color">
                  <Swatch label="Default" isSelected={!currentTextKey}
                    onClick={() => handleTextColorChange(undefined)} />
                  {TEXT_COLOR_KEYS.map(key => (
                    <Swatch key={key} color={TEXT_COLORS[key]} label={key}
                      isSelected={currentTextKey === key}
                      onClick={() => handleTextColorChange(key)} />
                  ))}
                </SwatchSection>
                <Sep />
                <div className="px-3 pt-3 pb-3">
                  <FieldLabel>Font size</FieldLabel>
                  <div className="flex items-center gap-1.5 mb-2">
                    {FONT_SIZES.map(({ label, value }) => (
                      <OptionButton key={value} label={value}
                        icon={<span className="text-[9px] font-bold">{label}</span>}
                        isSelected={(selectedNode.data?.fontSize as string) === value}
                        onClick={() => onNodeDataChange(selectedNode.id, { fontSize: value })} />
                    ))}
                  </div>
                  <input
                    type="range"
                    min={6}
                    max={72}
                    value={
                      (selectedNode.data?.fontSize as string)
                        ? parseInt(selectedNode.data.fontSize as string, 10)
                        : 14
                    }
                    onChange={e => {
                      onNodeDataChange(selectedNode.id, { fontSize: `${e.target.value}px` });
                    }}
                    className="sidebar-slider"
                  />
                  <span className="text-[10px] font-mono mt-1.5 block text-center" style={{ color: T.muted }}>
                    {(selectedNode.data?.fontSize as string)
                      ? parseInt(selectedNode.data.fontSize as string, 10)
                      : 14}px
                  </span>
                </div>
              </>
            )}
          </>
        )}

        {selectedEdge && (
          <>
            <div className="px-3 pt-3 pb-3">
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                {[
                  { label: 'ID',     value: selectedEdge.id,     full: false },
                  { label: 'Source', value: selectedEdge.source, full: true  },
                  { label: 'Target', value: selectedEdge.target, full: true  },
                ].map(({ label, value, full }) => (
                  <div key={label} className={`flex items-baseline gap-1.5 min-w-0${full ? ' col-span-2' : ''}`}>
                    <span className="text-[9px] font-bold tracking-wider uppercase shrink-0" style={{ color: T.muted }}>{label}</span>
                    <span className="text-[10px] font-mono truncate" style={{ color: T.text }} title={String(value)}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-3 pb-3">
              <FieldLabel>Label</FieldLabel>
              <input
                type="text"
                value={(selectedEdge.label as string) ?? ''}
                placeholder="Add label…"
                onChange={e => onEdgeChange(selectedEdge.id, { label: e.target.value || undefined })}
                className="w-full text-[11px] px-2 py-1 rounded-md outline-none"
                style={{
                  backgroundColor: T.surface,
                  border: `1px solid ${T.border}`,
                  color: T.text,
                }}
              />
            </div>
            <Sep />
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
