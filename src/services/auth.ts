import type {LoginForm} from "@/schemas/auth/login-schema.ts";
import {loginApi, loginWithEmployeeCodeApi} from "@/api/auth.ts";
import type {LoginWithEmployeeCodeForm} from "@/schemas/auth/login-with-employee-code-schema.ts";

export const loginService = async (payload: LoginForm) => {
    const res = await loginApi(payload);
    return res;
};

export const loginWithEmployeeCodeService = async (payload: LoginWithEmployeeCodeForm) => {
    const res = await loginWithEmployeeCodeApi(payload);
    return res;
};
