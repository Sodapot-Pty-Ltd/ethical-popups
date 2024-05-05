import { useState, useEffect } from "react";

/** Add custom configurations */
export interface AppConfig {
  bgColor?: string;
  zIndex?: number;
  contentRounded?: boolean;
  contentPadded?: boolean;
  autoHideDelay?: number;
  yOffset?: number | string;
}

export interface AppProps {
  openText: string;
  content: string;
  config?: AppConfig;
}

export default function usePopup({ openText, content, config }: AppProps) {
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [openText_, setopenText] = useState(openText);
  const [content_, setContent] = useState(content);

  /** Auto-show on mount, or on update */
  useEffect(() => {
    let loading: any;
    if (!loaded) {
      loading = setTimeout(
        () => setLoaded(true),
        config?.autoHideDelay ?? 1000
      );
    }
    return () => clearTimeout(loading);
  }, [loaded]);

  /** Close on click-outside, update listener (title and content) */
  useEffect(() => {
    const update = (ev: CustomEvent) => {
      const { openText, content } = ev.detail;
      setopenText(openText);
      setContent(content);
      setLoaded(false);
    };

    const updatePopup = update as EventListener;

    const close = () => setOpen(false);
    document.addEventListener("click", close, false);
    document.addEventListener("setReactState", updatePopup, false);

    return () => {
      document.removeEventListener("click", close, false);
      document.removeEventListener("setReactState", updatePopup, false);
    };
  }, []);

  return {
    open,
    setOpen,
    loaded,
    openText: openText_,
    content: content_,
  };
}
