import joinUrl from "../utils/url";

export const baseUrl = "http://localhost:8080";

export const AUTH_URL = joinUrl(baseUrl, "authenticate");

export const INSTR_URL = joinUrl(baseUrl, "instructor");

export const SUB_URL = joinUrl(baseUrl, "subject");
export const TOPIC_URL = joinUrl(baseUrl, "topic");

export const COURSE_URL = joinUrl(baseUrl, "course");

export const VIDEO_URL = joinUrl(baseUrl, "video");
export const COMMENT_URL = joinUrl(baseUrl, "comment");

export const TAG_URL = joinUrl(baseUrl, "tag");

export const FILE_SERVER_URL = joinUrl(baseUrl, "fileserver");

export const PROMO_URL = joinUrl(baseUrl, "promo");

export const SUBSCRIPTION_URL = joinUrl(baseUrl, "subscribe");
