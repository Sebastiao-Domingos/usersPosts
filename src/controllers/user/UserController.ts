
class UserController {
    private readonly url = "/api/users"

    /**
     * listar
     */
    public async listar() {
        const response = await fetch(this.url).then(res => res.json);
        return response;
    }
}


export default UserController;