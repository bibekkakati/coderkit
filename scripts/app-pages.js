import fs from "fs";
import jsdom from "jsdom";
import Kits from "../src/constants/kitslist.json" assert { type: "json" };

function processMetaTags() {
    const html = fs.readFileSync("./index.html").toString();
    const dom = new jsdom.JSDOM(html, { contentType: "text/html" });
    const document = dom.window.document;

    const keywords = fs
        .readFileSync("./scripts/keywords.txt")
        .toString()
        .split("\n");
    document
        .querySelector('meta[name="keywords"]')
        .setAttribute("content", keywords.join(","));

    // Inject SEO tags in index.html
    injectSeoTags(document, Kits);
    fs.writeFileSync("./index.html", dom.serialize().replaceAll("\n\n", ""));

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

        injectSeoTags(document, Kits);

        const outputHtml = dom.serialize().replaceAll("\n\n", "");
        fs.writeFileSync(`${dir}/${link}.html`, outputHtml);
        console.log(`${dir}/${link}.html generated`);
    }
}

function injectSeoTags(document, links) {
    // Clean existing seo div
    document.getElementById("seo").remove();

    // Create seo div
    const seoDiv = document.createElement("div");
    seoDiv.id = "seo";
    seoDiv.classList.add("hidden");
    seoDiv.hidden = true;

    // Create h1 element
    const h1Element = document.createElement("h1");
    h1Element.textContent = document.title;

    // Create h2 element
    const h2Element = document.createElement("h2");
    h2Element.textContent = document.querySelector(
        'meta[name="description"'
    ).content;

    // Append elements to the div
    seoDiv.appendChild(h1Element);
    seoDiv.appendChild(h2Element);

    links?.forEach(({ link, label }) => {
        const l = document.createElement("a");
        l.href = `/app/${link}`;
        l.alt = label;
        l.appendChild(document.createTextNode(label));
        seoDiv.appendChild(l);
    });

    // Get the first child element in the body
    const firstChild = document.body.firstChild;

    // Insert the "seo" div before the first child
    document.body.insertBefore(seoDiv, firstChild);
}

(function () {
    processMetaTags();
})();
