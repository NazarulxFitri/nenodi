import { CartItem } from "@/stores/useCartStores";
import { useDeliveryStore } from "@/stores/useDeliveryStore";
import { Button, Grid, TextField, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface ShoppingCartPromptModuleProps {
  forCheckout?: boolean;
  selectedItems?: CartItem[];
}

const ShoppingCartPromptModule: React.FC<ShoppingCartPromptModuleProps> = ({
  forCheckout,
  selectedItems,
}) => {
  const router = useRouter();
  const { deliveryInfo, setDeliveryInfo } = useDeliveryStore();
  const totalWeight = parseFloat(
    (
      selectedItems?.reduce((sum, item) => sum + item.quantity * 0.4, 0) ?? 0
    ).toFixed(2)
  );

  useEffect(() => {
    setDeliveryInfo({ weight: totalWeight });
  }, [totalWeight]);

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Typography variant="h4" fontWeight={"700"}>
          Delivery Information
        </Typography>
      </Grid>
      <Grid size={12}>
        <TextField
          disabled={forCheckout}
          value={deliveryInfo.name}
          fullWidth
          type="text"
          variant="outlined"
          size="small"
          label="Name"
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              inputProps: { min: 1 },
            },
          }}
          onChange={(e) => setDeliveryInfo({ name: e.target.value })}
        />
      </Grid>
      <Grid size={6}>
        <TextField
          disabled={forCheckout}
          value={deliveryInfo.phone}
          fullWidth
          type="text"
          variant="outlined"
          size="small"
          label="Phone Number"
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              inputProps: { min: 1 },
            },
          }}
          onChange={(e) => setDeliveryInfo({ phone: e.target.value })}
        />
      </Grid>
      <Grid size={6}>
        <TextField
          disabled={forCheckout}
          value={deliveryInfo.email}
          fullWidth
          type="text"
          variant="outlined"
          size="small"
          label="email"
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              inputProps: { min: 1 },
            },
          }}
          onChange={(e) => setDeliveryInfo({ email: e.target.value })}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          disabled={forCheckout}
          value={deliveryInfo.address}
          fullWidth
          type="text"
          variant="outlined"
          size="small"
          label="Address"
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              inputProps: { min: 1 },
            },
          }}
          onChange={(e) => setDeliveryInfo({ address: e.target.value })}
        />
      </Grid>
      <Grid size={4}>
        <TextField
          disabled={forCheckout}
          value={deliveryInfo.postcode}
          fullWidth
          type="text"
          variant="outlined"
          size="small"
          label="Postcode"
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              inputProps: { min: 1 },
            },
          }}
          onChange={(e) => setDeliveryInfo({ postcode: e.target.value })}
        />
      </Grid>
      <Grid size={4}>
        <TextField
          disabled={forCheckout}
          value={deliveryInfo.country}
          fullWidth
          type="text"
          variant="outlined"
          size="small"
          label="State"
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              inputProps: { min: 1 },
            },
          }}
          onChange={(e) => setDeliveryInfo({ state: e.target.value })}
        />
      </Grid>
      <Grid size={4}>
        <TextField
          disabled={forCheckout}
          value={deliveryInfo.country}
          fullWidth
          type="text"
          variant="outlined"
          size="small"
          label="Country"
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              inputProps: { min: 1 },
            },
          }}
          onChange={(e) => setDeliveryInfo({ country: e.target.value })}
        />
      </Grid>
      <Grid size={4}>
        <TextField
          disabled={true}
          value={totalWeight}
          fullWidth
          type="text"
          variant="outlined"
          size="small"
          label="Weight (kg)"
          sx={{ display: forCheckout ? "none" : "block" }}
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              inputProps: { min: 1 },
            },
          }}
        />
      </Grid>
      {forCheckout && (
        <Grid size={12}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => router.push("/shoppingcart")}
          >
            <EditIcon fontSize="small" />{" "}
            <Typography variant="body2">Edit</Typography>
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default ShoppingCartPromptModule;
