import MyModal from "@/components/modal/MyModal";
import FlashSaleForm from "./FlashSaleForm";
import { TModalOpenProps } from "@/type";

const AddToFlashSaleModal = ({
  open,
  setOpen,
  productId,
}: TModalOpenProps & { productId: string }) => {
  return (
    <MyModal title="Add to flash sale" open={open} setOpen={setOpen}>
      <FlashSaleForm productId={productId} setOpen={setOpen} />
    </MyModal>
  );
};

export default AddToFlashSaleModal;
