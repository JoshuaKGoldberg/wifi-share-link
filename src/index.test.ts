import { describe, expect, it } from "vitest";

import { generateWifiShareLink } from "./index.js";

describe(generateWifiShareLink, () => {
	it("generates a sparse href when there are no password or hidden", () => {
		const actual = generateWifiShareLink({
			encryption: "None",
			ssid: "My Network",
		});

		expect(actual).toMatchInlineSnapshot(`"WIFI:T:None;S:My Network;;"`);
	});

	it("generates a populated href when there is only hidden: false", () => {
		const actual = generateWifiShareLink({
			encryption: "None",
			hidden: false,
			ssid: "My Network",
		});

		expect(actual).toMatchInlineSnapshot(`"WIFI:T:None;S:My Network;;"`);
	});

	it("generates a populated href when there is only hidden: true", () => {
		const actual = generateWifiShareLink({
			encryption: "WPA",
			hidden: true,
			ssid: "My Network",
		});

		expect(actual).toMatchInlineSnapshot(`"WIFI:T:WPA;S:My Network;H:true;;"`);
	});

	it("generates a populated href when there is only a password", () => {
		const actual = generateWifiShareLink({
			encryption: "WPA",
			password: "abc123",
			ssid: "My Network",
		});

		expect(actual).toMatchInlineSnapshot(
			`"WIFI:T:WPA;S:My Network;P:abc123;;"`,
		);
	});

	it("generates a populated href when there are both password and hidden", () => {
		const actual = generateWifiShareLink({
			encryption: "WPA",
			hidden: true,
			password: "abc123",
			ssid: "My Network",
		});

		expect(actual).toMatchInlineSnapshot(
			`"WIFI:T:WPA;S:My Network;P:abc123;H:true;;"`,
		);
	});

	it("escapes the ssid and password when they have special characters", () => {
		const actual = generateWifiShareLink({
			encryption: "WPA",
			password: "C0rr3ctHorse:Battery;S[ap]e;",
			ssid: "My ;#!:; ;Network !@#[]",
		});

		expect(actual).toMatchInlineSnapshot(
			`"WIFI:T:WPA;S:My \\;#!\\:\\; \\;Network !@#[];P:C0rr3ctHorse\\:Battery\\;S[ap]e\\;;;"`,
		);
	});
});
