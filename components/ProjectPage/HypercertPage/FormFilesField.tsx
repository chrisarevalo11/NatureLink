import {
	Dispatch,
	Fragment,
	ReactElement,
	SetStateAction,
	useEffect,
	useMemo,
	useState
} from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { submitResultsType } from './SubmitForm'

type Props = {
	handleChange: Dispatch<SetStateAction<submitResultsType>>
}
export default function FormFilesField(props: Props): ReactElement {
	const { handleChange } = props

	const [rejectedFiles, setRejectedFiles] = useState<FileRejection[] | File[]>(
		[]
	)
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

	const { getRootProps, getInputProps } = useDropzone({
		maxFiles: 3,
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

	useEffect(() => {
		handleChange(prev => ({
			...prev,
			files: uploadedFiles
		}))
	}, [uploadedFiles])

	const files = useMemo(
		() =>
			uploadedFiles.map((file: File) => (
				<div
					key={file.name}
					className='h-full flex flex-col items-center bg-gray-800 p-1 rounded-xl'
				>
					<div
						style={{
							backgroundImage: 'url(/images/folder.png)',
							backgroundSize: 'contain',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat'
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
			)),
		[uploadedFiles]
	)

	const rejected = rejectedFiles.length > 0 && (
		<p className='text-red-500'>Only up to 3 images are allowed</p>
	)

	return (
		<Fragment>
			<div
				{...getRootProps({
					className:
						'dropzone w-full mx-auto h-[150px] rounded-3xl mt-3 flex flex-col justify-center cursor-pointer items-center border-4 border-gray-400 border-dashed'
				})}
			>
				<input id='upload' {...getInputProps()} />
				{!uploadedFiles.length ? (
					<p className='flex items-center text-gray-400'>
						Drop up to 3 image files (.jpg, .png or .jpeg)
					</p>
				) : (
					<div className='h-full w-full grid grid-cols-3 p-2 gap-2 cursor-default'>
						{files}
					</div>
				)}
			</div>
			{rejected}
		</Fragment>
	)
}
