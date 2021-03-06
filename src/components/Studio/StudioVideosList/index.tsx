import React from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import Spinner from '../../Loaders/Spinner';
import StudioVideo from './StudioVideo';

const StudioVideosList = () => {
    const { videos, videosPending } = useAppSelector(state => state.studio)

    if (videosPending) {
        return <div className="text-center"><Spinner /></div>
    }

    return (
        <ul className="flex flex-col">
            {videos.length > 0
                ? videos.map(v => <StudioVideo video={v} key={v._id} />)
                : <h2 className='text-myGray font-semibold text-xl p-5 text-center'>
                    Your channel doesnt have videos
                </h2>}
        </ul>
    );
};

export default StudioVideosList;