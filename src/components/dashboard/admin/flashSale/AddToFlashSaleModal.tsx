import MyModal from "@/components/modal/MyModal";
import FlashSaleForm from "./FlashSaleForm";
import { TModalOpenProps } from "@/type";

const AddToFlashSaleModal = ({ open, setOpen }: TModalOpenProps) => {
  return (
    <MyModal title="Add to flash sale" open={open} setOpen={setOpen}>
      <FlashSaleForm />
    </MyModal>
  );
};

export default AddToFlashSaleModal;
