import { useState, useEffect } from "react";

interface ActionItem {
  label: string;
  variant?: string;
  href?: string;
}

interface Project {
  id: string | number;
  category: string;
  title: string;
  subtitle?: string;
  description?: string;
  images?: string[];
  tags: string[];
  actions?: ActionItem[];
}

export function useBentoSlider(mockProjects: Project[]) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [innerImageIndex, setInnerImageIndex] = useState(0);

  const featuredProjects = mockProjects.filter((p) => p.category === "featured");
  const currentFeatured = featuredProjects[activeSlide];
  const currentProjectImages = currentFeatured?.images || [];

  // Reset the active thumbnail index whenever the main project slide changes
  useEffect(() => {
    setInnerImageIndex(0);
  }, [activeSlide]);

  // Automated main project slider rotation (6s loop)
  useEffect(() => {
    if (featuredProjects.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % featuredProjects.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredProjects.length]);

  // Nested internal image slideshow effect for screenshots (2s loop)
  useEffect(() => {
    if (currentProjectImages.length <= 1) return;
    const innerTimer = setInterval(() => {
      setInnerImageIndex((prev) => (prev + 1) % currentProjectImages.length);
    }, 2000);
    return () => clearInterval(innerTimer);
  }, [currentProjectImages.length]);

  // Manual Next control action handler
  const handleNextSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Hard lock to block parent card event streams
    if (featuredProjects.length > 0) {
      setActiveSlide((prev) => (prev + 1) % featuredProjects.length);
    }
  };

  const handleRedirect = (href?: string) => {
    if (href) window.open(href, "_blank");
  };

  // 🛡️ Bulletproof path formatter for image previews
  const rawPath = (currentProjectImages && currentProjectImages.length > 0) 
    ? currentProjectImages[innerImageIndex] 
    : "";
    
  const cleanPath = rawPath?.replace(/^\/public/, "") || "";
  const currentActivePreview = cleanPath ? encodeURI(cleanPath) : null;

  return {
    activeSlide,
    setActiveSlide,
    featuredProjects,
    currentFeatured,
    currentActivePreview,
    handleNextSlide,
    handleRedirect,
  };
}