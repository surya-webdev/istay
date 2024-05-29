import { useState } from "react";
import styled from "styled-components";

import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { HiDocumentDuplicate } from "react-icons/hi2";

import { formatCurrency } from "../../utils/helpers";
import { useCabinDelete } from "./useCabinDelete";
import { useCreateCabin } from "./useCreateCabin";

import CreateCabinForm from "./CreateCabinForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem;
  gap: 5px;
`;

function CabinRow({ cabin }) {
  const { id, image, name, maxCapacity, regularPrice, discount, description } =
    cabin;
  const [isOpen, setIsOpen] = useState(false);

  const { isCreating, mutate: createCabin } = useCreateCabin();

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
  }

  const { deleting, mutate } = useCabinDelete();

  return (
    <>
      <TableRow>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>fill upto {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{discount ? formatCurrency(discount) : "--"}</Discount>
        <Menus id={id}>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <StyledDiv>
              <Menus.Button
                onClick={() => handleDuplicate()}
                icon={<HiDocumentDuplicate />}
              >
                Duplicate
              </Menus.Button>

              <Modal>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<MdOutlineEdit />}>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Window name="edit">
                  <CreateCabinForm cabinToEdit={cabin} />
                </Modal.Window>
              </Modal>
              <Modal>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<MdDelete />}>Delete</Menus.Button>
                </Modal.Open>
                <Modal.Window name="delete">
                  <ConfirmDelete
                    onConfirm={() => mutate(id)}
                    disabled={deleting}
                  />
                </Modal.Window>
              </Modal>
            </StyledDiv>
            <div></div>
          </Menus.List>
        </Menus>
      </TableRow>
    </>
  );
}

export default CabinRow;
