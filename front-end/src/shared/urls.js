import joinUrl from "../utils/url";

export const  baseUrl = 'http://localhost:8080';

export const AUTH_URL = joinUrl(baseUrl, 'authenticate');

export const INSTR_URL = joinUrl(baseUrl, 'instructor');


export const SUB_URL = joinUrl(baseUrl, 'subject')
export const TOPIC_URL = joinUrl(baseUrl, 'topic')