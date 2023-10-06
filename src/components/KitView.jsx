import { Link, useParams } from "react-router-dom";
import kitslist from "../constants/kitslist.json";
import JSONFormatter from "./kits/JSONFormatter";
import TextCaseConverter from "./kits/TextCaseConverter";
import Base64Transformer from "./kits/Base64Transformer";
import LoremIpsumGenerator from "./kits/LoremIpsumGenerator";
import JavascriptMinifier from "./kits/JavascriptMinifier";

const kitcomponents = {
    JSONFormatter: <JSONFormatter />,
    TextCaseConverter: <TextCaseConverter />,
    Base64Transformer: <Base64Transformer />,
    LoremIpsumGenerator: <LoremIpsumGenerator />,
    JavascriptMinifier: <JavascriptMinifier />,
};

export default function KitView() {
    const params = useParams();

    for (let i = 0; i < kitslist.length; i++) {
        const { component, link } = kitslist[i];
        if (link === params.kitname && component && kitcomponents[component]) {
            // Main render - Kit
            return kitcomponents[component];
        }
    }

    // Error block
    return (
        <div className="hero min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-lg">
                    <p className="py-6 text-l">
                        Oh no! Seems like our intern is cooking something here
                        &nbsp;🍳
                    </p>
                    <button className="btn btn-primary btn-sm">
                        <Link to="/app">Home</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}
