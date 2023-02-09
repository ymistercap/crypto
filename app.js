document.addEventListener("DOMContentLoaded", function () {
    const generateRandomKey = () => {
        const keyLength = 128;
        let key = "";
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < keyLength; i++) {
            key += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return key;
    };

    const encrypt = (data, algorithm, key) => {
        switch (algorithm) {
            case "md5":
                return CryptoJS.MD5(data).toString();
            case "sha256":
                return CryptoJS.SHA256(data).toString();
            case "keccak512":
                return CryptoJS.SHA3(data, { outputLength: 512 }).toString();
            case "ripemd160":
                return CryptoJS.RIPEMD160(data).toString();
            case "aes":
                return CryptoJS.AES.encrypt(data, key).toString();
            default:
                return "Invalid algorithm selected";
        }
    };

    const decrypt = (data, algorithm, key) => {
        switch (algorithm) {
            case "aes":
                return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
            default:
                return "Decryption is not supported for this algorithm";
        }
    };

    document.getElementById("generateKey").addEventListener("click", () => {
        document.getElementById("keyInput").value = generateRandomKey();
    });

    document.getElementById("encryptButton").addEventListener("click", () => {
        const inputData = document.getElementById("inputData").value;
        const algorithm = document.getElementById("algorithm").value;
        const key = document.getElementById("keyInput").value;
        const encryptedData = encrypt(inputData, algorithm, key);
        document.getElementById("encryptedData").value = encryptedData;
    });

    document.getElementById("decryptButton").addEventListener("click", () => {

        const encryptedData = document.getElementById("encryptedData").value;
        const algorithm = document.getElementById("algorithm").value;
        const key = document.getElementById("keyInput").value;
        const decryptedData = decrypt(encryptedData, algorithm, key);
        document.getElementById("decryptedData").value = decryptedData;
    });
});
