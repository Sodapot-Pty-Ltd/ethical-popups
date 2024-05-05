import usePopup, { type AppProps } from "./App.hooks";

import "./App.css";

function App({ openText, content, config }: AppProps) {
  const {
    loaded,
    open,
    setOpen,
    openText: openText_,
    content: content_,
  } = usePopup({
    openText,
    content,
    config,
  });

  return (
    <div
      className={`ep-fixed -ep-right-[1px] ep-top-[50%] -ep-translate-y-1/2 `}
      onClick={(e) => e.stopPropagation()}
      style={{
        zIndex: config?.zIndex ?? 1,
        marginTop: `${config?.yOffset ?? "0px"}`,
      }}
    >
      {/* Toggle */}
      <div
        className={`ep-bg-white ep-text-black ep-absolute ep-top-1/2 -ep-translate-y-1/2 ep-right-1 ep-py-1 ep-px-3 ep-rounded-l-xl ep-cursor-pointer ep-text-sm ep-transition-transform ${
          !loaded && open && "ep-translate-x-full"
        }`}
        onClick={() => setOpen(!open)}
        style={{
          ...(config?.bgColor && { backgroundColor: config.bgColor }),
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: openText_ }}></div>
      </div>

      {/* Content */}
      <div
        className={`ep-relative ep-transition-transform ${
          loaded && !open && "ep-translate-x-full"
        }`}
      >
        <div
          className={`ep-bg-white ep-text-black ${
            config?.contentRounded && "ep-rounded-l-2xl"
          } ${config?.contentPadded && "ep-p-8"}`}
          style={{
            ...(config?.bgColor && { backgroundColor: config.bgColor }),
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: content_ }}></div>
        </div>
      </div>
    </div>
  );
}

export default App;
