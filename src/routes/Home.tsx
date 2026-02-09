import qrcode from "../assets/qr-code.png";
import { Editor } from "../components/Editor.tsx";
import * as css from "./Home.css.ts";

export function Home() {
    return (
        <>
            <h1 className={css.title}>Tiptap Hocuspocus demo</h1>
            <p className={css.paragraph}>Open deze pagina in een tweede tab of venster.</p>
            <div className={css.card}>
                <Editor />
            </div>
			<p className={css.paragraph}>
				<a href="https://github.com/havelaer/tiptap-collab-demo" target="_blank" rel="noopener noreferrer">GitHub</a>
			</p>
			<p className={css.paragraph}>
				<img className={css.qrCode} src={qrcode} alt="Deel deze pagina via QR Code" />
			</p>
        </>
    );
}
