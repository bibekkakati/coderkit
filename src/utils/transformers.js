const transformers = {
    encodeBase64: (str) => {
        return window.btoa(str);
    },

    decodeBase64: (str) => {
        return window.atob(str);
    },

    decodeJwt: (token) => {
        const parts = token.split(".");
        if (parts.length !== 3) {
            throw new Error("Invalid token");
        }

        const header = window.atob(parts[0]);
        const payload = window.atob(parts[1]);

        return {
            header: JSON.parse(header),
            payload: JSON.parse(payload),
        };
    },
};

export default transformers;
