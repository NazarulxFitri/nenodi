import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CircleIcon from "@mui/icons-material/Circle";
import { useCartStore } from "@/stores/useCartStores";
import { useRouter } from "next/router";
import Image from "next/image";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  function handleClickCartIcon() {
    router.push("/shoppingcart");
  }

  return (
    <Box position={"relative"}>
      <Box
        display={"flex"}
        alignContent={"center"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{
          background: "#d3bbdd",
          px: { xs: 2, md: 8 },
          top: 0,
          width: "100%",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            cursor: "pointer",
          }}
          onClick={() => router.push("/")}
        >
          <Image
            src={"/images/nenodi_logo.png"}
            alt="Nenodi"
            width={80}
            height={80}
          />
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" } }} gap={4}>
          <Box display={"flex"} gap={1}>
            <Image
              src="/images/whatsapp.png"
              alt="Nenodi | Tiktok"
              width={20}
              height={20}
            />
            <Typography>+60102121936</Typography>
          </Box>
          <Box display={"flex"} gap={1}>
            <Image
              src="/images/tik-tok.png"
              alt="Nenodi | Tiktok"
              width={20}
              height={20}
            />
            <Typography>@nenodii</Typography>
          </Box>
          <Box
            alignItems={"center"}
            sx={{ cursor: "pointer", display: "flex", position: "relative" }}
            onClick={handleClickCartIcon}
          >
            {totalItems > 0 && (
              <CircleIcon
                fontSize="small"
                sx={{
                  color: "#FA3E3E",
                  fontSize: "10px",
                  position: "absolute",
                  top: "-8px",
                  right: "8px",
                }}
              />
            )}
            <ShoppingCartIcon fontSize="small" />
            <Typography variant="body2">Cart</Typography>
          </Box>
        </Box>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <Box
            alignItems={"center"}
            sx={{ cursor: "pointer", display: "flex", position: "relative" }}
            onClick={handleClickCartIcon}
          >
            {totalItems > 0 && (
              <CircleIcon
                fontSize="small"
                sx={{
                  color: "#FA3E3E",
                  fontSize: "10px",
                  position: "absolute",
                  top: "-8px",
                  right: "8px",
                }}
              />
            )}
            <ShoppingCartIcon fontSize="small" />
            <Typography variant="body2">Cart</Typography>
          </Box>
        </Box>
      </Box>
      {children}
      <Box
        display={"flex"}
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent={"center"}
        sx={{ background: "#ece3f0", p: 4 }}
        gap={{ xs: 2, md: 6 }}
        alignItems={"center"}
      >
        <Box
          sx={{
            cursor: "pointer",
          }}
          onClick={() => router.push("/")}
        >
          <Image
            src={"/images/nenodi_logo.png"}
            alt="Nenodi"
            width={80}
            height={80}
          />
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          <Box display={"flex"} gap={1}>
            <Image
              src="/images/tik-tok.png"
              alt="Nenodi | Tiktok"
              width={20}
              height={20}
            />
            <Typography>@nenodii</Typography>
          </Box>
          <Box display={"flex"} gap={1}>
            <Image
              src="/images/whatsapp.png"
              alt="Nenodi | Tiktok"
              width={20}
              height={20}
            />
            <Typography>+60102121936</Typography>
          </Box>
        </Box>
        <Box
          display={"flex"}
          flexDirection={{ xs: "column", md: "row" }}
          alignItems={"center"}
          gap={2}
          mt={{ xs: 2, md: 0 }}
          px={2}
        >
          <Image
            src="/images/easyparcel_logo.png"
            alt="Nenodi | Easy Parcel"
            width={200}
            height={60}
            style={{ height: "40px", width: "auto" }}
          />
          <Image
            src="/images/Flash_Express_Logo.svg"
            alt="Nenodi | Flash Express"
            width={200}
            height={60}
            style={{ height: "40px", width: "auto" }}
          />
          <Image
            src="/images/pos_logo.svg"
            alt="Nenodi | Pos Malaysia"
            width={200}
            height={60}
            style={{ height: "40px", width: "auto" }}
          />
        </Box>
      </Box>
      <Box sx={{ background: "#d3bbdd", py: 1 }} />
    </Box>
  );
};

export default MainLayout;
