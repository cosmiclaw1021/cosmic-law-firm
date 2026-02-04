import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Clapperboard,
  Copyright,
  Gavel,
  Heart,
  Info,
  Mail,
  MapPin,
  MapPinOff,
  Cross,
  Menu,
  MessageCircle,
  Monitor,
  Moon,
  Phone,
  RefreshCw,
  ShieldCheck,
  Star,
  Sun,
  X,
  Film,
  Scale,
} from "lucide-react";

export type IconName =
  | "arrow_back"
  | "arrow_forward"
  | "balance"
  | "call"
  | "chat"
  | "check"
  | "check_circle"
  | "chevron_right"
  | "close"
  | "copyright"
  | "dark_mode"
  | "desktop_windows"
  | "east"
  | "error"
  | "expand_more"
  | "favorite"
  | "gavel"
  | "info"
  | "light_mode"
  | "location_on"
  | "mail"
  | "medical_services"
  | "menu"
  | "movie"
  | "star"
  | "sync"
  | "theaters"
  | "verified"
  | "west"
  | "wrong_location";

const ICON_MAP: Record<IconName, ComponentType<LucideProps>> = {
  arrow_back: ArrowLeft,
  west: ArrowLeft,
  arrow_forward: ArrowRight,
  east: ArrowRight,
  balance: Scale,
  call: Phone,
  chat: MessageCircle,
  check: Check,
  check_circle: CheckCircle,
  chevron_right: ChevronRight,
  close: X,
  copyright: Copyright,
  dark_mode: Moon,
  desktop_windows: Monitor,
  error: AlertCircle,
  expand_more: ChevronDown,
  favorite: Heart,
  gavel: Gavel,
  info: Info,
  light_mode: Sun,
  location_on: MapPin,
  mail: Mail,
  medical_services: Cross,
  menu: Menu,
  movie: Film,
  star: Star,
  sync: RefreshCw,
  theaters: Clapperboard,
  verified: ShieldCheck,
  wrong_location: MapPinOff,
};

export type IconProps = LucideProps & {
  name: IconName;
  title?: string;
};

const Icon = ({ name, title, ...rest }: IconProps) => {
  const Component = ICON_MAP[name];
  if (!Component) {
    return null;
  }

  const ariaAttrs = title
    ? {
        "aria-label": title,
        role: "img",
      }
    : {
        "aria-hidden": true,
      };

  return <Component {...ariaAttrs} {...rest} />;
};

export default Icon;