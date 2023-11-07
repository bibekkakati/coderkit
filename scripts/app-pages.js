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
        document
            .querySelector('meta[name="description"]')
            .setAttribute("content", meta_desc);

        const outputHtml = dom.serialize();
        fs.writeFileSync(`${dir}/${link}.html`, outputHtml);
        console.log(`${dir}/${link}.html generated`);
    }
})();
