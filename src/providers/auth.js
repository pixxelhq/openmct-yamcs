import {
    getCookie
} from '../utils.js';

export default class AuthProvider {
    #openmct;
    #username;
    #password;
    #authEndpoint;
    #useRefresh

    constructor({openmct, authEndpoint, username, password}) {
        console.log(authEndpoint);
        this.#openmct = openmct;
        this.#username = username;
        this.#password = password;
        this.#authEndpoint = authEndpoint + "/auth/token";
        this.#useRefresh = false;

        this.#fetchAccessToken();
    }

    async #fetchAccessToken() {
        const params = new URLSearchParams();

        if (this.#useRefresh) {
            params.append("refresh_token", getCookie("refresh_token"));
            params.append("grant_type", "refresh_token");

        } else {
            params.append("username", this.#username);
            params.append("password", this.#password);
            params.append("grant_type", "password");
        }

        try {
            const response = await fetch(this.#authEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: params.toString(),
            });

            if (!response.ok) {
                throw new Error(`Failed to retrieve API token: ${response.status}`);
            }

            const data = await response.json();
            document.cookie = `access_token=${data.access_token}; path=/; SameSite=Strict;`;
            document.cookie = `refresh_token=${data.refresh_token}; path=/; SameSite=Strict;`;

            this.#useRefresh = true;
            setTimeout(() => {
                this.#fetchAccessToken();
            }, 8 * 60 * 1000); // 8 minutes of expiration

        } catch (error) {
            console.error("Error fetching access token:", error);
        }
    }
}