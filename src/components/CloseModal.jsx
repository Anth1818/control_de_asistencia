const CloseModal = ({closeModal}) => {
  
    return (
        <button onClick={closeModal}>
            <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 absolute top-4 right-4 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
        >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
        />
        </svg>
            Cerrar
        </button>
    )
    
}
export default CloseModal