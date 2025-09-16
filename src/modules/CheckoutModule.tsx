import { CURRENCY_CONSTANT } from "@/constants/commonConstant";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import ShoppingCartPromptModule from "./ShoppingCartPromptModule";
import { useCheckoutStore } from "@/stores/useCheckoutStore";
import type { CourierResponse } from "@/types/CourierResponseType";

interface CheckoutModuleProps {
  courierData: CourierResponse;
}

const CheckoutModule: React.FC<CheckoutModuleProps> = ({ courierData }) => {
  const selectedItems = useCheckoutStore((state) => state.selectedItems);
  const deliveryInfo = useCheckoutStore((state) => state.deliveryInfo);
  const totalPriceCheckedItems = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalPriceAndDelivery =
    totalPriceCheckedItems + Number(courierData.price) || 0;

  const handleProceedOrder = () => {
    let message = "Order Details:\n\n";

    selectedItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} x ${item.quantity} = ${
        item.price * item.quantity
      }\n`;
    });

    message += `\nDelivery Info:\n`;
    message += `Name: ${deliveryInfo?.name}\n`;
    message += `Phone: ${deliveryInfo?.phone}\n`;
    message += `Email: ${deliveryInfo?.email}\n`;
    message += `Address: ${deliveryInfo?.address}\n`;
    message += `Postcode: ${deliveryInfo?.postcode}\n`;
    message += `Country: ${deliveryInfo?.country}\n`;

    message += `\nItems price: ${CURRENCY_CONSTANT.MYR} ${totalPriceCheckedItems}\n`;
    message += `Courier Charge: ${CURRENCY_CONSTANT.MYR} ${courierData.price}\n`;
    message += `Subtotal: ${
      CURRENCY_CONSTANT.MYR
    } ${totalPriceAndDelivery.toFixed(2)}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "60102121936";

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <Container sx={{ my: 2, minHeight: "68vh" }}>
      <Grid size={12}>
        <Typography variant="h4" fontWeight={"700"} mb={1}>
          Checkout
        </Typography>
      </Grid>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, md: 8 }}>
          {selectedItems.map((item) => (
            <Grid
              key={item.name}
              sx={{ borderBottom: "1px solid #efefef", py: 1 }}
              container
              spacing={2}
              alignContent={"center"}
              alignItems={"center"}
            >
              <Grid size={{ xs: 2, md: 1 }}>
                <Image
                  src={item.imgSrc!}
                  alt={item.name}
                  width={100}
                  height={100}
                  style={{
                    display: "block",
                    height: "auto",
                    maxHeight: "60px",
                    width: "100%",
                  }}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 6 }}>{item.name}</Grid>
              <Grid size={{ xs: 1, md: 2 }} textAlign={"center"}>
                {item.quantity}
              </Grid>
              <Grid size={{ xs: 3, md: 2 }}>
                {CURRENCY_CONSTANT.MYR} {item.quantity * item.price}
              </Grid>
            </Grid>
          ))}
          <Box mt={4}>
            <ShoppingCartPromptModule forCheckout={true} />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ border: "1px solid #efefef", p: 2 }}>
            <Typography variant="h5" mb={2}>
              Payment Info
            </Typography>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography variant="subtitle1">Selected Item price</Typography>
              <Typography variant="subtitle1">
                {CURRENCY_CONSTANT.MYR} {totalPriceCheckedItems.toFixed(2)}
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography variant="subtitle1">Courier Charge</Typography>
              <Typography variant="subtitle1">
                {CURRENCY_CONSTANT.MYR} {courierData.price}
              </Typography>
            </Box>
            <Typography
              color="#666666"
              fontSize={"12px"}
              variant="body2"
              mt={1}
            >
              Notes that the courier charge may vary depending on delivery
              location or weight
            </Typography>
            <Typography
              color="#666666"
              fontSize={"12px"}
              variant="body2"
              mt={1}
            >
              You will be navigated to Whatsapp to Proceed with the order. Our
              admin will assist on the next step.
            </Typography>
            <Box display={"flex"} justifyContent={"space-between"} mt={4}>
              <Typography variant="h5">Subtotal</Typography>
              <Typography variant="h5">
                {CURRENCY_CONSTANT.MYR} {totalPriceAndDelivery}
              </Typography>
            </Box>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 1 }}
              onClick={handleProceedOrder}
            >
              <Typography
                variant="body2"
                fontWeight={"700"}
                textTransform={"uppercase"}
              >
                Proceed to Order
              </Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutModule;
