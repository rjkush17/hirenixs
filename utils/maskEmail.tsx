export default function maskEmail(email: string) {
    const [name, domain] = email.split("@");
    if (name.length <= 2) return email; // too short to mask properly
    const maskedName =
        name[0] + "*".repeat(name.length - 2) + name[name.length - 1];
    return `${maskedName}@${domain}`;
}
