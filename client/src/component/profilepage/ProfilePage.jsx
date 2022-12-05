import { useQuery } from "@tanstack/react-query";
import { userProfile } from "../../api";

const ProfilePage = (props) => {
    const query = useQuery(['userProfile'], 
    () => userProfile(props.token) );
    const { data, isLoading, isError, error } = query;
    
    return (
        <div className="profile-page">
            <h1>Profile Page</h1>
            {isLoading && <p>Loading...</p>}
            {isError && <p>{error.message}</p>}
            {data && 
            <div className="profile">
            <p>{data.fullName}</p>
            <p>{data.email}</p>
            <p>{data.dateOfBirth.split('T')[0]}</p>
            </div>}
        </div>
    )
}

export default ProfilePage;