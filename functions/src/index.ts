import * as functions from 'firebase-functions';
import fetch, { Request, RequestInit, RequestInfo, Response } from 'node-fetch';
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const getStatus = functions.https.onRequest(async (req, res) => {
	const args: RequestInit = { method: "GET" }
	const path = url + "/status";
	try {
		const statusData = await http<StatusData>(new Request(path, args));
		const out = statusData.parsedBody!;
		console.log(out);
		res.status(200).json(out);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
});

export const startMC = functions.https.onRequest(async (req, res) => {
	const args: RequestInit = { method: "POST", body: "" }
	const path = url + "/start";
	try {
		const actData = await http<actionData>(new Request(path, args));
		const out = actData.parsedBody!;

		if (out.error === null) {
			res.status(200);
		} else {
			console.error(out);
			res.status(500).send(out.error);
		}
	} catch (err) {
		res.status(500).send(err);
	}

});

const url = "https://gamocosm.com/servers/" + functions.config().gamocosm.id + "/api/" + functions.config().gamocosm.key;

interface IHttpResponse<T> extends Response {
	parsedBody?: T;
}

// example consuming code 
interface StatusData {
	server: boolean;
	status: string;
	minecraft: boolean;
	ip: string;
	domain: string;
	download: string;
}

interface actionData {
	error: string;
}


const http = <T>(request: RequestInfo): Promise<IHttpResponse<T>> => {
	return new Promise((resolve, reject) => {
		let response: IHttpResponse<T>;
		fetch(request)
			.then(res => {
				response = res;
				return res.json();
			})
			.then(body => {
				if (response.ok) {
					response.parsedBody = body;
					resolve(response);
				} else {
					reject(response);
				}
			})
			.catch(err => {
				console.error(err);
				reject(err);
			});
	});
};

