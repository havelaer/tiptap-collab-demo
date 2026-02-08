import { HocuspocusProvider } from "@hocuspocus/provider";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCaret from "@tiptap/extension-collaboration-caret";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useEffect, useMemo, useRef } from "react";
import * as Y from "yjs";
import { client } from "../utils/orpc.ts";
import * as css from "./Editor.css.ts";

const WS_URL = import.meta.env.VITE_WS_URL ?? "ws://localhost:5175";

const USER_COLORS = [
    "#e6194b",
    "#3cb44b",
    "#4363d8",
    "#f58231",
    "#911eb4",
    "#46f0f0",
    "#f032e6",
    "#bcf60c",
    "#fabebe",
    "#008080",
];

function randomUser() {
    return {
        name: `User ${Math.random().toString(36).slice(2, 6)}`,
        color: USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)] ?? "#94a3b8",
    };
}

function caretLabelRender(user: Record<string, unknown>) {
    const cursor = document.createElement("span");
    cursor.classList.add(css.caretsCaret);
    cursor.setAttribute("style", `background-color: ${user.color ?? "#94a3b8"}`);

    const label = document.createElement("div");
    label.classList.add(css.caretsLabel);
    if (user.typing) {
        label.classList.add(css.caretsLabelTyping);
    }
    label.setAttribute("style", `background-color: ${user.color ?? "#94a3b8"}`);
    const name = typeof user.name === "string" ? user.name : "User";
    label.insertBefore(document.createTextNode(name), null);
    cursor.insertBefore(label, null);

    return cursor;
}

export function Editor() {
    const ydoc = useMemo(() => new Y.Doc(), []);
    const user = useMemo(() => randomUser(), []);
    const provider = useMemo(() => {
        const p = new HocuspocusProvider({
            url: `${WS_URL}/hocuspocus`,
            name: "example-document",
            document: ydoc,
        });
        return p;
    }, [ydoc]);

    useEffect(() => {
        client.sources.findSourcesMock({ query: "1672 kennen we ook als het rampjaar" });
    }, []);

    const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const TYPING_DEBOUNCE_MS = 2000;

    const setTyping = useCallback(
        (typing: boolean) => {
            try {
                provider.setAwarenessField("user", { ...user, typing });
            } catch {
                // awareness may be null if provider is destroyed
            }
        },
        [provider, user],
    );

    useEffect(() => {
        if (!provider.awareness) return;
        provider.setAwarenessField("user", { ...user, typing: false });
    }, [provider, user]);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                undoRedo: false,
            }),
            Collaboration.configure({
                document: ydoc,
                field: "content",
                provider,
            }),
            CollaborationCaret.configure({
                provider,
                user: { ...user, typing: false },
                render: caretLabelRender,
            }),
        ],
        editorProps: {
            attributes: {
                class: css.editor,
            },
            handleDOMEvents: {
                keydown: () => {
                    setTyping(true);
                    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
                    typingTimeoutRef.current = setTimeout(() => {
                        setTyping(false);
                        typingTimeoutRef.current = null;
                    }, TYPING_DEBOUNCE_MS);
                },
            },
        },
    });

    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
            setTyping(false);
            provider.destroy();
            ydoc.destroy();
        };
    }, [provider, ydoc, setTyping]);

    return (
        <div className={css.root}>
            <EditorContent editor={editor} />
        </div>
    );
}
