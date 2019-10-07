import * as functions from 'firebase-functions';
import fetch from 'node-fetch';
import { Request, RequestInit, RequestInfo, Response } from 'node-fetch';
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const test = functions.https.onRequest((request, response) => {
    getData<StatusData>()
        .then(data => {
            response.send(data);
        })
        .catch(err => {
            console.error(err);
            response.send("Error: " + err)
        });
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

const getData = async <T>(args: RequestInit = { method: "get" }): Promise<IHttpResponse<T>> => {
    const path = url + "/status";
    return await http<T>(new Request(path, args));
};

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

