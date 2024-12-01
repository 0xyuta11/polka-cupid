import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AtSign } from "lucide-react";

export default function InputWithIcon({
  label,
  icon,
  type,
}: {
  label: string;
  icon: React.ReactNode;
  type: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor="input-09">{label}</Label>
      <div className="relative">
        <Input
          id="input-09"
          className="peer ps-9"
          placeholder={label}
          type={type}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          {icon}
        </div>
      </div>
    </div>
  );
}
