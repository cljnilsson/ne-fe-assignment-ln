const baseUrl = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

function setupRequest(
	requestMethod: "POST" | "GET" | "PATCH",
	body: object
): RequestInit {
	const bodyJson = JSON.stringify(body);

	const headers: HeadersInit = {
		"Content-Type": "application/json",
	};

	const requestOptions: RequestInit = {
		method: requestMethod,
		headers,
		body: bodyJson,
	};

	if (requestMethod === "GET") {
		delete requestOptions.body;
	}

	return requestOptions;
}

async function request<T>(
	path: string,
	requestMethod: "POST" | "GET" | "PATCH",
	body: object
): Promise<T | null> {
	const url = `${baseUrl}${path}`;
	const requestOptions: RequestInit = setupRequest(requestMethod, body);

	try {
		const resp = await fetch(`${url}&key=${API_KEY}`, requestOptions);

		if (!resp.ok) {
			console.error("Error: ", resp.status);
			return null;
		}

		const data = await resp.json();

		console.log("Success: ", data);
		return data;
	} catch (error) {
		console.error("Error: ", error);
	}

	return null;
}

export function patchRequest<T>(path: string, body: object) {
	return request<T>(path, "PATCH", body);
}

export function postRequest<T>(path: string, body: object) {
	return request<T>(path, "POST", body);
}

export function getRequest<T>(path: string) {
	return request<T>(path, "GET", {});
}
