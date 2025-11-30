/**
 * Axios 공통 설정 + Authorization 자동 추가 인터셉터
 *
 * - LocalStorage에 저장된 JWT 토큰을 `Bearer Token`으로 자동 포함
 * - 모든 요청에 Content-Type JSON 설정
 * - 토큰이 필요한 모든 api 요청에 사용하길 권함
 */

import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: 토큰 자동 첨부
axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
