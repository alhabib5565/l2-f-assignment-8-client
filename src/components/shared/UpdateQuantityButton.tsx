// import { HeaderText } from '@/app/(withNavAndFooter)/checkout/page';
// import { Add } from '@mui/icons-material';
// import { IconButton, Stack } from '@mui/material';
// import React from 'react';
// import RemoveIcon from "@mui/icons-material/Remove";
// import { useAppDispatch } from '@/redux/hooks';

// const UpdateQuantityButton = () => {
//       const dispatch = useAppDispatch();

//     return (
//       <Stack
//         alignItems="center"
//         direction={{ xs: "column", sm: "row" }}
//         spacing={{ xs: 0, sm: 1 }}
//       >
//         <IconButton
//           onClick={() =>
//             dispatch(
//               updateQuantity({
//                 productId: product.productId,
//                 type: "increment",
//               })
//             )
//           }
//           sx={{
//             border: "1px solid",
//             borderRadius: 1,
//             padding: "1px",
//           }}
//           size="small"
//         >
//           <Add sx={{ height: 20, width: 20 }} />
//         </IconButton>
//         <HeaderText>{product.quantity}</HeaderText>
//         <IconButton
//           onClick={() =>
//             dispatch(
//               updateQuantity({
//                 productId: product.productId,
//                 type: "decrement",
//               })
//             )
//           }
//           sx={{
//             border: "1px solid",
//             borderRadius: 1,
//             padding: "1px",
//           }}
//           size="small"
//         >
//           <RemoveIcon sx={{ height: 20, width: 20 }} />
//         </IconButton>
//       </Stack>
//     );
// };

// export default UpdateQuantityButton;
