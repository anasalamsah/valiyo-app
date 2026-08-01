import {
  Eye,
  Brain,
  Puzzle,
  HelpCircle,
  Palette,
  Calculator,
  BookOpen,
  MessageSquare,
  FlaskConical,
  Activity,
  Target,
  Lightbulb,
  ShieldCheck,
  Grid,
  Cpu,
  Crown,
  Users,
  UserCheck,
  Boxes,
  PlusCircle,
  Music,
  Sun,
  Hand,
  Smile,
  Compass,
  HeartHandshake,
  Sparkles,
  Wrench,
  Megaphone,
  Search,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Eye,
  Brain,
  Puzzle,
  HelpCircle,
  Palette,
  Calculator,
  BookOpen,
  MessageSquare,
  FlaskConical,
  Activity,
  Target,
  Lightbulb,
  ShieldCheck,
  Grid,
  Cpu,
  Crown,
  Users,
  UserCheck,
  Boxes,
  PlusCircle,
  Music,
  Sun,
  Hand,
  Smile,
  Compass,
  HeartHandshake,
  Sparkles,
  Wrench,
  Megaphone,
  Search,
};

export function DomainIcon({
  name,
  size = 18,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Icon = ICON_MAP[name] ?? Sparkles;
  return <Icon size={size} className={className} aria-hidden="true" />;
}
