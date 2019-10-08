import * as functions from 'firebase-functions';
import fetch from 'node-fetch';
import { Request, RequestInit, RequestInfo, Response } from 'node-fetch';
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const getStatus = functions.https.onRequest(async (request, response) => {
    const args: RequestInit = { method: "GET"}
    const path = url + "/status";
    const data = await http<StatusData>(new Request(path, args));

    try {
        let out = data.parsedBody!;
        response.send(out);
    } catch (err) {
        console.error(err);
        response.send("Error: " + err)
    }
});

export const startMC = functions.https.onRequest(async (request, response) => {
    const args: RequestInit = { method: "POST", body: "" }
    const path = url + "/start";
    const data = await http<actionData>(new Request(path, args));

    try {
        let out = data.parsedBody!;
        response.send(out);
    } catch (err) {
        console.error(err);
        response.send("Error: " + err)
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

