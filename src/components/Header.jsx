import Button from "../components/Button";
import inamujerLogo from "../../public/inamujer-logo.png";
import PropTypes from "prop-types";

export const Header = ({handleUpdateStateModal, logout, login, handleLogout}) => {
    return (
        <header className=" text-white py-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex w-full items-center">
              <img src={inamujerLogo} alt="Logo" className="h-24 w-24" />
            </div>
            {login && <Button event={handleUpdateStateModal}>Inicias Sesión</Button>}
            {logout && <Button event={handleLogout}>Cerrar Sesión</Button>}
          </div>
        </header>
    )
}
Header.propTypes = {
    handleUpdateStateModal: PropTypes.func,
    logout: PropTypes.bool,
    login: PropTypes.bool,
    handleLogout: PropTypes.func,
  };