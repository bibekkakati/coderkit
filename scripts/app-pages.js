import fs from "fs";
import jsdom from "jsdom";
import Kits from "../src/constants/kitslist.json" assert { type: "json" };

(function () {
    const html = fs.readFileSync("./index.html").toString();
    const dom = new jsdom.JSDOM(html);
    const document = dom.window.document;

    const dir = "./app";
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    for (let i = 0; i < Kits.length; i++) {
        const { label, short_desc, meta_desc, link } = Kits[i];
        document.title = `${label} - ${short_desc}`;

        const metaTags = document.querySelectorAll("meta");
        for (const meta of metaTags) {
            const propertyName =
                meta.getAttribute("name") ||
                meta.getAttribute("property") ||
                meta.getAttribute("itemprop");

            if (propertyName?.toLowerCase().includes("description")) {
                meta.setAttribute("content", meta_desc);
            }

            if (propertyName?.toLowerCase().includes("title")) {
                meta.setAttribute("content", document.title);
            }

            if (propertyName?.toLowerCase().includes("name")) {
                meta.setAttribute("content", document.title);
            }
        }

        const outputHtml = dom.serialize();
        fs.writeFileSync(`${dir}/${link}.html`, outputHtml);
        console.log(`${dir}/${link}.html generated`);
    }
})();
