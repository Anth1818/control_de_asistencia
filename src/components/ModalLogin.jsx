import Button from './Button'
import CloseModal from './CloseModal'

const ModalLogin = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-md min-w-[500px] relative">
        <CloseModal closeModal={closeModal} />
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
        <form>
          <div className="mb-4" >
            <label className="block text-sm font-medium text-gray-700">Usuario</label>
            <input
              className="h-10 w-full bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 mr-2 px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Usuario"
              type="text"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              className="h-10 w-full bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 mr-2 px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Ingrese su contraseña"
              type="password"
            />
          </div>
          <Button fullWidth={true}>Ingresar</Button>
        </form>
      </div>
    </div>
  )
}
export default ModalLogin