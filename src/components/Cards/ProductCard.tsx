import {
  BUTTON_TEXT_CONSTANT,
  CURRENCY_CONSTANT,
} from "@/constants/commonConstant";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  name: string;
  fromPrice: number;
  toPrice?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, fromPrice }) => {
  return (
    <Box sx={{ boxShadow: "1px 1px 10px #efefef", position: "relative" }}>
      <Box sx={{ width: "100%", height: "340px", position: "relative" }}>
        <Image
          src="/images/nenodi-product.jpeg"
          alt="test image"
          fill
          style={{ objectFit: "cover" }}
        />
      </Box>

      <Box p={2}>
        <Typography variant="body1" sx={{ textTransform: "uppercase" }}>
          {name}
        </Typography>
        <Typography fontWeight={700} variant="body1" mt={0.5}>
          {CURRENCY_CONSTANT.MYR} {fromPrice}
        </Typography>

        <Button
          component={Link}
          href={`/productdetail/${id}`}
          fullWidth
          variant="contained"
          sx={{ mt: 2, py: 1 }}
        >
          <Typography
            variant="body2"
            fontWeight={"700"}
            textTransform={"uppercase"}
          >
            {BUTTON_TEXT_CONSTANT.QUICKADD}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;
