"use client";
import gsap from "gsap";
import React, { useRef, useEffect, useState } from "react";

interface SplineViewerProps {
  url?: string;
  eventsTarget: "global" | "local";
  onSplineLoad?: () => void;
}

const SPLINE_VIEWER_SCRIPT =
  "https://unpkg.com/@splinetool/viewer/build/spline-viewer.js";
const DEFAULT_URL =
  "https://prod.spline.design/Kvrw5UxkAV74ehhl/scene.splinecode";

const useSplineScript = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.defer = true;
    script.src = SPLINE_VIEWER_SCRIPT;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
};

const removeLogo = (element: Element | null) => {
  element?.shadowRoot?.querySelectorAll("#logo")[0]?.remove();
  document.getElementById("logo")?.remove();
};

const SplineViewer: React.FC<SplineViewerProps> = ({
  url,
  eventsTarget,
  onSplineLoad,
}) => {
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useSplineScript();

  useEffect(() => {
    const script = document.querySelector(
      `script[src="${SPLINE_VIEWER_SCRIPT}"]`
    );

    const initializeViewer = () => {
      if (viewerRef.current?.children.length === 0 && isMounted) {
        const viewer = document.createElement("spline-viewer");
        viewer.setAttribute("url", url || DEFAULT_URL);
        viewer.setAttribute("events-target", eventsTarget);
        viewerRef.current.appendChild(viewer);
        removeLogo(viewerRef.current.children[0]);
        gsap.delayedCall(0.75, () => onSplineLoad?.());
      }
    };

    if (script) {
      script.addEventListener("load", initializeViewer);
      return () => script.removeEventListener("load", initializeViewer);
    }
  }, [url, eventsTarget, isMounted, onSplineLoad]);

  return <div ref={viewerRef} />;
};

export { SplineViewer };
