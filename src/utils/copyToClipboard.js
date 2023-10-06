export default async function copyToClipboard(content) {
    try {
        await window.navigator.clipboard.writeText(content);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
