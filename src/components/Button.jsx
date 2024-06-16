 const Button = ({ children, event, fullWidth }) => {
    const width = fullWidth ? 'w-full' : 'w-auto'
    return (
        <button onClick={event} className={`${width} bg-purple-900 text-white inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md`}>
        {children}
    </button>
    )
}

export default Button
