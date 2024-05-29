import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

function AddCabin({ cabin }) {
  return (
    <>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button variations="primary" sizes="large">
            Add New Cabin
          </Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm cabinToEdit={cabin} />
        </Modal.Window>
      </Modal>

      {/* <Button
        onClick={() => setIsOpenModal((is) => !is)}
        variations="primary"
        sizes="large"
      >
        Form
      </Button>
      {isOpenModal && (
        <Modal onClose={setIsOpenModal}>
          <CreateCabinForm onClose={setIsOpenModal} cabinToEdit={cabin} />
        </Modal>
      )} */}
    </>
  );
}

export default AddCabin;
