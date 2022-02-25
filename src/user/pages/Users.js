import React, {useEffect, useState} from 'react';
import UserList from '../components/UserList';
import LoadingSpinner from '../../common/components/UIElements/LoadingSpinner';
import Modal from '../../common/components/UIElements/Modal';
import Button from '../../common/components/UIElements/Button';
import useHttp from '../../hooks/http-hook';

const Users = () => {
    const [users, setUsers] = useState([]);
    const {isLoading, error, request, clearError} = useHttp();

    useEffect(() => {
        // this function shouldnot be async as per useEffect spec
        const requestData = async () => {
            const result = await request(process.env.REACT_APP_SERVER_URL + '/api/user/');
            if (result) {
                setUsers(result);
            }
        };
        requestData();
    }, [request]);

    const errorHandler = () => {
        clearError(null);
    };

    return (
        <React.Fragment>
            {isLoading && (
                <div className='center'>
                    <LoadingSpinner />
                </div>
            )}
            {error && (
                <Modal onCancel={errorHandler} header='An Error Occurred!' show={!!error} footer={<Button onClick={errorHandler}>Okay</Button>}>
                    <p>{error}</p>
                </Modal>
            )}
            {!isLoading && !error && <UserList items={users} />}
        </React.Fragment>
    );
};

export default Users;
