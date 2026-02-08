import { globalStyle, style } from "@vanilla-extract/css";

export const root = style({
    textAlign: "left",
});

globalStyle(`${root} .ProseMirror`, {
    minHeight: "200px",
});

globalStyle(`${root} .ProseMirror p`, {
    margin: "0.25em 0",
});

globalStyle(`${root} .ProseMirror:focus`, {
    outline: "none",
});

globalStyle(`${root} .ProseMirror-focused`, {
    outline: "none",
});

globalStyle(`${root} .ProseMirror-yjs-cursor`, {
    position: "relative",
    marginLeft: "-1px",
    marginRight: "-1px",
    borderLeft: "2px solid currentColor",
    borderRight: "2px solid currentColor",
    wordBreak: "normal",
    pointerEvents: "none",
});

export const editor = style({});

export const caretsCaret = style({
    position: "relative",
    pointerEvents: "none",
    height: "1em",
    width: "2px",
    bottom: "-1px",
    display: "inline-block",
});

export const caretsLabel = style({
    position: "absolute",
    left: 0,
    top: "-1.6em",
    padding: "0.1em 0.4em",
    borderRadius: "3px",
    borderBottomLeftRadius: 0,
    fontSize: "0.7em",
    whiteSpace: "nowrap",
    pointerEvents: "none",
});

export const caretsLabelTyping = style({
    fontStyle: "italic",
});
