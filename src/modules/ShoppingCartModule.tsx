import {
  BUTTON_TEXT_CONSTANT,
  CURRENCY_CONSTANT,
} from "@/constants/commonConstant";
import { useCartStore } from "@/stores/useCartStores";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { INFO_MESSAGES } from "@/constants/messageConstant";
import ShoppingCartPromptModule from "./ShoppingCartPromptModule";
import { useRouter } from "next/router";
import { useDeliveryStore } from "@/stores/useDeliveryStore";
import Cookies from "js-cookie";
import { useCheckoutStore } from "@/stores/useCheckoutStore";

const ShoppingCartModule = ({}) => {
  const items = useCartStore((state) => state.items);
  const router = useRouter();
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const checkoutStore = useCheckoutStore();
  const [selectedVariantIds, setSelectedVariantIds] = useState<number[]>([]);
  const [showMessage, setShowMessage] = useState(false);

  const toggleSelection = (variantId: number) => {
    setSelectedVariantIds((prev) =>
      prev.includes(variantId)
        ? prev.filter((id) => id !== variantId)
        : [...prev, variantId]
    );
  };

  const selectedItems = items.filter((item) =>
    selectedVariantIds.includes(item.variantId)
  );

  const totalPriceCheckedItems = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleClickCheckout = () => {
    const deliveryInfo = useDeliveryStore.getState().deliveryInfo;
    Cookies.set("deliveryInfo", JSON.stringify(deliveryInfo));
    checkoutStore.setSelectedItems(selectedItems);
    checkoutStore.setDeliveryInfo(deliveryInfo);
    if (selectedItems.length < 1) {
      setShowMessage(true);
      return;
    }
    router.push("/checkout");
  };

  return (
    <Container sx={{ my: 2, minHeight: "68vh" }}>
      <Grid size={12}>
        <Typography variant="h4" fontWeight={"700"} mb={1}>
          Shopping Cart
        </Typography>
      </Grid>
      {items.map((item) => (
        <Grid
          key={item.name}
          sx={{ borderBottom: "1px solid #efefef", py: 1 }}
          container
          spacing={2}
          alignContent={"center"}
          alignItems={"center"}
        >
          <Grid size={{ xs: 2, md: 1 }}>
            <Checkbox
              checked={selectedVariantIds.includes(item.variantId)}
              onChange={() => toggleSelection(item.variantId)}
            />
          </Grid>
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
          <Grid size={{ xs: 8, md: 4 }}>{item.name}</Grid>
          <Grid size={{ xs: 4, md: 2 }}>
            <TextField
              type="number"
              size="small"
              value={item.quantity}
              slotProps={{
                input: {
                  inputProps: { min: 1 },
                },
              }}
              onChange={(e) =>
                updateQuantity(item.variantId, Number(e.target.value))
              }
            />
          </Grid>
          <Grid size={{ xs: 4, md: 2 }}>
            {CURRENCY_CONSTANT.MYR} {item.quantity * item.price}
          </Grid>
          <Grid size={{ xs: 4, md: 2 }}>
            <Box
              sx={{ cursor: "pointer", textAlign: "right" }}
              onClick={() => removeItem(item.variantId)}
            >
              <CloseIcon sx={{ color: "#fb4570" }} fontSize="small" />
            </Box>
          </Grid>
        </Grid>
      ))}

      <Grid container spacing={6} mt={6}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ShoppingCartPromptModule {...{ selectedItems }} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Typography variant="h4" fontWeight={"700"}>
              <span style={{ fontSize: "16px", fontWeight: "300" }}>
                Total :{" "}
              </span>
              {CURRENCY_CONSTANT.MYR} {totalPriceCheckedItems}
            </Typography>
            <Typography variant="body2" fontWeight={"300"} color="#666">
              {INFO_MESSAGES.COURIER_CHARGE_CALCULATION}
            </Typography>
          </Box>
          <Box mt={1}>
            <Snackbar
              open={showMessage}
              autoHideDuration={2000}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              onClose={() => setShowMessage(false)}
              message="Please select at least one product to continue"
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiSnackbarContent-root": {
                  backgroundColor: "#d3bbdd",
                  fontWeight: "bold",
                  borderRadius: "8px",
                },
              }}
            />
            <Snackbar
              open={showMessage}
              autoHideDuration={2000}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              onClose={() => setShowMessage(false)}
              message="Please select at least one product to continue"
              sx={{
                display: { xs: "none", md: "block" },
                "& .MuiSnackbarContent-root": {
                  backgroundColor: "#d3bbdd",
                  fontWeight: "bold",
                  borderRadius: "8px",
                },
              }}
            />
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleClickCheckout}
            >
              <Typography fontWeight={"700"} variant="body2">
                {BUTTON_TEXT_CONSTANT.CHECKOUT}
              </Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShoppingCartModule;
