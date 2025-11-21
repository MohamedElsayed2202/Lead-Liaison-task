import { useEffect, type RefObject } from "react";

const useIntersectionObserver = (
  ref: RefObject<HTMLDivElement | null>,
  cb: () => void,
  options?: Record<string, any>
) => {
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) cb();
      },
      { threshold: 0.1, ...options }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, cb, options]);
};

export default useIntersectionObserver;
