import { style } from "@vanilla-extract/css";

export const root = style({
    padding: "3px",
    background: "white",
    color: "#333",
    borderRadius: "6px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
});

export const actions = style({
    display: "flex",
    gap: "4px",
    flexDirection: "row",
});

export const button = style({
    appearance: "none",
    border: "none",
    padding: "4px 6px",
    borderRadius: "3px",
    background: "white",
    ":hover": {
        background: "#f0f0f0",
    },
});

export const results = style({
    display: "flex",
    gap: "4px",
    flexDirection: "column",
});

export const resultItem = style({
    appearance: "none",
    border: "none",
    padding: "4px 6px",
    borderRadius: "3px",
    background: "white",
    flexDirection: "column",
    textAlign: "left",
    alignItems: "flex-start",
    lineHeight: "1.3",
    ":hover": {
        background: "#f0f0f0",
    },
});

export const resultTitle = style({});

export const resultUrl = style({
    fontSize: "0.8em",
    color: "#666",
});

export const clear = style({
    appearance: "none",
    border: "none",
    padding: "4px 6px",
    borderRadius: "3px",
    background: "white",
    ":hover": {
        background: "#f0f0f0",
    },
});

export const noResults = style({
    fontSize: "0.8em",
    color: "#666",
    fontStyle: "italic",
});
