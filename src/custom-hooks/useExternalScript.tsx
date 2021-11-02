import { useEffect } from "react";

export const useExternalScript = (url: string, id: string, callback?: () => void) => {
    useEffect(() => {
        let existingScript = document.getElementById(id) as HTMLScriptElement;

        if (!existingScript) {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = url;
            script.id = id;
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                if (callback) {
                    callback();
                }
            };
        }

        if (existingScript && callback) {
            callback();
        }
    }, );
};