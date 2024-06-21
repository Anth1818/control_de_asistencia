import Button from "../components/Button";
import inamujerLogo from "../../public/inamujer-logo.jpg";
import PropTypes from "prop-types";

export const Header = ({handleUpdateStateModal, logout, login, handleLogout}) => {
    return (
      <>
        <header className=" text-white py-4 bg-gray-900">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex w-full items-center">
            </div>
            {login && <Button event={handleUpdateStateModal} header={true}>Inicias Sesión</Button>}
            {logout && <Button event={handleLogout} header={true}>Cerrar Sesión</Button>}
          </div>
        </header>
        <img src={inamujerLogo} alt="Logo" className="h-20 w-20 absolute" />
      </>
    )
}
Header.propTypes = {
    handleUpdateStateModal: PropTypes.func,
    logout: PropTypes.bool,
    login: PropTypes.bool,
    handleLogout: PropTypes.func,
  };