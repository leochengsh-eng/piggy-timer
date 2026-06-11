import { ComponentProps } from "react";

type EditableFieldProps = ComponentProps<"input"> & {
  label?: string;
  multiline?: false;
};

type EditableTextareaProps = ComponentProps<"textarea"> & {
  label?: string;
  multiline: true;
};

export function EditableField(props: EditableFieldProps | EditableTextareaProps) {
  const { label, className = "", multiline, ...fieldProps } = props;
  return (
    <label className="block space-y-1.5">
      {label ? <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</span> : null}
      {multiline ? (
        <textarea
          {...(fieldProps as ComponentProps<"textarea">)}
          className={`editable min-h-24 resize-y leading-7 ${className}`}
        />
      ) : (
        <input {...(fieldProps as ComponentProps<"input">)} className={`editable ${className}`} />
      )}
    </label>
  );
}
