/** @flow */
// format.js — named-only ESM formatter (derived from string-format@2.0.0)

const re = /{{|}}|{(\w+(?:\.\w+)*)}/g;

function get(obj: Object, path: string): Object {
    return path.split(".").reduce((res, key) => {
        return res != null ? res[key] : undefined;
    }, obj);
}

/**
 * Format a string using named arguments only.
 *
 * Example:
 *   format("Hello {name}", { name: "Alice" })
 *   format("{user.email}", { user: { email: "a@b.com" } })
 */
export default function format(
    str: string,
    values: Object
): string {
    if (typeof str !== "string") {
        throw new TypeError(
            "First argument must be a string"
        );
    }

    if (values == null || typeof values !== "object") {
        throw new TypeError(
            "Second argument must be an object"
        );
    }

    return str.replace(re, (match, key) => {
        // Escaped braces
        if (match === "{{") return "{";
        if (match === "}}") return "}";

        const val = get(values, key);
        return val == null ? "" : String(val);
    });
}