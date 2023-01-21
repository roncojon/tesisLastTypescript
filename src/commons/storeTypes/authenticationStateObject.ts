export interface AuthenticationStateObject {
    isAuthenticated: boolean | null,
    accessToken: string | null,
    userRol: string[] | null,
    userId: string | null
}
