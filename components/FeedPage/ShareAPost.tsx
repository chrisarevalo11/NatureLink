import {
	ChangeEventHandler,
	MutableRefObject,
	ReactElement,
	useEffect,
	useRef,
	useState
} from 'react'

export default function ShareAPost(): ReactElement {
	const textAreaRef: MutableRefObject<HTMLTextAreaElement | null> = useRef(null)
	const [content, setContent] = useState<String>('')

	const maxLength = 250

	const handleChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
		setContent(e.target.value)
	}

	useEffect(() => {
		if (textAreaRef.current) {
			textAreaRef.current.style.height = 'auto'
			textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
		}
	}, [content])

	return (
		<div className='p-2 bg-gray-800 rounded-lg'>
			<textarea
				className='w-full p-2 rounded-lg bg-gray-700 outline-gray-600 resize-none'
				placeholder="What's on your mind?"
				value={content as any}
				onChange={handleChange}
				rows={2}
				ref={textAreaRef}
				maxLength={maxLength}
			/>
			<button
				className={`btn mt-2 ${!content && 'pointer-events-none opacity-40'}`}
				type='submit'
			>
				Post
			</button>
		</div>
	)
}
