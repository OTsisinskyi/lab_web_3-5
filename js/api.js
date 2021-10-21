const BASE_URL = 'http://localhost:5000';
const RESOURSE_URL = `${BASE_URL}/park`;

const baseRequest = async ({ urlPath = "", method = "GET", body = null }) => {
	try {
		const reqParams = {
			method,
			headers: {
				"Content-Type": "application/json",
			},
		};

		if (body) {
			reqParams.body = JSON.stringify(body);
		}
		return await fetch(`${RESOURSE_URL}${urlPath}`, reqParams);
	} catch (error) {
		console.error("HTTP ERROR: ", error);
	}
};

export const getAllParks = async () => {
	const rawRes = await baseRequest({ method: "GET" });

	return rawRes.json();
};

export const postPark = (body) => baseRequest({ method: "POST", body });

export const editPark = (id, body) => baseRequest({ urlPath: `/${id}`, method: "PUT", body });

export const deletePark = (id) => baseRequest({ urlPath: `/${id}`, method: "DELETE" });