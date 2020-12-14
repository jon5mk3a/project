import LoginRegister from "../LoginRegister/LoginRegister"
import { useUser } from "../UserContext"

function Comments() {
    const me = useUser()

    if (!me) return <LoginRegister />
    return(
        <h2>Hola Mundo!</h2>
    );
};

export default Comments;
