export const Logger = {
    info: (msg) => console.log(`%c[OIO-INFO]: ${msg}`, "color: #d4af37"),
    error: (msg) => console.error(`%c[OIO-ERROR]: ${msg}`, "color: #ff4b2b")
};
