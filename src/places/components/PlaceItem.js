import React, {useState, useContext} from 'react';
import Card from '../../common/components/UIElements/Card';
import Button from '../../common/components/UIElements/Button';
import Modal from '../../common/components/UIElements/Modal';
import Map from '../../common/components/UIElements/Map';
import AuthContext from '../../common/context/auth-context';
import useHttp from '../../hooks/http-hook';
import LoadingSpinner from '../../common/components/UIElements/LoadingSpinner';

import styles from './PlaceItem.module.css';

const PlaceItem = (props) => {
    const [showMap, setShowMap] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const authCtx = useContext(AuthContext);
    const {isLoading, error, request, clearError} = useHttp();

    const openMapHandler = () => setShowMap(true);

    const closeMapHandler = () => setShowMap(false);

    const showDeleteConfirmationModal = () => {
        setShowDeleteModal(true);
    };

    const cancelDeleteConfirmationModal = () => {
        setShowDeleteModal(false);
    };

    const deleteConfirmationHandler = async () => {
        console.log('DELETING...');
        setShowDeleteModal(false);
        const result = await request(`${process.env.REACT_APP_SERVER_URL}/api/places/${props.id}`, 'DELETE', '', {
            Authorization: `Bearer ${authCtx.authToken}`,
        });
        if (result) {
            props.onDelete(props.id);
        }
    };

    return (
        <React.Fragment>
            <Modal onCancel={clearError} header='An Error Occurred!' show={!!error} footer={<Button onClick={clearError}>Okay</Button>}>
                <p>{error}</p>
            </Modal>
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={'Location map'}
                footer={<Button onClick={closeMapHandler}>Close</Button>}
                contentClass={styles['place-item__modal-content']}
                footerClass={styles['place-item__modal-actions']}
            >
                <Map coordinate={props.coordinate} />
            </Modal>

            <Modal
                show={showDeleteModal}
                onCancel={cancelDeleteConfirmationModal}
                header={`Confirm`}
                contentClass={styles['place-item__modal-content']}
                footerClass={styles['place-item__modal-actions']}
                footer={
                    <React.Fragment>
                        <Button inverse onClick={cancelDeleteConfirmationModal}>
                            CANCEL
                        </Button>
                        <Button danger onClick={deleteConfirmationHandler}>
                            DELETE
                        </Button>
                    </React.Fragment>
                }
            >
                <p>Are you sure? Deleting a place will permanently delete the place from your list.</p>
            </Modal>

            <li className={styles['place-item']}>
                {isLoading && <LoadingSpinner asOverlay />}
                <Card className={styles['place-item__content']}>
                    <div className={styles['place-item__image']}>
                        <img src={props.image} alt={props.title} />
                    </div>

                    <div className={styles['place-item__info']}>
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>

                    <div className={styles['place-item__actions']}>
                        <Button inverse onClick={openMapHandler}>
                            VIEW MAP
                        </Button>
                        {authCtx.userId === props.creatorId && <Button to={`/places/${props.id}`}>EDIT</Button>}
                        {authCtx.userId === props.creatorId && (
                            <Button danger onClick={showDeleteConfirmationModal}>
                                DELETE
                            </Button>
                        )}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
};

export default PlaceItem;
