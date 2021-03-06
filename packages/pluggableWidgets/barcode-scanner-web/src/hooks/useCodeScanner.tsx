import { useEffect, useState } from "react";
import { BarcodeFormat, BrowserMultiFormatReader, DecodeHintType } from "@zxing/library/cjs";

const hints = new Map();
// RSS_Expanded is not production ready yet.
const exclusions: BarcodeFormat[] = [BarcodeFormat.RSS_EXPANDED];
// `BarcodeFormat` is a TypeScript enum. Calling `Object.values` on it returns an array of string and ints, we only want the latter.
const formats = Object.values(BarcodeFormat)
    .filter((format: string | BarcodeFormat) => typeof format !== "string")
    .filter((format: BarcodeFormat) => !exclusions.includes(format)) as BarcodeFormat[];
hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);

export type CodeScannerHookError = "ERROR_CODE_SCANNER";

type CodeScannerHook = (
    streamObject: MediaStream | null,
    videoElement: HTMLVideoElement | null
) => {
    codeResult: string | null;
    error: CodeScannerHookError | null;
};

export const useCodeScanner: CodeScannerHook = (streamObject, videoElement) => {
    const [codeResult, setCodeResult] = useState<string | null>(null);
    const [error, setError] = useState<"ERROR_CODE_SCANNER" | null>(null);

    useEffect(() => {
        let isCanceled = false;
        async function check(stream: MediaStream, element: HTMLVideoElement): Promise<void> {
            try {
                const browserReader = new BrowserMultiFormatReader(hints, 2000);
                const result = await browserReader.decodeOnceFromStream(stream, element);
                if (!isCanceled) {
                    setCodeResult(result.getText());
                }
            } catch (e) {
                if (!isCanceled) {
                    setError("ERROR_CODE_SCANNER");
                }
            }
        }
        if (streamObject && videoElement) {
            check(streamObject, videoElement);
        }
        return () => {
            isCanceled = true;
        };
    }, [streamObject, videoElement]);

    return { codeResult, error };
};
