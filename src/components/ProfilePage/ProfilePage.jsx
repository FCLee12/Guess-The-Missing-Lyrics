import { useSelector } from "react-redux";

function ProfilePage() {

    const user = useSelector((store) => store.user);


    return(
        <>
            <h1>Hello {user.username}</h1>
            <div>
                <img src='' alt='user avatar' style={{width: '250px', height: '250px'}}/>
            </div>
            <div>
                <h3>Your GameID:</h3>
                <p>{user.game_id}</p>
                <h3>Username:</h3>
                <p>{user.username}</p>
                <label>Change your username:</label>
                <button>Edit</button>
                <h3>Password:</h3>
                <label>Change your password:</label>
                <button>Edit</button>
                <h3>Email Address:</h3>
                <p>{user.email_address}</p>
                <label>Change your email address:</label>
                <button>Edit</button>
            </div>
        </>
    )
}

export default ProfilePage;