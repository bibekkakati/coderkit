import fs from "fs";
import { simpleSitemapAndIndex } from "sitemap";
import Config from "./src/constants/config.json" assert { type: "json" };
import Kits from "./src/constants/kitslist.json" assert { type: "json" };

(function () {
    const sourceData = [{ url: "/", changefreq: "daily", priority: 1 }];

    for (let i = 0; i < Kits.length; i++) {
        sourceData.push({
            url: `/app/${Kits[i].link}`,
            changefreq: "daily",
            priority: 1,
        });
    }

    simpleSitemapAndIndex({
        hostname: Config.hostname,
        destinationDir: "./public/",
        sourceData,
        gzip: false,
    }).then(() => {
        fs.renameSync("./public/sitemap-0.xml", "./public/sitemap.xml");
        fs.unlinkSync("./public/sitemap-index.xml");
        console.log("Sitemap generated!");
    });
})();
