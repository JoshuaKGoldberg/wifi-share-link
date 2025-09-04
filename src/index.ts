export interface HrefGenerationOptions {
	encryption: string;
	hidden?: boolean | undefined;
	password?: string | undefined;
	ssid: string;
}

export function generateWifiShareLink({
	encryption = "nopass",
	hidden,
	password,
	ssid,
}: HrefGenerationOptions) {
	return [
		"WIFI:",
		`T:${encryption};`,
		`S:${escapeText(ssid)};`,
		password ? `P:${escapeText(password)};` : "",
		hidden ? "H:true;" : "",
		";",
	].join("");
}

function escapeText(text: string) {
	return text.replace(/([\\;,:"])/g, "\\$1");
}
