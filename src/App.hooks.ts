import { useRef, useState, useEffect } from "react";

/** Add custom configurations */
export interface AppConfig {
  bgColor?: string;
  zIndex?: number;
  contentRounded?: boolean;
  contentPadded?: boolean;
  autoHideDelay?: number;
  yOffset?: number | string;
  onHide?: () => void;
  onShow?: () => void;
}

export interface AppProps {
  openText: string;
  content: string;
  config?: AppConfig;
}

export default function usePopup({ openText, content, config }: AppProps) {
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const isShowing = useRef<null | boolean>(null);
  const [openText_, setOpenText] = useState(openText);
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
      setOpenText(openText);
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

  useEffect(() => {
    const isShowing_ = !loaded || open;
    const showStateHasChanged = isShowing.current !== isShowing_;
    isShowing.current = isShowing_;

    if (showStateHasChanged) {
      if (isShowing_) {
        config?.onShow?.();
      } else {
        config?.onHide?.();
      }
    }
  }, [loaded, open]);

  return {
    loaded,
    open,
    setOpen,
    openText: openText_,
    content: content_,
  };
}
