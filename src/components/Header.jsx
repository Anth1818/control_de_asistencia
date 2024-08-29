import Button from "../components/Button";
import inamujerLogo from "../../public/inamujer-logo.jpg";
import PropTypes from "prop-types";

export const Header = ({handleUpdateStateModal, ViewLogout, ViewLogin, handleLogout}) => {
    return (
      <>
        <header className=" text-white py-4 bg-gray-900">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex w-full items-center">
            </div>
            {ViewLogin && <Button event={handleUpdateStateModal} header={true}>Iniciar Sesión</Button>}
            {ViewLogout && <Button event={handleLogout} header={true}>Cerrar Sesión</Button>}
          </div>
        </header>
        <img src={inamujerLogo} alt="Logo" className="h-20 w-20 absolute hidden sm:block" />
      </>
    )
}
Header.propTypes = {
    handleUpdateStateModal: PropTypes.func,
    ViewLogout: PropTypes.bool,
    ViewLogin: PropTypes.bool,
    handleLogout: PropTypes.func,
  };