import { Editor } from "../components/Editor.tsx";
import * as css from "./Home.css.ts";

export function Home() {
    return (
        <>
            <h1 className={css.title}>Tiptap + Y.js demo</h1>
            <p className={css.readTheDocs}>Open deze pagina in een tweede tab of venster.</p>
            <div className={css.card}>
                <Editor />
            </div>
        </>
    );
}
