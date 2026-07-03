import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  THEME_COLOR_LABELS,
  type ThemeColorFields,
} from "@/lib/templateTheme";

export type ThemeColorEditorProps = {
  colors: ThemeColorFields;
  onChange: (patch: Partial<ThemeColorFields>) => void;
};

const ColorField = ({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="space-y-1.5">
    <div>
      <Label className="text-xs font-medium">{label}</Label>
      <p className="text-[10px] text-muted-foreground leading-snug mt-0.5">{hint}</p>
    </div>
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="h-9 w-12 rounded cursor-pointer border shrink-0"
      />
      <Input value={value} onChange={e => onChange(e.target.value)} className="font-mono text-xs" />
    </div>
  </div>
);

/** Separated theme color controls for admin + template customization sidebars. */
export function ThemeColorEditor({ colors, onChange }: ThemeColorEditorProps) {
  return (
    <div className="space-y-4">
      {THEME_COLOR_LABELS.map(({ key, label, hint }) => (
        <ColorField
          key={key}
          label={label}
          hint={hint}
          value={colors[key]}
          onChange={v => onChange({ [key]: v })}
        />
      ))}
    </div>
  );
}
