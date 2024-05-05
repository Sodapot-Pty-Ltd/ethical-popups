import React from "react";
import ReactDOM, { Root } from "react-dom/client";
import Component from "./App.tsx";

import { type AppProps } from "./App.hooks.tsx";

import "./index.css";

declare global {
  interface Window {
    popup: any;
  }
}

interface InitParams extends AppProps {
  mountId?: string;
}

/**
 * A popup that hides from view after initial load
 *  with an option for the user to re-open.
 *
 * How many popups have you closed without reading
 *  lately? Popups do not need to be intrusive or
 *  de-sensitizing to be able to attract the
 *  attention of potentially interested users.
 */

/** Export: Init class */
export class Popup {
  public root: Root;

  constructor({ mountId, openText, content, config }: InitParams) {
    const mountElement: HTMLElement | null = mountId
      ? document.getElementById(mountId)
      : document.body;

    this.root = ReactDOM.createRoot(mountElement!);

    this.root.render(
      <React.StrictMode>
        <Component content={content} openText={openText} config={config} />
      </React.StrictMode>
    );
  }

  update({ openText, content }: AppProps): void {
    document.dispatchEvent(
      new CustomEvent("setReactState", { detail: { openText, content } })
    );
  }

  remove(): void {
    this.root.unmount();
  }
}

if (import.meta.env.DEV) {
  window.popup = new Popup({
    mountId: "root",
    openText: "Subscribe",
    content:
      "<img width='200' title='Your ad, form, etc.' src='https://source.unsplash.com/random' />",
    config: {
      autoHideDelay: 3000,
    },
  });
}

/** Export: React component */
export default Component;
