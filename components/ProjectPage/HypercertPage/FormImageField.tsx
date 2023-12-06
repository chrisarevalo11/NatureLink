import { Dispatch, Fragment, ReactElement, useEffect, useState } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { submitResultsType } from './SubmitForm'

type ImageFieldProps = {
	label: string
	inputName: string
	formValues: submitResultsType
	handleChange: (e: React.ChangeEvent<HTMLInputElement> | File[]) => void
}
export default function ImageField({
	label,
	inputName,
	formValues,
	handleChange
}: ImageFieldProps): ReactElement {
	const [rejectedFiles, setRejectedFiles] = useState<FileRejection[] | File[]>(
		[]
	)
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
	const { getRootProps, getInputProps } = useDropzone({
		maxFiles: 3,
		accept: {
			'image/*': ['.jpeg', '.png', '.jpg']
		},
		onDrop: (acceptedFiles, rejected) => {
			setUploadedFiles(prevFiles => {
				if (prevFiles.length + acceptedFiles.length > 3) {
					setRejectedFiles(acceptedFiles)
					return prevFiles
				}
				setRejectedFiles([])
				return [...prevFiles, ...acceptedFiles]
			})
			setRejectedFiles(rejected)
		}
	})

	const removeFile = (fileName: string) => () => {
		setUploadedFiles(prevFiles =>
			prevFiles.filter(file => file.name !== fileName)
		)
	}

	const files = uploadedFiles.map((file: File) => (
		<div
			key={file.name}
			className='h-full flex flex-col items-center bg-gray-800 p-1 rounded-xl'
		>
			<div
				style={{
					backgroundImage: `url(${URL.createObjectURL(file)})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center'
				}}
				className='w-full h-[90%] rounded-xl'
			></div>
			<p className='flex items-center w-full text-ellipsis overflow-hidden'>
				<button className='scale-50 -mb-1' onClick={removeFile(file.name)}>
					❌
				</button>{' '}
				{file.name}
			</p>
		</div>
	))

	const rejected = rejectedFiles.length > 0 && (
		<p className='text-red-500'>Only up to 3 images are allowed</p>
	)

	useEffect(() => {
		handleChange(uploadedFiles)
	}, [uploadedFiles])

	return (
		<Fragment>
			<label className='label'>
				<span className='label-text text-white'>{label}</span>
			</label>
			<div
				{...getRootProps({
					className:
						'dropzone w-full mx-auto h-[150px] rounded-3xl flex flex-col justify-center cursor-pointer items-center border-4 border-gray-400 border-dashed'
				})}
			>
				<input id='upload' required {...getInputProps()} />
				{!uploadedFiles.length ? (
					<p className='flex items-center text-gray-400'>
						Drop up to 3 image files (.jpg, .png or .jpeg)
					</p>
				) : (
					<div className='h-full w-full grid grid-cols-3 p-2 gap-2 z-[100] cursor-default'>
						{files}
					</div>
				)}
			</div>
			{rejected}
		</Fragment>
	)
}
