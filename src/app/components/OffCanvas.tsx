import { type CSSProperties, type ReactNode } from "react";
import { useIsMobile } from "./use-mobile";

interface OffCanvasProps {
  open: boolean;
  onClose: () => void;
  width: number;
  zIndex?: number;
  transition?: string;
  role?: string;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function OffCanvas({
  open,
  onClose,
  width,
  zIndex = 40,
  transition = "transform 0.3s ease",
  role,
  ariaLabel,
  className = "",
  style,
  children,
}: OffCanvasProps) {
  const isMobile = useIsMobile();

  return (
    <>
      <div
        role={role}
        aria-label={ariaLabel}
        className={`${isMobile ? "fixed inset-y-0 left-0" : "relative"} shrink-0 overflow-y-auto ${className}`}
        style={{
          width,
          position: isMobile ? "fixed" : "relative",
          zIndex: isMobile ? zIndex : "auto",
          transform: isMobile ? (open ? "translateX(0)" : "translateX(-100%)") : "none",
          transition,
          visibility: isMobile && !open ? "hidden" : "visible",
          ...style,
        }}
        aria-hidden={isMobile && !open ? "true" : undefined}
      >
        {children}
      </div>
      {isMobile && open && (
        <div
          className="fixed inset-0 bg-black/50"
          style={{ zIndex: zIndex - 10 }}
          onClick={onClose}
          aria-hidden="true"
        />
      )}
    </>
  );
}
