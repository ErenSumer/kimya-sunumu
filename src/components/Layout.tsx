import { ReactNode } from "react";
import Navigation from "./Navigation";

interface LayoutProps {
  children: ReactNode;
  onNext: () => void;
  onPrev: () => void;
  currentSlide: number;
  totalSlides: number;
}

const Layout = ({
  children,
  onNext,
  onPrev,
  currentSlide,
  totalSlides,
}: LayoutProps) => {
  return (
    <div className="h-screen bg-black text-white overflow-hidden relative">
      <main className="h-full">{children}</main>
      <Navigation
        onNext={onNext}
        onPrev={onPrev}
        currentSlide={currentSlide}
        totalSlides={totalSlides}
      />
    </div>
  );
};

export default Layout;
