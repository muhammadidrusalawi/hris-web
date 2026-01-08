import {useQuery, type UseQueryOptions} from "@tanstack/react-query";
import type {User} from "@/types/user.ts";
import {listUserManagerApi} from "@/api/user.ts";

export const userManagerService = {
    useList() {
        const options: UseQueryOptions<User[], Error> = {
            queryKey: ["userManagers"],
            queryFn: async () => {
                const res = await listUserManagerApi();
                return res.data ?? [];
            },
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 30,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            refetchOnReconnect: true,
        };

        return useQuery(options);
    },
}