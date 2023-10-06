const textCaseConverters = {
    toLowerCase: (str = "") => {
        if (str?.trim().length === 0) {
            return "";
        }

        return str.toLowerCase();
    },

    toUpperCase: (str = "") => {
        if (str?.trim().length === 0) {
            return "";
        }

        return str.toUpperCase();
    },

    toSentenceCase: (str = "") => {
        if (str?.trim().length === 0) {
            return "";
        }

        // Use regular expressions to split the paragraph into sentences
        const sentences = str.split(/(\.|\?|!)(\s+|$)/);

        // Initialize a flag to determine if we need to apply sentence case
        let applySentenceCase = true;

        // Apply sentence case to each sentence and preserve formatting
        const sentenceCaseText = sentences
            .map((sentence) => {
                // Remove leading and trailing white spaces
                sentence = sentence.trim();

                // Check if the sentence is empty
                if (sentence.length === 0) {
                    return "";
                }

                // If the sentence is not empty and should have sentence case, apply it
                if (applySentenceCase) {
                    sentence =
                        sentence.charAt(0).toUpperCase() +
                        sentence.slice(1).toLowerCase();
                    applySentenceCase = false;
                }

                // If the sentence is the end of a sentence, set the flag to apply sentence case
                if (/(\.|\?|!)/.test(sentence)) {
                    applySentenceCase = true;
                }

                return sentence;
            })
            .join("");

        return sentenceCaseText;
    },

    toTitleCase: (str = "") => {
        if (str?.trim().length === 0) {
            return "";
        }

        // Use a regular expression to split the input text into words while preserving whitespace
        const words = str.split(/(\s+)/);

        // Use a regular expression to split the input text into words while preserving whitespace and special characters
        // const words = str.split(/(\s+|[^A-Za-z0-9]+)/);

        // Apply title case to each word
        const titleCaseWords = words.map((word) => {
            // Capitalize the first letter of each word while making the rest of the letters lowercase
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });

        // Join the title-cased words back into a single string
        return titleCaseWords.join("");
    },

    toCamelCase: (str = "") => {
        if (str?.trim().length === 0) {
            return "";
        }

        const lines = str.split("\n");
        return lines
            .map((l) => {
                // Split the input text into words by spaces and/or non-alphanumeric characters
                const words = l.split(/[\s\W_]+/);

                // Capitalize the first letter of each word (except the first word) and make the rest lowercase
                return words
                    .map((word, index) => {
                        if (index === 0) {
                            return word.toLowerCase(); // Keep the first word in lowercase
                        }
                        return (
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                        );
                    })
                    .join("");
            })
            .join("\n")
            .trim();
    },

    toPascalCase: (str = "") => {
        if (str?.trim().length === 0) {
            return "";
        }

        const lines = str.split("\n");
        return lines
            .map((l) => {
                return l
                    .match(
                        /[A-Z]{2,}(?=[A-Z][a-z0-9]*|\b)|[A-Z]?[a-z0-9]*|[A-Z]|[0-9]+/g
                    )
                    .filter(Boolean)
                    .map(
                        (x) =>
                            x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()
                    )
                    .join("");
            })
            .join("\n")
            .trim();
    },

    toSnakeCase: (str = "") => {
        if (str?.trim().length === 0) {
            return "";
        }

        const lines = str.split("\n");
        return lines
            .map((l) => {
                return l
                    .match(
                        /[A-Z]{2,}(?=[A-Z][a-z0-9]*|\b)|[A-Z]?[a-z0-9]*|[A-Z]|[0-9]+/g
                    )
                    .filter(Boolean)
                    .map((x) => x.toLowerCase())
                    .join("_");
            })
            .join("\n")
            .trim();
    },

    toKebabCase: (str = "") => {
        if (str?.trim().length === 0) {
            return "";
        }

        const lines = str.split("\n");
        return lines
            .map((l) => {
                return l
                    .match(
                        /[A-Z]{2,}(?=[A-Z][a-z0-9]*|\b)|[A-Z]?[a-z0-9]*|[A-Z]|[0-9]+/g
                    )
                    .filter(Boolean)
                    .map((x) => x.toLowerCase())
                    .join("-");
            })
            .join("\n")
            .trim();
    },

    toToggleCase: (str = "") => {
        if (str?.trim().length === 0) {
            return "";
        }

        const lines = str.split("\n");
        return lines
            .map((l) => {
                return l
                    .split("")
                    .map((char, index) => {
                        return index % 2 === 0
                            ? char.toLowerCase()
                            : char.toUpperCase();
                    })
                    .join("");
            })
            .join("\n");
    },
};

export default textCaseConverters;
