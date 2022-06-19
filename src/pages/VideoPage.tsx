import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import CommentsForm from '../components/UI/forms/CommentsForm';
import VideoInfo from '../components/VideoPage/VideoInfo';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { resetVideo } from '../redux/slices/videoPage.slice';
import { fetchSingleVideo, fetchVideoComments } from '../redux/thunks/videoPage.thunks';
import ReactPlayer from "react-player"
import { SERVER_URL } from '../API';
import CommentsList from '../components/VideoPage/CommentsList';


const VideoPage = () => {
    const { id } = useParams() as { id: string }
    const dispatch = useAppDispatch()
    const { video, isVideoLoading, comments } = useAppSelector(state => state.videoPage)
    const { user } = useAppSelector(state => state.auth)

    useEffect(() => {
        dispatch(fetchSingleVideo(id))
        dispatch(fetchVideoComments(id))
        return () => {
            dispatch(resetVideo())
        }
    }, [id])


    return (
        <MainLayout>
            <div className="p-5">
                {!video || isVideoLoading
                    ? <div>loader</div>
                    : <>
                        <div className="w-full h-auto border border-gray-400 bg-black">
                            <ReactPlayer url={SERVER_URL + "/" + video.video} controls={true}
                                width="100%" height="100%" volume={0.1} />
                        </div>
                        <VideoInfo video={video} />
                        <div className="py-5">
                            <span className="text-[16px]">{video.commentsCount} Comments</span>
                            {user && <CommentsForm user={user} videoId={video._id} />}
                            {comments.length > 0 && <CommentsList comments={comments} />}
                        </div>
                    </>}
            </div>
        </MainLayout >
    );
};

export default VideoPage;
