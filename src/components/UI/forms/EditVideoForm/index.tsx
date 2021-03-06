import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useUploadImage } from '../../../../hooks/useUploadFile';
import { updateVideo } from '../../../../redux/thunks/studio.thunks';
import { validate } from '../../../../utils/validate';
import Textarea from '../../controls/Textarea';
import Toggle from '../../controls/Toggle';
import PreviewBlock from '../UploadVideoForm/PrewiewBlock';
import UploadPreview from '../UploadVideoForm/UploadPreview';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../../Loaders/Spinner';
import { setUpdateVideoSuccess } from '../../../../redux/slices/studio.slice';

interface IForm {
    title: string
    description: string
}


const EditVideoForm = () => {
    const { choosenVideo, choosenVideoPending, updateVideoPending, updateVideoSuccess } = useAppSelector(state => state.studio)
    const dispatch = useAppDispatch()

    const [enabled, setEnabled] = useState<boolean>(true)
    const { register, handleSubmit, formState: { errors } } = useForm<IForm>({ mode: 'onChange' })
    const { handleImg, img, preview, resetFiles } = useUploadImage()

    const onSubmit: SubmitHandler<IForm> = ({ title, description }) => {
        if (choosenVideo) {
            const fd = new FormData()
            fd.append('title', title)
            fd.append('isPublic', JSON.stringify(enabled))
            fd.append('description', description)
            if (img) fd.append('preview', img)
            dispatch(updateVideo({ formData: fd, videoId: choosenVideo._id }))
        }
    }

    useEffect(() => {
        return () => resetFiles()
    }, [])

    useEffect(() => {
        if (updateVideoSuccess) {
            toast.success('Video updated successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch(setUpdateVideoSuccess(false))
        }
    }, [updateVideoSuccess])

    if (choosenVideoPending || !choosenVideo) {
        return <div className="text-center"><Spinner /></div>
    }

    return (
        <>
            <form action="" className="" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-5 flex-col sm:flex-row sm:gap-10">
                    <div className="w-full md:flex-[2] flex-[3]">
                        <Textarea error={errors.title} id='title' label='Title' rows={3}
                            register={register("title", validate(1, 100))}
                            defaultValue={choosenVideo?.title} />

                        <Textarea error={errors.description} id='description' label='Description' rows={8}
                            register={register("description", validate(1, 500))}
                            defaultValue={choosenVideo?.description} />

                        <Toggle enabled={enabled} setEnabled={setEnabled} title='Make video public?' />

                        <div className="mr-auto">
                            <UploadPreview handleImg={handleImg} />
                        </div>
                    </div>


                    <PreviewBlock filename={choosenVideo?.title}
                        preview={preview ? preview : `${choosenVideo.preview}`} />

                </div>

                <div className="border-t border-gray-300 py-5 shrink-0 sm:mt-0 mt-5">
                    <button className="subBtn text-white bg-primaryBlue" type='submit'
                        disabled={updateVideoPending}>
                        save
                    </button>
                </div>
            </form>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='colored'
            />
        </>
    );
};

export default EditVideoForm;