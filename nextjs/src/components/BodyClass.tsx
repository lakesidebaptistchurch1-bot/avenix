"use client";

import { useEffect } from "react";

export function BodyClass(props: { className: string }) {
  useEffect(() => {
    const classes = props.className.split(/\s+/).filter(Boolean);
    for (const c of classes) document.body.classList.add(c);
    return () => {
      for (const c of classes) document.body.classList.remove(c);
    };
  }, [props.className]);

  return null;
}

