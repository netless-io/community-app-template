/// <reference types="vite/client" />

import styles from "./style.css?inline";
import {Client} from "@notionhq/client"


/**
 * Register it before joining room:
 * ```js
 * WindowManager.register({
 *   kind: "Counter",
 *   src: Counter
 * })
 * ```
 * Then you can use it in your room:
 * ```js
 * manager.addApp({ kind: 'Counter' })
 * ```
 * Read more about how to make a netless app here:
 * https://github.com/netless-io/window-manager/blob/master/docs/develop-app.md
 *
 * @type {import("@netless/window-manager").NetlessApp}
 */
const Counter = {
    kind: "Counter",
    setup(context) {
        const box = context.getBox();
        box.mountStyles(styles);


        const $content = document.createElement("div");
        $content.className = "app-counter";
        box.mountContent($content);

        const $label1 = document.createElement("input");
        $label1.setAttribute("type", "password");
        $content.appendChild($label1);
        const $label2 = document.createElement("input");
        $label2.setAttribute("type", "password");
        $content.appendChild($label2);

        const $buttonImport = document.createElement("button")
        $buttonImport.innerText = "导入";
        $content.appendChild($buttonImport);
        $buttonImport.onclick = ev => {
            const token = $label1.value;
            let pageId = $label2.value;
            const notion = new Client({auth: token});
            (async () => {
                const response = await notion.blocks.children.list({
                    block_id: pageId,
                    page_size: 50,
                });
                let importStr = "";
                let resArray = response.results;
                for(let i = 0;i < resArray.length;i++) {
                    let res = resArray[i];
                    if(res["type"] === 'paragraph') {
                        if(res["paragraph"] !== undefined && res["paragraph"]["rich_text"] !== undefined) {
                            let testList = res["paragraph"]["rich_text"];
                            for(let k = 0;k < testList.length;k++) {
                                importStr += testList["plain_text"];
                            }
                        }
                    }
                }
                const room = context.getRoom();
                room.insertText(0,0, importStr);
            })();
        };



    },
};

export default Counter;
