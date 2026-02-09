import { useMutation } from "@tanstack/react-query";
import type { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { client } from "../utils/orpc.ts";
import * as css from "./SourcesPopover.css.ts";

interface SourcesPopoverProps {
    editor: Editor | null;
}

export function SourcesPopover({ editor }: SourcesPopoverProps) {
    const findSourcesMutation = useMutation({
        mutationFn: (query: string) => client.sources.findSources({ query }),
    });

    const handleSearchClick = () => {
        if (!editor) return;
        findSourcesMutation.mutate(
            editor.getText().slice(editor.state.selection.from - 1, editor.state.selection.to - 1),
        );
    };

    const handleClearClick = () => {
        findSourcesMutation.reset();
    };

    if (!editor) return null;

    return (
        <BubbleMenu editor={editor} options={{ placement: "bottom", offset: 8, flip: true }}>
            <div className={css.root}>
                {!findSourcesMutation.data ? (
                    <div className={css.actions}>
                        <button className={css.button} onClick={handleSearchClick} type="button">
                            Zoek referenties
                        </button>
                    </div>
                ) : (
                    <div className={css.results}>
                        <button className={css.clear} onClick={handleClearClick} type="button">
                            x
                        </button>
                        {findSourcesMutation.data.length > 0 ? (
                            findSourcesMutation.data.map((source) => (
                                <button
                                    key={source.url}
                                    className={css.resultItem}
                                    onClick={() => window.open(source.url, "_blank")}
                                    type="button"
                                >
                                    <div className={css.resultTitle}>{source.title}</div>
                                    <div className={css.resultUrl}>
                                        {source.url.replace("https://", "")}
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className={css.noResults}>Geen referenties gevonden</div>
                        )}
                    </div>
                )}
            </div>
        </BubbleMenu>
    );
}
