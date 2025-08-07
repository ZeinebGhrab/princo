export default interface AuthState {
    id: string |  null,
    token: string | null,
    roles: string[],
}